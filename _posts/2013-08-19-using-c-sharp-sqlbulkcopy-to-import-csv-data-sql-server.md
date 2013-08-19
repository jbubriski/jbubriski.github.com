---
date: '2013-08-19 8:00:00 -04:00'
layout: post
title: Using C# And SqlBulkCopy To Import CSV Data Into SQL Server
slug: using-c-sharp-sqlbulkcopy-to-import-csv-data-sql-server
description: 
categories:
- Programming
tags:
- Imports
- SQL Server
- TextFieldParser
- SqlBulkCopy
- Kentico CMS
---

I've written a lot of imports in my day, but they're always painful.  Recently though, I think I've found a pretty good solution for programmatically getting data straight into SQL Server, ***fast***.  This isn't that helpful if you need to use an API, but it's great if you can do direct inserts.

Here are the tools I use to import the data:

- C#
- The `Microsoft.VisualBasic.FileIO.TextFieldParser` class (yes, you can use it from C#)
- The `System.Data.SqlClient.SqlBulkCopy` class

Here are some unscientific benchmarks I did importing data into a Kentico CMS install, but this should work with any SQL Server DB:

Importing 4.6 million rows of IP lookup data (with 6 columns)...


- **21 hours** - Kentico CMS API
- **1 hour** - SQL Inserts into live table
- **3 minutes** - SqlBulkCopy into temp table, then INSERT INTO live table
- **2 minutes** - SqlBulkCopy into live table, using ColumnMappings to skip PK

Pretty big difference!  First, I tried to use the API to get the data in, because that's the recommended way.  Well, it turns out it wasn't feasible given the amount of data, and the data is simply going into a Custom Table so the API isn't super important.

Then I tried doing straight SQL insert statements.  This was *much* better, but still took *way* too long.

Finally I came across SQL Bulk Copy.  I first tried to use the command line version, but then discovered the .NET class!  I had some trouble getting the config file right for the command line version, but the .NET class also makes more sense in the context of a Kentico website.  It couldn't be easier to use, and I was loading the data into a temp table, then using the `INSERT INTO` syntax to put the data into the live table.  *Then* I realized that I could simply setup the column mappings and skip the temp table altogether!

	using System.Configuration;
	using System.Data;
	using System.Data.SqlClient;
	using Microsoft.VisualBasic.FileIO;
	
	public class CsvBulkCopyDataIntoSqlServer
	{
        protected const string _truncateLiveTableCommandText = @"TRUNCATE TABLE YourTableName";
		protected const int _batchSize = 100000;

	    public void LoadCsvDataIntoSqlServer()
	    {
	        // This should be the full path
	        var fileName = @"C:\Path\To\File.csv";
	
	        var createdCount = 0;
	
	        using (var textFieldParser = new TextFieldParser(fileName))
	        {
	            textFieldParser.TextFieldType = FieldType.Delimited;
	            textFieldParser.Delimiters = new[] { "," };
	            textFieldParser.HasFieldsEnclosedInQuotes = true;
	
	            var connectionString = ConfigurationManager.ConnectionStrings["CMSConnectionString"].ConnectionString;
	
	            var dataTable = new DataTable("YourTableName");
	
	            // Add the columns in the temp table
	            dataTable.Columns.Add("FirstName");
	            dataTable.Columns.Add("LastName");
	
	            using (var sqlConnection = new SqlConnection(connectionString))
	            {
	                sqlConnection.Open();
	
	                // Truncate the live table
	                using (var sqlCommand = new SqlCommand(_truncateLiveTableCommandText, sqlConnection))
	                {
	                    sqlCommand.ExecuteNonQuery();
	                }
					
					// Create the bulk copy object
                    var sqlBulkCopy = new SqlBulkCopy(sqlConnection)
                    {
                        DestinationTableName = "YourTableName"
                    };
					
					// Setup the column mappings, anything ommitted is skipped
                    sqlBulkCopy.ColumnMappings.Add("FirstName", "FirstName");
                    sqlBulkCopy.ColumnMappings.Add("LastName", "LastName");
	
	                // Loop through the CSV and load each set of 100,000 records into a DataTable
	                // Then send it to the LiveTable
	                while (!textFieldParser.EndOfData)
	                {
	                    dataTable.Rows.Add(textFieldParser.ReadFields());
	
	                    createdCount++;
	
	                    if (createdCount % _batchSize == 0)
	                    {
                    		InsertDataTable(sqlBulkCopy, sqlConnection, dataTable);
	
	                        break;
	                    }
	                }
	
	                // Don't forget to send the last batch under 100,000
                    InsertDataTable(sqlBulkCopy, sqlConnection, dataTable);
	
	                sqlConnection.Close();
	            }
	        }
	    }
	
        protected void InsertDataTable(SqlBulkCopy sqlBulkCopy, SqlConnection sqlConnection, DataTable dataTable)
        {
            sqlBulkCopy.WriteToServer(dataTable);

            dataTable.Rows.Clear();
        }
	}

It's that easy!  You may need to adjust the `_batchSize` if you're importing data with more columns, otherwise loading 100,000 records into RAM might crush your machine.
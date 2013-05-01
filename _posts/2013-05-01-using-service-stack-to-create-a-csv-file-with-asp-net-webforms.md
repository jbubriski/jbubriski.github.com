---
date: 2013-05-01 8:00:00 -05:00
layout: post
title: Using Service Stack to create a CSV file with ASP.NET Webforms
slug: using-service-stack-to-create-a-csv-file-with-asp-net-webforms
description: How to use Service Stack to create a CSV file and serve it up for download with ASP.NET Webforms.
categories:
- Programming
tags:
- Service Stack
- ASP.NET Webforms
- CSV
---

Recently I needed to export some data from a CMS (Content Management System).  The customer requested that the data be in CSV format.  There are a lot of different ways to do this, but this one might be one of the easiest!

CSV isn't a terribly complicated format, but people do screw it up often enough.  We could write some simple code to output our data in CSV format, but why not stand on the shoulders of giants?  We'll leverage [Service Stack](http://www.servicestack.net/) to do all the heavy lifting for us.

Here is a snippet from my code.  This is a sample click event handler in ASP.NET Webforms:

    protected void uxExportProducts_Click(object sender, EventArgs e)
    {
        Response.Clear();
        Response.ContentType = "text/csv";
        Response.AddHeader("Content-Disposition", "attachment; filename=product-export.csv");

        CsvSerializer.SerializeToStream(GetProducts(), Response.OutputStream);
        Response.End();
    }

To setup, we need to clear any other headers that may have been set, set the content type, and "force" a file download with the "Content-Disposition" header.  Make sure you update your code to set the appropriate filename. After that we just need to serialize out the data, and then `End()` the response so the rest of the page doesn't automatically render.

So what does the `GetProducts()` method do?  Here is the method signature for the Serialization method:

    public static string SerializeToCsv<T>(IEnumerable<T> records);

I simply had my data layer return a `List<ProductData>` (or it could be a `IEnumerable<T>`):

    public List<ProductData> GetProducts()
    {
        // Code to get the data from the DB or web service or whatever...
    }

...and ProductData is just a POCO:

    public class ProductData
    {
        public string ProductName { get; set; }
        public string Photo { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
    }

Hope that helps someone!
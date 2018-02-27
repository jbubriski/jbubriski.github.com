---
published: true
date: '2018-02-27 9:00:00 -04:00'
layout: post
title: Freeing up space in local SQL Server Databases
slug: freeing-up-space-in-local-sql-server-databases
description: How to get your hard drive back by Freeing up space in your SQL Server Databases
categories:
- Programming
tags:
- SQL Server
- T-SQL
- Database
---
The sizes of my local databases for [Stack Overflow](https://stackoverflow.com) were huge, so I did some digging to reduce their size.  Here is a basic list of easy things to do to free up space in your SQL Server databases.

*********************************************************
***I would not recommend doing ANY of these on prod!!!***
*********************************************************

1. **Shrink the DB**. There is often unused space within the allocated DB files (*.mdf).
2. **Shrink the Log File**. Same idea as above but with the log file (*.ldf).
3. **Rebuild the indexes and *then* shrink the DB**.  If you have large tables the indexes are probably fragmented.  In SQL Server you can go to `Table > Indexes > Rebuild All`, or **check out the script below to rebuild all indexes in a DB**.  **FYI, this will actually INCREASE the size of your DB file until you shrink it again!**

Those 3 above were enough for my local setup.  Shrinking initially didn't do much for me (because I had already done it in the past), but **rebuilding the indexes on a *single table* cleared up 15 Gb from my biggest DB**!

Here is the article where I found the info about rebuilding indexes... there are some more suggestions in there as well: [Size does matter: 10 ways to reduce the database size and improve performance in SQL Server](http://aboutsqlserver.com/2014/12/02/size-does-matter-10-ways-to-reduce-the-database-size-and-improve-performance-in-sql-server/)

Here is a nicely formatted version of a script from [Mohammad Nizamuddin on TechNet](https://gallery.technet.microsoft.com/scriptcenter/Script-for-rebuilding-all-8d079754). their script to rebuild all the indexex in the current database.  Yes, it can take a while so run it when you step away from the computer.  Make sure you remember to shrink the DB again after you run it!

*********************************************************
***SECOND WARNING!!! DON'T RUN THIS ON PROD!!!!!***
*********************************************************

```
DECLARE @TableName varchar(255)
DECLARE TableCursor CURSOR FOR

SELECT table_name
FROM information_schema.tables
WHERE table_type = 'base table'

OPEN TableCursor
	FETCH NEXT FROM TableCursor INTO @TableName

	WHILE @@FETCH_STATUS = 0
	BEGIN
		DBCC DBREINDEX(@TableName, ' ', 90)

		FETCH NEXT FROM TableCursor INTO @TableName
	END
CLOSE TableCursor

DEALLOCATE TableCursor
```

I wonder if this would also improve the performance of the index.  Maybe it's something that can be run on prod with your DBA's approval, during an off-peak time.

---
date: '2013-06-01 8:00:00 -04:00'
layout: post
title: Joining Multiple Document Types in Kentico
slug: joining-multiple-document-types-in-kentico
description: Display multiple types of documents in a Kentico Repeater.
categories:
- Programming
tags:
- Kentico
- Kentico CMS
- Transformations
- SQL
---

A common thing our clients request is that they want the latest news-like documents to show on the homepage.  More specifically News, Press Releases, Events, Webinars, etc.  This is easy, until you try and combine them all into a single list.

## The problem

Let's say you want to use a Repeater to try and show these documents.  That might seem like a good way to go.  You can set the repeater to select multiple document types, but what about the transformation?  How would you display a custom date field?

Maybe you want a simple Kentico Transformation like this:

    <li><a href="<%# GetDocumentUrl() %>"><%# Eval("Date") %> <%# Eval("DocumentName") %></a></li>

*Note: transformations live on individual Document Types, but nothing is stopping you from using them with other documents types.  As long as the field names match between the transformation and the data, it will work.*

But if you're selecting News *and* Press Release documents, the above transformation wont work.  Why?  Because Kentico will run a SQL query that joins those documents together, but only the CMS_Tree and CMS_Document tables, *not the custom document table portion*.  So that means you will have the core information about the document, **but you wont have access to any of the custom fields**.

# The Solution

To rectify this, you need to use a custom SQL query to bring all the data together in the right format. Specifically, we want to union all the views together, while aliasing the columns so that the union actually works.

Here is the query I whipped up to join News and Press Release documents.

***Disclaimer: I'm not a DB, I just play one in real life.  I'm not sure of the performance impact of doing these unions is.  Let me know if there is a better way!***

	SELECT ##TOPN## NodeId, NodeGuid, NodeAlias, NodeAliasPath, DocumentId, DocumentName, Type, Date
	FROM
	(SELECT NodeId, NodeGuid, NodeAlias, NodeAliasPath, DocumentId, DocumentName, 'News' AS Type, NewsReleaseDate AS Date
	FROM View_CONTENT_News_Joined
	
	UNION ALL
	
	SELECT NodeId, NodeGuid, NodeAlias, NodeAliasPath, DocumentId, DocumentName, 'Press Release' AS Type, PressReleaseDate AS Date
	FROM View_CONTENT_PressRelease_Joined
	) Results
	WHERE ##WHERE##
	ORDER BY ##ORDERBY##

It looks a little complicated so let's break it down:

1. The 2 inner selects are selecting the rows from the appropriate views for the respective document types.  The views are automatically created and updated by Kentico any time a document type's fields are updated.  The view joins together the CMS_Tree, CMS_Document, and custom document type tables.
2. When selecting from each view, we also alias the columns to match up for the `UNION` between them.
3. The outer select is simply selecting the rows from the result of the `UNION`.
4. The '##' are helper macros for content that gets substituted (These just get removed if they're not used).

Once you've stolen the above code, make sure you test it with your own data, probably in SQL Server Management Studio (just manually replace the macro helpers when testing).  Once everything works for your data, we want to store it in one of your document types.  Go to the `Site Manager > Document Types > News > Queries` and create the query there, setting the name and using the default settings. 

![Creating the custom query in the document type](/assets/images/2013-06-01-joining-multiple-document-types-in-kentico/Creating-the-custom-query-in-the-document-type.png)

Now that Kentico knows about our query, add a Repeater with custom query to the page template in the CMS Desk.

![Adding the Repeater with custom query Web Part](/assets/images/2013-06-01-joining-multiple-document-types-in-kentico/Adding-the-repeater-with-custom-query-web-part.png)

and set the properties like so:

- **Query Name** - CMS.News.latest_updates
- **ORDER BY Expression** - Results.Date DESC
- **SELECT TOP N** - 3
- **Transformation name** - CMS.News.homepage

***Note: Make sure you sub in your own values above, and set the rest of the properties as needed.***

And there you have it!  Don't forget to check with your DBA to see how he feels about that query...

*SQL derived from [Stackoverflow](http://stackoverflow.com/questions/213851/sql-query-using-order-by-in-union "SQL Query - Using Order By in UNION")*
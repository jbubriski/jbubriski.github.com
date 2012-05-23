---
date: '2011-10-13 00:08:33'
layout: page
slug: kentico-tips-and-tricks
status: publish
title: Kentico Tips and Tricks
wordpress_id: '1030'
---

Here is a list of some little tips and tricks and helper helper methods. I figured this was a little easier to read/find/reference than individual posts for this type of data.  I'll try and keep things here as accurate as possible, but they may not be complete.  But feel free to give feedback and let me know if there are some gaping holes or terrible mistakes.


## DataHelper.DataSourceIsEmpty


This Static method is actually a shortcut to **SqlHelperClass.DataSourceIsEmpty** which performs a series of checks on a datasource object to see if it actually has data. It takes an object, but under the hood it handles these data source types:



	
  * DataSet

	
  * DataTable

	
  * DataView

	
  * PagedDataSource

	
  * ArrayList


Usage:

    
    var dataSet = GetData(); // Some DAL method that would return a DataSet
    
    if(DataHelper.DataSourceIsEmpty())
    {
        // DataSet has data, do databinding
    }




## Getting a URL for a File or Image


If you're storing images and files and you need to reference them in transformations or custom code, you can use the **GetFile.aspx** page to reference the actual file.

Usage:

    
    &lt;%# ResolveUrl("~/CMSPages/GetFile.aspx?guid=" + Eval("ProductPhoto").ToString()) %&gt;


Or given a file GUID you can get the URL programmatically:

    
    string fileUrl = ResolveUrl(AttachmentManager.GetAttachmentUrl(attachmentGuid, nodeAlias));




## Documents


Getting Documents from the Kentico API is easy.  You can use the TreeProvider, or you can use the static methods on the TreeHelper:

    
    DataSet ds = TreeHelper.GetDocuments(CMSContext.CurrentSiteName, path, TreeProvider.ALL_CULTURES, false, productTypes, "", "SKUName", TreeProvider.ALL_LEVELS, true, -1);

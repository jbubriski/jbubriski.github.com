---
date: '2013-07-15 8:00:00 -04:00'
layout: post
title: Using Strongly Typed Custom Document Type Classes in Kentico CMS
slug: using-strongly-typed-custom-document-type-classes
description: Create classes that match your custom Document Types and reap the benefits!
categories:
- Programming
tags:
- Kentico CMS
- Kentico API Programming
- Document Types
---

Kentico is a great platform for building web apps, but some times the API code doesn't feel like it's as good as it could be:

	TreeNode document = treeProvider.Select(...);
	
	var integerValue = ValidationHelper.GetInteger(document.GetValue("Age"), 0);

Sure, that works reliably, but using ValidationHelper everywhere along with the string names of the fields isn't conducive to good programming habits.  Why don't we fix that using a strongly typed class for our custom Document Type.  Just grab the boilerplate code from `C:\Program Files (x86)\KenticoCMS\7.0\CodeSamples\App_Code Samples\Samples\Classes`, and create property's for each of the Document Type fields.

Let's say I had a Person Document Type with:

- First Name
- Last Name
- Age
 
The end result of the custom Document Type class looks like this:

	using System;
	using CMS.DocumentEngine;
	
	/// <summary>
	/// Document type registration
	/// </summary>
	[DocumentType(PersonDocument.CLASS_NAME, typeof(PersonDocument))]
	public partial class CMSModuleLoader
	{
	}
	
	
	/// <summary>
	/// Person document type class, deriving from TreeNode
	/// </summary>
	public partial class PersonDocument : TreeNode
	{
	    /// <summary>
	    /// Class name of the item
	    /// </summary>
	    public const string CLASS_NAME = "Custom.Person";
	
	    public string FirstName
	    {
	        get
	        {
	            return GetStringValue("FirstName", "");
	        }
	        set
	        {
	            SetValue("FirstName", value);
	        }
	    }
	
	    public string LastName
	    {
	        get
	        {
	            return GetStringValue("LastName", "");
	        }
	        set
	        {
	            SetValue("LastName", value);
	        }
	    }
	
	    public int Age
	    {
	        get
	        {
	            return GetIntegerValue("Age", 0);
	        }
	        set
	        {
	            SetValue("Age", value);
	        }
	    }
	
	    public PersonDocument()
	        : base(CLASS_NAME)
	    {
	
	    }
	}


And the following is an example of using the Kentico API to retrieve a list of Person documents from the content tree.  We select only "Person" documents, and are able to use our custom class to deal with the data in a strongly-typed fashion:

	var treeProvider = new TreeProvider();
	
	var documents = treeProvider.SelectNodes(CMSContext.CurrentSiteName, "/%", "en-us", false, "custom.Person");
	
	if (!DataHelper.DataSourceIsEmpty(documents))
	{
	    // Loop through all documents
	    foreach (PersonDocument person in documents.Items)
	    {
	        // Alternatively, if you're dealing with a DataSet you can new up a person from the DataRow
	        // var person = TreeNode.New<PersonDocument>(documentRow, "custom.Person", treeProvider);
	
	        Response.Write(string.Format("{0} {1}", person.FirstName, person.LastName));
	    }
	}

The only caveat here is that your custom Document Type needs to match the class you created, otherwise things will break.  But that is definitely a risk that is easily mitigated with permissions and educated developers. And if things do need to change, which inevitably they will, Visual Studio and/or ReSharper will help you refactor things with minimal effort.

## But wait, there's more!

If you didn't get nosy already, check out the other files in the samples folder in Kentico's install directory: `C:\Program Files (x86)\KenticoCMS\7.0\CodeSamples\App_Code Samples\Samples\Classes`.  Notice how they have samples for Custom Table Items and Bizform Items!  They essentially follow the same pattern, but with their respective provider classes.  Strongly typed code for everyone! 
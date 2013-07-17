---
date: '2013-05-09 8:00:00 -04:00'
layout: post
title: Using Custom Classes with Kentico Macros
slug: using-custom-classes-with-kentico-macros
description: 
categories:
- Programming
tags:
- Kentico
- Kentico CMS
- Macros
---

Kentico Macros provide flexibility when it comes to building your site.  Macros work with the current context to provide data from the current site, user, document, querystring, etc.

The problem is when you want to use a custom type.  If you look at the MacroExpression classes code using your favorite decompiler (like [ILSpy](http://ilspy.net/ "ILSpy a .NET Decompiler") you find this method:

(In CMS.GlobalHelper.MacroExpression)

	protected object EvaluateInternal(MacroResolver resolver, MacroEvalParameters evalParams, ref bool match)

calls into:

(In CMS.GlobalHelper.MacroExpression)
	
	public virtual bool GetObjectValue(object obj, string columnName, ref object result)

which attempts to render properties and other data from the following types

- DataRow
- DataRowView
- IHierarchicalObject
- IDataContainer
- ISimpleDataContainer
- INameIndexable

So, unfortunately, that means this code doesn't work out of the box:
    
    {{ site.lmacro }} MyDataObject.DataPoint {{ site.rmacro }}

While it's not the ideal situation, you can inherit from one of those class, or implement one of the interfaces to leverage macros with your custom class.

	public class MyDataClass : ISimpleDataContainer
	{
	    public string DataPoint { get; set; }
	
	    public object GetValue(string columnName)
	    {
	        return DataPoint;
	    }
	
	    public bool SetValue(string columnName, object value)
	    {
	        DataPoint = value.ToString();
	
	        return true;
	    }
	
	    public object this[string columnName]
	    {
	        get { return DataPoint; }
	        set
	        {
	            DataPoint = value.ToString();
	        }
	    }
	}

*(Note that my "implementation" of the interface is very basic.  If we add more properties we want to support, we would have to add conditionals, a switch, or ideally, some reflection based resolving of the property names)*

Now you can use your data class like this:

	var myDataObject = new MyDataClass { DataPoint = "test data" };
	
	var macroResolver = CMSContext.CurrentResolver;
	
	macroResolver.SetNamedSourceData("MyDataObject", myDataObject);
	
	var result = macroResolver.ResolveMacros("This should be the number of units: {{ site.lmacro }} MyDataObject.DataPoint {{ site.rmacro }}");

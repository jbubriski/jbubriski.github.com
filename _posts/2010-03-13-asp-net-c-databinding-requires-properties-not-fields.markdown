---
date: '2010-03-13 08:00:31'
layout: post
slug: asp-net-c-databinding-requires-properties-not-fields
status: publish
title: ASP.NET C# DataBinding requires properties, not fields.
wordpress_id: '255'
categories:
- Programming
tags:
- ASP.NET
- C#
- Data Binding
- Field
- Property
---

As the title of his post states, you can't reference fields when using ASP.NET's data binding syntax.  If you try it, you will get a runtime exception that looks something like this:


> DataBinding: **'MyDataClass**' does not contain a property with the name '**MyProperty**'.
Description: An unhandled exception occurred during the execution of the current web request. Please review the stack trace for more information about the error and where it originated in the code.

Exception Details: System.Web.HttpException: DataBinding: '**MyDataClass**' does not contain a property with the name '**MyProperty**'.


I've seen his before, but I had forgotten about it, and I didn't  realize that the data objects I was working with were using fields  instead of properties.  To be more specific, the data objects were  structs, but I don't think that mattered here.  Well I did a little investigation into this "issue" and it turns out that some people feel this shouldn't throw an exception.  I found [an old post by Nikhil Kothari](http://www.nikhilk.net/DataBindingToPublicFields.aspx) on the subject and it looks like his only issue was that C# didn't support auto properties!  He must be a prophet :)

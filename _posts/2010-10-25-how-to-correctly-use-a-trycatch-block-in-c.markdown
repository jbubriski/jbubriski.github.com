---
date: '2010-10-25 12:00:13'
layout: post
slug: how-to-correctly-use-a-trycatch-block-in-c
status: publish
title: How to correctly use a Try/Catch block in C#
wordpress_id: '708'
categories:
- Programming
tags:
- .NET Framework
- ASP.NET
- C#
- Code
- Elmah
- Exceptions
- Kentico API Programming
- Try/Catch
---

If you ever do something like this...

    try
    {
        // Some potentially dangerous code
    }
    catch (Exception ex)
    {
        // Do nothing and swallow the exception
    }

...DON'T.

There is never a good reason to do this! If you have this code in a Class Library the problem is magnified! Doing this makes it hard to know when an error actually occurs. If you're not going to actually handle the exception, either remove the try/catch block or add a "throw;" statement to the catch block:

    try
    {
        // Some potentially dangerous code
    }
    catch (Exception ex)
    {
        // Re-throw the exception
        // Make sure you don't use "throw ex;", as this will obliterate the stack trace
        throw;
    }

This is pretty much the same as removing the try/catch, but it is an indication that something is potentially dangerous. Later on, you can go back and correctly handle the exception using Elmah with some code like this:

    try
    {
        // Some potentially dangerous code
    }
    catch (Exception ex)
    {
        // If it's not a critical piece of code log to Elmah then let the application/request continue
        ErrorSignal.FromCurrentContext().Raise(ex);
    }

Utilizing Elmah will allow you to be notified of the error (Or have it logged), but still let the application continue. Of course, you could write your own custom logging or notification component, but why reinvent the wheel? If you do need some custom code, you could write an Elmah handler.

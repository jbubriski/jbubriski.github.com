---
date: '2009-05-27 14:21:34'
layout: post
slug: first-code-snippet-how-to-uninstall-and-reinstall-aspnet
status: publish
title: 'First code snippet: How to uninstall and reinstall ASP.NET'
wordpress_id: '15'
categories:
- Programming
tags:
- .NET Framework
- ASP.NET
- IIS
- Windows
---

So I decided to try and use this as a storage mechanism for my snippets of code.  Here is the first one!  How to uninstall and reinstall ASP.NET!  You might need to do this if you start having issues with ASP.NET.

    C:\>cd windows\Microsoft.NET\Framework\v2.0.50727
    
    C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727>aspnet_regiis -u
    Start uninstalling ASP.NET (2.0.50727).
    ..................................
    Finished uninstalling ASP.NET (2.0.50727).
    
    C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727>aspnet_regiis -i
    Start installing ASP.NET (2.0.50727).
    .......
    Finished installing ASP.NET (2.0.50727).
    
    C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727>

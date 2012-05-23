---
date: '2012-02-27 08:00:47'
layout: post
slug: logging-events-with-kentico
status: publish
title: Logging Events with Kentico
wordpress_id: '1080'
categories:
- Kentico
- Programming
tags:
- .NET Framework
- ASP.NET
- C#
- Code
- Kentico API Programming
- Kentico CMS
- Kentico Event Log
- Kentico Module Development
---

Developing a custom web part or module and want to log some events into the Kentico Event Log? Here is some sample code to get you started.

Logging Exceptions:

    
    var eventLogProvider = new EventLogProvider();  
    eventLogProvider.LogEvent("E", eventName, ex);


Logging Custom Events:

    
    var eventLogProvider = new EventLogProvider();
    eventLogProvider.LogEvent("E", DateTime.Now, "source", "code");


FYI, I believe that the `EventLogProvider` has some static methods on it to log events, but I thing they are the more verbose versions of the methods above. Happy logging!

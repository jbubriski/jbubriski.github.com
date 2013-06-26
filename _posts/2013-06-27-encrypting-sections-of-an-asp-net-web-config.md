---
date: '2013-06-26 8:00:00 -04:00'
layout: post
title: Encrypting sections of an ASP.NET web.config
slug: encrypting-sections-of-an-asp-net-web-config
description: How to encrypt sections of your ASP.NET Website's web.config.
categories:
- Hosting
tags:
- IIS
- ASP.NET
- Security
- Encryption
---

This article is mostly for my own purposes, but maybe it will help someone complete the encryption process without getting a headache.  [The original steps are located here on the MSDN](http://msdn.microsoft.com/en-us/library/zhhddkxy.aspx "Walkthrough: Encrypting Configuration Information Using Protected Configuration"), but this is an abbreviated version with an important note.

### Granting Read Access to an RSA Encryption Key

Go to the appropriate framework directory for the ASP.NET files:

    cd C:\Windows\Microsoft.NET\Framework64\v4.0.30319

From here we can grant read access to an RSA encryption key by running this command:

    .\aspnet_regiis.exe -pa "NetFrameworkConfigurationKey" "IIS APPPOOL\MySite"

"IIS APPPOOL\MySite" is the identity that my App Pool runs under.  If you don't know what yours is, create an `.aspx` file in your website with the following content:

    <%@ Page Language="C#" %>
    <%
    Response.Write(System.Security.Principal.WindowsIdentity.GetCurrent().Name);
    %>

### Encrypting Sections of the Web.config File

At this point, we are ready to run the command that will actually encrypt the web.config.  **MAKE SURE THAT YOU HAVE A BACKUP OF ALL THE DATA STORED IN THE SECTION YOU ARE ABOUT THE ENCRYPT**.

    .\aspnet_regiis.exe -pe "connectionStrings" -app "/MySite"

If all went well, you should see

	Microsoft (R) ASP.NET RegIIS version 4.0.30319.17929
	Administration utility to install and uninstall ASP.NET on the local machine.
	Copyright (C) Microsoft Corporation.  All rights reserved.
	Encrypting configuration section...
	Succeeded!

but...

### It Didn't Work!!!

If you setup your system like me, you may have encountered output containing a stupid error message like this one:

    Microsoft (R) ASP.NET RegIIS version 4.0.30319.17929
    Administration utility to install and uninstall ASP.NET on the local machine.
    Copyright (C) Microsoft Corporation.  All rights reserved.
    Encrypting configuration section...
    A configuration file cannot be created for the requested Configuration object.
    Failed!

[b471code3 from the ASP.NET forums](http://forums.asp.net/t/1753876.aspx/1 "encrypting a webconfig file error") hit the nail on the head with the answer:

    "I'm assuming you already checked this out but what I'd pay special attention to is the -site option.  If the app's web.config you are trying to encrypt is not under the DefaultWebSite or you have deleted and recreated the DefaultWebSite, the -site option will need to be specified.

    For example, when IIS is installed, a Web site named "Default Web Site" is created as site 1. In pages served from that site, the INSTANCE_META_PATH server variable returns "/LM/W3SVC/1". If you do not specify a -site option, site 1 is used."

But how do we get the site's `INSTANCE_META_PATH`?  [Scott Forsynth tells you how to get the INSTANCE_META_PATH on his blog](http://weblogs.asp.net/owscott/archive/2010/03/09/viewing-all-server-variables-for-a-site.aspx "Viewing all Server Variables for a Site"). Just make another `.aspx` file in your site with the following content:

    <%@ Page Language="C#" %>
    <%
    foreach (string var in Request.ServerVariables)
    {
      Response.Write(var + " " + Request[var] + "<br>");
    }
    %>

That will dump all the server variables to the page, in which you will find something like this:

    INSTANCE_META_PATH /LM/W3SVC/3

The number on the end is the site ID (It also looks like the `INSTANCE_ID` variable has just the site ID, but I'm not 100% sure if that is reliable).  Take that and incorporate it into the encryption command.  This is what the correct command looks like:

    .\aspnet_regiis.exe -pe "connectionStrings" -app "/" -site "3"

Note that I replace the application name with just a forward slash.  If you do run an application inside your IIS site, you will need to include that.  Personally, I don't normally do that, mainly to avoid issues with [configuration inheritance](http://stackoverflow.com/questions/782252/avoid-web-config-inheritance-in-child-web-application-using-inheritinchildapplic "Avoid web.config inheritance in child web application using inheritInChildApplications").

And then you will have a super secret web.config section!
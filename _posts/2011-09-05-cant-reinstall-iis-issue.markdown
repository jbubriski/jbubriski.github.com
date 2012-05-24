---
date: '2011-09-05 09:00:39'
layout: post
slug: cant-reinstall-iis-issue
status: publish
title: Can't reinstall IIS issue
wordpress_id: '223'
categories: [IT]
tags:
- ASP.NET
- IIS
---

I ran into this fun issue the other day where I I couldn't access one of my sites. I assumed it was a problem with ASP.NET so I uninstalled it. To my dismay, the reinstall failed! That has never happened before!
The problem was actually a simple one. I had moved one of the many websites I had running in IIS, but didn't bother to update the actual IIS website (I wasn't actively working on that site). However, when trying to install ASP.NET again, it was using the IIS metabase to add some files to each site. So when it tried to add files for the site I had moved it couldn't find the directory and the install failed.

    2010-03-02 16:06:59        Success     Creating list of client site scripts dirs
    2010-03-02 16:06:59        Starting    Copy the client side script or web admin files to a list of directories.
    2010-03-02 16:06:59        Success     Copy the client side script or web admin files to a list of directories.
    2010-03-02 16:06:59        Starting    Setting IIS key for script files
    2010-03-02 16:06:59        Success     Setting IIS key for script files
    2010-03-02 16:06:59        Starting    Creating list of client site scripts dirs
    2010-03-02 16:06:59            Starting    Creating directory: C:\Inetpub\wwwroot\Test\aspnet_client
    2010-03-02 16:06:59            Failure     Creating directory: C:\Inetpub\wwwroot\Test\aspnet_client: CreateDirectoryInternal failed with HRESULT 80070003: 'The system cannot find the path specified.  '
    2010-03-02 16:06:59        Failure     Creating list of client site scripts dirs: CreateSiteClientScriptDir failed with HRESULT 80070003: 'The system cannot find the path specified.
    Setup has detected some errors during the operation. For details, please read the setup log file C:\DOCUME~1\ME\LOCALS~1\Temp\ASPNETSetup_00002.log
    
    C:\Documents and Settings\me\Local Settings\Temp

Fixed by calling the registration script with these options:

    aspnet_regiis.exe -iru

from the framework directory:

    C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727\

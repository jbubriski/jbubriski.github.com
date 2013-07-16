---
date: '2013-05-28 8:00:00 -04:00'
layout: post
title: Troubleshooting Common IIS Issues
slug: troubleshooting-common-iis-issues
description: How to fix some common issues with sites in IIS.
categories:
- Hosting
tags:
- IIS
- ASP.NET
- Application Pool
---


**Disclaimer: I am not a Sys Admin.  I have no idea what I'm doing.  Use common sense before executing any of these solutions. If something breaks, don't call me.**

The ones at the beginning of the list should be relatively easy and safe to check.  As you go down the list, the steps may start to affect the availability of the site and/or server.  Side effects are noted for each step.


## Site/Application level

Changes in this section will probably only affect the site you're working with.


### Check that you're looking at the right site

Make sure you're not trying to fix the wrong site.  Check the server IP and the site bindings.  If you're still not sure, drop a temp file into the site root and try and fetch it from your browser.


### Check the path to the website

Self-explanatory.


### Check that the right Application Pool is being used

Self-explanatory.


### Check if a site is nested within another site

If you are nesting sites, the default functionality is that the web.config will be inherited.  A change in the parent site's configuration can affect the child site.  You can disable inheritance per section, but it will might be easier to move the child to it's own site.


### Check the Application Pool framework version

Check to see if it is set to right framework version. Usually you can look at the version numbers in the web.config to see what framework version it should be using.  Note that .NET framework versions 2.0, 3.0, and 3.5 are all covered under the 2.0 version (3.0 and 3.5 are like add-ons).

*Note: Changing the app pool framework version will restart your site.*

*Caveat: App pools can be used by many sites.  Check before you change something that could break other sites.*


### Check the Application Pool 32-bit mode support flag

If you get a YSOD (Yellow Screen of Death) about a DLL not loading, or being in the incorrect format, you may need to flip this flag.  If set to false, the site will run in 64-bit mode.  If set to true, the site will run in 32-bit mode.  **Note that "enabling 32-bit mode" will force the site to run in 32-bit mode and it will no longer load 64-bit DLL's.**  So if you're trying to add libraries to a website, you may need to go and download another version.

*Commonly seen when using MySQL or SQLite.*

*Note: Changing the app pool mode will restart your site.*

*Caveat: App pools can be used by many sites.  Check before you change something that could break other sites.*


### Check the web.config for IIS Modules

If you are just loading up a site from another server or source control, you could be missing some IIS Modules required to run the site.

For example, we commonly use the [IIS URL Rewrite Module](http://www.iis.net/downloads/microsoft/url-rewrite "IIS URL Rewrite 2.0") for IIS 7+.  It provides an easy way to handle rewriting and redirecting.  However, if it isn't installed on the server trying to run the site, you get some generic web.config error.  

Another issue we encountered was that the IIS URL Rewrite Module was installed, but we were missing one of the extensibility modules.  I think the error message was more clear because it complained that the provider or assembly was missing.

*I highly recommend the IIS URL Rewrite Module and you can install it directly from the [Web Platform Installer](http://go.microsoft.com/?linkid=9722531zsadasdas "Install the IIS URL Rewrite Module from WebPI").  Extensibility samples are available for [download](http://code.msdn.microsoft.com/Project/Download/FileDownload.aspx?ProjectName=rewriteextensibility&DownloadId=9257 "Download the IIS URL Rewrite Module extensibility samples") too.*

*A coworker, Mirek, just ran into this issue and reminded me of it today.*


### Recycle the Application Pool

Sometimes an application can just get into a bad state.  Recycling it *basically* restarts the site.

*Caveat: CMS/Application users may end up getting logged out and may lose work.*

*Caveat: App pools can be used by many sites.  Check before you change something that could break other sites.*


### Stop and start Application Pool

Recycling the app pool may work, but stopping it and starting it actually does a little bit more.

***Caveat: When stopping the application pool, the site will go completely offline.  Starting it again can take up to a few minutes, depending on the size of the site and what state it was in.**  If you try and start it right away IIS will popup some random error.  Just keep trying until it works.*

*Caveat: App pools can be used by many sites.  Check before you change something that could break other sites.*


## IIS level

Changes in this section will affect all sites running under IIS.


### Restart IIS

Try to avoid this at all costs. Consult with other devs/IT before resorting to this.


### Re-register ASP.NET with IIS

Sometimes a framework version install can get messed up.  You can run the install script from the framework version folder. The scripts can be found in `C:\Windows\Microsoft.NET\{mode}\{version}`.

*Caveat: Make sure you run the command against the right Framework mode and version.*

*Caveat: Make sure you run the command with the right command line options to ensure that you don't modify the framework versions on all the sites on the server.*


## Server level

Changes in this section will affect all services running on the server.


### Restart the server

Rarely, IIS may get into a bad state that can only be solved with a reboot.  I've only ever seen this once.  Typically this wont happen if you're running IIS with a standard configuration / network configuration.

***Note: Try to avoid this at all costs. Consult with other devs/IT before resorting to this.  There may be other important services running on the machine.***

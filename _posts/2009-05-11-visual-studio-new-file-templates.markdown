---
date: '2009-05-11 09:41:28'
layout: post
slug: visual-studio-new-file-templates
status: publish
title: Visual Studio New File Templates
wordpress_id: '6'
categories:
- Programming
tags:
- C#
- Time Saver
- Visual Studio
---

Per [jberkhei's reply on this forum post](http://forums.asp.net/p/1247808/2358210.aspx#2358210), here are the locations of the Visual Studio new file templates:


Visual Studio 9

	C:\Program Files\Microsoft Visual Studio 9.0\Common7\IDE\ItemTemplatesCache\CSharp\Web\1033

Visual Studio 8

	C:\Program Files\Microsoft Visual Studio 8\Common7\IDE\ItemTemplatesCache\Web\CSharp\1033

Editing these can easily allow you to setup little things that will save you time.

1. Always change autoeventwireup to false? (FYI, you can also change this in the machine.config, or the web.config)
2. Always remove the default method, and replace it with an overload of the OnLoad?
3. Always need to add using directives for certain namespaces?

Then change the template!

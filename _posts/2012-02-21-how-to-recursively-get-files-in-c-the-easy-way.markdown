---
date: '2012-02-21 08:00:37'
layout: post
slug: how-to-recursively-get-files-in-c-the-easy-way
status: publish
title: How to Recursively Get Files in C# the Easy Way
wordpress_id: '1075'
categories:
- Programming
tags:
- .NET Framework
- C#
- Code
- Files and I/O
---

Need to get all the files contained in a directory, recursively searching through sub directories? No problem!

Here is how to do it without writing your own recursive function:

    
    var fileNames = Directory.GetFiles(directoryName, "*.*", SearchOption.AllDirectories);


That's it! No explicit recusrion required!

If you want to do searching where you can stop when a given file is found, then you would need to implement the recursion yourself. This article shows you how to do that if needed:

[How to recursively search directories by using Visual C#](http://support.microsoft.com/kb/303974)

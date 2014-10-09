---
date: '2014-10-09 9:00:00 -04:00'
layout: post
title: .NET Is Not a Black Box, Open It Up
slug: dot-net-is-not-a-black-box-open-it-up
description: Having a problem with a .NET assembly? Crack it open, figure it out, and fix it!
categories:
- Programming
tags:
- .NET
- ILSpy
- JustDecompile
- Reflexil
---

Recently I've been working with a site that has had a ton of problems.  The latest issue was that we needed to configure the Active Directory integration which involved setting up an .exe that handled importing users.  Unfortunately, with the cloud hosting of the CMS, the .exe didn't work.


## Complain

I contacted support and they basically said I was shit outta luck!  They basically told me I needed to upgrade to the latest version in order to use that feature with their cloud hosting.


## Now What?

Better give up and tell the customer... right?

Nope.  Screw them, let's fix it ourselves.

So what does the AD import utility actually do?

1. Take SQL Server Credentials
2. Take AD Credentials
3. Map fields
4. Import the data from AD into SQL Server

Sounds simple enough, now what's the problem?  Here is a screenshot of the actual error:

![Save the patched assembly](/assets/images/2014-10-09-dot-net-is-not-a-black-box-open-it-up/kentico-ad-import-utility-error.png)

After speaking with support and googling around I figured out that `sp_databases` is a system stored procedure in SQL Server that lists out the databases on the server.  Since the CMS is using a certain type of cloud hosting, we don't have access to that stored procedure.  But that shouldn't really matter.  We already have all the connection information handy.  I'm guessing that the utility is doing an extra call to `sp_databases`.


## Identify The Issue

Now that we've formed a hypothesis about why the error is occurring, how do we actually fix it?

Luckily for us, .NET and things created with .NET are not black boxes.   Let's crack open the .exe and try and find the specific problem with the code.

For examining the assembly (.dll or .exe) we have a myriad of options:

- [ILSpy](http://ilspy.net/) - My goto favorite since it's open source.
- [Telerik JustDecompile](http://www.telerik.com/products/decompiler.aspx) - A good free option.
- [Red Gate .NET Reflector](http://www.red-gate.com/products/dotnet-development/reflector/) - Paid product, but supposedly the best.
 
I think I originally started with ILSpy to identify the issue.  However, identifying the issue is only so valuable.  Now I needed to fix it.


## Fix The Issue

ILSpy will allow you to save the decompiled C# code to disk, but then we would have to manually recompile it.  Another option would be to use the [IL Dissembler](http://msdn.microsoft.com/en-us/library/f7dy01k1(v=vs.110).aspx) (Ildasm.exe) to decompile the assembly into it's IL, but that would require a little bit of work too.  It's 2014, let's take the easy way out.

With a bit more googling I found [Reflexil](http://reflexil.net/), "The .NET Assembly Editor".  From the homepage:

> Reflexil is an assembly editor and runs as a plug-in for Red Gate's Reflector and Telerik's JustDecompile. Reflexil is using Mono.Cecil, written by Jb Evain and is able to manipulate IL code and save the modified assemblies to disk. Reflexil also supports C#/VB.NET code injection.

PERFECT.

So I grabbed [JustDecompile](http://www.telerik.com/products/decompiler.aspx), opened up the plugin manager, and installed the Reflexil plugin which is labeled as "Assembly Editor" in the plugin list.

![The plugin manager in Telerik JustDecompile](/assets/images/2014-10-09-dot-net-is-not-a-black-box-open-it-up/telerik-justdecompile-plugins-manager.png)

Armed with the Reflexil plugin let's take a look at what I found:

![We found the code](/assets/images/2014-10-09-dot-net-is-not-a-black-box-open-it-up/found-the-code.png)

![We found the IL](/assets/images/2014-10-09-dot-net-is-not-a-black-box-open-it-up/found-the-il.png)

![Save the patched assembly](/assets/images/2014-10-09-dot-net-is-not-a-black-box-open-it-up/save-assembly-as.png)

OK that's a lot of information, let's dissect the steps needed to follow along:

1. Open the Reflexil plugin from the plugin menu.
2. Like in any other IL explorer/decompiler, find the code in question.
3. Click the method name which causes Reflexil to load the IL just for that method.
4. Look for identifiers in the code.  In this case we can see that there is the string `"Step2_ErrorConnectingDB"` in the code, which will appear directly in the IL.
5. After finding the rough spot in the code, find the actual code in question.  In this case, we can see that we're setting the `connectionResult` to `false`.  We can see that the variable is being worked with on instruction 081.
6. Analyze the details. IL does one thing at a time.  Instruction 081 is setting up the variable to be worked with.  Instruction 082 is setting it to false (0) with [`ldarg.0`](http://en.wikipedia.org/wiki/List_of_CIL_instructions).
7. Make the change (shown in the second image).  Right-click on the instruction and select "Edit...".  Change it to [`ldarg.1`](http://en.wikipedia.org/wiki/List_of_CIL_instructions) (true, or the value 1).
8. Save out the updated assembly.  In the tree view, right-click on the .exe and select "Save as..." and save the patched assembly.
9. Take the rest of the day off.

And there you have it!  I prevented having to tell the customer that they would need to upgrade their CMS, all in about 2 hours.

While this sort of thing is usually a last resort, it is definitely something you can do, even without deep knowledge of IL and how .NET works.  I know next to nothing about actual IL code, I just googled the instructions to find out what they did. 

So the next time you encounter a .NET .exe or DLL you don't have the source for, don't be afraid to take a peak inside and maybe even change something! 

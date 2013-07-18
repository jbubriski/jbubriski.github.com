---
date: '2013-07-19 8:00:00 -04:00'
layout: post
title: Fixing Assembly Binding Redirect Issues
slug: fixing-assembly-binding-redirect-errors
description: Common solutions to assembly binding redirect errors.
categories:
- Programming
tags:
- .NET
- ASP.NET
- Kentico
- Kentico CMS
---

This post is really a compilation of things I've found online, mostly from [Stack Overflow](http://stackoverflow.com).

## What does a healthy assembly binding redirect look like?

First, let's take a look at a good configuration, with the complete web.config structure (omitting other sections):

	<?xml version="1.0"?>
	<configuration>
		<runtime>
	        <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
	            <dependentAssembly>
	                <assemblyIdentity name="CMS.ExtendedControls" publicKeyToken="834b12a258f213f9" culture="neutral" />
	                <bindingRedirect oldVersion="0.0.0.0-7.0.4940.41825" newVersion="7.0.4940.41825" />
	            </dependentAssembly>
			</assemblyBinding>
		</runtime>
	</configuration>

Notice that I am specifying the assembly name, publicKeyToken, and culture.  Also, the oldVersion attribute on the redirect itself covers ALL versions, ***including the one we're redirecting to***.  I don't know if that is a requirement, but it certainly works.

## Do a sanity check

Grab a coworker and make sure that everything is correct.  Check the assembly name, the public key token, the version numbers, hell, check that you're running the right project!  TRIPLE CHECK EVERYTHING.  Think back... how many times have you had issues where the cause was a 1 character mistake?  It never hurts to check again.

## Check the SpecificVersion property on your references

I'm not 100% on this one, but I think I remember seeing somewhere that you need to set your references to NOT require a specific version.

![Setting the specific version property to false](\assets\images\2013-07-19-fixing-assembly-binding-redirect-errors\setting-specific-version-property-to-false.png)

## Check the Namespace on the assemblyBinding element

As mentioned in [this question](http://stackoverflow.com/questions/3490327/assembly-binding-redirect-does-not-work "Assembly binding redirect does not work"), it sounds like people have manually typed in the namespace on the `assemblyBinding` element and have incorrectly used an `=` instead of a `-`.

Incorrect: 

	<runtime>
	    <assemblyBinding xmlns="urn:schemas=microsoft-com:asm.v1">
			...

Correct (dash, not equals):

	<runtime>
	    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
			...

## Check the Namespace on the configuration Element

In one case, none of the above methods worked for me.  Apparently, the namespace on the configuration element can affect how the redirects work.  The asker in [this question](http://stackoverflow.com/questions/1543132/why-is-assembly-binding-redirect-not-working-in-my-web-site "Why is assembly binding redirect not working in my web site?") mentioned removing the namspace attribute (although it didn't fix his situation).  This is what the first 3 lines of my web.config looked:

	<?xml version="1.0"?>
	<configuration xmlns="http://schemas.microsoft.com/.NetConfiguration/v2.0">
	    <configSections>

After removing the namespace from the configuration element, all was well:

	<?xml version="1.0"?>
	<configuration>
	    <configSections>


## If all else fails

It looks like there is a [utility to help debug assembly binding redirects](http://blogs.msdn.com/b/ianhu/archive/2006/07/12/663834.aspx "Fuslogvw.exe and diagnosing .NET assembly binding issues").  I have never had to resort to this, so I can't say how well it works.  Here's hoping you don't have to use it either.
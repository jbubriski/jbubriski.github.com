---
date: '2013-07-18 8:00:00 -04:00'
layout: post
title: Using the Kentico API to generate a code name for your object
slug: using-the-kentico-api-to-generate-code-names
description: Use the Kentico API to generate a code name for your object.
categories:
- Programming
tags:
- Kentico
- Kentico CMS
- Kentico API Programming
---

There may come a time when you find yourself creating new object in Kentico via the API.  You may need to generate a code name.  I've dug through some of the internal processes and assemblies and found the following methods:

	CMS.GlobalHelper.ValidationHelper.GetIdentifier(object name)
	CMS.GlobalHelper.ValidationHelper.GetCodeName(object name)

Let's talk briefly about these.

## GetIdentifier

This one is pretty straightforward if you use a reflection tool to examine the assembly and view the code.  The first overload of the method actually calls into the second overload, which does a simple Regex removal of all non-alphanumeric characters, along with underscores.  The 2nd overload allows you to specify the character used to replace offending characters with.  It has the following signature:

	public static string GetLanguage(object lang, string replacement)

## GetCodeName

This method is significantly more complicated than the last.  It features 8 overloads that each feature fewer default values and more parameters than the last.  The most complicated overload has the following signature:

	public static string GetCodeName(object name, string replacement, int maxLength, bool useUnicode, bool removeDiacritics, string allowedCharacters, bool useCamelCase)

## Conclusion

Just remember that these methods do not prevent code name collisions from happening.  If you're worried about that, I think there is a `EnsureUniqueCodeName()` method on the `BaseInfo` abstract class that I *think* will take care of that.

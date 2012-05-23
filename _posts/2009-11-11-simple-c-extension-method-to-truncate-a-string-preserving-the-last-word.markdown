---
date: '2009-11-11 16:21:48'
layout: post
slug: simple-c-extension-method-to-truncate-a-string-preserving-the-last-word
status: publish
title: Simple C# Extension Method to truncate a string, preserving the last word.
wordpress_id: '116'
categories:
- Programming
tags:
- C#
- Code
- Extension Method
- Strings
- Syntax Highlighting
- wordpress
---

We needed to truncate a summary down to n number of characters to provide a uniform look and feel.  So I whipped up this extension method to take the current string and truncate to n characters, attach an ellipsis to the end, and optionally keep the last word of the string preserved.  In other words, don't chop the last word in half.

However, this is a **very** simple implementation.  There are a lot of things that we don't consider here.  For example, we don't consider the type of text.  If the text is HTML, we may leave it in a non-compliant state.  Or, if the initial truncated text ends in a period, we don't leave it as is.  So there is a lot of room for improvement here.

Lastly, one thing **I'm** not doing is highlighting my code... the below sample code probably looks like crap inside this page.  I do have a syntax highlighter installed, but I don't remember how to use it right now.  So I'll fix that later if I remember.

Here is the code:

    
    
    public static string Truncate(this string text, int length, string ellipsis, bool keepFullWordAtEnd)
    {
        if (text.IsNullOrEmpty()) return string.Empty;
        
        if (text.Length < length) return text;
        
        text = text.Substring(0, length);
        
        if (keepFullWordAtEnd)
        {
            text = text.Substring(0, text.LastIndexOf(' '));
        }
        
        return text + ellipsis;
    }
    

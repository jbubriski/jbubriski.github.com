---
date: '2010-06-03 12:30:27'
layout: post
slug: firefox-3-6-3-strictly-renders-closing-comment-tags
status: publish
title: Firefox (3.6.3) Strictly Renders Closing Comment Tags
wordpress_id: '399'
categories:
- Programming
tags:
- FireFox
- HTML
---

So a coworker of mine had an interesting problem where a content area was disappearing from a CMS we use.  The issue happened in Firefox while Internet Explorer and Chrome were fine!  How rare is that!  It turns out that the issue was relating to a mistyped closing comment tag.

Apparently Firefox correctly renders the code, and doesn't actually close the comment if one of the hyphens is missing. Instead, the rendering continues to hide the content until _another_ (correct) closing comment tag is found!

Here is example. Below are 4 content tags, with separate comment tags in between them. If you're viewing this page in Firefox, then you should see that 2nd comment tag actually visible on the page. If you're in Internet Explorer or Chrome, you wont see anything weird:

<p>Content 1</p>

<!-- Comment 1 -->

<p>Content 2</p>

<!-- Comment 2 -->

<p>Content 3</p>

<!-- Comment 3 -->

<p>Content 4</p>

And here is a complete example HTML page:

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
    
        <title>FireFox Comment Test</title>
    
    </head>
    
    <body>
    
        <p>Content 1</p>
    
        <!-- Comment 1 -->
    
        <p>Content 2</p>
    
        <!-- Comment 2 ->
    
        <p>Content 3</p>
    
        <!-- Comment 3 -->
    
        <p>Content 4</p>
    
    </body>
    
    </html>

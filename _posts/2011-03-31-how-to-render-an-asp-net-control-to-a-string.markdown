---
date: '2011-03-31 13:00:07'
layout: post
slug: how-to-render-an-asp-net-control-to-a-string
status: publish
title: How To Render An ASP.NET Control To A String
wordpress_id: '795'
categories:
- Programming
tags:
- ASP.NET
- HtmlTextWriter
- RenderControl
- StringWriter
- Web Control
---

A simple code snippet.  I like to use "using" statements to make sure the various resources get cleaned up in a timely fashion.

Here it is:

    var newContent = string.Empty;
    
    using (var stringWriter = new StringWriter())
    using (var htmlWriter = new HtmlTextWriter(stringWriter))
    {
        foreach (var control in controls)
        {
            control.RenderControl(htmlWriter);
        }
    
        newContent = stringWriter.ToString();
    }
    
    return newContent;

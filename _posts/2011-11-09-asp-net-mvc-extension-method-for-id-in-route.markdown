---
date: '2011-11-09 09:00:38'
layout: post
slug: asp-net-mvc-extension-method-for-id-in-route
status: publish
title: ASP.NET MVC Extension Method for the ID in the Route
wordpress_id: '1086'
categories:
- Programming
tags:
- .NET Framework
- ASP.NET
- ASP.NET MVC
- C#
- Code
- Extension Method
---

If you've worked on an ASP.NET MVC site, you may have had to reference the ID in the current route.  In a Razor view you can reference it via the following variable:

    @Url.ViewContext.RouteData.Values["id"]

You may use this a lot if you have a lot of inter-action navigation. Why not throw it into an extension method!?

This makes the assumption that you're using the default route, or a similar one with an "id" parameter:

    namespace System.Web.Mvc
    {
        public static class ContextExtensions
        {
            public static string Id(this HtmlHelper helper)
            {
                return helper.ViewContext.RouteData.Values["id"].ToString();
            }
        }
    }

Now you can reference the id much easier like this:

    @Html.Id()

And if you ever need to change it, you can update it in one place!

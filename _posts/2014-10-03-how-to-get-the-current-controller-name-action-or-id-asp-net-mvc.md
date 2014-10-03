---
date: '2014-10-03 9:00:00 -04:00'
layout: post
title: How to get the Current Controller Name, Action, or ID in ASP.NET MVC
slug: how-to-get-the-current-controller-name-action-or-id-asp-net-mvc
description: In ASP.NET MVC, you often need to get the controller name, action name, or ID from the view or other places.  Here is how.
categories:
- Programming
tags:
- ASP.NET MVC
- Extension Methods
---

Luckily I've been back in ASP.NET MVC lately!  On a new project I needed to check the current controller and actions for highlighting the current item in the menu. SO I dug up some of my custom code that seems to still apply to the latest ASP.NET MVC.

## Usage

From your view you can simply use the extension methods off the `Html` object:

    @Html.Controller();
    @Html.Action();
    @Html.Id();

## Show me the Code!

Here it is:

    public static class HtmlRequestHelper
    {
        public static string Id(this HtmlHelper htmlHelper)
        {
            var routeValues = HttpContext.Current.Request.RequestContext.RouteData.Values;
    
            if (routeValues.ContainsKey("id"))
                return (string)routeValues["id"];
            else if (HttpContext.Current.Request.QueryString.AllKeys.Contains("id"))
                return HttpContext.Current.Request.QueryString["id"];
    
            return string.Empty;
        }
    
        public static string Controller(this HtmlHelper htmlHelper)
        {
            var routeValues = HttpContext.Current.Request.RequestContext.RouteData.Values;
    
            if (routeValues.ContainsKey("controller"))
                return (string)routeValues["controller"];
    
            return string.Empty;
        }
    
        public static string Action(this HtmlHelper htmlHelper)
        {
            var routeValues = HttpContext.Current.Request.RequestContext.RouteData.Values;
    
            if (routeValues.ContainsKey("action"))
                return (string)routeValues["action"];
    
            return string.Empty;
        }
    }

Just add this class into your project.  You may need to reference the namespace in the view folder web.config.  Let me know if I need to add that part in.

Thanks!
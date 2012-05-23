---
date: '2012-02-13 08:00:53'
layout: post
slug: ignoring-elmah-exception-spam
status: publish
title: Ignoring Elmah Exception Spam
wordpress_id: '1177'
categories:
- Programming
tags:
- 403 Forbidden
- Elmah
- IIS
- IIS6
- IIS7
- Request Filtering
- URL Rewriting
---

Did you setup Elmah on your website or web application? Yes? Great.

Are you getting 100's or 1000's of exception emails every day for bots probing your site for various applications and application frameworks? Yes? Not great.

Did you filter all those emails into a folder in your inbox? Yes? Then you're doing it wrong.


## I'm on IIS 7


Nip it in the bud and implement some filtering to kill those requests so that you never even see them! [This question on StackOverflow](http://stackoverflow.com/questions/8118703/asp-net-mvc3-what-do-you-do-with-probing-requests) has a great way of using the [Request Filtering Module](http://learn.iis.net/page.aspx/143/use-request-filtering/) to accomplish just that in IIS 7.


## But what about IIS 6?


We can't all be on the latest and greatest.  As far as I know, we don't have Request Filtering in IIS 6, nor can we use the official [IIS URL Rewrite Module](http://www.iis.net/download/urlrewrite) (Available for free via the [Web Platform Installer](http://www.microsoft.com/web/downloads/platform.aspx) if you are running IIS 7).

While this is less than ideal, it's not hard to take those problematic requests and ignore them through and [Elmah Error Filter](http://code.google.com/p/elmah/wiki/ErrorFilterExamples).

First we need to use the [Open Source URL Rewriter for .NET](http://urlrewriter.net/) to return a [403 Forbidden](http://en.wikipedia.org/wiki/HTTP_403) result for those requests.  In my case, 99% of those requests are looking for various PHP applications that probably have vulnerabilities in older versions.  So I'm going to forbid any PHP files right off the bat by adding this to my Web.Config:

    
    
    <rewriter>
      <if url="^(.+)\.php$">
        <forbidden></forbidden>
      </if>
    </rewriter>


Now that you have the PHP requests returning a 403 Forbidden status code we can ignore them with an Elmah Error Filter block in the Web.Config.

    
    <elmah>
      <errorfilter>
        <test>
          <equal type="Int32" binding="HttpStatusCode" value="403"></equal>
        </test>
      </errorfilter>
    </elmah>


In my case, I'm dealing with a simple public website that doesn't incorporate any authentication or authorization, so I never actually use 403 Forbidden status code.  There may be a more elegant way to do this.  But this works.

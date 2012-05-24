---
date: '2012-01-04 09:00:59'
layout: post
slug: in-iis6-http-301-redirect-from-non-www-to-www
status: publish
title: In IIS6 HTTP 301 Redirect from non-www to www
wordpress_id: '1152'
categories:
- Programming
tags:
- HTTP 301 Redirect
- IIS
- IIS6
---

This article applies to IIS6, but the concept applies to almost any public website.  **You should probably setup a 301 redirect from http://example.com to http://www.example.com** (or the other way around). If you don't, [bad things can happen](http://webmasters.stackexchange.com/q/23649/10793).  Anyway, here is how you can do it in IIS6:

## Instructions

Create a new website with the same IP and host name as your main website, **but do not include the www**. FYI, I think that IIS will yell at you if you try and create 2 websites with the same IP and host name. I add "redirect" to the end of mine so that I know it's the redirect website.

![](/assets/images/2012-01-04-in-iis6-http-301-redirect-from-non-www-to-www/IIS6-Redirect-website-setup.png "IIS6 Redirect Website Setup")

Then, in the "Home Directory" tab of the redirect website:

  1. Check the radio button that says "A redirection to a URL".
  2. Enter in your domain like this, without the double quotes: "http://www.example.com$S$Q"
  3. Check the box that says "The exact URL entered above".
  4. Check the box that says "A permanent redirection for this resource".

![](/assets/images/2012-01-04-in-iis6-http-301-redirect-from-non-www-to-www/IIS6-Website-Settings.png "IIS6 Website Settings")

Now I would test that the non-www version of your website redirects to the www version.  If you want to be 100% sure what is happening, look at the [Net tab in Firebug](http://getfirebug.com/wiki/index.php/Net_Panel) or the [Network tab in the Google Chrome Web Inspector](http://code.google.com/chrome/devtools/docs/network.html).

## Caveats/Debugging

If your company manages your internal DNS, you might encounter an issue resolving some of the hostnames internally.  For example, at the time of writing, "http://example.com" doesn't work from inside our corporate network!  It's not a big deal, but in our case it times out so it might give the illusion that the website is down.

I'm pretty sure this wont handle the HTTPS version of your site.  You would need to add another redirect website for that.   **However**, I don't think that will work correctly because modern browsers will realize that there is no cert for the non-www, and never even load the content from the site.  You would probably get some big warning instead.  So just make sure that you don't link the https://example.com anywhere.

## Credit

I actually found this solution inside [a question on Stackoverflow about a problem with setting up 301 redirects in IIS 6](http://stackoverflow.com/q/643382/57698).  There is also a link in the first paragraph of this post about reasons you should do this.

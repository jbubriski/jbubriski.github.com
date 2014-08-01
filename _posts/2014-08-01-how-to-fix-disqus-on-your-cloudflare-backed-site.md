---
date: '2014-08-01 9:00:00 -04:00'
layout: post
title: How to fix Disqus on your CloudFlare Backed Site
slug: how-to-fix-disqus-on-your-cloudflare-backed-site
description: How to fix Disqus loading issues when using CloudFlare on your site.
categories:
- hosting
tags:
- Performance
- Disqus
- CloudFlare
---

I use CloudFlare on JohnnyCode.com (You're on it right now!).  It provides some really [cool features related to performance and security](https://www.cloudflare.com/overview "An Overview of CloudFlare") that I wont get into right now.  What I will mention is that CloudFlare's features are very "tweakable", letting you only use what you want.


## Ad Blockers

First, disable any ad blockers you might have, just to make sure they're not interfering with things.I use Adblock Plus and this was definitely blocking certain requests.  In Chrome, the extension is in the top-right corener of the browser.  Click it, and choose to enable ads for your domain.


## Tweak CloudFlare's Settings

Something about CloudFlare's optimizations seemed to be interfering with the [Disqus](https://disqus.com/) comment engine that I use on my site.  I ignored it for a while but I finally got around to investigating it, and here is how I fixed it.

- Go to CloudFlare and login (duh).
- Go to Settings > Performance settings for the domain in question.
- Disable the Rocket Loader™ (Web optimization)/ BETA

Image:

![CloudFlare Performance Settings Page](/assets/images/2014-08-01-how-to-fix-disqus-on-your-cloudflare-backed-site/cloudflare-performance-settings.png)

That's it.

Something with their Rocket Loader JS optimizations kills Disqus.  FYI, I did try adding cloudflare.com and ajax.cloudflare.com as trusted domains in Disqus prior to this, but it didn't seem to fully fix the problem (You may want to do that anyway, thinking toward the future).

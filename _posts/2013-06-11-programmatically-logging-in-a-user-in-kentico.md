---
date: '2013-06-11 8:00:00 -04:00'
layout: post
title: Programmatically Logging In a User in Kentico
slug: programmatically-logging-in-a-user-in-kentico
description: How to programmatically log in a user in Kentico CMS.
categories:
- Programming
tags:
- Kentico
- Kentico CMS
- Security
---

You're using [Kentico CMS](http://www.kentico.com "Kentico CMS") and you need to log someone in.  Maybe you're doing a custom registration form, or an OAuth integration.  Whatever the case, it's super easy.  You simply call the `AuthenticateUser` static method on the `CMSContext` class.  Here is the method signature:

    public static void AuthenticateUser(string userName, bool createPresistentCookie);

And this is how you would call it:

    CMSContext.AuthenticateUser("my username", true);

Piece of cake!
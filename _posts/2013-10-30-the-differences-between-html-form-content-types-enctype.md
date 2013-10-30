---
date: '2013-10-30 8:00:00 -04:00'
layout: post
title: The Differences Between HTML Form Content Types (enctype)
slug: the-differences-between-html-form-content-types-enctype
description: I demonstrate the differences between the 3 different HTML Form Content Types and explain how it may affect you.
categories:
- Programming
tags:
- HTML Forms
- Content Types
- Encoding
- PayPal
---

You've probably seen it before.  The `enctype` attribute of an HTML Form element.  But what does it mean?

	<form method="post" enctype="application/x-www-form-urlencoded">
	...
	</form>

At least form me, I almost never need to worry about what the content type is for a form.  I use ASP.NET most of the time so this is automatically handled for me.  But what if you're not using a framework that handles this for you, or you're rolling your own, or you need to post data to another system?  Let's see how changing the content type affects the POST.

You can change the content type to one of the following, per the [W3C HTML5 Form spec](http://www.w3.org/TR/html5/forms.html#attr-fs-enctype "Forms in HTML5 Documents"):

- application/x-www-form-urlencoded  
- multipart/form-data
- text/plain  

## How do we test?

### Browser Dev Tools

First off, how do we see the differences?  You can use the [Chrome DevTools](https://developers.google.com/chrome-developer-tools/ "Chrome DevTools"), or [Firebug](https://getfirebug.com/ "Firebug. Web Development Evolved.") in Firefox, or probably the IE dev tools.  WIth those tools there should be a way to view the requests that your browser makes.  Here is an example of the "Net" tab in Firefox:

![A screenshot of the Firebug Net Tab.](/assets/posts/2013-10-30-form-content-type-differences-enctype/firebug-net-tab.png)

With the net tab open, you can click on any request and view the details about the request.  You can see things like the Headers that were sent, the response, cookies that we passed, etc.  Now that we know where to look, we can see what the differences are in the form content types.

*Pro tip: Enable the persist button to track requests across multiple page loads.  The list will get really long, but it will allow you to more easily compare multiple requests.*

*Pro Pro tip: I've never done this, but I believe that some of the dev tools will export the data listed in the Net tabs to a generic format.  That data can be reloaded at a later time, or maybe used in some other way (diff tool?).  Again, I've never used it but it may be helpful for extreme cases.*

### Proxies

While I didn't really use them in creating this post, there are 2 powerful debugging proxies: 

- [Fiddler](http://fiddler2.com/ "The free web debugging proxy for any browser, system or platform")
- [Charles](http://www.charlesproxy.com/ "Charles is an HTTP proxy / HTTP monitor / Reverse Proxy that enables a developer to view all of the HTTP and SSL / HTTPS traffic between their machine and the Internet.")

Proxies hook into your system at a lower level to potentially capture *any* HTTP traffic on your system.  This can be really helpful in seeing requests across multiple browsers and other apps all in one place.

### Test Form

Here is a little [HTML form content type test page](/assets/posts/2013-10-30-form-content-type-differences-enctype/form-content-type-tester.html "HTML Form Content Type Tester (enctype)") I've created that is setup with the different content types.  It should be pretty self explanatory.

## Test Results

Universally, when the content type is set for a form, that content type is passed as a header in the request:

![A request's details showing the content type](/assets/posts/2013-10-30-form-content-type-differences-enctype/firebug-request-details-content-type.png)

Also, if you look at the Post Tab you will see how the data is encoded for the request:

![A request's details showing the post data](/assets/posts/2013-10-30-form-content-type-differences-enctype/firebug-net-tab-post-data.png)

Here is the full post data for each content type: 

**application/x-www-form-urlencoded (default):**

	test_field_1=Test&amp;test_field_2=%21%40%23%24%25%5E%26*%28%29_%2B-%3D

**text/plain:**

	test_field_1=Test
	test_field_2=!@#$%^&*()_+-=

**multipart/form-data:**

	test_field_1=Test&amp;test_field_2=%21%40%23%24%25%5E%26*%28%29_%2B-%3D

	-----------------------------21204402826745
	Content-Disposition: form-data; name=&quot;test_field_1&quot;
	
	
	Test
	-----------------------------21204402826745
	Content-Disposition: form-data; name=&quot;test_field_2&quot;
	
	!@#$%^&amp;*()_+-=
	-----------------------------21204402826745--

As you can see above, the content type setting can have a drastic difference in how the data is contained in the request, and subsequently, how the server/framework/app on the other end needs to interpret it.

## So when is this actually important?

**TL;DR: PayPal and possibly other 3rd party services may expect a specific content type of an HTML Form POST.**

As I mentioned earlier, this rarely comes up for me.  However, this week I'm working on a PayPal integration and this was *very* important.  In fact, if the content type was wrong on the form that posted payment information to PayPal a generic error would be thrown.  This took me a while to track down since a regular HTML form worked fine, but when an ASP.NET form was pointed at the PayPal endpoint it break.  This led to a **lot** of double-checking of code and values and testing with different parameters.

Eventually it came down to the fact that the form data was identical, but the posts were still giving different results.  That's when I remembered that ASP.NET typically works by having "one form to rule them all" on the page, and JavaScript is used to handle form posts (not AJAX, but JS code is triggered on submit).  At that point I started looking at the details of the Net tab in Firefox, and that's when I noticed the differences in Content Type!  In my case the ASP.NET form was using the `multipart/form-data` content type, which PayPal was not cool with.

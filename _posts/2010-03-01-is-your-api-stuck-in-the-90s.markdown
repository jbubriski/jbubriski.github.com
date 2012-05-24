---
date: '2010-03-01 18:04:09'
layout: post
slug: is-your-api-stuck-in-the-90s
status: publish
title: Is your API stuck in the 90's?
wordpress_id: '202'
categories: [Programming]
tags:
- AspDotNetStoreFront
- Providing an API
- Utilizing E-Commerce
- web-service
---

If your company develops a product that is utilized by other developers listen up!  Does your API empower developers, or does it get in their way?  Is it well documented, and can it be easily consumed?  Better yet, how does the rest of your code stack up?  Would you be ashamed if other people looked at it?  As a developer, these are questions you should be asking yourself, especially if other people are "using" your code or working with it.  You owe it to your fellow developers to do things the right way, especially if they paid money for your product!

### The culprit

Let me give you a great example of an API that could use a little work.  I've recently worked on two projects using **ASPDotNetStorefront **and frankly, **their code is atrocious**.  But for the purpose of this article, I'll focus on their "API", called ["Web Service Automation Interface" (WSI)](http://manual.aspdotnetstorefront.com/wsi/).  Before I get into how WSI works, let me present you with this lovely paragraph I found on the [Installation page](http://manual.aspdotnetstorefront.com/wsi/Intro_InstallingWSI.htm) from their documentation, which I found while initially researching WSI:


> _NOTE: WHILE FULLY FUNCTIONAL, THIS FEATURE IS STILL CONSIDERED BETA DUE TO      THE SCOPE OF THE IMPLEMENTATION_. IF YOU RECEIVE ANY ERRORS, PLEASE SUBMIT THEM VIA OUR ONLINE HELPDESK AT https://support.aspdotnetstorefront.com. A sample of the XML document you are passing to the interface is always helpful. Please submit it as an attachment as our support system will strip out any inline HTML or XML for security reasons.

I think I did a double take when I read that.  It really instills confidence doesn't it?  Well maybe they're a new company and haven't had time to refine their API...

> Our e-commerce platform has been in production since 1997, so it's field tested on a wide range of stores, and a wide range of store types.

So they've been in business for 13+ years, and they still haven't brought their API to a release status?  I guess they're still stuck in 1997, or at least their API certainly is.  Other than that one short paragraph in italics, not **bold bright red letters**, I couldn't find any evidence that this is a beta feature of their product.  That is a pretty important tidbit of information isn't it?  Let's pretend we didn't know about that for a few minutes...

Looking through the rest of their documentation you'll find it's riddled with incomplete sections and placeholders for future content.  For example, the whole shopping cart section is "_TBD (Not Implemented Yet)_".  Their sample code is mediocre as well.  I spotted a few missing "using" statements, useless variables, and extra code.  When I say extra code, I mean key down event handlers for a textbox control looking for "ctrl + a".  Isn't that whole "select all" thing built in?  I can understand if your internal code isn't beautiful, but an exmaple for your customers is meant to be just that!  **An example!** A short demonstration which your customers can follow!  I'm not saying it has to be perfect.  You don't have to fill out all the "catch" statements or anything like that; developers should know to deal with that themselves; but I feel the code should be solid and straightforward.

One last gripe before we move on; their API is supported in version 7.0.2.1 and higher, but there is only a single set of documentation for all the versions!  There are few things that make me more furious than when I discover a feature is not supported by my version **after trying to use it.** How much would you be willing to bet that the feature set for each version is not well documented?  They should have separate sets for each version they release and ensure that they match what is currently implemented.

### Using the API

Now on to the good stuff!  Here is a quick rundown of how their API works.  It accepts XML data to perform various operations against their data structure using a .NET .asmx web service.  Sounds pretty standard right?  Well, let's take a look at the .NET web service...

![](/assets/images/2010-03-01-is-your-api-stuck-in-the-90s/AspDotNetStorefront-WSI-ASMX.png "The AspDotNetStorefront WSI .asmx page")

Forget the stupid method names, where are all the other methods?  Unfortunately, this is all the web service provides.  In order to actually perform calls against the underlying API, you pass in XML.  **Yep, you have to hand craft all your XML calls**.  While [LINQ to XML](http://msdn.microsoft.com/en-us/library/bb387061.aspx) makes this a heck of a lot easier, **we shouldn't have to do this!!!** Why make more work for everyone, yourself included?  Isn't that part of the greatness that is .NET web services?  The ability to have the framework generate proxy classes for you?  Even if you chose to use another format, at least use a protocol that is standardized so you can take the human element out of the mapping equation!

I'm just a regular developer, but I love being able to program against an application.  Actually, I've used many an API in my day including ones from [RightNow](http://www.rightnow.com/), [SalesForce](http://www.salesforce.com/), and [PayPal](https://www.paypal.com/), among others.  Sure, AspDotNetStorefront is a smaller company, but that doesn't make their API any less important to the customers who purchase their product.  If they improve their API it might even help them grow!  A good API is critical for application vendors and is an awesome selling point. I'm not an expert on the subject, but I definitely know a bad API when I see one, and **the AspDotNetStorefront WSI API is a bad API**.

### UPDATE

I just so happened to find this interesting article about [Comparing the Performance of Visual Studio's Web Reference to a Custom Class](http://aspnet.4guysfromrolla.com/articles/022410-1.aspx).  I don't think the results are completely scientific, but it definitely sheds some light on whether you really want to make your own web service calling code.  The short answer is no.  You want to use the .NET "Add Web Reference" proxy classes because it saves you a significant amount of time and work, probably cuts down bugs in the long run, and the performance out of the box is very good.

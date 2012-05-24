---
date: '2011-08-29 15:21:41'
layout: post
slug: wildcard-urls-in-kentico
status: publish
title: Wildcard URL's in Kentico
wordpress_id: '916'
categories:
- Kentico
- Programming
tags:
- Kentico CMS
- Mobile Site
- URL Routing
- WIlcard URLs
---

A little known feature in Kentico is the ability to have "Wildcard URL's". Wildcard URL's are essentially the ability to route multiple URL's to the same page. It's similar to the routing features in ASP.NET MVC or ASP.NET 4.0.

## A Built In Example

If you want to see a working example of Wildcard URL's you can create a new site using the community site template that ships with Kentico. Under the members section there is a single page located at "/members/profile/", but this actually handles the profile pages for all the site members. It "generates" URL's like these:

- /members/john.aspx
- /members/tiffany.aspx
- /members/aaron.aspx

I say "generates" because the URL's don't really exist in Kentico. This will make more sense later. To see how these URL's work, just go to the Page Properties -> URLs. You should see this:

![](/assets/images/2011-08-29-wildcard-urls-in-kentico/The-URLs-section-of-the-Members-page-Properties.png "The URLs section of the Members page Properties")

You can see that the Document URL Path is a Wildcard URL.  Anything inside a set of curly braces is a placeholder that gets converted to a URL query string parameter. The Document Alias is only used behind the scenes now.  For example, if I make a request to this URL:

/members/john.aspx

it gets converted to this URL behind the scenes:

/members/profile.aspx?username=john

Then, any web parts on the page can programmatically access the wildcard section of the URL.  At this point the username parameter is just a querystring parameter, and can be accessed like this:

    var username = Request.QueryString["username"];
    
    // The rest of your code that handles the page for the given user
    ...

## A Complex Real World Example

The above example is practical, but basic.  What about a more complex real world scenario?

We recently developed a mobile site for a customer who already had an existing desktop site. They had a section of their site where they had numerous categories and products. We wanted to avoid any duplication, and avoid a site re-architecture so we used Kentico's Wildcard URL's to create unique URL's for each of the product and category pages within the mobile section of their site.

Here is an example of their old site structure:

- /category/
- /category/subcategory/
- /category/subcategory/product/

And their new site wanted to incorporate a mobile section that followed similar conventions, but under a mobile sub-folder:
	
- /mobile/category/
- /mobile/category/subcategory/
- /mobile/category/subcategory/product/

## The Solution: Wildcard URL's to the rescue!

Using wildcard URL's we only needed to create 3 pages and 3 templates to reproduce the entire product/category hierarchy for the mobile site.   Here is what the Document Name Paths were set to:

- /mobile/{category}/
- /mobile/{category}/{subcategory}/
- /mobile/{category}/{subcategory}/{product}/

The last thing to do was to create web parts to render the content.  However, in our example we can just use a repeater to read the query string parameters to automatically render the document from the desktop version of the site!  No programming needed!

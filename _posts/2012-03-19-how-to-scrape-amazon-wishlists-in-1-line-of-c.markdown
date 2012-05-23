---
date: '2012-03-19 08:00:02'
layout: post
slug: how-to-scrape-amazon-wishlists-in-1-line-of-c
status: publish
title: How to Scrape Amazon Wishlists in 1 Line of C#
wordpress_id: '1300'
categories:
- Programming
tags:
- .NET Framework
- Amazon
- C#
- Code
- Open Source
- Regex
- WebClient
- Wishlist
---

So I started a new open source project called [Shing](https://github.com/jbubriski/Shing). It's goal is simple: Scrape an Amazon Wishlist, get all the Product ID's and generate the Amazon short links to the products.

I was showing the code to my colleagues when Joey, a friend and former coworker, offered some suggestions to improve the code.  This is the original working prototype, thrown together in about 5 minutes:

_Note: the code below isn't quite complete.  It's just a simple Regex that finds product links on the wishlist page.  There can be other product links on the wishlist page like related products.  Just a heads up._


    
    
    string _regex = "/dp/(.*?)/";
    
    /// <summary>
    /// Returns a list of product ID's
    /// </summary>
    /// <returns></returns>
    public List<string> Scrape(string urlToScrape)
    {
        var webClient = new WebClient();
    
        var content = webClient.DownloadString(urlToScrape);
    
        var matches = Regex.Matches(content, _regex);
    
        var productIds = new List<string>();
    
        foreach (Match match in matches)
        {
            productIds.Add(match.Groups[1].Value);
        }
    
        return productIds;
    }
    



And here was his suggested version:


    
    
    private const string WishListRegex = "/dp/(.*?)/";
    
    /// <summary>
    /// Returns a list of product ID's
    /// </summary>
    /// <returns></returns>
    public IEnumerable<string> Scrape(string urlToScrape)
    {
        var content = new WebClient().DownloadString(urlToScrape);
    
        var matches = Regex.Matches(content, WishListRegex);
    
        foreach (Match match in matches)
        {
            yield return match.Groups[1].Value;
        }
    }
    



His code returns the exact same results but a few minor differences make it worthwhile.





  * **The regex is a constant** - This should make the code a little more efficient by not creating a string every time the Scrape() method is called.


  * **Scrape() returns an IEnumerable<string>** - This allows for the next one which is...


  * **Scrape() incorporates the _yield_ keyword** - This should make the code much more efficient in certain scenarios.  Instead of creating a List in memory and then returning the entire thing at the end, the method will simply return results as you ask for them.  This should reduce memory consumption and speed things up as well, again, if used correctly.



But why stop there?  Just make it a one-liner


    
    
    return Regex.Matches(new WebClient().DownloadString(urlToScrape), "/dp/(.*?)/").Cast<match>().ToList().Select(m => m.Groups[1].Value);
    



**This is purely for fun. I would never do this except as a joke.**

The code should produce the same results, except that the regex isn't a constant, and yield isn't incorporated.  Fun though.

---
date: '2011-08-31 09:00:51'
layout: post
slug: quick-tip-using-linq-to-convert-from-list-to-dictionary
status: publish
title: 'Quick Tip: Using LINQ to convert from List to Dictionary'
wordpress_id: '74'
categories:
- Programming
tags:
- LINQ
- Quick Tip
---

Ever need to easily access a collection of items by their key?  Exactly, you use a Dictionary!

But how do you easily convert a List to a Dictionary? Just use a little LINQ. Let's say you have a simple class:

    public class Stuff
    {
        public int Key { get; set; }
    
        public Stuff(int key)
        {
            Key = key;
        }
    }

Here is how you can take a List of Stuff and convert it into a Dictionary with the Key property as the accessor:

    var listofStuff = new List
    {
        new Stuff(1),
        new Stuff(2),
        new Stuff(3)
    };
    
    var dictionaryOfStuff = listofStuff.ToDictionary(s => s.Key);

No you can access the Stuff objects by their key!

    var stuff1 = dictionaryOfStuff[1];
    var stuff2 = dictionaryOfStuff[2];
    var stuff3 = dictionaryOfStuff[3];

Nice and easy!

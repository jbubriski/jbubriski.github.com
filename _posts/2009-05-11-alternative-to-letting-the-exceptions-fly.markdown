---
date: '2009-05-11 21:36:39'
layout: post
slug: alternative-to-letting-the-exceptions-fly
status: publish
title: Alternative to letting the exceptions fly?
wordpress_id: '9'
categories:
- Programming
tags:
- Exceptions
- Return Values
---

So I was creating a class to do handle the CRUD operations for a type when I was trying to figure out how to return the results.  I could...



	
  1. Return a bool, and just assume that the problem was with the database.  But then I don't have the actual cause, and any detailed information.

	
  2. Return a bool, and use out parameters to store the error.  Then check the out parameters in the case that the return value is false.  But that requires me to create a variable to pass in as the out parameter.

	
  3. Let the exceptions be thrown, and use a try catch in the calling code.

	
  4. Do something completely different!  How about create a new generic type to use as the return value?  All I need is a bool for the outcome of the operation, a string for error codes, and whatever else we want!


I like option 4 :)

While this doesn't seem like a big deal for my code, since I know what my other code is doing, I feel like this has potential.  What about using this code in an actual API fashion?  That way, the user of the API doesn't need to know what type of exceptions are going to be thrown.  The only direct advantage I see is that the exceptions are defined types.  But I really haven't thought about it that much...

I will try and post some code if I ever getting around to actually implementing this.

---
layout: post
title: 'Improve Your Code Part 1: Analyze Open Source'
permalink: improve-your-code-part-1-analyze-open-source
description: Some Description
date: 2012-10-03 12:48:54 -04:00
tags: "some tags here"
---

I'm always looking for ways to write better code, faster.  But where do you start?  If you're not in school, you might be lacking some direction.  Have no fear!  There are a wealth of options for making your way to a better (programming) you!

For starters, lean on your fellow developers and pick their brain. You have a [DKG]((/2012/07/20/establish-your-own-developer-kaizen-guild/), right?  How do they improve and stay current?  Ask them to review your code, or have them walk you through their code.  People are an invaluable resource that can point out inefficiencies in your style, or warn about edges cases they've encountered.  If they are good a communicating, you can learn much faster.  But your colleagues can only field so many questions and aren't always at your beck and call.  So what are the other things you can do to improve?

A combination of reading and writing code is probably the most effective way to improve yourself.  Read a book, ebook, blog post, or questions and answers on [Stack Overflow](http://stackoverflow.com).  Attend a code camp, hackathon, conference, or confer with your DKG.  We live in a truly amazing time, especially as developers.  We often take for granted the amount of code that is available from the awesome individuals who contribute to open source projects on [GitHub](http://GitHub) and other code hosting sites.  We use open source everyday to get stuff done, but why not crack open the source behind that shiny NuGet package and learn from it?  [Teach a man to fish](http://www.quotationspage.com/quote/2279.html), right?

## GitHub is a Bastion of Knowledge

[GitHub](http://GitHub.com) is probably the single most valuable resource for developers these days.  Sure, they host source code, but it's much more than that.  Find a famous (or infamous) developer and look at his/her repo's.  Fork a project and make it your own.  Feeling generous?  Fix a bug or add a feature.  Ask some to review your code, on the website, line by line.  The possibilities are endless!

## How to Analyze a Project

Downloading and opening a foreign piece of code can be quite the daunting task.  Fear not!  We'll do this together, just don't expect me to do all the work!

We'll look at the [Nuget Gallery Website](http://nuget.org/).  It's the website behind the .NET Package Manager, and it's written with ASP.NET MVC.  We'll look at tech specific things, but you can probably still follow along if you're familiar with other web frameworks.

### Get the Source

You can be lazy and browse the source on GitHub, but I recommend you `git clone` to get the full experience. [The source is on Github here](https://github.com/nuget/nugetgallery).

### Whoah, that's a lot of code!

Don't freak out!  Remember, we're in this together! Maybe you've never looked at a project this size, but that's OK.  We'll digest the site in pieces.  If it's a well written site, it shouldn't be that hard.  So where do we start?  Since this is the Nuget Gallery the logical place to start would be.... the packages they use!

### Packages

Crack open Visual Studio if you haven't already, and go to `Tools > Library Package Manager > Manage NuGet Packages for Solution...`.


### Structure

Now that we have an idea about the packages they use, let's take a quick look at the solution/project structure.  

Right away you'll notice that there are 2 projects, and 2 solution folders.  What is in the solution folders and what do they do?  Is there are readme somewhere that will tell you some things upfront?  What is the difference between the 2 projects?

Now let's compare the solution to a vanilla ASP.NET MVC site.  A bunch of folders should stick out as not being part of the default site template:

- api
- App_Code
- App_Start
- Commans
- DataServices
- DynamicData
- etc....

What is in the folders, and why are they arranged the way that they are?

### Details

Now that we have taken a whirlwind tour of the codebase, let's look at the actual code.  A good way to look at code is look at a functional unit.  Let's take something that should be familiar to most of us: *The Login Process*.




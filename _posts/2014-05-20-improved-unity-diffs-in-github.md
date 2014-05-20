---
date: '2014-05-20 8:00:00 -04:00'
layout: post
title: Improved Unity Diffs in GitHub 
slug: improved-unity-diffs-in-github
description: Viewing diffs of Unity projects in GitHub can be rough.  Check out these scripts I made that will make your life easier.
categories:
- Programming
- Game Dev
tags:
- Unity
- GitHub
- Diffs
---

At [Frag Castle Games](fragcastle.com "Frag Castle Games") we use a private [GitHub](http://github.com "GitHub") repo to store our source code for [Rock Kickass](http://rockkickass.com "Rock Kickass - a 2D platormer").  We use Branches and Pull Requests to build new features and incorporate them back into master.

## The Problem

Our system has worked great in the past, but since we've switched to [Unity](http://unity3d.com/ "Unity Game Engine") things have been tougher:

![Sample Diff of a Feature Pull Request](/assets/images/2014-05-20-improved-unity-diffs-in-github/sample-diff.png)

See what I mean?  In case you missed it:

- 61 changed files
- 28,707 additions
- 846 deletions

You're probably thinking "*WOW, that is a metric #*&$#$#-ton of code*".  Not exactly...

The reason for the gigantic stats is that Unity creates a meta file for each file that you import.  This is fine, because Unity needs this meta data to let you configure how you work with imported files (quality settings, slicing, etc).  But as you can see it **hoses** the diffs.

I don't think you can **not** check in those files.  It would cause massive problems in the way that Unity keeps track of things.  Surprisingly, there is no way to filter the view of those files within GitHub!   

So what's a Unity dev to do?

## The Answer

Use a ***bookmarklet*** to run some JS on the diff page and hide all the irrelevant files!

Here is a link to the gist with the JS files for hiding the irrelevant Unity files:

[https://gist.github.com/jbubriski/eba4bbeecccd5e4fc0ec](https://gist.github.com/jbubriski/eba4bbeecccd5e4fc0ec "Bookmarklet JS for hiding Unity files in GitHub diffs") 

And here is the embedded gist:

<script src="https://gist.github.com/jbubriski/eba4bbeecccd5e4fc0ec.js"> </script>

## Usage 

A bookmarklet is a browser bookmark, but instead of it pointing to a URL, it points to some JavaScript that runs when you envoke the bookmark.  I have the usage details in the gist as well, but here is a simple test you can do with bookmarklets.

1. Make a new bookmark in your browser.
2. Set the title to whatever you want... something like "`bookmarklet test`"
3. set the URL to "`javascript: alert('It works');`"

Now that we know how bookmarklets work, you can take the 2 JS snippets from the gist and turn them into bookmarklets!  When you're viewing a diff on GitHub, simply run your bookmarklet and voilà!  Usable diffs!  

## Explanation

So what do the scripts do exactly?

The main script simply uses JS to scan the page and find individual diff sections of certain file types and hide those sections.  It uses jQuery for easy DOM searching a manipulation.  Currently it hides files with the following extensions:

- .unity
- .meta
- .anim
- .controller
- .prefab
- .asset

**If you think of any more types to include, [drop me a line on Twitter](https://twitter.com/JohnBubriski "My Twitter account")!**

The secondary script finds all the diff sections and shows them, restoring the original view. 

*Note: Alternatively, I could make a link on a page that let's you simply drag that link to your bookmark bar, but I'm guessing the exact code will be tweaked over the next few weeks.  Eventually, ideally, I will make links for easy setup.* 


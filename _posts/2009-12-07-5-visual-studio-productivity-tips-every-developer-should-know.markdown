---
date: '2009-12-07 10:30:53'
layout: post
slug: 5-visual-studio-productivity-tips-every-developer-should-know
status: publish
title: 5 Visual Studio Productivity Tips Every Developer Should Know
wordpress_id: '150'
categories:
- Programming
tags:
- Productivity
- Quick Tip
- Shortcuts
- Time Saver
- Visual Studio
---

Looking to be a little more productive in Visual Studio!?  Take a gander at these great tips I've compiled over my years of working in Visual Studio.  I might have some more specialized tips coming up, but these ones should apply to anyone using Visual Studio and I'm guessing more than a few people don't know these.

### Auto formatting code

Hate how when you copy/paste code the indentation is all wrong?  Or how about when you hand write some code or markup, but little things are out of sync, even with intellisense?  Like the spacing between statements, the position of curly braces, etc.  Just use these shortcuts!  They automagically reformat code and markup to be consistent.  It even works on markup pages.  The only times it doesn't work is if there are some errors in the code/markup.  You can also access these shotrcuts directly from the Edit menu.

> Format Document: ctrl + k, ctrl + d

> Format Selection: ctrl + k , ctrl + f

### Context menu

Sometimes you know the name of a class, but don't have the appropriate _using_ statement added to the page.  Take _StringBuilder_ for example.  Just type the class name, correctly cases, and then use this shortcut!  It will bring up the context menu that is usually hard to see (it's a thin red outline until you mouse over it).  Then you can select the using statement you want (usually the first) and hit enter!  That's it!  No more scrolling to the top of the page to add using statements!  This also works in other situations where the context menu would normally be used, like when you rename a variable.

> Bring up the context menu: ctrl + .

### Quick keyboard commenting

Hate adding comments to each line individually, or moving your cursor around to add a block comment?  Just use these shortcuts!  The first one comments out any lines selected.  You don't even have to select the whole line!  Just select a portion and the comment will be added to the beginning of the line!  Alternatively, use the second shortcut to remove any comments.

> ctrl + k, ctrl + c

> ctrl + k, ctrl + u

### Cycle through your past clipboard items

Ever cut/copy something, only to accidentally cut/copy over the clipboard?  Say no more!  Just hold down shift while using the standard paste shortcut to cycle through all of the items that you have cut or copied in Visual Studio.  Only works inside Visual Studio though.

> Cycle through the clipboard buffer: ctrl + shift + v

### Collapse your code to get a birds eye view

Ever need to quickly take stock of how your code is layed out?  Just use the first shortcut, to collapse all the code into method stubs and code regions!  Then you can easily reorganize your methods and properties.  When you're done, feel free to use the second shortcut to expand everything again.

> Collapse all code regions: ctrl + m, ctrl + o

> Expand all code regions: ctrl + m, ctrl + p

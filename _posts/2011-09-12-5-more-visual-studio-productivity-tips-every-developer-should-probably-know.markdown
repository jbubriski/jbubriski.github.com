---
date: '2011-09-12 09:00:50'
layout: post
slug: 5-more-visual-studio-productivity-tips-every-developer-should-probably-know
status: publish
title: 5 More Visual Studio Productivity Tips Every Developer Should (Probably) Know
wordpress_id: '162'
categories:
- Programming
tags:
- Productivity
- Quick Tip
- Shortcuts
- Time Saver
- Visual Studio
---

## Code Snippets

Another great tip for cranking out the code, or in case you don't remember the syntax of certain keywords.  Just start typing the shortcut for a code snippet and hit tab twice, it's that easy.

prop ->tab tab

For example, after you type "prop" you should see this:

![](/assets/images/2011-09-12-5-more-visual-studio-productivity-tips-every-developer-should-probably-know/prop-code-snippet.png)

Then you will see this after you press "Tab" twice:

![](/assets/images/2011-09-12-5-more-visual-studio-productivity-tips-every-developer-should-probably-know/prop-code-snippet-2.png)

## Search Quickly

Ever notice that little text box on the menu bar?  That is for searching

> ctrl + d

## Delete Lines

We all mistakes!  Quickly delete code by the line using this shortcut:

>ctrl + l

or the lazy-man's shortcut would be to "cut" while having no selection on the desired line (However, that obviously overwrites your clipboard buffer):

> ctrl + x

## Extract an Interface

Let's say you're creating a shiny new ASP.NET MVC site and you want to use Inversion Of Control of Dependency Injection.  You probably need an interface for the services/providers that you will be injecting into your controllers.  If you already have those service or provider classes, you can use the built in Visual Studio refactoring features to automatically extract an interface.

Right click on your class:

![](/assets/images/2011-09-12-5-more-visual-studio-productivity-tips-every-developer-should-probably-know/Extract-Interface.png "Right click to extract an interface")

Click "Extract Interface" to bring up the "Extract Interface" dialog:

![](/assets/images/2011-09-12-5-more-visual-studio-productivity-tips-every-developer-should-probably-know/Extract-Interface-Dialog.png "Extract Interface Dialog")

And here is the generated interface:

![](/assets/images/2011-09-12-5-more-visual-studio-productivity-tips-every-developer-should-probably-know/Extract-Interface-Code.png "Extract Interface Code")

Pretty nice!  Just don't forget to mark the interface as Public if you need to.  That often bites me because I have my interfaces in a separate class library from my implementations.

## Extend Your Visual Studio

OK, so I couldn't really think of a good tip off the top of my head, so I instead am copping out and telling you about the Extension Manager which is new in Visual Studio 2010.  You probably know about this **_unless_**:

1. You don't have Visual Studio 2010.
2. You have Visual Studio 2010 C# Express Edition (or Web Developer, or whatever).
3. You didn't look at the feature list.
4. You live under a rock.

The extension manager has all sorts of goodies.  There is everything from free extensions, to paid version, to ones provided by Microsoft to support out-of-band releases.  Take a look at what's there, and let me know if you find something good!  Here is what I use:
	
- Indent Guides
- JScript extensions (All the ones from Microsoft to enhance the IDE's JavaScript support)
- NuGet Package Manager
- PowerCommands for Visual Studio 2010
- Productivity Power Tools
- VS Commands 2010
- WoVS Quick Add Reference

I've used a bunch of others, but some of them didn't stick, or I wasn't actively using them so I removed them.  Keep in mind that any extensions you install could cause instability or performance issues.

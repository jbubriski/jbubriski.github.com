---
date: '2012-05-02 09:00:25'
layout: post
slug: product-review-of-autocode-visual-studio-code-snippets-on-steroids
status: publish
title: 'Product Review of AutoCode: Visual Studio Code Snippets on Steroids'
wordpress_id: '1406'
categories:
- Programming
tags:
- .NET Framework
- C#
- Code
- Code Snippets
- Productivity
- Visual Studio
---

Disclaimer: I did pay $19.95 for this product, but I may receive a complimentary license in return for writing this review (Scroll to the end of the article for more info).

## Background

Code snippets in Visual Studio are great.  I Code Snippets all the time!  My favorite is probably one of the simpler ones: prop.  prop will generate the code for an auto-implemented property, and allow you to easily replace the type and property name.  The initial generated code looks like this:

    public int MyProperty { get; set; }

which you (easily) modify to this:

    public string FirstName { get; set; }

(If you don't know what I'm talking about go try it out now!  RIGHT NOW!  In Visual Studio, in a class block type: "prop <Tab> <Tab>")

Yeah... they're great.  [I've even made a bunch of custom Code Snippets](http://www.johnnycode.com/blog/2010/10/18/some-useful-visual-studio-code-snippets/).  Generally I have ones for:
	
- Inserting tasks comments like "// TODO: ".
- A jQuery protection function.
- SqlConnection and SqlCommand boilerplate using statements and setup.
- Dapper boilerplate code.
- Prototyping and stubbing out methods.
- Other common ASP.NET markup tags.

(_I want to throw my generic code snippets in a Github repo, but I haven't gotten around to it yet. I **do** have my [Dapper snippets on Github](https://github.com/jbubriski/Dapper-Code-Snippets)._)

But what if you want to do more fancy things?  One thing I've always dreamed of having was a code snippet that would take a type name and generate this:

    var myClass = new MyClass();

I cringe everytime I write that code because _I shouldn't have to_.  I tried every which way to support this in a code snippet, but they are simply not powerful enough.  This is where AutoCode from [DevProjects.net](http://www.devprojects.net/) comes into play.

## How does AutoCode work?

> AutoCode is Visual Studio Code Snippets on Steroids - me

Like regular code snippets, AutoCode snippets allow for templates and replacements, but they also allow _code_ to be run.  Much like a T4 template, they take a template, combine it with some potential input, and generate code from it.  T4 templates are usually added directly to a project or triggered by Visual Studio for the creation of files.  [ASP.NET MVC makes extensive use of T4 Templates](http://blogs.msdn.com/b/webdevtools/archive/2009/01/29/t4-templates-a-quick-start-guide-for-asp-net-mvc-developers.aspx).  AutoCode brings the power of T4 to your fingertips.  When you press Ctrl+Enter it brings up an intellisense-like dialog:

![]({{ BASE_PATH }}/assets/images/2012-05-02-product-review-of-autocode-visual-studio-code-snippets-on-steroids/AutoCode-Intellisense-Dialog.png "AutoCode Intellisense Dialog")

From there, the dialog will guide you with the available snippet shortcuts and their usage.  The built in snippets cover most general needs like:

- Creating properties
- Variable assignments
- Stubbing out classes and methods
- Code statement shortcuts

## Let's kick it up a notch!

But why limit yourself to individual properties and methods?  The "classa" shortcut will create an entire class from a single command:

    int userId string firstName string lastName person classa

results in...

    public class Person
    {
        public Person()
        {
        }
    
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

And for those with a careful eye, you did notice my "incorrect" casing in the command, right?  The command contained (lower) [Camel Cased](http://en.wikipedia.org/wiki/CamelCase) names, but AutoCode is smart enough to translate it into [Pascal Casing](http://c2.com/cgi/wiki?PascalCase)!

## But wait, there's more!

AutoCode doesn't stop at templates and replacements.  It also contains additional commands for things like:

- [Method Refactoring](http://www.devprojects.net/gallery/catalog/refactor)
- [Clipboard Assistance](http://www.devprojects.net/gallery/catalog/clipboard)
- [Code Evaluation](http://www.devprojects.net/gallery/catalog/tools)
- [Creation of custom AutoCode snippets](http://www.devprojects.net/gallery/catalog/autocode)
- [Commenting/Uncommenting](http://www.devprojects.net/gallery/catalog/exec)
- [Closing documents](http://www.devprojects.net/gallery/catalog/exec)

Some of these, like method refactoring commands, simply execute IDE commands, but if you're not familiar with the Visual Studio shortcuts, this can still be helpful.

## Editions

AutoCode comes in 2 versions, Standard and Professional, and this is where we come to my 2 criticisms.  The first problem is that the Standard Edition is free but it's practically unsuable.  Every time a command is executed a little "nagger" popup will appear.  This really hampers a dev's ability to gain any benefit from the Standard Edition, and more importantly, evaluate the product for purchase of the Professional Edition.  Which brings me to my next criticism...

The "trial" version is annoying but I decided to take my chances and purchase the Professional Edition immediately.  But instead of purchasing it for $19.95, I was required to _donate_ $19.95 to get my activation code.  I guess this is sort of splitting hairs, but it feels weird that someone accepting donations is forcing me to donate a certain amount of money.  Why not simply put a normal price tag on it?  I'm not sure if this was done to appear humble, for fee/tax reasons, or for some other reason.  Again, I'm probably splitting hairs.

## Conclusions

Buy it.  It's only $19.95.
---
date: '2012-07-20 8:00:00 -04:00'
layout: post
title: Establish Your Own Developer Kaizen Guild
slug: establish-your-own-developer-kaizen-guild
description: What a developer Kaizen guild is and why you need one
categories:
- Programming
tags:
- Kaizen
- DKG
- ASP.NET
- ASP.NET MVC
- Web Forms View Engine
- Runat server
---

Much like [Scott Hanselman says you need a "Life's Board of Directors"](http://www.hanselman.com/blog/WhoIsOnYourLifesBoardOfDirectors.aspx?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+ScottHanselman+%28Scott+Hanselman+-+ComputerZen.com%29), every *developer* needs to be a part of their own **Developer Kaizen Guild (DKG)**.


## What is a Developer Kaizen Guild (DKG)?

Kaizen is Japanese for "improvement" but is used in the context of *continuous improvement*.  Read [the Kaizen Wikipedia article](http://en.wikipedia.org/wiki/Kaizen) if you want to know more about the philosophy and practices.  A guild "is an association of craftsmen in a particular trade" [according to Wikipedia](http://en.wikipedia.org/wiki/Guild).  To build on those definitions, a Developer Kaizen Guild is:

> An tight-knit group of developers focused on continuous improvement of themselves and their trade.

The full phrase "Developer Kaizen Guild" was coined by a good friend and great developer [Jared Barboza](http://codeimpossible.com).


## What are the benefits of a DKG?

The main benefit of a DKG is the ability to "bounce ideas" off of others.  Having trouble debugging a bizarre issue?  Ask the DKG.  Need architecture advice?  Ask the DKG.  Frustrating boss or co-workers?  Vent to the DKG.  

Members of the DKG can offer direct support in the form of advice or wisdom. Chances are that someone else in the DKG has experienced a situation similar to yours, or maybe even the ***exact*** situation you're in. The act of explaining your current issues to someone else can often bring self-enlightenment.  How many times have you asked a question only to realize the answer just as the words leave your mouth

The DKG can also provide indirect support.  There is only so much time in the day we can spend learning. Then there are the days where we get bogged down with work and can't even open our RSS feed, let alone monitor the Spolsky's and Atwood's on Twitter.  It's times like these where the DKG shines.  Even if you didn't have time to hear the latest buzz, someone else did.  The DKG can aggregate notifications about the latest development trends, libraries and practices.


## Who should be in your DKG?

Take an inventory of your developer friends/co-workers/past-co-workers and identify the ones that are similar to you.  Similar in a sense that they work like you.  They are ***passionate*** about their job.  They want to ***learn***.  They want to ***improve***.  Language and experience are less important.  Generally, programming languages and frameworks are similar enough that experienced developers from different backgrounds can have productive discussions about specific code or patterns.  The more diverse your backgrounds, the greater the overall value of The Guild.  Below I use our DKG as an example of the diversity you should strive for.


## Who needs a DKG?

As I said, every good developer should be a part of a DKG.  In particular, people who would **greatly** benefit from a DKG are people lacking support in their daily work.  People who:

- Work from home.
- Are isolated in a small or 1-person development team.
- Work with developers who aren't interested in Kaizen.

This is the make up of our very own DKG.  We have co-workers, remote co-workers, past co-workers, and associates.  Associates are people who know other members of the DKG, but whom you may not know personally.  Based on personality similarities, you may very well make some new friends through these associations.


## How do you communicate with your DKG?

Everyone's DKG is going to work differently.  Our DKG uses Skype group chat, but there are a multitude of options:

- [Skype](http://skype.com) group chat
- An [IRC](http://www.irc.org/) channel (or [Jabbr](http://jabbr.net) room for a low friction version)
- Local [meetups](http://meetup.com) or playdates
- Phone Calls

The nice thing about Skype is that it works on multiple OS', it records messages you miss, supports audio/video conversations, and is free!


## So how does a DKG work in practice?

Here is a real-world example from earlier this week:

An internal application my company created is using a link tag to dynamically load CSS.  We change the href in JavaScript which forces the browser to load the new stylesheet.  This is working great, but I notice a double-load of the same stylesheet in the Network tab in Chrome.  The dynamic link tag is starting with a default value but then some JavaScript immediately updates the href on page load to the same value.  Wanting to prevent that additional request, I remove the default/hard-coded href attribute.

This particular app was written in MVC 1 or 2 and upgraded to 3, but the views are still using the Web Forms View Engine. Through my simple change, the markup goes from this:

    <link href="someRandomStylesheet" rel="stylesheet" type="text/css" href="style.css" id="dynamicCss" />

to this:

    <link rel="stylesheet" type="text/css" href="style.css" id="dynamicCss" />

I test my change locally and everything looks good.  I push the change and move on...

...suddenly, I get 5 more bug reports relating to the app.  The UI for the app has exploded.  But how?

I look at the staging site and see the whacky styles.  What the heck happened?  Was it my fault, or someone else's?  I check the history.  Nope, I'm the only who touched the code recently.  I'm testing in the same browser on the same page.  I use the Chrome inspector to look at the styles being applied to a misbehaving element when I find that a bunch of class styles are missing...

Viewing the source shows that something has gone terribly wrong.

I expected to see this:

    <link rel="stylesheet" type="text/css" href="style.css" id="dynamicCss" />

but instead I saw this:

    <link rel="stylesheet" type="text/css" href="style.css" id="_ctl0_dynamicCss" />

WTF?

This is MVC right?  Yep.  MVC 3?  Yep.  Just a regular web forms master view?  Yep.  Then what the heck is happening?  I immediately call a meeting of the Developer Kaizen Guild, a coalition of top-notch developers working in various web development roles.  Each member brings their own specialties to the table:

- Jared - .Net, Ruby, JavaScript, Testing
- Gregg - jQuery, HTML, CSS, Customer Relations
- Chris J - .NET, HTML, CSS, TCP/IP
- Mark - Cold Fusion, jQuery, HTML, CSS, SQL, Customer Relations
- Dave - Architecture, C#, Coding Concepts, Debugging
- Keith -  C#, VB.NET, JS, HTML, SQL, Customer Relations
- Joe - Everything under the sun
- Chris B - Ruby, PHP

Back to the problem at hand... 

Jared, the one most familiar with the seedy underbelly of ASP.NET begins analyzing the issue.  He starts offerings workarounds, considers the possibility of a web forms view engine bug, then has an epiphany:

	"oh f***
	
	does your <head> have runat="server" or something?"

BINGO.  Problem solved.  Total time to solution via the DKG: 10 minutes.

How long would it have taken for me to have the same realization?  It's hard to say for sure but at the time I didn't even know where to begin looking, despite my extensive experience with ASP.NET.

## Take it up a notch

Now that you formed a DKG (You did, right?), why not take it up a notch?  Take a look at your DKG roster.  You now have a tight-knit network of like-minded people of varying abilities and skills, all with the goal of continuously improving their skills.  **That is a bad-ass combination right there**.  Why not apply this awesome force of cohesive technical abilities?  Here are some ideas to get you started:

- Start a podcast
- Start an open source project
- Start a company

## Side note

If you don't like the term Developer Kaizen Guild, try "Skilled Hackers Invested in Evolving and Leading Development", or S.H.I.E.L.D.

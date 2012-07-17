---
date: '2012-07-17 8:00:00 -04:00'
layout: post
title: Establish Your Own Developer Kaizen Guild
slug: establish-your-own-developer-kaizen-guild
description: Why you need your own developer Kaizen guild.
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

Kaizen is Japanese for "improvement" but is used in the context of *continuous improvement*.  Read [the Kaizen Wikipedia article](http://en.wikipedia.org/wiki/Kaizen) if you want to know more about the philosophy and practices.  The phrase "Developer Kaizen Guild" was coined by a good friend and great developer [Jared Barboza](http://codeimpossible.com).


## What are the benefits of a DKG?

The main benefit of a DKG is the ability to "bounce ideas" off of others.  Having trouble debugging a bizarre issue?  Ask the DKG.  Need architecture advice?  Ask the DKG.  Frustrating boss or co-workers?  Vent to the DKG.  Chances are that someone else in the DKG has experienced a situation similar to the one you're in, or maybe even the ***exact*** situation you're in.


## How do you form a DKG?

Take an inventory of your developer friends/co-workers/past-co-workers and identify the ones that are similar to you.  Similar in a sense that they work like you.  They are ***passionate*** about their job.  They want to ***learn***.  They want to ***improve***.  Language and experience are not that important.  Generally, programming languages and frameworks are similar enough that experienced developers from different backgrounds can have productive discussions about code.  The more diverse your backgrounds, the greater the overall value of the Guild.


## Who needs a DKG?

As I said, every good developer should be a part of a DKG.  In particular, people who would **greatly** benefit from a DKG are people who are lacking support!  People who:

- Work from home.
- Are isolated in a small or 1-person development team.
- Work with developers who aren't interested in Kaizen.

This is almost exactly the makeup of our DKG.  From the perspective of another member, they have co-workers, remote co-workers, past co-workers, and associates.  Associates are people who know other members of the DKG, but whom you may not know personally.


## How do you communicate with your DKG?

Everyone's DKG is going to work differently.  Our DKG uses Skype group chat, but there are a multitude of options:

- Skype](http://skype.com) group chat
- [IRC](http://www.irc.org/) channel (or [Jabbr](http://jabbr.net) for a low friction version)
- Local [meetups](http://meetup.com)
- Phone Calls


## So how does a DKG work in practice?

Here is a real-world example from earlier this week:

At work my company is using the link tag to dynamically load CSS, so we change the href in JavaScript.  This seems to work great, but I was seeing a double-load of the same stylesheet in the Network tab in Chrome.  The dynamic link tag starts with a default value, but because of some JavaScript we have, the href is immediately updated on page load to the same value.  This caused an additional request for the stylsheet.  I wanted to remove that 2nd request and I didn't see a point in having a default stylesheet set, so I removed the href attribute.

The web forms view engine master view markup went from this:

    <link href="someRandomStylesheet" rel="stylesheet" type="text/css" href="style.css" id="dynamicCss" />

to this:

    <link rel="stylesheet" type="text/css" href="style.css" id="dynamicCss" />

I tested my change locally and everything worked great.  Push the change and move on...

...but then I get like 5 more bug reports.  Things on the UI for the site just exploded.  But how?

I look at the staging site and see the whacky styles.  What the heck just happened?  Was it really me, or someone else?  I'm using the same browser... the page is the same... what could it be?  I use the Chrome inspector to look at the styles being applied to a misbehaving element.  Weird... a bunch of class styles are missing...

I view source and notice that something terrible has happened.

I expected to see this:

    <link rel="stylesheet" type="text/css" href="style.css" id="dynamicCss" />

but instead I saw this:

    <link rel="stylesheet" type="text/css" href="style.css" id="_ctl0_dynamicCss" />

WTF?

This is MVC right?  Yep.  MVC 3?  Yep.  Just a regular web forms master view?  Yep.  Then what the heck is happening?  I immediately called a meeting of the Eastern Mass. Minds, a coalition of top-notch developers working in various web development roles.  Each member brings their own specialties to the table.  One familiar with the nastiness of ASP.NET quickly began analyzing the issue.  He offers workarounds, considers the possibility of a web forms view engine bug, but then has an epiphany.

	oh f***
	
	does your <head> have runat="server" or something?

BINGO.  Problem solved.  Total time to solution via the DKG: 10 minutes.  How long would it have been for I had a similar epiphany?  Who knows!

## Take it up a notch

So now that you have a DKG (You formed one, right?), why not take it up a notch?  Think about it.  You now have a tight-knit network of like-minded people of varying abilities and skills, all with the goal of continuously improving their skills.  That is a bad-ass combination right there.  Why not apply this awesome force of technical abilities?  Here are some ideas to get you started:

- Start a podcast
- Start an open source project
- Start a company

## Side note

If you don't like the term Developer Kaizen Guild, try "Skilled Hackers Invested in Evolving and Leading Development"

---
date: '2010-10-11 12:00:51'
layout: post
slug: really-getting-started-with-the-netduino
status: publish
title: (Really) Getting Started with the Netduino
wordpress_id: '658'
categories:
- Hardware
- Programming
tags:
- .Net Micro Framework
- C#
- Code
- Embedded Programming
- Netduino
- Visual Studio
---

## Introduction

I'm a regular developer like you, foraying into the world of embedded programming.  Here is how I got started with the Netduino and some solutions to the issues I've dealt with.

## Where To Start?

First off, if you haven't already, check out the [Getting Started](http://www.netduino.com/downloads/gettingstarted.pdf) guide on the Netduino site.  This a basic tutorial to get your Netduino blinking the onboard LED.  After that you're sort of left to your own devices (hahaha)... until now!

## What Next?

In order to understand what is happening with the parts you connect, you need to learn a little bit about electricity.  I found [All About Circuits](http://www.allaboutcircuits.com/) is a good place to start.  Make sure you go to the section on DC, as that is what applies to basic Netduino circuits.  I think that AC is more applicable to larger scale applications, like the electricity around your home.  I think that DC is generally for the smaller applications, although you can convert between the two.  For example, I think that you would need to convert the AC power from your wall socket into DC power to run your Netduino.  Possible, but not something you want to tackle right away.

## Parts

So you have your Netduino, you have the knowledge, what next?  You need some parts.  Parts can be easily bought here:

- [SparkFun Electronics](http://www.sparkfun.com/commerce/categories.php)
- [Maker Shed](http://www.makershed.com/)
- [Adafruit Industries](http://www.adafruit.com/)
- [Radio Shack](http://www.radioshack.com) (So you don't have to pay shipping costs, or if you prefer buying from a brick and mortar)

I am not affiliated with these companies, I just know that they sell various electronics and related Arduino parts.  What parts do you buy?  Here is a basic list to get you started.  All of these items are relatively cheap (The links are to SparkFun for no apparent reason):

- Breadboard - A breadboard is basically a prototyping board that you can use to setup your circuits. [Breadboard Mini Self-Adhesive](http://www.sparkfun.com/commerce/product_info.php?products_id=7916)
- Wires - Duh.  You use them to connect your parts together.  The one piece of advice I have is that they make some "fancy" wires that have nice grips on the ends of them.  They are pricier, but some people seem to love them.  ["Premium" Jumper Wires](http://www.sparkfun.com/commerce/product_info.php?products_id=9385) (or get cheaper ones at Radio Shack)
- LED's (Light Emitting Diodes) - These are simply lights that you can easily hookup to your board.  The simplest Netduino project would involve blinking these on and off.  The Getting Started guide I mentioned earlier tells you how to blink the onboard LED.
- Resistors - While these parts aren't very exiting, they are an integral part of almost any circuit you create.  They add "resistance" to your circuit and lower the amount of current passing through the wires.  These are helpful to make sure your parts are supplied with the right amount of current and don't get overloaded (and explode!).  A few of each type should be more than enough to start with:
	- [Resistor 1k Ohm 1/6 Watt PTH](http://www.sparkfun.com/commerce/product_info.php?products_id=8980)
	- [Resistor 10k Ohm 1/6th Watt PTH](http://www.sparkfun.com/commerce/product_info.php?products_id=8374)
	- [Resistor 330 Ohm 1/6th Watt PTH](http://www.sparkfun.com/commerce/product_info.php?products_id=8377)
- Push Buttons - When pressed it completes a part of your circuit, but when released it breaks the connection.  Allows you to make your circuits interactive! [Mini Push Button Switch](http://www.sparkfun.com/commerce/product_info.php?products_id=97)
- Switches - Allow you to toggle on and off various parts of your circuit (or the whole thing). [SPDT Slide Switch](http://www.sparkfun.com/commerce/product_info.php?products_id=9609)
- Photocell / Photoresistor - This is a special type of resistor whose resistance depends on the amount of ambient light in the room.  It's basically a light sensor.  I've created a simple circuit that makes an LED brighter the darker the room is. [Mini Photocell](http://www.sparkfun.com/commerce/product_info.php?products_id=9088)
- Potentiometer - An adjustable resistor to do things like make a volume control, or use it to dim your LED's at will!
- Piezoelectric buzzer - A simple speaker that let's you create simple music and sounds. [Buzzer - PC Mount 12mm 2.048kHz](http://www.sparkfun.com/commerce/product_info.php?products_id=7950)
- Capacitors - I know that these are important, but for the life of me I can't remember what they do... they're like a battery... or something...
- 9V battery and Size M Coaxial DC Power Plug - Go mobile with a battery and accompanying slot!  I was able to hook these two up no problem and am able to power the Netduino separate from my computer!
- 7-segment display - A simple numerical display with a decimal point.  Easy to hook up, if a bit time consuming though.
- Transistor - Allows you to toggle your circuits using signals sent via code.  Switch things on and off through code!
- Servo Motor - A simple motor small enough to be powered by your 9 volt battery and the 5V output of the Netduino.  Easily control the angle/rotation of the motor!

## How do I learn?

Now that I have all the parts, what do I do with them?  I would suggest building a proof of concept circuit with each of the above parts.

- Attach some LED's to the breadboard and make them blink (Make sure you use a resistor so you don't overload the LED).
- Incorporate the push buttons and switch to switch your LED's on and off.
- Build a light sensor that outputs the current brightness in the room.
- Build another light sensor that controls the brightness of the LED.
- Play some sounds on the buzzer.
- Add a switch to your buzzer circuit to turn it on and off.
- Add LED's to show when the speaker is "off". (I have done this and will be posting a tutorial soon, complete with code, diagrams and pictures!)
- Use the photocell to make the buzzer play sounds depending on the brightness of the room.

You can find some simple examples like these online, or search for some code in the [Netduino forums](http://forums.netduino.com/).  Of course, you can always ask for help too :D

## I'm past the basics, now what?

If you want something more advanced I would suggest attempting to tackle some other online tutorials:

- Check out the [projects page](http://netduino.com/projects/) on the Netduino site.
- Scott Hanselman has a very simple morse code application in his post about the .NET Micro Framework: [The .NET Micro Framework - Hardware for Software People](http://www.hanselman.com/blog/TheNETMicroFrameworkHardwareForSoftwarePeople.aspx)
- Try and port some Arduino tutorials.  Don't worry it's easier than it sounds!  The arduino is pin-for-pin compatible with the Netduino.  The only thing you have to worry about is the Arduino code, which is written in C, and some other small differences (See below).

## Some last words of advice

If you're circuit isn't working correctly, make sure that the Netduino supports what you're trying to do.  For example, the [technical specifications page](http://www.netduino.com/netduino/specs.htm) shows that some of the pins support different features.  I was trying to use Pulse Width Modulation (sounds way more complicated than it actually is), but the pin I was using didn't support it!  It only works on pins 5, 6, 9, and 10.

Another thing that burned me was when I tried to read data from one of the analog pins.  I was following a Arduino tutorial and didn't realize that the analog pins on the Netduino needed to be hooked up to the Analog Reference pin in order to function correctly.

Hope this information helps someone out there!

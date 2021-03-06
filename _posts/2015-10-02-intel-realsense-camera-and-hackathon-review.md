---
date: '2015-10-02 9:00:00 -04:00'
layout: post
title: Intel RealSense Camera and Hackathon Review
slug: intel-realsense-camera-and-hackathon-review
description: I got to play around with an Intel RealSense Camera!
categories:
- Programming
- Event
tags:
- Intel RealSense Camera
- Hackathon
- Game Dev
---
So I somehow got invited to an Intel RealSense™ Hacker Lab.

*Disclaimer: The event was free, food/drink was provided, I got to keep the camera, and I had a chance to win some prizes (but didn't).  I also wasn't asked to do this review.*

TLDR: The Intel RealSense camera is basically an embeddable version of the Kinect and I got to build something with one and take it home.  Despite some bad logistics, the event was pretty good and it was fun to work with a Kinect-like device.


## Schedule

The event consisted of slide presentations, questions, and playing with demos in the first half of the morning, then on to code demo in the second half.  After lunch we were free to create our own projects until around 5:30.  Then we demoed the projects and they judged them and gave out prizes (I Didn’t win anything).


## Camera Features

Now about the Intel RealSense camera. We used (and were given to take hom) an external F200 camera made by Creative.  The F200 is the same camera used internally on a few laptops on the market right now.  There is a rear-facing R200 version coming out soon that is meant for longer ranges.

- Has a 1080p RGB camera
- Works from something like 8 inches to 4 feet from the camera. [More details on Intel RealSense Data Ranges](https://software.intel.com/en-us/articles/intel-realsense-data-ranges), including their rear-facing R200 camera.
- Tracks something like 21 points on each hand, and something like 76~ points on the face.
- Can also do some form of 3D scanning and random object tracking (I think they have a specific app coming that does this).
- Has hand gesture support and facial emotion tracking.
- Does **NOT** swivel/move like the Kinect.
- Microphone (dual I think)


## Camera Features/Usage Impressions

I'm not going to hold back... from using the demos, I found the hand tracking to be pretty janky.  If you have open hands with palms facing the camera it works perfectly.  As soon as you start moving your fingers around it frequently loses track of them because, naturally, the IR sensor can’t see fingers behind fingers (or hands behind hands).  The API also has built in support for various gestures, but they work with a varying degree success.  Most of the project demos that day that involved hand tracking were not super successful.  One project used swipe gestures which were recently added to the API but they basically didn't work at all during the presentation (Apparently it was more reliable when it was being tested).

The facial tracking, however, was actually pretty impressive since your head (generally) doesn’t contort it’s features around!  One demo mapped all 76~ tracking points to the video feed and operated exactly as you would expect!  Unfortunately, facial emotion tracking is basically unusable at this point with the SDK.  However, I can imagine that they would be able to develop better algorithms to change this as long as the data they're receiving currently would allow that to happen.  I guess there is nothing stopping you from taking the raw data points and developing/using your own algorithms as well.

Finally, the camera/API itself had some issues.  Multiple people had problems with it randomly not working (myself included), and I think someone’s unit died completely during the event.  Unity also crashed pretty often, again, randomly.  Some times my app would even try to connect to the built in webcam on the laptop!  Hopefully these are all just software issues that can be eventually solved.



## Projects

I built a game called Emergency Landing.  Your plane is on fire and your goal is to steer it safely to a landing strip by tilting your head.  Tilting your head to the side banks it left and right, while leaning forward and backward causes the plane to subtly start to dive or level out. You start the game and choose easy or hard.  You are then set on a rough course towards one of 2 landing strips, based on difficulty.  In hard mode the landing strip is farther so the plane is going faster/higher in order to get within range.  All you need to do is make contact with the landing strip and you win.  Touch any other ground/tree/bounding box and you lose.  I was very please with what I was able to make despite the issues mentioned earlier.

The runner up made a game where you were a robot shooting lasers at enemies.  Your robot had a rolly thing on the bottom whose movementswere controlled by moving the left hand up/down.  The right hand controlled the steering/aiming.  It was a pretty well done demo, however the controls looked very unintuitive/difficult to use.  Again, IMO the hand tracking is not great.

The winner had made a music app where opening your mouth in different ways played different tones.  Moving your hands varied the pitch.  It was pretty inventive, but it didn’t sound very good, and it was one of the most ridiculous/scary things I’ve ever seen.

The rest of the demos ranged from simply spinning 3D models with gestures to Starfox clones.  One guy had used a separate “360 degree camera” and made it so that you could look around one of the pictures he had taken with that other camera.

Another guy had integrated the system with a JavaScript project that makes different types of music, but this one actually sounded good.  It was precanned melodies and things but you would switch instruments/tempo using gestures.  I would have voted for that one.


## Logistics!?!?

This is basically going to be me complaining for a few paragraphs...

First off, it took me 2.5 hours to get there (not their fault) and they told me to park at 1-2 hour street parking or 2 hour lot parking… for a 12 hour event (their fault).  Since it was the beginning of the Genesis flood, I was SOAKED after going out to move my car (to a real lot), and stayed that way all day.  The room was also pretty crowded.

Also, there were a ton of issues with the setup of the laptops they had us use.  They didn’t realize that the new VS requires sign in and some people didn’t have MS accounts.  A Unity account was also required, but I can’t remember if they had mentioned that before (I don’t think they did).  Some people’s laptops were also missing the materials so a thumb drive had to be passed around, which apparently still had issues because they were still using a web installer.

(To be clear, I have both a Unity and MS account, so I was fine)


## Conclusion

TBH, the market penetration isn’t there for these devices so it wouldn’t be practical to build apps/games solely dependent on the hand/face tracking.  However, you may be able to guarantee the presence of the device in certain industries (medical, gov?), or you could offer an enhanced/alternate modes for when the camera is present.  It sounds like these cameras will eventually end up in most PC laptops, but it is probably going to be a while for you to *expect* people to have one (just like what happened with the original web cam).

Developing for this type of device shouldn't be forced.  To paraphrase the Intel guy, you should use  interfaces to do what they're designed to do.  Don’t create a virtual keyboard when you know that this will be attached to a laptop/desktop that already has a mouse/keyboard.  So unfortunately, having these other great specialized input mechanisms almost limits the applications of the hand/face tracking.  But that's a good thing too.

I think games will be where this might initially take off, as well as private applications with integrated hardware.  I'm hoping that someday we all have enhanced versions of these camera so we can practice Karate, sign language, dancing, and more.
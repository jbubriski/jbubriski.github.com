---
date: '2014-05-20 8:00:00 -04:00'
layout: post
title: Finding The Mobile App Development Option That's Right For You
slug: finding-the-mobile-app-development-option-thats-right-for-you
description: A look at some options for mobile app development.
categories:
- Programming
tags:
- Mobile Development
- Xamarin
- PhoneGap
- CocoonJS
---

When it comes to mobile development, where do you start?  There are a myriad of options these days, and I'll try and give a basic overview of the big players.  I'll let you decide which one is right for you.

*Disclaimer: I've only shipped 1 mobile app, and have worked on some other.  However, I've been trying to keep my eye on things and this is the state of mobile development as I see it.*


## Native or Not?

What are the general pros and cons of native vs non-native development?

IMO, native development generally means that you have complete control over an app's performance, can consume the latest API's, and can almost automatically utilize each platforms UI design.  If you are OK with targeting a single platform (probably iOS), then investing all your efforts in the best possible experience for that one platform can pay off.  I have also heard that no matter how you develop apps, learning the specific API's for the specific platforms is beneficial. 

The downside of native development is that you need to develop your app from scratch for each platform.  If you're targeting iOS, Android and Windows Phone, that's 3 different codebases you need to develop and maintain (and try and be an expert in).  As the developer building the mobile app(s), you will need to learn 3 different languages and API's to varying degrees.

If we look at things from a cross platform perspective, we might need to sacrifice some cost, performance, features, and/or flexibility in order to share most, if not all code.  Xamarin seems to be a great solution if you can spend the money.  The other web-based options seem to be great alternatives if you're looking to keep costs low or leverage web technologies you may already be familiar with.  The web-based options also provide an extremely low barrier to entry.

Now let's take a more detailed look at some of the specific options...


## Native Android ([Google Play](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CCAQFjAA&url=https%3A%2F%2Fplay.google.com%2Fapps%2Fpublish%2F&ei=nB-PU8GXNYzgsATKy4D4AQ&usg=AFQjCNEvG-AI0sojdmEeraO9D_b4Xtsn6g&sig2=8qpONJjRVtg6CwALqtlsLA "Google Play Developer Console enables developers to easily publish and distribute their applications directly to users of Android-compatible phones"), [Amazon App Store](https://developer.amazon.com/public), etc.)

You develop your Android apps with Java and push them out to Google Play or other Android App Stores.  A developer account with Google Play is free, easy to setup, and you can publish an app within hours.

- Cost - Free
- Language - Java
- IDE - Eclipse, Eclipse derivative, or other 3rd party options.


## Native iOS

You develop your iOS apps with XCode and push them out to the iOS App Store.  A Apple Developer Account costs $100 a year and I think it requires an [EIN number](http://www.irs.gov/Businesses/Small-Businesses-&-Self-Employed/Apply-for-an-Employer-Identification-Number-(EIN)-Online).  There is typically a 2 week minimum wait time for your app to be approved.  Your app can also be rejected, requiring that you go through the 2 week approval process again.

- Cost - $100 / year for an Apple Developer Account
- Language - Objective-C
- IDE - XCode


## Cross Platform - [Xamarin](http://xamarin.com/ "Create native iOS, Android, Mac and Windows apps in C#")

You build the bulk (~80%) of your app's logic with C# and build the UI's specific to each platform separately.  The Indie Xamarin plan costs $400 per platform per developer per year.  Higher tiers are availble for additional features like Visual Studio support, a quite of cross-platform business controls, and access to the Mobile Test Cloud.

Example: It would cost $4000 a year for a team of 5 to build apps for iOS and Android.

- Cost - Minimum $400 / platform / dev / year (Additional tiers offer more features at a higher price)
- Language - C#
- IDE - Xamarin Studio or Visual Studio with a higher package, plus others for creaing UI's.


## Cross Platform - PhoneGap

Provides a wrapper and access to native API's for "web pages".  You build your app with HTML/CSS/JS like you would a website and use PhoneGap to build that into an app for iOS or Android.  PhoneGap hides the fact that the app is running a "website" and can look native depending on the styling that you use (CSS).  The [PhoneGap Build](https://build.phonegap.com/) service from Adobe will handle the actual build process for the various platform dependent things like the Android .APK's and iOS XCode Projects.  You simply upload a zip of your code and wait for their service to do it's magic.

*I have worked with PhoneGap and PhoneGap Build to develop a simple party game.  It seemed to work great, and let us build the whole game in 1 weekend.  Unforunately due to copyright issues we never shipped the game.*

- Cost - Free (for now)
- Language - HTML/CSS/JavaScript
- IDE - Whatever you want
- Conjecture: Potentially has performance issues. Not sure if there are any limitations when using Native API's.  Support for Native API's may be lacking or may not be implemented right away.  Not sure if they will charge for the service in the future.


## Cross Platform - CocoonJS

Is similar to PhoneGap in that your app is built with JS, but has traditionally targetted Canvas-based apps.  This is exclusively an online service, since their system is proprietary.  The real benefit of using CocoonJS is that it translates Canvas draw calls to GPU calls.  This means that games written in JS can nearly match the performance of native games.

*I actually have used this service to ship a game with [Frag Castle](http://fragcastle.com/) called RK Runner for [iOS](https://itunes.apple.com/tc/app/rk-runner/id632390010?mt=8) and [Android](https://play.google.com/store/apps/details?id=com.fragcastle.rkrunner).  Try it out and see for yourself how well it performs.*

- Cost - Free (for now)
- Language - HTML/CSS/JavaScript or JavaScript via Canvas
- IDE - Whatever you want
- Makes it easy to port JS games to mobile.
- Conjectur: Not sure if they will charge for the service in the future.


## Conclusion

This is not an exhaustive list of mobile app development options.  I know there are other services out there like the [Intel App Framework](http://app-framework-software.intel.com/ "The JavaScript library for mobile HTML5 app development.") and Telerik's [App Builder](http://www.telerik.com/appbuilder "Telerik App Builder") and [Platform](http://www.telerik.com/platform "Telerik Platform").  So take all this with a grain of salt and do your own research.

Given what I know about the above platforms, here is my breakdown of how to choose:

- Native - To target a single platform or learn the specifics about it's API's and features.
- Xamarin - For businesses that want to efficiently develop native apps for iOS and Android.
- PhoneGap - For "regular" apps that can be built with the web stack for low cost.
- CocoonJS - For games that can be built with HTML5/JS or ported from HTML5/JS.

Hope this was helpful, feel free to let me know about any other options out there.
---
date: '2012-04-25 09:00:26'
layout: post
slug: my-cloud-backup-strategy
status: publish
title: My Cloud Backup Strategy
wordpress_id: '1359'
categories:
- Programming
- Technology
tags:
- Backups
- Cloud
- NAS
- Photography
---

Not going to go into _why_ you should backup, but here is how I handle the things that matter to me: Code, Documents, PC Games, and Photo and Video.

## Code

This one is pretty much a no-brainer for me.  Use [Bitbucket](https://bitbucket.org/) to host your private repositories for free, and use [GitHub](https://github.com/) to host your public ones.

## Documents and other miscellaneous files

Some prefer Microsoft, Google, or another company.  Take your pick (numbers from time of writing):

- [Microsoft SkyDrive](https://skydrive.live.com) - 7 Gb free
- [Google Drive](https://drive.google.com/) - 5 Gb free
- [Dropbox](http://db.tt/Cr4Jtd0) - 2 GB free (plus referral bonuses)

## PC Games

Just use [Steam](http://store.steampowered.com/).

## Photo and Video

I have a [Flickr](http://www.flickr.com) [Pro Account](http://www.flickr.com/account/order).  For $25/year you get:

- Unlimited uploads and storage
- Unlimited sets and collections
- Access to your original files
- Stats on your account
- Ad-free browsing and sharing
- HD video uploads & playback

Their upload download procedures aren't super smooth, but I mostly do uploads and the [Flickr Uploadr](http://www.flickr.com/tools/uploadr/) makes that pretty easy.  I tried out [Google's Picasa](https://picasaweb.google.com) a while back, but with my massive collection of family photos it was getting very expensive very fast.

I also have a [Synology DS211J NAS](http://www.synology.com/us/products/DS211j/index.php) that I use to store all my photos and videos in house.  If you edit/view/print your photos a lot, having this local network copy/cache will help out a lot.

Bonus: I have 2 projects on [Github](https://github.com/jbubriski) relating to photo management.

["Organize My Photos"](https://github.com/jbubriski/Organize-My-Photos) aims to organize all of your local photos into folders by date.  It's a really basic/ugly implementation in Winforms, but it works for my purposes.

["Organize My Flickr Photos"](https://github.com/jbubriski/Organize-My-Flickr-Photos) aims to keep your photos "backed up" to Flickr, avoiding duplication.  I don't think this code  is fully functional right now.  Last I checked I was fighting with the limitations of the Flickr API.  Once over those hurdles it shouldn't be too much work to get some nice sync action going on.

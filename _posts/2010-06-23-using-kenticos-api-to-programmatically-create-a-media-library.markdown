---
date: '2010-06-23 13:00:32'
layout: post
slug: using-kenticos-api-to-programmatically-create-a-media-library
status: publish
title: Using Kentico's API to Programmatically Create a Media Library
wordpress_id: '453'
categories:
- Kentico
- Programming
tags:
- .NET Framework
- ASP.NET
- C#
- Code
- Kentico API Programming
---

## Introduction


While Kentico has a really great API, their [developer manual](http://www.kentico.com/docs/devguide/index.html), [knowledge base](http://devnet.kentico.com/Knowledge-Base.aspx) and other forms of documentation don't always contain examples for every scenario.  Luckily, figuring things out on your own is usually just a matter of taking a quick peak at some of Kentico's own code and you're off and running!

Recently a customer was creating a community site where their end users would be creating different groups on their site.  Kentico's community features new to 5.x are really cool and you should check them out if you haven't already.  The easiest way to experience the awesomeness is to simply install the [Community Site Template ](http://devnet.kentico.com/docs/communitysiteguide/index.html)when making a new site.  That site template will already be setup with the specific community features.

While the community features of Kentico are good, there are some things that are lacking, one of which is a default group setup.  So when an end user goes to your site and creates their own group, they have to manually create a Media Library.  Our customer wanted the group to be fully configured upon creation, so I added some code to the group registration web part in order to do so.


## The Code


The code is very straight forward. I have created a method that takes the code name, display name, folder name, a description, and the path to a teaser image. The description and teaser image path aren't required, but I added them for the heck of it.  The code simply "news up" an instance of the MediaLibraryInfo class, and calls it's insert method!  That is it!

    
    private static MediaLibraryInfo CreateMediaLibrary(string codeName, string displayName, string folderName, string description, string teaserPath)
        {
            var mediaLibraryInfo = new MediaLibraryInfo
            {
                LibrarySiteID = CMSContext.CurrentSiteID,
                LibraryName = codeName,
                LibraryDisplayName = displayName,
                LibraryFolder = folderName,
                LibraryDescription = description,
                LibraryTeaserPath = teaserPath,
    
                FileCreate = CMS.SiteProvider.SecurityAccessEnum.AllUsers,
                FileDelete = CMS.SiteProvider.SecurityAccessEnum.AllUsers,
                FileModify = CMS.SiteProvider.SecurityAccessEnum.AllUsers,
                FolderCreate = CMS.SiteProvider.SecurityAccessEnum.AllUsers,
                FolderDelete = CMS.SiteProvider.SecurityAccessEnum.AllUsers,
                FolderModify = CMS.SiteProvider.SecurityAccessEnum.AllUsers,
                Access = CMS.SiteProvider.SecurityAccessEnum.AllUsers,
            };
    
            mediaLibraryInfo.Insert();
    
            return mediaLibraryInfo;
        }


Now the code above doesn't actually associate the media library to a group, it only creates a "global" one. In order to associate it to a group, just add one line of code!

    
            mediaLibraryInfo.LibraryGroupID = groupId;

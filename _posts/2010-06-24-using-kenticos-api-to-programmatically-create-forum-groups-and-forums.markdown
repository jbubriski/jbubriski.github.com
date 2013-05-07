---
date: '2010-06-24 13:00:42'
layout: post
slug: using-kenticos-api-to-programmatically-create-forum-groups-and-forums
status: publish
title: Using Kentico's API to Programmatically Create Forum Groups and Forums
wordpress_id: '464'
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

Building off my last post about [Using Kentico's API to Programmatically Create a Media Library](http://www.johnnycode.com/blog/2010/06/23/using-kenticos-api-to-programmatically-create-a-media-library/), our customer also needed to have Forum Groups and Forums automatically created when a Kentico Group was created.

A Forum Group in Kentico is the outer forum entity, and the Forums inside that Forum Group are the different areas where people actually post threads. It is a standard online forum configuration.  Forum Groups can be stand alone, or belong to a Community Group. Using the API, we can create Forum Groups and Forums programmatically.

## The Code

The code is very similar to creating Media Libraries. The main difference is that we're using the ForumGroupInfo and ForumInfo classes. First we "new up" the ForumGroupInfo class, associate it with our group, and save it to the database. All we need is a code name, display name, and the group's ID.

    public static ForumGroupInfo CreateForumGroup(string codeName, string displayName, int groupId)
        {
            var forumInfo = new ForumGroupInfo
            {
                GroupGroupID = groupId,
                GroupName = codeName,
                GroupDisplayName = displayName,
                GroupSiteID = CMSContext.CurrentSiteID
            };
    
            forumInfo.Insert();
    
            return forumInfo;
        }

Now that we have the ForumGroupInfo object associated with our Group, we can go and create the individual forums that comprise the Forum Group. Again, very similar code, albeit it is a bit lengthier. The big things to note here are that we are "newing up" a ForumInfo object, configuring a bunch of settings (including forum permissions), and saving it to the database. The only slightly strange thing I found was that I was required to set ForumThreads and ForumPosts, which I think are simply counts, so I set them to 0.

    private static ForumInfo CreateForum(ForumGroupInfo forumGroupInfo, string codeName, string displayName)
        {
            var forumInfo = new ForumInfo
            {
                ForumGroupID = forumGroupInfo.GroupID,
                ForumName = codeName,
                ForumDisplayName = displayName,
                ForumSiteID = CMSContext.CurrentSiteID,
                ForumOpen = true,
                ForumIsLocked = false,
                ForumModerated = true,
    
                ForumThreads = 0,
                ForumPosts = 0,
    
                AllowAccess = SecurityAccessEnum.AllUsers,
                AllowAttachFiles = SecurityAccessEnum.AllUsers,
                AllowMarkAsAnswer = SecurityAccessEnum.AllUsers,
                AllowPost = SecurityAccessEnum.AllUsers,
                AllowReply = SecurityAccessEnum.AllUsers,
                AllowSubscribe = SecurityAccessEnum.AllUsers,
            };
    
            // Inherit the discussion action permissions from the forum group
            forumInfo.SetValue("ForumDiscussionActions", null);
    
            forumInfo.Insert();
    
            return forumInfo;
        }

So that is the basic code for creating forums and forum groups. Not every one of those fields are required, but it definitely does include the required ones. Here is one additional setting you can use to have your forum inherit some of its settings from the forum group.

	// Inherit the discussion action permissions from the forum group
	forumInfo.SetValue("ForumDiscussionActions", null);

Using that code above directly accesses the underlying data object for the ForumInfo class. The reason we do it this way is that the normal properties on the ForumInfo object are all bools! You can't set a bool to null, unless it is nullable, which these are not. Setting it to null tells Kentico to inherit the value from the forum group. This also applies to some other settings on the ForumInfo object. If you want to know which ones you can inherit, just check out the actual Forum Configuration UI, and look for the settings that have a checkbox for "Inherit from parent".

Now for a given Forum Group you can create as many Forums as you need. One little caveat: Be careful about the naming conventions of some of the properties on the ForumGroupInfo object. Properties whose name contains "Group" may be referencing the Forum Group, OR the Community Group. Just check the intellisense, or just remember that **"GroupGroupID" stands for the ID of the Community Group**, and **"GroupID" stands for the Forum Group ID**. Happy coding!

---
date: '2012-02-28 08:00:01'
layout: post
slug: getting-a-list-of-alternative-forms
status: publish
title: Getting a List of Alternative Forms
wordpress_id: '1047'
categories:
- Kentico
- Programming
tags:
- Kentico Alternative Forms
- Kentico BizForms
- SQL
---

I forget why I needed to do this, but I was doing some heavy development around [Kentico](http://www.kentico.com/)'s [BizForm](http://www.johnnycode.com/blog/tag/kentico-bizforms/)'s at the time and needed to pull back a list of alternative forms for a given BizForm. It's not very complex, but it might not be obvious if you're not familiar with Kentico's database structure and their use of classes.

Anyway, here is the code:

    
    SELECT ca.FormID, ca.FormDisplayName
    FROM CMS_Class cc
    JOIN CMS_AlternativeForm ca ON ca.FormClassID = cc.ClassID
    WHERE cc.ClassName = 'BizForm.ContactUs'


Let me know if this helped you!

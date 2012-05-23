---
date: '2012-02-21 08:00:36'
layout: post
slug: filtering-out-linked-documents
status: publish
title: Filtering Out Linked Documents
wordpress_id: '1023'
categories:
- Kentico
tags:
- Kentico CMS
- Linked Documents
- Menu Web Parts
- Repeater
---

Note: I wanted to add some screenshots to this post, but didn't have the time. I don't think it's super important, but it would definitely help outline the potential issue with Linked Documents.

Linked Documents are a great feature of Kentico.  They allow you to create a page that is essentially a shortcut to another page in the content tree.  To create a linked document you simply create a new document, and you select "Linked Document" instead of selecting a document type. If you're not familiar with the functionality, check out the [well-written docs](http://devnet.kentico.com/docs/devguide/index.html?creating_a_linked_document.htm).

While linked documents provide some great functionality they can also cause a duplication issue.  If you're using a Repeater to select a path that contains both the original and the linked document, both will appear in the list!

## Repeaters

Fixing this with a repeater is easy.  Simply configure the repeater and check the box that says "Filter out duplicate documents"!

Piece of cake!

## Other List Controls

But what about menu web parts like the CSS List Menu or Drop Down Menu?  This is a little trickier since they don't have options to automatically filter out the linked documents.  Instead we can do it using a simple SQL Where clause.  If a document is a Linked Document, the "NodeLinkedNodeID" field in the CMS_Tree table will be the ID of the original Tree Node.  So we can use this as the Where clause for the menu web part:

    NodeLinkedNodeId IS NULL"

**(Note: you don't need to put "WHERE" at the beginning of the where clause when configuring Kentico controls)**

Another piece of cake!

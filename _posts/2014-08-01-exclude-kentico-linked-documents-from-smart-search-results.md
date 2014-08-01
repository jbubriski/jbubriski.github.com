---
date: '2014-08-01 8:00:00 -04:00'
layout: post
title: Exclude Kentico Linked Documents from Smart Search Results
slug: exclude-kentico-linked-documents-from-smart-search-results
description: How to exclude linked documents from Kentico's Smart Search results
categories:
- Kentico
tags:
- Smart Search
- ECommerce
---

It's pretty easy.  Simply go into the Smart Search Results Web Part and set the `Search condition` to:

    -NodeLinkedNodeID:[0 TO 999999999]

Image:

![Kentico Smart Search Results Web Part Settings Dialog](/assets/images/2014-08-01-exclude-kentico-linked-documents-from-smart-search-results/smart-search-results-web-part-settings-dialog.png)


Another quick tip is to exclude disabled products from your search results if you're using E-commerce:

    -NodeLinkedNodeID:[0 TO 999999999] AND SKUEnabled:true

That's it!

## Explanation

If you're wondering what that funky syntax is, it's [Lucene Query Parser Syntax](http://lucene.apache.org/core/2_9_4/queryparsersyntax.html) (technically [Lucene.net](http://lucenenet.apache.org/), but I think the same syntax applies).  It basically says:

- "-" - Exclude...
- "NodeLinkedNodeID" - Documents (Nodes) where the NodeLinkedNodeID is...
- ":[0 TO 999999999]" - Between 0 and 999999999.

So if the NodeLinkedNodeID field has a number in it, it's a Linked Document and we want to exclude it.
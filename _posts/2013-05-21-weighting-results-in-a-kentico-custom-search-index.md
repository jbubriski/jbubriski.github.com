---
date: '2013-05-21 8:00:00 -04:00'
layout: post
title: Weighting Results in a Kentico Custom Search Index
slug: weighting-results-in-a-kentico-custom-search-index
description: How to weight result in a Kentico Custom Search Index with Lucene.net.
categories:
- Programming
tags:
- Kentico
- Kentico Custom Search Indexes
- Lucene.net
- CMS
---

Kentico's search uses [Lucene.net](http://lucenenet.apache.org/ "Lucene.net Search Engine Library") under the hood to provide a fast and powerful search experience.

However, as much as Kentico does to make the options flexible, it's impossible to anticipate all the different scenarios.  Sometimes you need to create a custom search index.  Kentico provides basic instructions on how to [define custom index content](http://devnet.kentico.com/docs/7_0/devguide/index.html?smart_search_defining_custom_index_content.htm "Defining custom index content with Kentico Smart Search") in their [Developer Guide](http://devnet.kentico.com/docs/7_0/devguide/index.html "Kentico CMS 7.0 Developer Guide"), and they have an additional [webinar and sample project](http://devnet.kentico.com/Videos/System-Management/Smart-Search-in-Kentico-CMS-6.aspx "Smart Search Customization in Kentico CMS 6") that goes more in-depth.

## Use Case And Solution

A common problem you may have though, is that the search indexer wont understand the context of the content you're indexing.  It doesn't understand how it should weight certain results.  For example, if you're indexing products and product documentation, you probably want the product pages to rank higher than the documentation pages.

To accomplish custom weighting of your search index results, we can simply specify a "boost" value on a document being indexed, so that it receives more or less weight when it matches the search terms.

If we want a document to rank higher, we set a boost value over 1.  To rank lower, set a boost value under 1.

In one custom implementation we did for a client we created a custom search index for media items, based on their related content.  ex. for Product A, there is a related PDF, simply linked via a custom document field.  The PDF document didn't contain much content, so we actually referenced the fields on the related Products to get relevant search data.

However, PDF's were each used by many products, and therefore, they ranked higher than the products themselves!  To overcome this, we "downgraded" their search weight by setting a low boost value.

## Show Me The Code!

It was really quite simple once I figured out that the boost value is what needs to be adjusted.  Within your index loop, just before adding a search document to the index, set the boost value:

  // Inside the loop...
	
	// Create new document for current text file
	var searchDocument = SearchHelper.CreateDocument(SearchHelper.CUSTOM_SEARCH_INDEX, Guid.NewGuid().ToString(), SearchHelper.INVARIANT_FIELD_VALUE, createdDate, SearchHelper.INVARIANT_FIELD_VALUE);
	
	// Add search data
	// ...
	
	// Decrease the relvancy of this document so we don't overtake products.
	searchDocument.SetBoost(0.1f);
	
	// Add document to the index
	indexWriter.AddDocument(searchDocument);

You could easily hook up an algorithm to adjust the boost value yourself, but in our case a static value for this index worked fine.  And that's all there is to it!

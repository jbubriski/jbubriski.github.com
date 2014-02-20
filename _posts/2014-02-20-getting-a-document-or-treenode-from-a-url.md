---
date: '2014-02-20 8:00:00 -04:00'
layout: post
title: Getting a Document or TreeNode from a URL
slug: getting-a-document-or-treenode-from-a-url
description: If you have a URL and want the Document or TreeNode, I can help you!
categories:
- Programming
tags:
- Kentico CMS
---

I was creating a web service method that was called via AJAX from an existing page.  I needed to get the Document from which the service was being called but I didn't want to dump the DocumentID/NodeID to the page.  This is how my request was made:

	$.post('/Path/To/Service.aspx'
	    , {
	        documenturl: document.location.href
	    });

Within the service I had the document URL of the calling page, but I needed more information about that Document.  Using the `PageInfoProvider` I was able to translate the URL into a `PageInfo` object:

	var pageInfo = PageInfoProvider.GetPageInfoForUrl(url, "en-US", (string)null, true, true, SiteInfoProvider.CurrentSiteName);

From there you can get the full Document/TreeNode given the ID's on the `PageInfo` object:

	pageInfo.DocumentID
                
    pageInfo.NodeID

I was able to find this information by reflecting `CMS.URLRewritingEngine.dll` and examining the `URLRewriter` class and the `RewriteUrl` method.
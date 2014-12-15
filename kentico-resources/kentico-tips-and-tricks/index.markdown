---
date: '2011-10-13 00:08:33'
layout: page
slug: kentico-tips-and-tricks
status: publish
title: Kentico Tips and Tricks
wordpress_id: '1030'
group: misc
---

Here is a list of some little tips and tricks and helper helper methods. I figured this was a little easier to read/find/reference than individual posts for this type of data.  I'll try and keep things here as accurate as possible, but they may not be complete.  But feel free to give feedback and let me know if there are some gaping holes or terrible mistakes.

## DataHelper.DataSourceIsEmpty

This Static method is actually a shortcut to **SqlHelperClass.DataSourceIsEmpty** which performs a series of checks on a datasource object to see if it actually has data. It takes an object, but under the hood it handles these data source types:

- DataSet
- DataTable
- DataView
- PagedDataSource
- ArrayList

Usage:

    var dataSet = GetData(); // Some DAL method that would return a DataSet
    
    if(DataHelper.DataSourceIsEmpty())
    {
        // DataSet has data, do databinding
    }


## Getting a URL for a File or Image

If you're storing images and files and you need to reference them in transformations or custom code, you can use the **GetFile.aspx** page to reference the actual file.

Usage:

    &%# ResolveUrl("~/CMSPages/GetFile.aspx?guid=" + Eval("ProductPhoto").ToString()) %&gt;

Or given a file GUID you can get the URL programmatically:
    
    string fileUrl = ResolveUrl(AttachmentManager.GetAttachmentUrl(attachmentGuid, nodeAlias));


## Documents

Getting Documents from the Kentico API is easy.  You can use the TreeProvider, or you can use the static methods on the TreeHelper:

    DataSet ds = TreeHelper.GetDocuments(CMSContext.CurrentSiteName, path, TreeProvider.ALL_CULTURES, false, productTypes, "", "SKUName", TreeProvider.ALL_LEVELS, true, -1);


## Redirecting to the First Child Document

Here is a macro for automatically redirecting to the first child document.  Put it in Properties > Navigation > URL Redirection.

{% raw %}
	{%Documents[NodeAliasPath].Children[0].NodeAliasPath#%}
{% endraw %}

For Kentico 7, you may need to add this web.config setting for the above macro to work.  It has to do with the [security checks around macros](http://devnet.kentico.com/forums?forumid=68&threadid=42978).

	<add key="CMSCheckPermissionsForDocumentCollection" value="false" />

*Make sure that when you deploy a site using this mechanism that you update the macro signatures after pushing the site. Otherwise you will see some weird behavior like the macros rendering to nothing, and your menu links acting all weird.*

## Custom (Transformation) Method for Getting URL from Node

This is probably the "right" way to get the URL of a Node.  I reflected Kentico's code to extract the mechanism for getting the URL correctly.

	public string GetNodeUrl(string stringNodeId)
    {
        var nodeId = int.Parse(stringNodeId);
        var tree = new TreeProvider();

        var treeNode = tree.SelectSingleNode(nodeId);

        return TransformationHelper.HelperObject.GetDocumentUrl(CMSContext.CurrentSiteName, treeNode.NodeAliasPath, treeNode.DocumentUrlPath);
    }

If you add the above function to `public partial class CMSTransformation` class you can easily access it from a transformation:

<%-- Gets the URL to the parent node %>
<%# GetNodeUrl(EvalText("ParentNodeID")) %>

That is reusable and looks a lot better than what was suggested by Kentico support:

	<%# CMS.CMSHelper.CMSContext.GetDocumentUrl(CMS.DocumentEngine.DocumentHelper.GetDocument(CMS.GlobalHelper.ValidationHelper.GetInteger(Eval("NodeParentID"), 0), "en-US", new CMS.DocumentEngine.TreeProvider()).DocumentID) %>

Just be careful how you use it!  **Avoid n + 1!**


## Reusable custom queries

Instead of hard coding a query inside of a dropdownlist field or elsewhere, store it on a document type or custom table  and manage it in one place while reusing it in multiple places.

1. Go to the Queries tab of a custom document type or custom table.
2. Create the query.
3. Reference it via a macro in other places via a macro:

  {% Queries["customtable.customtablename.queryname"].QueryText #%}

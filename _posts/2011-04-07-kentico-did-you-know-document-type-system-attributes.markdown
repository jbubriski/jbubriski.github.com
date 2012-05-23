---
date: '2011-04-07 13:00:47'
layout: post
slug: kentico-did-you-know-document-type-system-attributes
status: publish
title: 'Kentico "Did You Know": Document Type System Attributes'
wordpress_id: '802'
categories:
- Kentico
- Programming
tags:
- Kentico "Did You Know"
- Kentico CMS
- Kentico Document Types
- Kentico System Attributes
---

Did you know that you can create Document Type Attributes that map to System Attributes?  System Attributes are the fields that are inherent to all documents in Kentico, and are _generally_ edited through the Properties tab in the CMS Desk (Some are not editable, and some are hidden entirely).  Here are some System Attributes you might recognize:



	
  * NodeAlias

	
  * NodeAliasPath

	
  * NodeCustomData

	
  * DocumentName

	
  * DocumentMenuCaption

	
  * DocumentPageTitle

	
  * DocumentTags

	
  * DocumentCustomData


Notice above that there are two type of System Attributes: Node Attributes and Document Attributes.  The difference is that the Node Attributes "live" on the Tree Node object and are stored in the CMS_Tree table while the Document Attributes "live" on the Document object and are stored in the CMS_Document table.

Note: In case you don't know, attributes are the fields on a document type.  I may use the term attribute and field interchangeably.

If you want to see a System Attribute in action, take a look at the built in Blog Post Document Type "DocumentTags" attribute:

<span class="caption" title="BlogPost DocumentTags System Attribute"></span>[![BlogPost DocumentTags System Attribute](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/BlogPost-DocumentTags-System-Attribute.png)](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/BlogPost-DocumentTags-System-Attribute.png)

Notice that the top options are grayed out.  The field relies on the configuration of the inherited System Attribute.  In this case we have a field called "Tags" that is relying on the "DocumentTags" System Attribute.  While we can't change the fact that it is a "Long Text" attribute type, we can change the field type which dictates the control that is used when interacting with the field.  The Document Type uses the Tag Selector control.

So you might say to yourself: "When is this useful, I can probably already edit that data through the Properties tab, right?" That is exactly right, but you would need to go to the properties tab every time you were creating or editing a document!  Instead of having to drill in there, you can simplify your process so that the field shows up in the Form tab.  This way you can set the tags while you're inputting the rest of the content for your Blog Post or other Document Type.

Keep in mind that while you **_can_ **use System Attributes to change most core data for a document or node, **_that doesn't mean you should_**.  Modifying the DocumentClassID would probably end badly for your content editors (or maybe even you!).

Another way you might use this feature would be to store custom data on every document or node.  Both objects have a CustomData field called DocumentCustomData and NodeCustomData.  Since they exist on every document in the CMS, they will always be available via API calls or inside a transformation.  This is a little easier than creating and configuring an actual attribute on every single document type.  So if you are selecting multiple type of documents within a repeater, these fields would both be available to the transformation.  Normally when you "join" different document types in a repeater, you can only access the core attributes, and not the custom ones you define.

Below is a full list of all of the Document Attributes:



	
  * DocumentCampaign

	
  * DocumentCheckedOutByUserID

	
  * DocumentCheckedOutVersionHistoryID

	
  * DocumentCheckedOutWhen

	
  * DocumentContent

	
  * DocumentCreatedByUserID

	
  * DocumentCreatedWhen

	
  * DocumentCulture

	
  * DocumentCustomData

	
  * DocumentExtensions

	
  * DocumentForeignKeyValue

	
  * DocumentGroupWebParts

	
  * DocumentID

	
  * DocumentLastPublished

	
  * DocumentMenuCaption

	
  * DocumentMenuClass

	
  * DocumentMenuClassHighlighted

	
  * DocumentMenuClassOver

	
  * DocumentMenuItemHideInNavigation

	
  * DocumentMenuItemImage

	
  * DocumentMenuItemImageHighlighted

	
  * DocumentMenuItemImageOver

	
  * DocumentMenuItemInactive

	
  * DocumentMenuItemLeftImage

	
  * DocumentMenuItemLeftImageHighlighted

	
  * DocumentMenuItemLeftImageOver

	
  * DocumentMenuItemRightImage

	
  * DocumentMenuItemRightImageHighlighted

	
  * DocumentMenuItemRightImageOver

	
  * DocumentMenuJavascript

	
  * DocumentMenuRedirectUrl

	
  * DocumentMenuStyle

	
  * DocumentMenuStyleHighlighted

	
  * DocumentMenuStyleOver

	
  * DocumentModifiedByUserID

	
  * DocumentModifiedWhen

	
  * DocumentName

	
  * DocumentNamePath

	
  * DocumentNodeID

	
  * DocumentPageDescription

	
  * DocumentPageKeyWords

	
  * DocumentPageTemplateID

	
  * DocumentPageTitle

	
  * DocumentPriority

	
  * DocumentPublishedVersionHistoryID

	
  * DocumentPublishFrom

	
  * DocumentPublishTo

	
  * DocumentRatings

	
  * DocumentRatingValue

	
  * DocumentShowInSiteMap

	
  * DocumentStylesheetID

	
  * DocumentTagGroupID

	
  * DocumentTags

	
  * DocumentType

	
  * DocumentUrlPath

	
  * DocumentUseCustomExtensions

	
  * DocumentUseNamePathForUrlPath

	
  * DocumentWebParts

	
  * DocumentWildcardRule

	
  * DocumentWorkflowStepID


...And the Node Attributes

	
  * IsSecuredNode

	
  * NodeACLID

	
  * NodeAlias

	
  * NodeAliasPath

	
  * NodeBodyElementAttributes

	
  * NodeCacheMinutes

	
  * NodeChildNodesCount

	
  * NodeClassID

	
  * NodeCustomData

	
  * NodeDocType

	
  * NodeGroupID

	
  * NodeGUID

	
  * NodeHeadTags

	
  * NodeID

	
  * NodeInheritPageLevels

	
  * NodeLevel

	
  * NodeLinkedNodeID

	
  * NodeName

	
  * NodeOrder

	
  * NodeOwner

	
  * NodeParentID

	
  * NodeSiteID

	
  * NodeSKUID

	
  * RequiresSSL



---
date: '2014-01-13 8:00:00 -04:00'
layout: post
title: Programmatically Add a Tab to the Kentico UI 
slug: programmatically-add-a-tab-to-the-kentico-ui
description: How to programmatically add a tab to the Kentico UI.
categories:
- Kentico
tags:
- Kentico CMS
- Kentico BizForms
- Kentico Custom Modules
- Kentico Global Event Handlers
---

*First post in 2014!  Woohoo!*

Adding tabs to Kentico's CMS Desk and Site Manager is pretty easy.  The Modules UI let's you do just that.  However, there are 2 important limitations here:

1. Not all areas of the CMS Desk/CMS Site Manager support adding tabs through the Modules UI.
2. Building a custom module that can be exported/imported is not as easy when using the Modules UI.

There must be another way!

Enter Kentico event handlers...


## Background

Before I get into the details of solving a specific problem, let me a give a quick overview of Kentico Modules and Event Handlers.

Kentico contains global events that fire for almost any situation.  You can register custom event handlers to take action when a given event takes place.  For a complete reference of available events, refer to the [Global Events documentation](http://devnet.kentico.com/docs/7_0/devguide/index.html?event_handlers_overview.htm "Handling Global Events").

The definition of a [Kentico Module](http://devnet.kentico.com/docs/7_0/devguide/index.html?custom_modules.htm "Developing custom modules") is pretty loose, but here are a few important facts.  If you create a custom module in the CMS Site Manager, it will allow you to easily export (and subsequently import) the related code.  Exporting a module will include code from:

- ~/App_Code/CMSModules/[Module Code Name]
- ~/CMSModules/[Module Code Name] 

Now that we know **what to code** and **where to put it**, we can actually **get this done**!


## The Problem

Let's say that we want to be able to add a tab to the BizForm interface.  If you look at the BizForm module in the CMS Site Manager, you can see that they don't define the tabs within the UI.  They're actually hard-coded in an .aspx file!  What's a dev to do???


## The Solution

But wait!  It turns out that most (if not all) of the admin pages in Kentico inherit from the CMSPage class, and there are global events associated with that class!  So we should be able to handle an event that will allow us to inject a tab into the UI! 

*Note: Refer to the [documentation on handling custom events](http://devnet.kentico.com/docs/7_0/devguide/index.html?event_handlers_overview.htm "Handling Global Events") if you have any issues getting the event handlers registered.  I do include complete sample code below, but refer to the documentation for a complete explanation of what it all means.*

First, we'll create a class that will register/handle the events:

	~/App_Code/CMSModules/MyCustomModule/MyCustomModuleLoader.cs  

Add the custom event handler for when a page of type `CMSPage` loads:

	public override void Init()
    {
		CMSPage.OnAfterPageLoad += CMSPage_OnAfterPageLoad;
	}

And then add the tab if our criteria is met:

	protected void CMSPage_OnAfterPageLoad(object sender, EventArgs e)
    {
        var cmsPage = (CMSPage)sender;
        var formId = HttpContext.Current.Request.QueryString["FormID"];

        var cmsBizFormPage = cmsPage as CMSBizFormPage;

        if (cmsBizFormPage != null)
        {
            if (cmsBizFormPage.PersistentEditedObject is BizFormInfo)
            {
                cmsPage.SetTab(int.MaxValue - 1, "My Custom Tab", cmsPage.ResolveUrl("~/CMSModules/MyCustomModule/Tools/MyCustomTab.aspx?formid=" + formId), "SetHelpTopic('helpTopic', 'general_tab');");
            }
        }
    }

In the above code we check if the page is a more specifically a `CMSBizFormPage`, and that the `PersistentEditedObject` is in fact a `BizFormInfo` object.  You can use whatever criteria you want, or even do it globally (although that probably isn't a good idea)!

And here is the complete code:

	using System;
	using System.Web;
	using CMS.FormEngine;
	using CMS.SettingsProvider;
	using CMS.UIControls;
	
	[CustomPageEvents]
	public partial class CMSModuleLoader
	{
	    /// <summary>
	    /// Attribute class that ensures the loading of custom handlers
	    /// </summary>
	    private class CustomPageEventsAttribute : CMSLoaderAttribute
	    {
	        /// <summary>
	        /// Called automatically when the application starts
	        /// </summary>
	        public override void Init()
	        {
	            // Assigns custom handlers to the appropriate events
	            CMSPage.OnAfterPageLoad += CMSPage_OnAfterPageLoad;
	        }
	
	        protected void CMSPage_OnAfterPageLoad(object sender, EventArgs e)
	        {
	            var cmsPage = (CMSPage)sender;
	            var formId = HttpContext.Current.Request.QueryString["FormID"];
	
	            var cmsBizFormPage = cmsPage as CMSBizFormPage;
	
	            if (cmsBizFormPage != null)
	            {
	                if (cmsBizFormPage.PersistentEditedObject is BizFormInfo)
	                {
	                    cmsPage.SetTab(int.MaxValue - 1, "My Custom Tab", cmsPage.ResolveUrl("~/CMSModules/MyCustomModule/Tools/MyCustomTab.aspx?formid=" + formId), "SetHelpTopic('helpTopic', 'general_tab');");
	                }
	            }
	        }
		}
	}


## Exporting the Custom Module

If you want to be able to export and import this piece of functionality as a real live bone-fide custom module, all you need to do is "create" a custom module in the CMS Site Manager.  Go to CMS Site Manager > Development > Modules and create a new module there.  Just make sure that the code name of the module matches the folder names you might have in `~/App_Code/CMSModules/` and `~/CMSModules/`.  Then you can export your custom module from the dropdown menu next to it in the grid:

![Exporting a Custom Module](/assets/images/2014-01-13-programmatically-add-a-tab-to-the-kentico-ui/exporting-a-custom-module.png)

That's it!
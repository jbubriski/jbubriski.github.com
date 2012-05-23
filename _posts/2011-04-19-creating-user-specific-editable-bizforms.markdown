---
date: '2011-04-19 13:00:09'
layout: post
slug: creating-user-specific-editable-bizforms
status: publish
title: Creating User Specific, Editable BizForms
wordpress_id: '835'
categories:
- Kentico
- Programming
tags:
- .NET Framework
- ASP.NET
- C#
- Code
- Kentico API Programming
- Kentico BizForms
- Kentico CMS
---

In this article I'll show you how to create a special type of BizForm that will allow each user to edit their specific form data over and over. When a user returns to a page that has the BizForm on it, their data will be automatically loaded from the BizForm table.  This is a simple and easy way to store per user data, without mucking with the System Tables which aren't intended to store this type of data. You also retain the benefits that a BizForm has over a System Table (A view of the data, Notifications, attachments, etc.).  Here we go...

You can download the files that are used in this article here: [Bizform_continue Web Part Files](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/Bizform_continue.zip).

First, we'll clone the existing BizForm Web Part.

<span class="caption" title="Cloning the existing BizForm webpart"></span>[![Cloning the existing BizForm webpart](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/01-Cloning-the-existing-BizForm-webpart.jpg)](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/01-Cloning-the-existing-BizForm-webpart.jpg)

We don't need to change anything with the configuration, but we'll use our own set of files for the Web Part.  I will show the code later below, and you can download the zip here: [Bizform_continue Web Part Files](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/Bizform_continue.zip).

<span class="caption" title="Cloning the existing BizForm webpart settings"></span>[![Cloning the existing BizForm webpart settings](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/02-Cloning-the-existing-BizForm-webpart-settings.jpg)](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/02-Cloning-the-existing-BizForm-webpart-settings.jpg)

Now that we have our new Web Part setup, let's go make a new BizForm.

<span class="caption" title="Create a new BizForm"></span>[![Create a new BizForm](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/03-Create-a-new-BizForm.jpg)](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/03-Create-a-new-BizForm.jpg)

Create a field in that BizForm that will hold the User ID.  Set the Default Value property to be this macro so that the User ID is filled automatically:

{% raw %}
	{<span></span>%cmscontext.currentuser.userid%<span></span>}
{% endraw %}

<span class="caption" title="Create a field to store the User ID"></span>[![Create a field to store the User ID](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/04-Create-a-field-to-store-the-User-ID.jpg)](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/04-Create-a-field-to-store-the-User-ID.jpg)

Make sure you don't show the field on the public form!  We want to rely on the macro to tell us who is editing a row.  My crappy screenshot above has it selected, but just de-select it and re-save if you already saved the field.

<span class="caption" title="Don't show the field on the pulic form"></span>[![Don't show the field on the pulic form](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/05-Dont-show-the-field-on-the-pulic-form.jpg)](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/05-Dont-show-the-field-on-the-pulic-form.jpg)

Now make some other data fields, whatever you want!

<span class="caption" title="Create some more fields to store user data"></span>[![Create some more fields to store user data](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/06-Create-some-more-fields-to-store-user-data.jpg)](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/06-Create-some-more-fields-to-store-user-data.jpg)

Now that our BizForm is all set, let's add it to a page template.  I am adding mine to the main content area of the home page, just for testing.  Make sure you select our new Web Part, and not the original.

<span class="caption" title="Add our new BizForm Continue Web Part"></span>[![Add our new BizForm Continue Web Part](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/07-Add-our-new-BizForm-Continue-Web-Part.jpg)](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/07-Add-our-new-BizForm-Continue-Web-Part.jpg)

For the properties, all we really need is the Form Name, but I also set "Display to Roles" to be only authenticated users, since the rows will be tied to a specific user.

<span class="caption" title="Setting the Web part properties of our BizForm Continue"></span>[![Setting the Web part properties of our BizForm Continue](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/08-Setting-the-Web-part-properties-of-our-BizForm-Continue.jpg)](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/08-Setting-the-Web-part-properties-of-our-BizForm-Continue.jpg)

Now let's take a look at the code.  The only real change is that we added a method that happens before load of the data for the form.  We simply call a method that contains the following code:

    var bizFormInfo = BizFormInfoProvider.GetBizFormInfo(viewBiz.FormName, viewBiz.SiteName);
    
    if (bizFormInfo != null)
    {
    	var dataClassInfo = DataClassInfoProvider.GetDataClass(bizFormInfo.FormClassID);
    
    	if (dataClassInfo != null)
    	{
    		var connection = ConnectionHelper.GetConnection();
    		var whereCondition = String.Format("UserId = '{0}'", CMSContext.CurrentUser.UserID);
    		var dataSet = connection.ExecuteQuery(dataClassInfo.ClassName + ".selectall", null, whereCondition);
    
    		if (!DataHelper.DataSourceIsEmpty(dataSet) && dataSet.Tables[0].Rows.Count == 1)
    		{
    			var formRecordId = ValidationHelper.GetInteger(dataSet.Tables[0].Rows[0][0], 0);
    
    			viewBiz.FormMode = FormModeEnum.Update;
    			viewBiz.ItemID = formRecordId;
    
    			return;
    		}
    
    		viewBiz.FormMode = FormModeEnum.Insert;
    	}
    }

We get the BizFormInfo, the DataClassInfo, and check to see if there is an existing record.  If there is an existing record we set the BizForm to Update mode and tell it what row to load .  If there is no record found, we simply use insert mode.

Hope that this was clear and helps somebody make their site even more awesome!

You can download the files that are used in this article here: [Bizform_continue Web Part Files](http://www.johnnycode.com/blog/wp-content/uploads/2011/04/Bizform_continue.zip).

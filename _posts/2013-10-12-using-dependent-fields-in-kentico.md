---
date: '2013-10-12 8:00:00 -04:00'
layout: post
title: Using Dependent Fields in Kentico CMS
slug: using-dependent-fields-in-kentico
description: How to configure form fields in Kentico that depend on eachother.  Hide/show or enable/disable fields based on values in other fields.
categories:
- Kentico
tags:
- Kentico CMS
- Kentico Macro Expressions
---

Kentico has a pretty decent macro engine under the hood, and you can use it almost anywhere inside the CMS.  A perfect place that macros shine is when you're working with forms, and you want them to be more dynamic.  Clients often ask us to show/hide or enable/disable fields based on the values in other fields.  We can accomplish these feats by enabling dependent field options for each form field.

For any form editor, with a field selected, scroll to the bottom of the field's properties (Make sure you're in advanced mode).  You should see these properties:

- Visible condition
- Enabled condition
- Has depending fields
- Depends on another field

![Dependent field settings](/assets/images/2013-10-12-using-dependent-fields-in-kentico/dependent-field-settings.png)

Enabling "Has depending fields" on a field will cause a postback on the form, which allows other fields to potentially make changes to themselves at that time.  For those dependent fields you would enable "Depends on another field".  Additionally, you would set the visible or enabled condition.  Also, custom form controls could take other actions as well such as reloading a different set of data. 

## A Practical Example

A prime example where dependent fields can be used is with Country and State values.  If you want to capture a user's country and state you can use the built in Country Selector, however it stores data in a odd way.  You either get the string names of the country and state, the country ID, or the state ID.  Ideally, I would want the country and state ID's both as integers but I'm not sure why that's not an option.

Let's say that you have a Contact Us form built with a BizForm, and you want your customers to provide their country and state.  To do this ourselves, we'll make 2 drop down fields, and "link" them up using dependent field options.

First, create the Country drop down and set the following properties:

- Column Name: **Country**
- Attribute Type: **Integer**
- Field Caption: **Country**
- Data Source: **SQL Query**
- Has depending fields: **Checked**

And set the SQL query to:

	SELECT CountryID, CountryDisplayName
	FROM CMS_Country

Then create the State drop down and set the following properties

- Column Name: **State**
- Attribute Type: **Integer**
- Field Caption: **State**
- Data Source: **SQL Query**
- Depends on another field: **Checked**
- Visible condition: **Country.Value == 271**

And set the SQL query to:

	SELECT StateID, StateDisplayName
	FROM CMS_State

Now, when the form initially loads, the state drop down will be hidden. When the user selects a country, you should see the page flicker as it posts back.  If the user selects the country with ID 271, USA, the state drop down will appear.

So why do we have to do `Country.Value`, and not just `Country`?  A colleague of mine, Ben, pointed this out to me.  `Country` is actually a reference to the field, and not directly to the value.  There are other properties on that field you can reference such as that fields visible or enabled status.

## The Macro Editors

To better develop macros for those conditional fields, you can bring up the macro editors to help you out.  If you click the pencil next to the visible or enabled condition fields, it will pop up the editors.  There are 3 tabs:

- Rule Designer
- Designer
- Code

### The Rule Designer

The rule designer tries to provide you with common scenarios that you might need and presents them as text with placeholders.  I didn't know about this until recently, and it seems like a pretty cool feature that caters to non-developers. 

![Dependent field settings](/assets/images/2013-10-12-using-dependent-fields-in-kentico/macro-editor-rule-designer.png)

### Designer

The designer is a little more developer oriented, but still tries to hold your hand a bit.  It allows you to select left hand value along with an operator (which may require a right hand value).  Then you can add additional rules and re-order as you see fit.

![Dependent field settings](/assets/images/2013-10-12-using-dependent-fields-in-kentico/macro-editor-designer.png)

### Code

The code editor is just the plain-jane editor with some intellisense support.  If you're a seasoned Kentico Macro user and you know what you're doing, this is probably the way to go. 

![Dependent field settings](/assets/images/2013-10-12-using-dependent-fields-in-kentico/macro-editor-code.png)

There you have it!  Hope this helps someone!
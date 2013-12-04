---
date: '2013-11-13 8:00:00 -04:00'
layout: post
title: Using Macros Inside Dropdown List Fields in Kentico CMS
slug: using-macros-inside-dropdown-list-fields-in-kentico-cms
description: How to customize Kentico to allow macros to work inside the dropdown list field data source property in Document Types and other object types.
categories:
- Kentico
tags:
- Kentico CMS
- Kentico Macro Expressions
---

Macros make Kentico a really flexible and powerful CMS.  They are supported almost everywhere in the CMS.  *Almost*...

## The Problem

I was trying to create a dropdown list field that would be dependent on another field in the same document.  There are the [dependent field properties for enabling or hiding the field](/2013/10/12/using-dependent-fields-in-kentico/ "Using Dependent Fields in Kentico CMS"), but I needed to affect the data that was loaded.  I had my dropdown set to use a SQL command to retrieve its values, but the data source property wasn't rendering my macro.  Googling around, I found some articles suggesting that they might work, but only inside the User form:

- [http://stackoverflow.com/questions/15783025/cascading-dropdown-list-for-custom-field-in-kentico-cms](http://stackoverflow.com/questions/15783025/cascading-dropdown-list-for-custom-field-in-kentico-cms)
- [http://stackoverflow.com/questions/18470411/kentico-custom-field-items-based-on-selected-user](http://stackoverflow.com/questions/18470411/kentico-custom-field-items-based-on-selected-user)  

I also found some user voice requests that indicate that support for this feature is coming in v8, but v8 isn't out yet and I need this now!  So what's a dev to do?

## The Solution

Why not just ***add*** macro support!?  We'll need to customize Kentico's code, but it should be easy to do and easy to spot/handle during an hotfix/upgrade conflict.

In `CMSFormControls/Basic/DropDownListControl.ascx.cs`, add the following using directive to the top of the code file: 

    using CMS.CMSHelper;

After the `Page_Load` method, around line 296, add a `OnPreRender` event handler to force the list to load the values when a field may have changed:

    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);

        if (IsPostBack && DependsOnAnotherField)
        {
            dropDownList.Items.Clear();

            LoadAndSelectList();
        }
    }

And around line 336, add the following code to the LoadAndSelectList() method to add macro handling support to the data source property for the SQL query: 

    // Add macro parameters for the current value of each field
    var replacements = new object[Form.FieldEditingControls.Count, 2];

    var i = 0;

    foreach (EditingFormControl field in Form.FieldEditingControls.Values)
    {
        replacements[i, 0] = field.FieldInfo.Name;
        replacements[i, 1] = field.Value;

        i++;
    }

    CMSContext.CurrentResolver.SourceParameters = replacements;

    query = CMSContext.CurrentResolver.ResolveMacros(query);

The resulting method should look something like this:

    /// <summary>
    /// Loads and selects control.
    /// </summary>
    private void LoadAndSelectList()
    {
        if (dropDownList.Items.Count == 0)
        {
            string options = ValidationHelper.GetString(GetValue("options"), null);

            string query = ValidationHelper.GetString(GetValue("query"), null);

            // Add macro parameters for the current value of each field
            var replacements = new object[Form.FieldEditingControls.Count, 2];

            var i = 0;

            foreach (EditingFormControl field in Form.FieldEditingControls.Values)
            {
                replacements[i, 0] = field.FieldInfo.Name;
                replacements[i, 1] = field.Value;

                i++;
            }

            CMSContext.CurrentResolver.SourceParameters = replacements;

            query = CMSContext.CurrentResolver.ResolveMacros(query);

            try
            {
                FormHelper.LoadItemsIntoList(options, query, dropDownList.Items, FieldInfo);
            }
            catch (Exception ex)
            {
                DisplayException(ex);
            }

            FormHelper.SelectSingleValue(selectedValue, dropDownList);
        }
    }

## An Example

The code that we added simply adds all the fields' current values as macros, given the field name.  Now we can reference other fields in the data source property with a SQL query like this one:

{% raw %}
    SELECT ChildId, ChildName
    FROM customtable_Children
    WHERE ParentID = {% ParentId #%}
    UNION ALL
    SELECT 0, ''
    ORDER BY ChildName
{% endraw %}

In the above example there would be a dropdown setup to list parents.  After the parent is selected, the children of that parent would load in the second dropdown.  You should also set the dependent field settings to postback on change of the parents, and possibly show/hide the child dropdown as needed. 

And that's it!  Let me know if this helped or if you find a better way!

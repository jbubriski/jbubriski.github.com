---
date: '2011-10-17 09:00:02'
layout: post
slug: custom-validation-with-bizforms
status: publish
title: Custom Validation with BizForms
wordpress_id: '1042'
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

Ever need to inject some custom validation into a BizForm?  Check it:

Below I've provided a method you can drop into your BizForm code behind, or the code behind of a BizForm clone.  Then, call this method from an event handle for the OnBeforeValidate event.  If _Field A_ has a value this validation method forces the user to enter a value for _Field B_.

Keep in mind that this is **_simply an example_** of adding custom validation.  Just remember: the sky is the limit!

One last quick note: This example used BizForms, but you can probably apply this same technique to Document Forms and Custom Table Forms.

    
    private void ShowErrorIfParentHasValueAndChildIsEmpty(string fieldAName, string fieldBName, string errorMessage)
    {
        var parentControl = (EditingFormControl)uxBizForm.BasicForm.FieldEditingControls[fieldAName];
        var childControl = (EditingFormControl)uxBizForm.BasicForm.FieldEditingControls[fieldBName];
    
        var parentControlValue = parentControl.Value.ToString();
        var childControlValue = childControl.Value.ToString();
    
        if (!string.IsNullOrWhiteSpace(parentControlValue) && string.IsNullOrWhiteSpace(childControlValue))
        {
            var errorLabel = uxBizForm.BasicForm.FieldErrorLabels[fieldBName] as LocalizedLabel;
            errorLabel.Text = errorMessage;
            errorLabel.Visible = true;
    
            uxBizForm.BasicForm.StopProcessing = true;
        }
        else
        {
            var errorLabel = uxBizForm.BasicForm.FieldErrorLabels[fieldBName] as LocalizedLabel;
            errorLabel.Text = "";
            errorLabel.Visible = false;
        }
    }


And here is the wire up code for the event handler (Put this in the SetupControl method):

    
    uxBizForm.OnBeforeValidate += uxBizForm_OnBeforeValidate;


And here is the event handler where you can call the validation method from above:

    
    protected void uxBizForm_OnBeforeValidate()
    {
        ShowErrorIfParentHasValueAndChildIsEmpty("FirstName", "LastName", "We don't like John and Aaron and nobody!");
    }

---
date: '2013-08-13 8:00:00 -04:00'
layout: post
title: Using Custom Settings from a Macro in Kentico CMS
slug: using-custom-settings-from-a-macro-in-kentico-cms
description: Creating a Custom Setting in Kentico CMS, and using it inside a Macro.
categories:
- Programming
tags:
- Kentico CMS
- Custom Settings
- Macros
---

## Creating a Custom Setting

Go to `Site Manager > Development > Custom Settings` and add a new category.  I named mine "Form Field Defaults', name yours whatever you want. *Note that the category name doesn't matter when referencing the macro.*

Create a new settings group.  I named mine "General".

Now you're ready to add your actual setting.  Add a new settings key.  I named mine "Use Default" with a code name of "UseDefault".  I set it to be a bool, with everything else as default.

Now you should see something like this:

![Creating the custom setting](/assets/images/2013-08-13-using-custom-settings-from-a-macro-in-kentico-cms/creating-the-custom-setting.png)

Now under `Site Manager > Settings` you can set the value of your Custom Setting globally and for each site.

After setting appropriate values, you can access the Custom Setting through a macro like this:

{% raw %}
    {%Settings.CustomSettings.General.UseDefault#%}
{% endraw %}

As mentioned above, the setting category isn't actually used.  Not sure why it works this way, and why the macro intellisense doesn't really give you what you need, but whatever, this is what works.

Now that you can access your custom setting, you can use it in things like conditionals.  So if you have a Biz Form or Document Type that is shared across sites, you could, for example, set default values per site: 

{% raw %}
    {%if(Settings.CustomSettings.General.UseDefault == "True") { "Default 1" } else { "Default 2" }#%}
{% endraw %}

That's it!
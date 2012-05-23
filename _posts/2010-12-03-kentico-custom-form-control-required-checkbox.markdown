---
date: '2010-12-03 14:00:55'
layout: post
slug: kentico-custom-form-control-required-checkbox
status: publish
title: 'Kentico Custom Form Control: Required Checkbox'
wordpress_id: '774'
categories:
- Kentico
- Programming
tags:
- .NET Framework
- ASP.NET
- C#
- Code
- Kentico API Programming
- Kentico CMS
---

Kentico is great but nobody is perfect!  One small detail they've missed is a checkbox control that you can set to be "required".  By required I mean "You have to check this box".  After doing some Googling, I found this thread which confirmed my suspicion:

[http://devnet.kentico.com/Forums/f45/t17269/Making-a-Required-CheckBox-in-Alternative-Form.aspx?replyto=17359](http://devnet.kentico.com/Forums/f45/t17269/Making-a-Required-CheckBox-in-Alternative-Form.aspx?replyto=17359)


> "We have validators for empty values, which means that if some field have "Allow empty value" property disable and is not filled (is null), validator will appear.

But checkbox control is never null. It is true, or false, but never null. So you can't validate it by this simple way"


So, as suggested, I whipped up the Form Control, and have provided the exported control as a download!  [Download the Custom Required Checkbox Form Control](http://www.johnnycode.com/blog/wp-content/uploads/2010/12/cms_formusercontrol_RequiredCheckbox.zip)

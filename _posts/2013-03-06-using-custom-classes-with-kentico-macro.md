---
date: '2013-03-06 8:00:00 -04:00'
layout: post
title: Using Custom Classes with Kentico Macros
slug: using-custom-classes-with-kentico-macros
description: 
categories:
- Programming
tags:
- Kentico
- Macros
---

Kentico Macros provide flexibility when it comes to building your page templates, etc.

The problem is when you want to use a custom type.

CMS.GlobalHelper.MacroExpression
protected object EvaluateInternal(MacroResolver resolver, MacroEvalParameters evalParams, ref bool match)

calls into:

CMS.GlobalHelper.MacroResolver
public virtual bool GetObjectValue(object obj, string columnName, ref object result)

which attempts to render properties and other data from the following types

- DataRow
- DataRowView
- IHierarchicalObject
- IDataContainer
- ISimpleDataContainer
- INameIndexable

This code doesn't work out of the box:
    
    {% foreach() { %}

    {% } %}

While it's not the ideal situation, ...

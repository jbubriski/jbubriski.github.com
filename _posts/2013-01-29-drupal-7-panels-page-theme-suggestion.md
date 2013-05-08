---
date: '2013-01-29 8:00:00 -04:00'
layout: post
title: Drupal 7 Panels Page Template Suggestion
slug: drupal-7-panels-page-template-suggestion
description: Creating a Drupal 7 Template Suggestion for Panel Pages (page--panel.tpl.php).
categories:
- Programming
tags:
- Drupal
- Druapl 7
- Drupal hook_preprocess_page
- Drupal Panels
- Drupal Template Suggestions
- Drupal Theming
- Drupal Theme Hook
---

The Drupal Panels Module is one of the best modules out there and provides flexible templating directly within the CMS.  I recently worked on a site where I needed a default *page.tpl.php* for most of my pages, but a different *page.tpl.php* for my panel pages.  Mainly, my regular pages need some padding around the main content area, while my panel page layouts dealt with that individually.

Madmatter23 provides some [Drupal 6 code on his blog](http://grasmash.com/article/add-drupal-template-suggestion-panels-page-paneltplphp).  It allows you to have a ***page--panel.tpl.php*** that will be used for your panel pages. I took that code and updated it for Drupal 7:

    /**
     * Implementation of hook_preprocess_page().
     */
    function theheap_preprocess_page(&$variables) {
      // if this is a panel page, add template suggestions
      if($panel_page = page_manager_get_current_page()) {
        // add a generic suggestion for all panel pages
        $variables['theme_hook_suggestions'][] = 'page__panel';
        
        // add the panel page machine name to the template suggestions
        $variables['theme_hook_suggestions'][] = 'page__' . $panel_page['name'];

        //add a body class for good measure
        $body_classes[] = 'page-panel';
      }
    }

Madmatter23 also provides [an additional (Drupal 6) snippet](http://grasmash.com/article/add-drupal-template-suggestion-panels-page-paneltplphp) that will also add template suggestions for the specific layout of the panel page.  I didn't have a need for that, but if you need that functionality it should be very easy to port the few extra lines into my sample above.

That's it!

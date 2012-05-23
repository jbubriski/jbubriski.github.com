---
date: '2010-07-16 13:00:35'
layout: post
slug: adding-macro-support-to-kentico-web-parts
status: publish
title: Adding Macro Expression support to Kentico Web Parts
wordpress_id: '594'
categories:
- Kentico
- Programming
tags:
- .NET Framework
- ASP.NET
- C#
- Code
- Kentico API Programming
- Kentico Macro Expressions
---

A coworker of mine had a BizForm in Kentico that needed a dynamic URL Redirection after the form was submitted. Based on the page with the BizForm, the user would be redirected to a different thank you page. There are many reasons you could want dynamic thank you pages for a single form. For starters, it's a lot easier to manage one set of data. Then there are the SEO benefits of having separate thank you pages. Don't forget you might simply want different content, or another page/template entirely! We can accomplish this using [Kentico's Macro Expressions](http://www.kentico.com/docs/devguide/index.html?appendix_a___macro_expressions.htm).

A week ago I had been looking through some Kentico code and remembered seeing code that resolved Macro Expressions in the subject and body text of the email templates. I actually forgot where that code was, so I went ahead with intellisense, and found the MacroResolver class. That class contains the ContainsMacro and ResolveMacros methods which are self explanatory. It couldn't be easier! Check out he code below:

Here is the code to register the event handler:

    
    // Put this at the end of the "protected void SetupControl()" method
    viewBiz.OnAfterSave += new CMS.FormControls.BizForm.OnAfterSaveEventHandler(viewBiz_OnAfterSave);


And here is the event handler:

    
        protected void viewBiz_OnAfterSave()
        {
            var bizFormInfo = BizFormInfoProvider.GetBizFormInfo(viewBiz.FormName, CMSContext.CurrentSiteID);
    
            if (!string.IsNullOrEmpty(bizFormInfo.FormRedirectToUrl) && MacroResolver.ContainsMacro(bizFormInfo.FormRedirectToUrl))
            {
                // Resolve macro expressions in the redirect URL
                // So you can do something like: {% raw %}{%cmscontext.currentdocument.documentname%}{% endraw %}
                UrlHelper.Redirect(ContextResolver.ResolveMacros(bizFormInfo.FormRedirectToUrl));
            }
        }


By modifying the BizForm code, you can add this macro expression...

    
    {<span></span>%cmscontext.currentdocument.documentname%<span></span>}


to your URL redirection value like this...

    
    http://www.example.com/thankyou.aspx?source={<span></span>%cmscontext.currentdocument.documentname%<span></span>}


and after filling out a BizForm on this page...

    
    http://www.example.com/form_page.aspx


you get redirected to here...

    
    http://www.example.com/thankyou.aspx?source=form_page


And that's a wrap!

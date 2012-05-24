---
date: '2010-07-18 06:08:07'
layout: post
slug: using-kenticos-email-templates-in-custom-code
status: publish
title: Using Kentico's Email Templates in Custom Code
wordpress_id: '616'
categories:
- Kentico
- Programming
tags:
- .NET Framework
- ASP.NET
- C#
- Code
- Email Templates
- Kentico API Programming
---

Kentico has an email template feature that is used in many areas of the CMS.  When a user registers, posts to the forum, or places an order in the E-Commerce system, they are sent an email from a predefined template that has been filled with their information. I'll show you how easy it is to leverage this feature in your own code.

First, let's setup our email template.  Go to the Site Manager -> Development -> Email Templates, and make a new one:

![](/assets/images/2010-07-18-using-kenticos-email-templates-in-custom-code/Setting-up-a-New-Email-Template.png "Setting up a New Email Template")

Piece of cake.

Now let's create a helper method to making sending emails a little bit easier.  The method below takes the name of an email template, the recipient of the email, the macros to replace, and an event name for loggging. Using those variables, the method gets the template, creates an email message from the template, performs replacements using the macros, and sends the email. If an exception is thrown, the event is logged in Kentico's Event Log.

    private void SendEmailUsingTemplate(string emailTemplateName, string recipientEmail, string[,] replacements, string eventName)
        {
            // Set resolver
            ContextResolver resolver = CMSContext.CurrentResolver;
            resolver.SourceParameters = replacements;
    
            // Get the email template
            var template = EmailTemplateProvider.GetEmailTemplate(emailTemplateName, 0);
    
            if (template != null)
            {
                // Email message
                var emailMessage = new EmailMessage
                {
                    EmailFormat = EmailFormatEnum.Default,
                    Recipients = recipientEmail,
                    From = EmailHelper.GetSender(template, SettingsKeyProvider.GetStringValue(CMSContext.CurrentSiteName + ".CMSNoreplyEmailAddress")),
                    CcRecipients = template.TemplateCc,
                    BccRecipients = template.TemplateBcc,
                    Subject = resolver.ResolveMacros(template.TemplateSubject),
                    PlainTextBody = resolver.ResolveMacros(template.TemplatePlainText)
                };
    
                // Enable macro encoding for body
                resolver.EncodeResolvedValues = true;
    
                emailMessage.Body = resolver.ResolveMacros(template.TemplateText);
    
                // Disable macro encoding for plaintext body and subject
                resolver.EncodeResolvedValues = false;
    
                try
                {
                    MetaFileInfoProvider.ResolveMetaFileImages(emailMessage, template.TemplateID, EmailObjectType.EMAILTEMPLATE, MetaFileInfoProvider.OBJECT_CATEGORY_TEMPLATE);
                    // Send the e-mail immediately
                    EmailSender.SendEmail(CMSContext.CurrentSiteName, emailMessage, true);
                }
                catch (Exception ex)
                {
                    var eventLogProvider = new EventLogProvider();
                    eventLogProvider.LogEvent("E", eventName, ex);
    
                    throw;
                }
            }
        }

Now that we have the helper method, we can send an email with just a few lines of code:

    string emailTemplateName = "WeeklySummary";
    
            string[,] replacements = new string[3, 2];
    
            replacements[0, 0] = "WeeklySummaryTitle";
            replacements[0, 1] = "Your Weekly Summary";
            replacements[1, 0] = "UnreadMessageCount";
            replacements[1, 1] = "5";
            replacements[2, 0] = "PendingFriendRequestsCount";
            replacements[2, 1] = "50";
    
            SendEmailUsingTemplate(
                emailTemplateName,
                "enduser@example.com",
                replacements,
                "Weekly Summary - Sending Emails");

It couldn't be easier!  Just make sure the string array is the correct size, depending on the number of macros you are replacing. You could easily make the array dynamic if you didn't know beforehand how many macros you might have.

One more thing.  I made this email template at the Global scope, so I pass in 0 as the Current Site ID in the call to EmailTemplateProvider.GetEmailTemplate().  You can easily change this to use the current site if you setup the email templates per site.  Just remember that 0 is for Global scope!

Thanks for listening!

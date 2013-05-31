---
date: '2012-02-22 08:00:38'
layout: post
slug: get-bizform-record-id
status: publish
title: Get BizForm Record ID
wordpress_id: '1044'
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

Here is a post I wanted to write a few months ago while I was actively developing [Kentico](http://www.kentico.com/) based websites, but I never got the chance to finish it. The code should be solid, and I'll explain it as best I can.

If you're working with [BizForm's](/tags.html#Kentico BizForms-ref) programmatically you're going to need to get the ID of a specific row so you can update or delete it. If you know the table structure, there's nothing stopping you from going straight to the database, but if you do it using Kentico API's and queries the code should be more upgrade-friendly.

This code makes some minor assumptions that are hard coded, but could be easily abstracted out:

- The BizForm's code name is "ContactUs" with an ID field (Primary Key) of "ContactUsId".
- I'm using a hard-coded where condition getting the first record. This could easily be changed to pass in another parameter to search on.

Without further ado, here's the code:

    public int GetRecordId()
    {
        // Given the Code Name of the BizForm and the current site, get the BizForm object.
        var bizFormInfo = BizFormInfoProvider.GetBizFormInfo("ContactUs", uxBizForm.SiteName);
    
        if (bizFormInfo != null)
        {
            var dataClassInfo = DataClassInfoProvider.GetDataClass(bizFormInfo.FormClassID);
    
            if (dataClassInfo != null)
            {
                // Using the built in Select query, get the record we're looking for.
                var connection = ConnectionHelper.GetConnection();
                var whereCondition = String.Format("ContactUsId = '1'");
                var dataSet = connection.ExecuteQuery(dataClassInfo.ClassName + ".selectall", null, whereCondition);
    
                // Note the use of Kentico's aptly named DataHelper class.
                if (!DataHelper.DataSourceIsEmpty(dataSet) && dataSet.Tables[0].Rows.Count == 1)
                {
                    return ValidationHelper.GetInteger(dataSet.Tables[0].Rows[0][0], 0);
                }
            }
        }
    
        // If we get here, we didn't find a valid record.
        // If we get here you should probably do one of the following:
        //   Redirect to the "new record" page
        //   Redirect to an error page
        //   Or throw an exception
        return 0;
    }

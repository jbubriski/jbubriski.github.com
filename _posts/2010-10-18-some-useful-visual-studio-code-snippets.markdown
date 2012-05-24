---
date: '2010-10-18 13:00:44'
layout: post
slug: some-useful-visual-studio-code-snippets
status: publish
title: Some useful Visual Studio code snippets
wordpress_id: '675'
categories:
- Programming
tags:
- .NET Framework
- ASP.NET
- C#
- Code
- Code Snippet
- jQuery
- SQL
- Visual Studio
---

So recently I've created a couple useful code snippets, and here they are for you to download!

[](http://www.johnnycode.com/blog/wp-content/uploads/2010/10/Code-Snippets.zip)[Download My Code Snippets](http://www.johnnycode.com/blog/wp-content/uploads/2010/10/Code-Snippets1.zip)

To use them, just place them in your custom code snippets directory, which will be something like:

`C:\Users\{username}\Documents\Visual Studio 2010\Code Snippets`

Here are the snippets that are included in the zip file download:

## C#

sql.snippet

    var connectionString = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;
    
    var sqlCommandText = @"
    ";
    
    using (var sqlConnection = new SqlConnection(connectionString))
    using (var sqlCommand = new SqlCommand(sqlCommandText, sqlConnection))
    {
        sqlCommand.Connection.Open();
        sqlCommand.ExecuteNonQuery();
        sqlCommand.Connection.Close();
    }

void.snippet

    private void Go( )
    {
    
    }

## ASP.NET Markup/HTML/JavaScript

jref.snippet

    <script type="text/javascript">
    (function ($) {
        $(function () {
    
        });
    })(jQuery);
    </script>

jscript.snippet

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>

txt.snippet

    <asp:TextBox runat="server" ID="uxTextBox" />

btn.snippet

    <asp:Button runat="server" ID="uxButton" Text="Submit" />

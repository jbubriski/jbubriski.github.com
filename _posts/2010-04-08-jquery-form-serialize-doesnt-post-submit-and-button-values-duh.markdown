---
date: '2010-04-08 02:19:49'
layout: post
slug: jquery-form-serialize-doesnt-post-submit-and-button-values-duh
status: publish
title: jQuery form.serialize() doesn't post "submit" and "button" values (duh)
wordpress_id: '307'
categories:
- Programming
tags:
- HTML
- javascript
- jQuery Serialization
- Using AJAX forms
---

So I was having this issue where certain values in my AJAX form were not being posted to my ASP.NET MVC back end.  I figured something was just wrong with my HTML, but everything looked good.  I'm no MVC expert, so I thought there might be a conflict with the way MVC was handling the form data.  Maybe I was using bad characters?  Nope!  After some quick googling, it became obvious what the problem was.  The call to jQuery's serialize() method does not post "submit" and "button" values!!!

In case you haven't figured it out (it took me a minute too),  the form submission event and the form.serialize() call have nothing to do with each other!  Let's take a look at a typical usage scenario:

You have a site like StackOverflow, and you have a vote form like this:

    <form method="post" id="vote_form" action="jquery serialize test.html">
    
    Enter the question you want to vote for:
    
    <input type="text" name="question_id" id="question_id" />
    <input type="submit" name="vote_up" id="vote_up" value="up" />
    <input type="submit" name="vote_down" id="vote_down" value="down" />
    
    </form>

You hook it up to jQuery like this (this is just one way):

    <script type="text/JavaScript" src="http://ajax.microsoft.com/ajax/jquery/jquery-1.4.2.min.js">
    </script>
    <script type="text/JavaScript">
    $().ready(function(){
      var vote_form = $('#vote_form');
    
      vote_form.submit(function() {
        alert("Posting data...");
    
        $.post(vote_form.attr('action'), vote_form.serialize(), function(data) {
          if (data)
          {
            alert("It worked.");
            vote_form.replaceWith("voted");
          }
          else
          {
            vote_form.replaceWith("not voted");
            alert("It worked.");
          }
        });
        return false;
      });
    });
    </script>

So what is wrong with this picture?  Look at it again.  Now back to me.  Back to the form.  _Now back to me_.  See how the form.serialize() is just another part of the event handler?  It really has nothing to do with the event handler it is in.  _**Although you would probably never do this**_, you could even wire up the AJAX like this:

    $("#question_id").hover(function() {
      // submit the form data via Ajax
    });

So when the user moves their mouse over the textbox, the form will automatically be submitted via AJAX (kinda neat)!

So now that we know that the serialize call is unrelated to the actual trigger of the form submission, it should all make sense.  **Since the serialize() call has no way of knowing what actually submitted the form, it doesn't submit the "trigger's" value with the form data!** Well shit.  Now what!?  One solution I saw somewhere on the net was this:

Wire up your event handler to the click events of the buttons in the form, instead of the form submit event.  This will allow you to figure out which element triggered the form submission, and subsequently, you can send that element's value along with the rest of the post data.  Here is an example that will work off the same HTML as above:

    <script type="text/JavaScript">
    $().ready(function(){
      var vote_form = $('#vote_form');
      var buttons = $('#vote_form input');
    
      buttons.click(function() {
        alert("Posting data...");
    
        var post = $(this).attr("name") + "=" + $(this).val();
        var form_data = $(vote_form).serialize() + "&" + post;
    
        $.post(vote_form.attr('action'), form_data, function(data) {
          if (data)
          {
            alert("It worked.");
            vote_form.replaceWith("voted");
          }
          else
          {
            vote_form.replaceWith("not voted");
            alert("It worked.");
          }
        });
        return false;
      });
    });
    </script>

Hope this explanation helps someone out there.  Here are some of the links that helped me figure this out:

- [Google Groups Discussion](http://groups.google.com/group/jquery-en/browse_thread/thread/8f99996a3e15ca6b?pli=1)
- [jQuery Not Intercepting A Form Submission-ASP.NET MVC Fancybox](http://stackoverflow.com/questions/2083419/jquery-not-intercepting-a-form-submition-asp-net-mvc-fancybox)
- [ASP.NET MVC Multiple Button in the Same Form](http://weblogs.asp.net/dfindley/archive/2009/05/31/asp-net-mvc-multiple-buttons-in-the-same-form.aspx)

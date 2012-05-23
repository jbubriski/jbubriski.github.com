---
date: '2009-11-11 17:17:10'
layout: post
slug: cant-use-the-same-parameter-list-when-creating-extension-methods
status: publish
title: Can't use the same parameter list when creating Extension Methods
wordpress_id: '121'
categories:
- Programming
tags:
- Code
- Extension Method
---

Everyone knows that you can't create an extension method that uses the same name and parameter list as an existing method of the type your extending.  So for example, this method would be perfectly valid:

    
    
    public static string IsNullOrEmpty(this string text)
    {
        return string.IsNullOrEmpty(text);
    }


Why?  Well, for one, the method parameters are different.  The existing IsNullOrEmpty method takes a string as an argument, and my extension method does not.  Also, the existing IsNullOrEmpty method is static...

WAIT!  That doesn't matter!  Check this out:

    
    
    public static string Format(this string me, params object[] args)
    {
        return string.Format(me, args);
    }


**This doesn't work!** That's right!  If there is an existing **static** method with the same name and parameter list, you will get a compile time error!  When you attempt to use the extension method like so:

    
    
    "My name is {0}".Format(person.Name);


This is the error that ensues:


> Member 'string.Format(string, object)' cannot be accessed with an instance reference; qualify it with a type name instead


Yep.  This may seem obvious to some, but not me!  Why would it matter that there is a static version of the method, when clearly we're not using it!  I'm guessing it has something to do with the way the compiler looks up methods.

So how do you get around this?  Rename your extension method.

One thing I'm also not sure about now, is whether or not you can have 2 methods with the same signature, but have one be static and another be instance-level.  Anyone know the answer to that one?


#### **UPDATE**


Jared, my coworker pointed out something.  It looks like having an extension method with the same parameter list is valid.  However, for some reason, you can't _use_ the extension method under certain situations?  For example, when creating a String Format() extension method, you can't actually pass in a string a parameter.

    
    
    int aNumber = 0;
    string aString = string.Empty;
    
    var s1 = "{0}".F(aNumber);                 // Good, different method name
    var s2 = "{0}".F(aString);                 // Good, different method name
    var s3 = "{0}".Format(aNumber);            // Good, passing a number as the parameter
    var s4 = "{0}".Format(aNumber.ToString()); // compile time error
    var s5 = "{0}".Format(aString);            // compile time error


Does anyone know why this matters?  The method signature for string.Format() is this:

    
    
    public static string Format(this string me, params object[] args)


So it shouldn't really matter what you pass in as "args".  Each argument should be boxed as an object, right?

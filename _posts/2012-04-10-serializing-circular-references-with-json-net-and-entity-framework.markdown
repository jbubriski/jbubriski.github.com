---
date: '2012-04-10 13:58:25'
layout: post
slug: serializing-circular-references-with-json-net-and-entity-framework
status: publish
title: Serializing Circular References with JSON.Net and Entity Framework
wordpress_id: '1326'
categories:
- Programming
tags:
- .NET Framework
- ASP.NET
- ASP.NET MVC
- ASP.NET Web API
- Circular References
- Entity Framework
- JSON
- JSON.Net
- REST
- Serialization
---

## The Setup



You're building a [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) web service, and your technology stack looks something like this:




	
  * ASP.NET MVC 4 w/ Web API

	
  * Entity Framework Code First (I'm on 4.3.1, available via Nuget)

	
  * [Newtonsoft JSON.Net](http://james.newtonking.com/pages/json-net.aspx) (I'm on 4.5.1, available via Nuget)



We'll pull the data out of the database using EF and [setup the ASP.NET Web API to use the JSON.Net library to handle serialization/deserialization](http://blogs.msdn.com/b/henrikn/archive/2012/02/18/using-json-net-with-asp-net-web-api.aspx).  To make your life easier you could [use ST4bby to do the heavy lifting and generate your POCO's](http://jbubriski.github.com/ST4bby/).

Piece of cake, right?


    
    A circular reference was detected while serializing an object of type ...



False.



## The Problem



Circular reference exception???  Oh dear God, haven't we figured this out yet???

Let's start from the beginning.

You've setup JSON.Net as your default formatter, right?  In case you haven't done that [grab the JsonNetFormatter from Henrik's blog](http://blogs.msdn.com/b/henrikn/archive/2012/02/18/using-json-net-with-asp-net-web-api.aspx) and enable it in the Application_Start method in the Global.asax:


    
    
    GlobalConfiguration.Configuration.Formatters.Clear();
    GlobalConfiguration.Configuration.Formatters.Add(new JsonNetFormatter(new JsonSerializerSettings()));
    



That's right, we blew away all the formatters, including the XML one and we're not looking back.

Now let's look at a simple example of serialization of relational collections, without EF.  Below is a simple class which can hold references to other instances of the same class:


    
    
    public class Bro
    {
        public int BroId { get; set; }
        public string Name { get; set; }
    
        public List<bro> Bros { get; set; }
    
        public Bro()
        {
            Bros = new List<bro>();
        }
    }
    



Not rocket science.  A Bro can have many Bros, right?  A more common example would involve Parent/Child relationships, but this is simpler and demonstrates the same issue.  Now let's expose our Bros to the world via an ASP.NET Web API Controller:


    
    
    public class BrosController : ApiController
    {
        public IEnumerable<bro> Get()
        {
            var john = new Bro { Name = "John" };
            var jared = new Bro { Name = "Jared" };
    
            john.Bros.Add(jared);
            jared.Bros.Add(john);
    
            return new List<bro> { john, jared };
        }
    }
    



Again, not rocket science.  If you're unfamiliar with ASP.NET Web API, this is just like an ASP.NET MVC controller, except that it will handle all of the HTTP/REST stuff for you.  The JSON.Net formatter will kick in and serialize our collection of Bros to JSON.  Right?  Almost.

If you've corretly setup our custom JsonNetFormatter, you're going to get an exception about a circular reference:


    
    Self referencing loop detected for type 'EntityFrameworkCodeFirstWithJsonSerialization.Bro'.



If you didn't setup the JsonNetFormatter, I think that your page is gonna spin until the call stack fills up and you get a [StackOverflowExpception](http://msdn.microsoft.com/en-us/library/system.stackoverflowexception.aspx).

So what gives?  Isn't it the year 2012?  Shouldn't we have figured out a way to serialize this data?  Yes we should have, and yes we have.



## The Solution



After a lot of searching, I finally found this page in the docs:

[http://james.newtonking.com/projects/json/help/](http://james.newtonking.com/projects/json/help/) under Serializing and Deserializing JSON -> Serialization and Preserving Object References (or [Direct link with no navigation](http://james.newtonking.com/projects/json/help/PreserveObjectReferences.html))

Which explains to set this setting:


    
    PreserveReferencesHandling = PreserveReferencesHandling.Objects



... in order to... you guessed it, preserve references!  JSON.Net _is_ smart enough to detect the circular references, but since the default functionality is to serialize by value, it gives up so you don't get StackOverflowExceptions!

So now your Application_Start method in the global.asax looks more like this:


    
    
    var jsonSerializerSettings = new JsonSerializerSettings
    {
        PreserveReferencesHandling = PreserveReferencesHandling.Objects
    };
    
    GlobalConfiguration.Configuration.Formatters.Clear();
    GlobalConfiguration.Configuration.Formatters.Add(new JsonNetFormatter(jsonSerializerSettings));
    



And your Web API Controller works, spitting out JSON like this:


    
    
    [
        {
            "$id": "1",
            "BroId": 0,
            "Name": "John",
            "Bros": [
                {
                    "$id": "2",
                    "BroId": 0,
                    "Name": "Jared",
                    "Bros": [
                        {
                            "$ref": "1"
                        }
                    ]
                }
            ]
        },
        {
            "$ref": "2"
        }
    ]
    



Isn't that awesome!  To be honest, I never knew JSON was so smart!  In case you don't understand what's happening, JSON.Net is taking the extra step to setup each reference with an additional meta-property called "$id".  When JSON.Net encounters the same instance in another place in the object graph, it simply drops a reference to the original instance, instead of duplicating the data, and causing circular reference issues!



## What about Entity Framework



You said you were going to help me with my Entity Framework Code First problem!

Funny story: regular EF doesn't have a problem with this!  In fact, it handles it beautifully!  All your references to parent and child objects are preserved and your JSON will look like what we saw above!

To "Fix" Code First we need to understand what it is abstracting away for us, and do a little bit more work (nothing you can't handle dear reader!).  If you already tried the above setting on your project you'll notice that you now get a different Exception that looks something like this:


    
    The RelationshipManager object could not be serialized. This type of object cannot be serialized when the RelationshipManager belongs to an entity object that does not implement IEntityWithRelationships.



OK, so we traded one issue for another... or did we?

If we step back for a minute, we'll remember that when we read [Julia Lerman's book on Programming Entity Framework: Code First](http://www.amazon.com/gp/product/1449312942/ref=as_li_ss_tl?ie=UTF8&tag=johcod-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1449312942)![](http://www.assoc-amazon.com/e/ir?t=johcod-20&l=as2&o=1&a=1449312942) it said that Code First generates proxy classes for us, even though we have our POCO's (actually I don't think she references the proxy objects in that book, but you should buy it anyway because she's awesome and that's a referral link)!  So JSON.Net sees these weird proxy classes instead of our actual POCO's.  When it tries to serialize those proxy classes, all Hell breaks lose because the proxy classes are _dynamic_ proxy classes, as in [the dynamic keyword](http://msdn.microsoft.com/en-us/library/dd264741.aspx).

So what's a Dev to do?  Disable Proxy Generation!


    
    
    using(var yourDbContext = new YourDbContext())
    {
        yourDbContext.Configuration.ProxyCreationEnabled = false;
        
        return ...
    }
    



Now our EF Code First setup works!

But what did I just enable/disable/break?



> When proxy object creation is enabled for POCO entities, changes that are made to the graph and the property values of objects are tracked automatically by the Entity Framework as they occur. For information about change tracking options with and without proxies, see Tracking Changes in POCO Entities.



Therefore, when proxy object creation is _disabled_, changes are not tracked automatically.  If you can live with that, then you're all set!

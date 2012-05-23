---
date: '2010-03-12 18:30:37'
layout: post
slug: batch-delete-with-the-entity-framework
status: publish
title: Batch Delete with the Entity Framework
wordpress_id: '262'
categories:
- Programming
tags:
- batch
- delete
- Entity Framework
- Extension Method
- SQL Server Compact 4
---

There is a minor problem with the Entity Framework in that it doesn't support certain batch operations. You can, of course, retrieve multiple rows at a time, and updates to tracked objects on a given data context can all be pushed back to the data store in a single SaveChanges() call.  But what about adding and deleting?

***\*\*UPDATED\*\****

**Below is Solution/Project that I threw together to show how a batch delete works with EF. It doesn't actually use the extension method, but the code is the same. As you can see, you're are NOT modifying the collection, so it works fine. The example uses .NET 4 and SQL Compact 4.**

**[EntityFrameworkTest](http://www.johnnycode.com/blog/wp-content/uploads/2010/03/EntityFrameworkTest.zip)**

Normally you would delete items like this:

    
    foreach(var entity in entities)
    {
        context.DeleteObject(entity);
    }


So everywhere you have to batch delete a set of objects, you need a foreach loop.  Instead of that, a nice workaround for this problem is to use a partial class method.  Here is one for deleting a set of objects:

    
    public partial class TargetEntities
    {
        public void DeleteObjects(IEnumerable entities)
        {
            foreach (var entity in entities)
            {
                this.DeleteObject(entity);
            }
        }
    }


In this case, the method needs to be generic so that it supports the generic version of IEnumerable. If you try to make the method take "IEnumerable&lt;object&gt;" it wont work because of the way covariance is in this version of .NET (I heard 4.0 might solve part of this problem).

So now if you're deleting a few sets of objects, your code **WONT** look like this:

    
    foreach (var entity1 in entities1)
    {
        context.DeleteObject(entity1);
    }
    
    foreach (var entity2 in entities2)
    {
        context.DeleteObject(entity2);
    }
    
    foreach (var entity3 in entities3)
    {
        context.DeleteObject(entity3);
    }


And will instead look like this:

    
    context.DeleteObjects(entities1);
    context.DeleteObjects(entities2);
    context.DeleteObjects(entities3);


Or you can directly delete data with a more direct approach like this:

    
    context.DeleteObjects(context.Products.Where(p => p.CategoryID == "Cell Phones"));


Or even delete all the data in a table:

    
    context.DeleteObjects(context.Products);


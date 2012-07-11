---
layout: post
title: How to get JSON from ASP.NET
permalink: how-to-get-json-from-asp-net.html
description: How to get JSON data from ASP.NET using WebForms, Handlers, MVC, and Web API
date: 2012-07-16 8:00:00 -04:00
tags: "ASP.NET, ASP.NET MVC, ASP.NET Web API, JSON, Web Services, AJAX"
published: false
---

Since I started my new job I've been working on some old ASP.NET Web Forms code.  We use a lot of AJAX but we don't use many different approaches to get the data.  For fun, I created [a GitHub project to demonstrate the various ways to get JSON data from the different flavors of ASP.NET](https://github.com/jbubriski/GetJsonFromAspNetExamples/).  Below is a little explanation of the code.

## Using an ASP.NET Web Forms page (.aspx)

[The ASP.NET Web Forms Page code-behind on GitHub](https://github.com/jbubriski/GetJsonFromAspNetExamples/blob/master/src/GetJsonFromAspNet/GetJsonFromAspNet/PeoplePage.aspx.cs)

    public partial class PeoplePage : Page
    {
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

            var peopleRepository = new PeopleRepository();

            Response.ContentType = "application/json; charset=utf-8";
            Response.Write(JsonConvert.SerializeObject(peopleRepository.GetPeople()));
        }

        [WebMethod]
        public static object GetViaWebMethod()
        {
            var peopleRepository = new PeopleRepository();
            var people = peopleRepository.GetPeople();

            return people;
        }
    }

The first example using `Response.Write()` is terrible.  Just terrible.  Don't *ever* do this, **ever**.  There is simply no justification to use an ASP.NET Page to simply return raw data.  If you need to do this, use a handler or a web service (examples linked/discussed below).

The second example using a a static method with a WebMethod attribute isn't recommended, but I can understand if people want to keep their JSON endpoint in the same place where the data is handled for the view (Page) that renders the related HTML.A better approach would be 

**Thoughts: Try hard to stay away from these 2 approaches!**

## Using an ASP.NET HTTP Handler (.ashx)

[The ASP.NET HTTP Handler code on GitHub](https://github.com/jbubriski/GetJsonFromAspNetExamples/blob/master/src/GetJsonFromAspNet/GetJsonFromAspNet/PeopleHandler.ashx.cs)

    public class PeopleHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            var peopleRepository = new PeopleRepository();
            var people = peopleRepository.GetPeople();

            context.Response.ContentType = "application/json";
            context.Response.Write(JsonConvert.SerializeObject(people));
        }
    }

This is a straightforward example that may not be a best practice, but is fairly lightweight.  ASP.NET handler's are pretty "raw" and don't have the same overhead that Pages do.  So this approach should be a little faster than the above methods, while separating your JSON service from your presentation code (If you want that).

**Thoughts: This isn't a bad approach, but it's not the best either.**

## Using an ASP.NET Web Service (.asmx)

[The ASP.NET Web Service code on GitHub](https://github.com/jbubriski/GetJsonFromAspNetExamples/blob/master/src/GetJsonFromAspNet/GetJsonFromAspNet/PeopleService.asmx.cs)

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ScriptService]
    public class PeopleService : WebService
    {
        [WebMethod]
        public object GetPeople()
        {
            var peopleRepository = new PeopleRepository();
            var people = peopleRepository.GetPeople();

            return people;
        }

        [WebMethod]
        public object GetPeopleDictionary()
        {
            var peopleRepository = new PeopleRepository();
            var people = peopleRepository.GetPeopleDictionary();

            return people;
        }
    }

This is probably the most widespread one (hopefully).  This is the best way to do a web service in an ASP.NET Web Forms site.

**Thoughts: If you're stuck with a Web Forms site and can't enhance it with MVC controllers, this is your best approach.**

## Using and ASP.NET MVC controller

[The HomeController code on GitHub](https://github.com/jbubriski/GetJsonFromAspNetExamples/blob/master/src/GetJsonFromAspNet/GetJsonFromAspNet/Controllers/HomeController.cs)
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetPeopleViaJson()
        {
            var peopleRepository = new PeopleRepository();
            var people = peopleRepository.GetPeople();

            return Json(people);
        }

        public ActionResult GetPeopleViaJsonDotNet()
        {
            var peopleRepository = new PeopleRepository();
            var people = peopleRepository.GetPeople();

            return Content(JsonConvert.SerializeObject(people), "application/json");
        }

        public ActionResult GetPeopleViaJsonDotNetActionResult()
        {
            var peopleRepository = new PeopleRepository();
            var people = peopleRepository.GetPeople();

            return new JsonNetResult { Data = people };
        }
    }

These examples very similar and they all highlight the simplicity behind ASP.NET MVC and the way results are returned to the client.  The last approach is probably my favorite.  It incorporates both the speed of Json.NET and the power of MVC ActionResults.

**Thoughts: This is my recommended approach for getting JSON data out of ASP.NET.**

## Using an ASP.NET MVC Web API Controller

The newest of the bunch.  ASP.NET Web API offers "restful" web services.  As far as serving up JSON, it's actually a little more cumbersome.  Unfortunately I don't have an example of this right now, but the code should be relatively the same as the MVC Controller code.

##Conclusion

The takeaway?  Use an MVC Controller or ASP.NET Web API controller when you can.  If you're stuck in Web Forms land, try and use a ASMX web service to keep things separated.

If you were unfamiliar with JSON and .NET, I hope this post and [my GitHub project](https://github.com/jbubriski/GetJsonFromAspNetExamples/) help you gain some insight on how to pull JSON from your own ASP.NET web applications.  If you're an ASP.NET AJAX veteran, and you know of other methods that I forgot to mention, feel free to send me a pull request and let me know!
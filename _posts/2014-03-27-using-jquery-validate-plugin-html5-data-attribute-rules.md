---
date: '2014-03-27 8:00:00 -04:00'
layout: post
title: Using the jQuery Validate Plugin with HTML5 Data Attribute Rules 
slug: using-jquery-validate-plugin-html5-data-attribute-rules
description: Take the easy route and decorate your input elements with data attributes to wire up validation with the jQuery Validate Plugin.
categories:
- Programming
tags:
- JavaScript
- jQuery
- jQuery Validation Plugin
---

[The jQuery Validation Plugin](http://jqueryvalidation.org/ "Form validation with jQuery") is a great plugin that "just works".  It's so great that even [ASP.NET MVC](http://www.asp.net/mvc) uses it for client side validation! They have a nice JavaScript API for wiring up validation rules and messages, along with the [documentation](http://jqueryvalidation.org/documentation/ "jQuery Validation Plugin Documentation") for it.  However, they have an almost completely undocumented feature that makes use of HTML5 data attributes!

I think that I originally knew this feature existed because ASP.NET MVC uses jQuery Validate for "unobtrusive validation", meaning they don't inline JavaScript in your markup, but instead use data attributes.Apparently you can use any rule as a data attribute after version [1.11.0](https://github.com/jzaefferer/jquery-validation/issues/868).

## Basic Example

If you have no idea what I'm talking about here is a super simple example of the jQuery Validation Plugin on JS Fiddle:

<iframe width="100%" height="300" src="http://jsfiddle.net/jbubriski/SLXhR/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

[and a link to the JS Fiddle](http://jsfiddle.net/jbubriski/SLXhR/).

And here is the same code here, just in case:

	<!DOCTYPE html>
	<html>
		<form id="validate-me-plz">
		    <div>
		        Required: <input type="text" name="firstName" data-rule-required="true" />
		    </div>
			<div>
				<input type="submit" value="Submit" />
			</div>
		</form>
		
		<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.0.js"></script>
		<script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
		
		<script type="text/javascript">
			$('#validate-me-plz').validate();
		</script>
	</html>

You can see that on the input element we have an attribute called `data-rule-required` that is set to `true`.  Just calling `.validate()` on the form element will check for these data attributes and run the validations.  As mentioned earlier, there is also JavaScript API for applying rules.

## Rule Format

To add rules to your input elements follow this format:

    data-rule-[rule name separate by dashes]="true" 

Here are some examples:

- Required - `data-rule-required="true"`
- Email - `data-rule-email="true"`
- Minimum Length = `data-rule-minlength="6"`

## Message Format

By default the jQuery Validation Plugin will add it's owne messages, but you can customize them to be whatever you want using another data attribute. To specify messages for each rule with data attributes follow this format:

    data-msg-[rule name separate by dashes]="The message you want."

Here are some examples:

- Required - `data-msg-required="Madam/site, this field is required."`
- Email - `data-msg-email="We need to spam you, please enter a valid email address."`

## Full example:

Here is a more complete example on JS Fiddle that shows different validators and messages being used:

<iframe width="100%" height="300" src="http://jsfiddle.net/YQgEq/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

[and a link to the JS Fiddle](http://jsfiddle.net/jbubriski/YQgEq/2/)

And here is the same info here, just in case:

	<!DOCTYPE html>
	<html>
	    <form id="validate-me-plz">
	        <div>
	            Required: <input type="text" name="required" data-rule-required="true" />
	        </div>
	        <div>
	            Required w/custom message: <input type="text" name="required-sassy" data-rule-required="true" data-msg-required="Please enter SOMETHING." />
	        </div>
	        <div>
	            Email: <input type="text" name="email" data-rule-email="true"/>
	        </div>
	        <div>
	            Email w/custom message: <input type="text" name="anotherEmail" data-rule-email="true" data-msg-email="Please enter a valid email address you dummy." />
	        </div>
	        <div>
	            <input type="submit" value="Validate!" />
	        </div>
	    </form>
		
	    <script type="text/javascript" src="//code.jquery.com/jquery-2.1.0.js"></script>
	    <script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
		
		<script type="text/javascript">
			$('#validate-me-plz').validate();
		</script>
	</html>

## Rule List:

If you want to know exactly what the validators are available and what they do [look at the code for the validators in core](https://github.com/jzaefferer/jquery-validation/blob/master/src/core.js#L1037) or [browse the additional validators](https://github.com/jzaefferer/jquery-validation/tree/master/src/additional).

Here is a list of them that I compiled by looking at the source on GitHub.  I marked them with what part of the framework they're from, and whether or not I tested them:

(Tested, core)

- data-rule-required="true"
- data-rule-email="true"

(Untested, core, but should work)

- data-rule-url="true"
- data-rule-date="true"
- data-rule-dateISO="true"
- data-rule-number="true"
- data-rule-digits="true"
- data-rule-creditcard="true"
- data-rule-minlength="6"
- data-rule-maxlength="24"
- data-rule-rangelength="5,10"
- data-rule-min="5"
- data-rule-max="10"
- data-rule-range="5,10"
- data-rule-equalsto="#password"
- data-rule-remote="custom-validatation-endpoint.aspx"

(Untested, additional, but should work)

- data-rule-accept=""
- data-rule-bankaccountNL="true"
- data-rule-bankorgiroaccountNL="true"
- data-rule-bic=""
- data-rule-cifES=""
- data-rule-creditcardtypes=""
- data-rule-currency=""
- data-rule-dateITA=""
- data-rule-dateNL=""
- data-rule-extension=""
- data-rule-giroaccountNL=""
- data-rule-iban=""
- data-rule-integer="true"
- data-rule-ipv4="true"
- data-rule-ipv6="true"
- data-rule-mobileNL=""
- data-rule-mobileUK=""
- data-rule-lettersonly="true"
- data-rule-nieES=""
- data-rule-nifES=""
- data-rule-nowhitespace="true"
- data-rule-pattern=""
- data-rule-phoneNL="true"
- data-rule-phoneUK="true"
- data-rule-phoneUS="true"
- data-rule-phonesUK="true"
- data-rule-postalcodeNL="true"
- data-rule-postcodeUK="true"
- data-rule-require_from_group=""
- data-rule-skip_or_fill_minimum=""
- data-rule-strippedminlength=""
- data-rule-time=""
- data-rule-time12h=""
- data-rule-url2=""
- data-rule-vinUS=""
- data-rule-zipcodeUS="true"
- data-rule-ziprange=""

Thanks!  Hope you found this helpful!
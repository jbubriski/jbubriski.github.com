---
date: '2013-07-12 8:00:00 -04:00'
layout: post
title: Create a SQL Server Login and User with limited permissions 
slug: create-a-sql-server-login-user-with-limited-permissions
description: How to create a SQL Server login and user with basic CRUD permissions.
categories:
- Programming
tags:
- SQL Server
- Security
- Permissions
---

People always say you shouldn't use the sa account for your web app, and you shouldn't!  Below is a script to make a login and user for your database with basic CRUD permissions.  If your web app is compromised, damage to the database will be limited to just that database, and not to all the databases running in your SQL Server instance.  While still bad, the attacker would only be able to mess with your data, and wouldn't be able to drop/create tables or other nasty things.

Assuming you have a database name "webapp1", and want a user "phillipjfry" with the password "alphabrainwave":

CREATE LOGIN phillipjfry 
	WITH PASSWORD = 'alphabrainwave';

USE [webapp1];
GO

CREATE USER phillipjfry FOR LOGIN phillipjfry
	WITH DEFAULT_SCHEMA = dbo;

GRANT INSERT TO webapp1;
GRANT SELECT TO webapp1;
GRANT UPDATE TO webapp1;
GRANT DELETE TO webapp1;

GO
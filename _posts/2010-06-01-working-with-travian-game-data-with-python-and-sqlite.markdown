---
date: '2010-06-01 12:30:29'
layout: post
slug: working-with-travian-game-data-with-python-and-sqlite
status: publish
title: 'Python 3, SQLite, and Travian: Working with Game Data'
wordpress_id: '363'
categories:
- Programming
tags:
- Learning Python 3
- SQLite Development
- The Quick Python Book
- Travian Add On Project
---

### **Update**

If there was actually out there who read this and tried the code, it may not have worked properly with Python 3.  I've updated the code against my installation of 3.12 and now it should be working fine.  Somehow, I had an older version of Python installed that was running the code!  Sorry about that!

### Background

There was a 40% off any item coupon at Borders this weekend that I probably should have [tweeted](http://twitter.com/jbubriski) about.  In any case, I didn't have any books in mind when we actually went there, so on a whim, I saw a [Manning Publications Co.](http://www.manning.com/) book about Python and grabbed it for $25.  The book is [The Quick Python Book, Second Edition](http://www.amazon.com/gp/product/193518220X?ie=UTF8&tag=johcod-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=193518220X)![](http://www.assoc-amazon.com/e/ir?t=johcod-20&l=as2&o=1&a=193518220X) by [Vern Ceder](http://learnpython.wordpress.com/).  By some act of God I found some time this weekend and managed to get through the first couple chapters.  In order to let the knowledge really soak in, I decided that I would right a working script, and blog about it before getting back to work on Tuesday!  So here we go!

Enter [Travian](http://www.travian.com/)...

> Travian is a browser game featuring a world with thousands of other real  players. One begins the game acting as a chief of a tiny village.

From there, you build up your village and army, build more villages, form alliances, and attack other players (or be attacked).  A fun game that is constantly in motion.  There are no turns in the game, only waiting for resources to be collected, and troops to march.

One cool thing about the game is that they provide an export of their data, much like [Stackoverflow does with their data](http://blog.stackoverflow.com/2009/06/stack-overflow-creative-commons-data-dump/).  The big difference is the export is daily, and that there isn't really any content in the data.  Just ID's and numbers.  I'm also not sure if the data is considered Creative Commons or not.  Travian has their own tutorial on [creating world maps](http://help.travian.com/index.php?type=faq&mod=230).  Long story short, they provide a map.sql file that you can most likely import into MySQL or SQLite, and work with from there.

So the script I wrote is pretty simple, but I'm proud that I did it so quickly, and on my own!  All it does is:

1. Download the map.sql data file.
2. Try create the table in SQLite if it doesn't exist.
3. Try to clear the table if it already existed.
4. Load the data into the table.
5. Print some basic statistics about the data.

So there you have it!  The code is below and I hope someone actually finds this interesting!  Just in case you're wondering what else you can do with the data, check out this site called [Ttool](http://travian-com.ttool.info).  They take the data from Travian and provide all sorts of impressive statistics about the game.  Something I may do next is setup a scheduled job that runs this script, and add a date column to the data so that I can track the historical data.  We'll see if I have another free moment!

I almost forgot!  In order to run it, you need to have Python 3.x installed.  It is a very quick download and install from Python.org.  After you install it, you can run it by saving the script with a .py extension, opening the command prompt, and typing this:

    python "C:\path\to\my\script.py"

### The Code

    #!/usr/bin/env python
    
    import os # For working with the file system
    import urllib.request # For getting data from web pages
    import sqlite3 # for data persistence
    
    def main():
        script_url = "http://s1.travian.com/map.sql"
        data_file_name = "map.sql"
        database_name = "travian"
    
        print("Downloading data file \nfrom:\t{0}\nto:\t{1}\n...".format(script_url , data_file_name))
        download(script_url, data_file_name);
        print("Done.\n")
    
        print("Creating table if needed...")
        create_table(database_name)
        print("Done.\n")
    
        print("Clearing old data if needed...")
        clear_data(database_name)
        print("Done.\n")
    
        print("Loading data file into SQL Lite...")
        load_data(database_name, data_file_name)
        print("Done.\n")
    
        print("Statistics:")
        print_stats(database_name)
    
    # Originally from http://code.activestate.com/recipes/496685-downloading-a-file-from-the-web/
    # Copy the contents of a file from a given URL to a local file.
    def download(url, file_name):
        urllib.request.urlretrieve(url, file_name)
    
    def create_table(database_name):
        #Try and create the table.
        #If it fails, it's probably because the table exists
        try:
            table_sql = """CREATE TABLE `x_world` (
            id integer PRIMARY KEY ASC AUTOINCREMENT NOT NULL DEFAULT '0',
            x integer NOT NULL default '0',
            y integer NOT NULL default '0',
            tid integer unsigned NOT NULL default '0',
            vid integer unsigned NOT NULL default '0',
            village text NOT NULL default '',
            uid integer NOT NULL default '0',
            player text NOT NULL default '',
            aid integer unsigned NOT NULL default '0',
            alliance text NOT NULL default '',
            population integer unsigned NOT NULL default '0'
            );"""
    
            #Open a connection to the SQLite database and create the table
            sql_connection = sqlite3.connect(database_name)
            sql_cursor = sql_connection.cursor()
            sql_cursor.execute(table_sql)
            sql_connection.commit()
            sql_connection.close()
        except:
            pass
    
    def clear_data(database_name):
        sql_connection = sqlite3.connect(database_name)
        sql_cursor = sql_connection.cursor()
    
        sql_command = "DELETE FROM x_world"
    
        #Delete all the existing data, if there is any
        sql_cursor.execute(sql_command)
        sql_connection.commit()
        sql_connection.close()
    
    def load_data(database_name, data_file_name):
        #Open the data file
        data_file = open(data_file_name, mode='r', encoding="UTF8")
    
        sql_connection = sqlite3.connect(database_name)
        sql_cursor = sql_connection.cursor()
    
        #Run each SQL statement from the data file
        for line in data_file:
            sql_cursor.execute(line)
    
        sql_connection.commit()
        sql_connection.close()
    
    def print_stats(database_name):
        sql_connection = sqlite3.connect(database_name)
        sql_cursor = sql_connection.cursor()
    
        #Population query
        sql_population = """SELECT SUM(population)
        FROM x_world"""
    
        sql_cursor.execute(sql_population)
        population = sql_cursor.fetchone()[0]
    
        #User count query
        sql_count_users = """SELECT COUNT(DISTINCT(uid))
        FROM x_world"""
    
        sql_cursor.execute(sql_count_users)
        user_count = sql_cursor.fetchone()[0]
    
        #Village count query
        sql_count_villages = """SELECT COUNT(*)
        FROM x_world"""
    
        sql_cursor.execute(sql_count_villages)
        village_count = sql_cursor.fetchone()[0]
    
        #Print results
        print("Population of Travian: {0}".format(population))
        print("Number of users in Travian: {0}".format(user_count))
        print("Number of villages in Travian: {0}".format(village_count))
    
        sql_connection.commit()
        sql_connection.close()
    
    #Run the main function
    main()
    

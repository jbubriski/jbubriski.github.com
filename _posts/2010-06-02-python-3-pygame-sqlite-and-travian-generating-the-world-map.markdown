---
layout: post
category: Programming
date: '2010-06-02 12:30:04'
tags:
- BMP
- Images
- JPEG
- Learning Python 3
- PNG
- Python Imaging Library
- SQLite Development
- TGA
- Travian Add On Project
- Using PyGame
- Web Development with Firefox
slug: python-3-pygame-sqlite-and-travian-generating-the-world-map
status: publish
title: 'Python 3 + PyGame, SQLite, and Travian: Generating the World Map'
wordpress_id: '389'
---

### **UPDATE**


Oops, forgot to add a sample image of what the script generates.  Added it now!


### Background


In the last post I showed you how you could get the Travian game data, load it into SQLite, and then run some simple queries.  Now, I will show you how to take that one step further and use the data to generate a BMP, TGA, PNG, or JPEG image!

First, we need to get [Pygame](http://www.pygame.org/news.html).  Pygame is actually a Python Game Development library, but we're just going to be using it for generating images.  It's a small download, and easy install, just make sure you get the right version for your version of Python.  There is a library out there called the [Python Imaging Library (PIL)](http://www.pythonware.com/products/pil/), but apparently they haven't updated their code to be compatible with Python 3.  Hopefully they do soon!

Now that we have PyGame, we start with the old script we had and add a new function for creating the PNG.  I'm saving the image as a PNG, but according to the [PyGame documentation](http://www.pygame.org/docs/ref/image.html#pygame.image.save), you should be able to output your image as BMP, TGA, PNG, or JPEG, simply based on what your file's extension is.

[![Programmatically Generated Travian World Map](http://www.johnnycode.com/blog/wp-content/uploads/2010/06/Programmatically-Generated-Travian-World-Map-300x300.png)](http://www.johnnycode.com/blog/wp-content/uploads/2010/06/Programmatically-Generated-Travian-World-Map.png)



### The New Code


The function below is the new function that does the work.  It:



	
  * Creates an image surface to work with. (based on the map size)

	
  * Reads the data back from SQLite.

	
  * Sets each pixel that has a village to the color red.

	
  * Saves the image to disk.




    
    
    def create_map(database_name):
        sql_connection = sqlite3.connect(database_name)
        sql_cursor = sql_connection.cursor()
    
        #Min/Max query for calculating how big the map is
        sql_mins_maxes = """SELECT MIN(X), MIN(y), MAX(x), MAX(y)
        FROM x_world"""
    
        sql_cursor.execute(sql_mins_maxes)
        row = sql_cursor.fetchone()
        min_x = row[0]
        min_y = row[1]
        max_x = row[2]
        max_y = row[3]
    
        width = max_x - min_x
        height = max_y - min_y
        x_offset = width // 2
        y_offset = height // 2
    
        # Locations query
        sql_all = """SELECT x, y
        FROM x_world"""
    
        #Current working directory
        current_directory = os.getcwd()
    
        #Create a surface (like an image canvas)
        surface = pygame.Surface((width, height))
    
        #Paint the background white
        back_color = pygame.Color(255, 255, 255, 255)
        surface.fill(back_color)
    
        #The color red for coloring the villages
        color = pygame.Color(255, 0, 0, 255)
    
        sql_cursor.execute(sql_all)
    
        #For each village, set the corresponding pixel to red
        for row in sql_cursor.fetchall():
            surface.set_at((row[0] + x_offset,row[1] + y_offset), color)
    
        #Save the image to disk
        #Will save as a PNG file because of the extension
        pygame.image.save(surface, os.path.join(current_directory, "test.png"))
    
        sql_connection.commit()
        sql_connection.close()
    




### The Full Code


And here is the complete updated code that runs great with my installation of Python 3.12 and PyGame 1.91.  I hope you boys and girls enjoyed the update!

    
    #!/usr/bin/env python
    
    import os # For working with the file system
    import urllib.request # For getting data from web pages
    import sqlite3 # for data persistence
    import pygame.surface
    import pygame.image
    
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
        print("\n")
    
        print("Generating world map...")
        create_map(database_name)
        print("Done.\n")
    
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
    
    def create_map(database_name):
        sql_connection = sqlite3.connect(database_name)
        sql_cursor = sql_connection.cursor()
    
        #Min/Max query for calculating how big the map is
        sql_mins_maxes = """SELECT MIN(X), MIN(y), MAX(x), MAX(y)
        FROM x_world"""
    
        sql_cursor.execute(sql_mins_maxes)
        row = sql_cursor.fetchone()
        min_x = row[0]
        min_y = row[1]
        max_x = row[2]
        max_y = row[3]
    
        width = max_x - min_x
        height = max_y - min_y
        x_offset = width // 2
        y_offset = height // 2
    
        # Locations query
        sql_all = """SELECT x, y
        FROM x_world"""
    
        #Current working directory
        current_directory = os.getcwd()
    
        #Create a surface (like an image canvas)
        surface = pygame.Surface((width, height))
    
        #Paint the background white
        back_color = pygame.Color(255, 255, 255, 255)
        surface.fill(back_color)
    
        #The color red for coloring the villages
        color = pygame.Color(255, 0, 0, 255)
    
        sql_cursor.execute(sql_all)
    
        #For each village, set the corresponding pixel to red
        for row in sql_cursor.fetchall():
            surface.set_at((row[0] + x_offset,row[1] + y_offset), color)
    
        #Save the image to disk
        #Will save as a PNG file because of the extension
        pygame.image.save(surface, os.path.join(current_directory, "test.png"))
    
        sql_connection.commit()
        sql_connection.close()
    
    #Run the main function
    main()

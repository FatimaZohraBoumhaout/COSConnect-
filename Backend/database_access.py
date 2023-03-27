#!/usr/bin/env python
#-----------------------------------------------------------------------
# database_access.py
#-----------------------------------------------------------------------

import contextlib
import psycopg2

def add_user(input, database_url):
    pronouns, classes, bio, availability, full_name, display_name = input
    try:
        with psycopg2.connect(dbname = database_url, user="testuser", password="pass") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO testdb (pronouns, "
                query += "classes, bio, availability, full_name, display_name) "
                query += "VALUES (" + pronouns + ", " + classes + ", "
                query += bio + ", " + availability + ", " + full_name
                query += ", " + display_name
                query += ") RETURNING user_id;"
                #might need prepared list

                try:
                    cursor.execute(query)
                except Exception as ex:
                    print(ex)
                
                user_id = cursor.fetchall()

                # return the generated id
                return user_id

    except Exception as ex:
        print(ex)

def get_user(input, database_url):
    try:
        with psycopg2.connect(dbname = database_url, user="testuser", password="pass") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT pronouns, classes, bio, full_name, "
                query += "display_name FROM testdb "
                query += "WHERE user_id = " + input + ";"
                #might need prepared list

                try:
                    cursor.execute(query)
                except Exception as ex:
                    print(ex)
                
                output = cursor.fetchall()

                return output

    except Exception as ex:
        print(ex)
        
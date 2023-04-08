#!/usr/bin/env python
#-----------------------------------------------------------------------
# database_access.py
#-----------------------------------------------------------------------

import contextlib
import psycopg2

def add_user(input, database_url):
    pronouns, classes, bio, availability, full_name, display_name = input
    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO user_profile (pronouns, "
                query += "classes, bio, availability, full_name, display_name) "
                query += "VALUES (" + "\'" + pronouns + "\'" + ", " + "\'" + classes + "\'" + ", "+ "\'" 
                query += bio + "\'" + ", " + "\'" + availability + "\'" + ", " + "\'" + full_name + "\'"
                query += ", " + "\'" + display_name+ "\'" 
                query += ") RETURNING user_id;"
                print(pronouns, bio, availability, full_name, display_name, classes)
                
                #might need prepared list

                try:
                    cursor.execute(query)
                except Exception as ex:
                    print(ex)
                
                user_id = cursor.fetchone()[0]

                # return the generated id
                return user_id

    except Exception as ex:
        print(ex)

def get_user(input, database_url):
    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT pronouns, classes, bio, full_name, "
                query += "display_name, availability FROM user_profile "
                query += "WHERE user_id = " + str(input) + ";"
                #might need prepared list

                try:
                    cursor.execute(query)
                except Exception as ex:
                    print(ex)
                
                output = cursor.fetchall()

                return output

    except Exception as ex:
        print(ex)

def get_classes(student_id, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT class_name FROM classes WHERE student_id = %s"
                cursor.execute(query, (student_id,))
                results = cursor.fetchall()
                classes = [row[0] for row in results]
                return classes
    except Exception as ex:
        print(ex)
        return []

def add_class(input_data, database_url):
    user_id, class_name = input_data
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO classes (students_id, class_name) VALUES (%s, %s)"
                try:
                    cursor.execute(query, (user_id, class_name))
                except Exception as ex:
                    print(ex)
                return     
    except Exception as ex:
        print(ex)


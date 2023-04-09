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

def add_class(input_data, database_url):
    user_id, class_name = input_data
    print("id: " , user_id)
    print("name: ", class_name)
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO classes (students_id, class_name) VALUES (" + "\'" +str(user_id) + "\'" + ", \'" + class_name + "\'" + ");"
                try:
                    cursor.execute(query)
                except Exception as ex:
                    print(ex)
                return     
    except Exception as ex:
        print(ex)

def get_classes(student_id, database_url):
    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT class_name FROM classes "
                query += "WHERE students_id = " + str(student_id) + ";"
                try:
                    cursor.execute(query)
                except Exception as ex:
                    print(ex)
                    
                output = cursor.fetchall()

            return output
    except Exception as ex:
        print(ex)


def add_request(request, database_url):
    sender_id, receiver_id = request 
    try:
        with psycopg2.connect(dbname=database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO communications (id_sender, id_receiver)"
                query += "VALUES (" + "\'" + sender_id+ "\'" + ", " + "\'" + receiver_id + "\'" + ", "+ "\'" + ");"
                try:
                    cursor.execute(query)
                except Exception as ex:
                    print(ex)
                success = "success"
                return success 
    except Exception as ex:
        print(ex)


def get_sent(input, database_url):
    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT id_sender FROM communications WHERE id_sender = " + str(input)  + ";"  
                try:
                    cursor.execute(query)
                except Exception as ex:
                    print(ex)
                output = cursor.fetchall()
                return output    
    except Exception as ex:
        print(ex)

def get_received(input, database_url):
    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT id_sender FROM communications WHERE id_receiver = " + str(input)  + ";"  
                try:
                    cursor.execute(query)
                except Exception as ex:
                    print(ex)
                output = cursor.fetchall()
                return output    
    except Exception as ex:
        print(ex)

# def get_class(input, database_url):
#     try:
#         with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
#             with contextlib.closing(connection.cursor()) as cursor:
#                 query = "SELECT class_name FROM classes "
#                 query += "WHERE students_id = " + str(input) + ";"
#             try:
#                 cursor.execute(query)
#             except Exception as ex:
#                 print(ex)
                
#             output = cursor.fetchall()

#             return output
#     except Exception as ex:
#         print(ex)
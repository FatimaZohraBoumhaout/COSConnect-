#!/usr/bin/env python
#-----------------------------------------------------------------------
# database_access.py
#-----------------------------------------------------------------------

import contextlib
import psycopg2

def authenticate_user(username, password, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT user_id FROM signup WHERE username = %s AND password = %s;"
                try:
                    cursor.execute(query, (str(username), str(password)))
                    output = cursor.fetchone()
                    return output
                except Exception as ex:
                    print(ex)
    except Exception as ex:
        print(ex)
    return None


def sign_up(input, database_url):
    username, email, password = input
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO signup (username, email, password) VALUES (%s, %s, %s) RETURNING user_id;"
                values = (str(username), str(email), str(password))

                try:
                    cursor.execute(query, values)
                except Exception as ex:
                    print(ex)
                
                user_id = cursor.fetchone()[0]

                return user_id
    except Exception as ex:
        print(ex)


def add_user(input, database_url):
    user_id, pronouns, classes, bio, availability, full_name, display_name = input
    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO user_profile (user_id, pronouns, classes, bio, availability, full_name, display_name) VALUES (%s, %s, %s, %s, %s, %s, %s);"
                try:
                    cursor.execute(query, (user_id, pronouns, classes, bio, availability, full_name, display_name))
                except Exception as ex:
                    print(ex)
    except Exception as ex:
        print(ex)


def get_user(input, database_url):
    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT pronouns, classes, bio, full_name, display_name, availability FROM user_profile WHERE user_id = %s;"
                try:
                    cursor.execute(query, (input,))
                except Exception as ex:
                    print(ex)
                
                output = cursor.fetchall()

                return output

    except Exception as ex:
        print(ex)


def add_class(input_data, database_url):
    user_id, class_name = input_data
    print("id: ", user_id)
    print("name: ", class_name)
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO classes (students_id, class_name) VALUES (%s, %s);"
                try:
                    cursor.execute(query, (user_id, class_name))
                except Exception as ex:
                    print(ex)
                return
    except Exception as ex:
        print(ex)


def get_classes(student_id, database_url):
   try:
       with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
           with contextlib.closing(connection.cursor()) as cursor:
               query = "SELECT class_name FROM classes WHERE students_id = %s;"
               try:
                   cursor.execute(query, (student_id,))
                   result = cursor.fetchall()
                   classes = [row[0] for row in result]
               except Exception as ex:
                   print(ex)

               # output = cursor.fetchall()

           return classes
       
   except Exception as ex:
       print(ex)



def add_request(request, database_url):
    sender_id, receiver_id, message = request 
    print(sender_id, receiver_id, message)
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO communications (id_sender, id_receiver, message) VALUES (%s, %s, %s);"
                try:
                    cursor.execute(query, (sender_id, receiver_id, message))
                except Exception as ex:
                    print(ex)
                success = "success"
                return success 
    except Exception as ex:
        print(ex)

# get usernames of people who user sent messages to
def get_sent(input, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT id_receiver FROM communications WHERE id_sender = %s;"
                try:
                    cursor.execute(query, (input,))
                except Exception as ex:
                    print(ex)
                output = cursor.fetchall()
                return output    
    except Exception as ex:
        print(ex)

# get usernames of people who user received messages from
def get_received(input, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT id_sender FROM communications WHERE id_receiver = %s;"
                try:
                    cursor.execute(query, (input,))
                except Exception as ex:
                    print(ex)
                output = cursor.fetchall()
                return output    
    except Exception as ex:
        print(ex)


def get_request(request, database_url):
    sender_id, receiver_id, message = request
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT message FROM communications WHERE id_sender = %s AND id_receiver = %s"
                cursor.execute(query, (sender_id, receiver_id))
                message = cursor.fetchall()
                return message
    except Exception as ex:
        print(ex)

def edit_user(input, database_url):
    user_id, pronouns, classes, bio, availability = input
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE user_profile SET pronouns = %s, classes = %s, bio = %s, availability = %s WHERE user_id = %s"
                cursor.execute(query, (pronouns, classes, bio, availability, user_id))
    except Exception as ex:
        print(ex)

def get_students(input, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT students_id FROM classes WHERE class_name = %s"
                cursor.execute(query, (input,))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)
                    
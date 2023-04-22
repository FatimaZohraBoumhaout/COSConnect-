#!/usr/bin/env python
#-----------------------------------------------------------------------
# database_access.py
#-----------------------------------------------------------------------

import contextlib
import psycopg2
from req_lib import ReqLib

def authenticate_user(netId, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT display_name FROM user_profile WHERE net_id = %s;"
                try:
                    cursor.execute(query, (str(netId)))
                    output = cursor.fetchone()
                    return output
                except Exception as ex:
                    print(ex)
    except Exception as ex:
        print(ex)
    return None


""" def sign_up(input, database_url):
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
        print(ex) """


def add_user(input, database_url):
    net_id, pronouns, classes, bio, availability, full_name, display_name = input
    classes_string = ", ".join([f"'{x}'" for x in classes])

    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO user_profile (net_id, pronouns, classes, bio, availability, full_name, display_name) VALUES (%s, %s, " + "ARRAY [" + classes_string + "], %s, %s, %s, %s);"
                try:
                    cursor.execute(query, (net_id, pronouns, classes, bio, availability, full_name, display_name))
                except Exception as ex:
                    print(ex)
    except Exception as ex:
        print(ex)


def get_user(input, database_url):
    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT pronouns, classes, bio, full_name, display_name, availability FROM user_profile WHERE net_id = %s;"
                try:
                    cursor.execute(query, (input,))
                except Exception as ex:
                    print(ex)
                
                output = cursor.fetchall()

                return output

    except Exception as ex:
        print(ex)


def add_class(input_data, database_url):
    net_id, class_name = input_data
    print("id: ", net_id)
    print("name: ", class_name)
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO classes (class, net_id) VALUES (%s, %s);"
                try:
                    cursor.execute(query, (class_name, net_id))
                except Exception as ex:
                    print(ex)
                return
    except Exception as ex:
        print(ex)


def get_classes(net_id, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT classes FROM user_profile WHERE net_id = %s;"
                try:
                    cursor.execute(query, (net_id,))
                except Exception as ex:
                    print(ex)

                classes = cursor.fetchall()

            return classes
    except Exception as ex:
        print(ex)


def add_request(request, database_url):
    sender_id, receiver_id, course = request 
    print(sender_id, receiver_id, course)
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO communications (sender, receiver, class) VALUES (%s, %s, %s);"
                try:
                    cursor.execute(query, (sender_id, receiver_id, course))
                except Exception as ex:
                    print(ex)
                success = "success"
                return success 
    except Exception as ex:
        print(ex)

# get usernames of people who user sent messages to
def get_sent(input, database_url):
    sender, course = input
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT receiver FROM communications WHERE sender = %s AND class = %s;"
                try:
                    cursor.execute(query, (sender, course))
                except Exception as ex:
                    print(ex)
                output = cursor.fetchall()
                return output    
    except Exception as ex:
        print(ex)

# get usernames of people who user received messages from
def get_received(input, database_url):
    receiver, course = input
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT sender FROM communications WHERE receiver = %s AND class = %s;"
                try:
                    cursor.execute(query, (receiver, course))
                except Exception as ex:
                    print(ex)
                output = cursor.fetchall()
                return output    
    except Exception as ex:
        print(ex)


""" def get_request(request, database_url):
    sender_id, receiver_id, message = request
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT message FROM communications WHERE id_sender = %s AND id_receiver = %s"
                cursor.execute(query, (sender_id, receiver_id))
                message = cursor.fetchall()
                return message
    except Exception as ex:
        print(ex) """

def edit_user(input, database_url):
    user_id, pronouns, classes, bio, availability = input
    classes_string = ", ".join([f"'{x}'" for x in classes])
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE user_profile SET pronouns = %s, classes = "+ "ARRAY [" + classes_string + "], bio = %s, availability = %s WHERE user_id = %s"
                cursor.execute(query, (pronouns, classes, bio, availability, user_id))
    except Exception as ex:
        print(ex)

def get_students(input, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT net_id FROM classes WHERE class = %s"
                cursor.execute(query, (input,))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def get_courses():
    req_lib = ReqLib()
    spring_2020_term_code = "1204"
    subj = "COS"

    # Returns all courses in COS
    term_info = req_lib.getJSON(
        req_lib.configs.COURSE_COURSES,
        # To return a json version of the return value
        fmt="json",
        term=spring_2020_term_code, 
        subject=subj,
    )

    return term_info

                    
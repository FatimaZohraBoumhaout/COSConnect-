#!/usr/bin/env python
#-----------------------------------------------------------------------
# database_access.py
#-----------------------------------------------------------------------

import contextlib
import psycopg2
from req_lib import ReqLib
from decouple import config
import os
from dotenv import find_dotenv, load_dotenv  

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

DB_HOST = os.getenv('HOST')
DB_USER = os.getenv('TESTUSER')
DB_PASSWORD = os.getenv('PASSWORD')

def authenticate_user(netId, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT display_name FROM user_profile WHERE net_id = %s;"
                try:
                    cursor.execute(query, (netId,))
                    output = cursor.fetchone()
                    return output
                except Exception as ex:
                    print(ex)
    except Exception as ex:
        print(ex)
    return None

def add_user(input, database_url):
    net_id, pronouns, classes, bio, availability, full_name, display_name = input
    classes_string = ", ".join([f"'{x}'" for x in classes])

    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO user_profile (net_id, pronouns, classes, bio, availability, full_name, display_name) VALUES (%s, %s, ARRAY["+classes_string+"], %s, %s, %s, %s);"
                try:
                    cursor.execute(query, (net_id, pronouns, bio, availability, full_name, display_name))
                except Exception as ex:
                    print(ex)
    except Exception as ex:
        print(ex)


def get_user(input, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
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
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "INSERT INTO classes (class, net_id) VALUES (%s, %s);"
                try:
                    cursor.execute(query, (class_name, net_id))
                except Exception as ex:
                    print(ex)
                return
    except Exception as ex:
        print(ex)

def delete_class(input_data, database_url):
    net_id, course = input_data
    print("id: ", net_id)
    print("course: ", course)
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "DELETE FROM classes WHERE net_id = %s AND class = %s;"
                try:
                    cursor.execute(query, (net_id, course))
                except Exception as ex:
                    print(ex)
                return
    except Exception as ex:
        print(ex)

def reject_all_requests(input_data, database_url):
    net_id, course = input_data
    print("id: ", net_id)
    print("course: ", course)
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE communications SET request_status='rejected' WHERE class = %s AND (sender = %s or receiver = %s);"
                try:
                    cursor.execute(query, (course, net_id, net_id))
                except Exception as ex:
                    print(ex)
                return
    except Exception as ex:
        print(ex)

def accept_request(input_data, database_url):
    sender, receiver, course = input_data
    print("sender: ", sender)
    print("receiver: ", receiver)
    print("course: ", course)
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE communications SET request_status='accepted' WHERE class = %s AND sender = %s AND receiver = %s;"
                try:
                    cursor.execute(query, (str(course), sender, receiver))
                except Exception as ex:
                    print(ex)
                return
    except Exception as ex:
        print(ex)

def reject_request(input_data, database_url):
    sender, receiver, course = input_data
    print("sender: ", sender)
    print("receiver: ", receiver)
    print("course: ", course)
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE communications SET request_status='rejected' WHERE class = %s AND sender = %s AND receiver = %s;"
                try:
                    cursor.execute(query, (course, sender, receiver))
                except Exception as ex:
                    print(ex)
                return
    except Exception as ex:
        print(ex)

def get_classes(net_id, database_url):
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
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
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
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

def get_request(request, database_url):
    sender_id, receiver_id, course = request 
    print(sender_id, receiver_id, course)
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT sender FROM communications WHERE sender=%s AND receiver=%s AND class=%s;"
                try:
                    cursor.execute(query, (sender_id, receiver_id, course))
                except Exception as ex:
                    print(ex)
                output = cursor.fetchall()
                return output
    except Exception as ex:
        print(ex)

# get usernames of people who user sent messages to
def get_sent(input, database_url):
    sender, course = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
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
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
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

def edit_user(input, database_url):
    user_id, pronouns, classes, bio, availability = input
    classes_string = ", ".join([f"'{x}'" for x in classes])
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE user_profile SET pronouns = %s, classes = "+ "ARRAY [" + classes_string + "], bio = %s, availability = %s WHERE net_id = %s"
                cursor.execute(query, (pronouns, bio, availability, user_id))
    except Exception as ex:
        print(ex)

def get_students(input, database_url):
    classes, net_id = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT net_id FROM classes WHERE class = %s AND net_id != %s AND class_status = True " 
                query += "AND NOT EXISTS (SELECT * FROM communications WHERE receiver = %s "
                query += "AND sender = classes.net_id AND class = %s) AND NOT EXISTS ("
                query += "SELECT * FROM communications WHERE receiver = classes.net_id "
                query += "AND sender = %s AND class = %s);"
   
                cursor.execute(query, (classes, net_id, net_id, classes, net_id, classes))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

# code from: https://github.com/vr2amesh/COS333-API-Code-Examples
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

def post_notifications(input, database_url):
    user_id, notifications = input
    if notifications == "Available":
        notifications = "False"
    else:
        notifications = "True"
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE user_profile SET notifications = " + str(notifications) + " WHERE net_id = %s;"
                cursor.execute(query, (user_id,))
    except Exception as ex:
        print(ex)

def get_notifications(input, database_url):
    user_id = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT notifications from user_profile WHERE net_id = %s;"
                cursor.execute(query, (user_id,))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def get_students_info(input, database_url):
    students = input
    students_string = [x[0] for x in students]
    students_string = ','.join([f"'{x}'" for x in students_string])
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT net_id, full_name, availability from user_profile WHERE net_id IN (SELECT unnest(ARRAY["+students_string+"]));"
                cursor.execute(query, (students,))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def get_recent_sent(input, database_url):
    netid = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT receiver from communications WHERE sender = %s;"
                cursor.execute(query, (netid,))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def get_recent_received(input, database_url):
    netid = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT sender from communications WHERE receiver = %s;"
                cursor.execute(query, (netid,))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def post_class_status(input, database_url):
    net_id, course, class_status = input
    if class_status == "Available":
        class_status = "False"
    else:
        class_status = "True"
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE classes SET class_status = " + str(class_status) + " WHERE net_id = %s AND class = %s;"
                cursor.execute(query, (net_id, course))
    except Exception as ex:
        print(ex)

def get_class_status(input, database_url):
    net_id, course = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT class_status from classes WHERE net_id = %s AND class = %s;"
                cursor.execute(query, (net_id, course))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def get_accepted(input, database_url):
    net_id = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT sender, receiver, class from communications WHERE request_status='accepted' AND (sender = %s OR receiver = %s);"
                cursor.execute(query, (net_id, net_id))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def get_rejected(input, database_url):
    net_id = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT sender, receiver, class from communications WHERE request_status='rejected' AND (sender = %s OR receiver = %s);"
                cursor.execute(query, (net_id, net_id))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def get_pending(input, database_url):
    net_id = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT sender, receiver, class from communications WHERE request_status='pending' AND (sender = %s OR receiver = %s);"
                cursor.execute(query, (net_id, net_id))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def reject_unaccepted_requests(input, database_url):
    sender, receiver, course = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE communications SET request_status = 'rejected' WHERE class = %s and request_status='pending' AND (sender = %s OR receiver = %s OR sender = %s OR receiver = %s);"
                cursor.execute(query, (course, sender, sender, receiver, receiver))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)
                  
def status_off(input, database_url):
    net_id, course = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE classes SET class_status = 'false' WHERE net_id = %s AND class = %s;"
                cursor.execute(query, (net_id, course)) 
    except Exception as ex:
        print(ex)

def get_accepted_class(input, database_url):
    net_id, course = input
    try:
        with psycopg2.connect(dbname=database_url, host=DB_HOST, user=DB_USER, password=DB_PASSWORD) as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT sender from communications WHERE request_status='accepted' AND (sender = %s OR receiver = %s) AND class=%s;"
                cursor.execute(query, (net_id, net_id, course))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)
                    
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
                    cursor.execute(query, (netId,))
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
                query = "INSERT INTO user_profile (net_id, pronouns, classes, bio, availability, full_name, display_name) VALUES (%s, %s, ARRAY["+classes_string+"], %s, %s, %s, %s);"
                try:
                    cursor.execute(query, (net_id, pronouns, bio, availability, full_name, display_name))
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

def delete_class(input_data, database_url):
    net_id, course = input_data
    print("id: ", net_id)
    print("course: ", course)
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
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
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
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
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE communications SET request_status='accepted' WHERE class = %s AND sender = %s AND receiver = %s;"
                try:
                    cursor.execute(query, (course, sender, receiver, receiver, sender))
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
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE communications SET request_status='rejected' WHERE class = %s AND sender = %s AND receiver = %s;"
                try:
                    cursor.execute(query, (course, sender, receiver, receiver, sender))
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
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE communications SET request_status='rejected' WHERE class = %s AND (sender = %s or receiver = %s);"
                try:
                    cursor.execute(query, (course, net_id, net_id))
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
                query = "UPDATE user_profile SET pronouns = %s, classes = "+ "ARRAY [" + classes_string + "], bio = %s, availability = %s WHERE net_id = %s"
                cursor.execute(query, (pronouns, bio, availability, user_id))
    except Exception as ex:
        print(ex)

def get_students(input, database_url):
    classes, net_id = input
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
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

# def post_status(input, database_url):
#     user_id, status = input
#     if status == "Available":
#         status = "False"
#     else:
#         status = "True"

#     try:
#         with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
#             with contextlib.closing(connection.cursor()) as cursor:
#                 query = "UPDATE user_profile SET status = " + status + " WHERE net_id = %s;"
#                 cursor.execute(query, (user_id,))
#     except Exception as ex:
#         print(ex)

# def post_talking(input, database_url):
#     user_id, talking = input
#     try:
#         with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
#             with contextlib.closing(connection.cursor()) as cursor:
#                 query = "UPDATE user_profile SET talking = " + str(talking) + " WHERE net_id = %s;"
#                 cursor.execute(query, (user_id,))
#     except Exception as ex:
#         print(ex)

def post_notifications(input, database_url):
    user_id, notifications = input
    if notifications == "Available":
        notifications = "False"
    else:
        notifications = "True"
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE user_profile SET notifications = " + str(notifications) + " WHERE net_id = %s;"
                cursor.execute(query, (user_id,))
    except Exception as ex:
        print(ex)

# def get_status(input, database_url):
#     user_id = input
#     try:
#         with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
#             with contextlib.closing(connection.cursor()) as cursor:
#                 query = "SELECT status from user_profile WHERE net_id = %s;"
#                 cursor.execute(query, (user_id,))
#                 output = cursor.fetchall()
#                 return output 
#     except Exception as ex:
#         print(ex)

# def get_talking(input, database_url):
#     user_id = input
#     try:
#         with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
#             with contextlib.closing(connection.cursor()) as cursor:
#                 query = "SELECT talking from user_profile WHERE net_id = %s;"
#                 cursor.execute(query, (user_id,))
#                 output = cursor.fetchall()
#                 return output 
#     except Exception as ex:
#         print(ex)

def get_notifications(input, database_url):
    user_id = input
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
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
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
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
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
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
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
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
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "UPDATE classes SET class_status = " + str(class_status) + " WHERE net_id = %s AND class = %s;"
                cursor.execute(query, (net_id, course))
    except Exception as ex:
        print(ex)

def get_class_status(input, database_url):
    net_id, course = input
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
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
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT sender, receiver, class from classes WHERE request_status='accepted' AND (sender = %s OR receiver = %s);"
                cursor.execute(query, (net_id, net_id))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def get_rejected(input, database_url):
    net_id = input
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT sender, receiver, class from classes WHERE request_status='rejected' AND (sender = %s OR receiver = %s);"
                cursor.execute(query, (net_id, net_id))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)

def get_pending(input, database_url):
    net_id = input
    try:
        with psycopg2.connect(dbname=database_url, host="dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT sender, receiver, class from classes WHERE and request_status='pending' AND (sender = %s OR receiver = %s);"
                cursor.execute(query, (net_id, net_id))
                output = cursor.fetchall()
                return output 
    except Exception as ex:
        print(ex)
                  
                    
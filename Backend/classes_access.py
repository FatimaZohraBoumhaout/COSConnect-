#!/usr/bin/env python
#-----------------------------------------------------------------------
# database_access.py
#-----------------------------------------------------------------------

import contextlib
import psycopg2

def get_class(input, database_url):
    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                query = "SELECT class_name, department, course_number, students_id FROM classes "
                query += "WHERE class_id = "+str(input)
            try:
                cursor.execute(query)
            except Exception as ex:
                print(ex)
                
            output = cursor.fetchall()

            return output
    except Exception as ex:
        print(ex)
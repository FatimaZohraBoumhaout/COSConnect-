import psycopg2
import contextlib

def add_request(request):
    sender_id, receiver_id = request 
    conn = psycopg2.connect(dbname = database_url, 
                                host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", 
                                user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV")
    try:
        with psycopg2.connect(dbname = database_url, host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV") as connection:
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
    conn = psycopg2.connect(dbname = database_url, 
                                host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", 
                                user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV")
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
    conn = psycopg2.connect(dbname = database_url, 
                                host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", 
                                user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV")
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

from flask import Flask, session, redirect, url_for, render_template
from flask_cas import CAS, login_required
import database_access
import psycopg2


app = Flask(__name__)

###########################  CONFIGURING THE CAS AUTHENTICATION  ####################################
app.config['CAS_SERVER'] = 'https://our_cas_server_url'
app.config['CAS_AFTER_LOGIN'] = 'home' # user will be redirected to home
cas = CAS(app) # handling the CAS authentication in Flask

#########################  CHECK IF ID IS IN THE DB ################################################
def check_user_id_in_db(user_id, database_url):
    try:
        # Connecting to Postgres
        conn = psycopg2.connect(dbname = database_url, 
                                host = "dpg-cggj3fceoogqfc2no840-a.ohio-postgres.render.com", 
                                user="testuser", password="gVYdK2LMupfkuAxyR6kp3a6XpuIB9VVV")
        cursor = conn.cursor()
        cursor.execute("SELECT user_id FROM user_profile WHERE user_id = %s", (user_id,))
        id = cursor.fetchone()
        cursor.close()
        conn.close()

        # Check if the result is not None (user exists in the db)
        if id is not None:
            return id[0]
        else:
            return None
          
    except psycopg2.Error as ex:
        print("Error connecting to PostgreSQL database: ", ex)

###################################### LOGIN ROUTE ###################################################
@app.route('/login')
def login():
    if not cas.isAuthenticated():
        return redirect(cas.login_url)

    username = cas.username      # getting the user_id from CAS 
    user_id = check_user_id_in_db(username) # check if it exists in db

    if user_id is not None:
        session['user_id'] = user_id
        return redirect(url_for('home'))
    else:
        return render_template('UserSurvey.js') #!!!!!!!!!!!!!!!!!!!!!!!! Render the form, which is in react

###################################### HOME ROUTE ###################################################
@app.route('/home')
@login_required
def home():
    user_id = session.get('user_id')

    # If ID is not in session, we fetch it from CAS
    if user_id is None:
        username = cas.username
        user_id = check_user_id_in_db(username)
        session['user_id'] = user_id

    # render home
    return render_template('home.html') 

if __name__ == '__main__':
    app.run()

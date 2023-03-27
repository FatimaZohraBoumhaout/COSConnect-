#!/usr/bin/env python
#-----------------------------------------------------------------------
# user_survey_flask.py
#-----------------------------------------------------------------------
import flask
import database_access
#-----------------------------------------------------------------------
app = flask.Flask(__name__) # might need to change
#-----------------------------------------------------------------------
@app.route('/firstpage', methods=['GET', 'POST'])
def firstpage():
    print(flask.request.method, 'me')
    if flask.request.method == 'POST':
        print('inside')
        pronouns = flask.request.form.get('pronouns')
        classes = flask.request.form.get('classes')
        bio = flask.request.form.get('bio')
        availability = flask.request.form.get('availability')
        full_name = flask.request.form.get('fullName')
        display_name = flask.request.form.get('displayName')
        id = database_access.add_user(
            (pronouns, classes, bio, availability, full_name, display_name),'testdb.pgsql')
        
        output = database_access.get_user(id, 'testdb.pgsql')
        print('we returned')

        return output
    else:
        user_id = flask.request.args.get('id')
        if user_id:
            output = database_access.get_user(user_id, 'testdb.pgsql')
            return output
        else:
            print('before we hit here')
            return "We hit here"

if __name__ == '__main__':
    app.run(debug=True)
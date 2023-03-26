#!/usr/bin/env python
#-----------------------------------------------------------------------
# user_survey_flask.py
#-----------------------------------------------------------------------
import flask
import database_access
#-----------------------------------------------------------------------
app = flask.Flask(__name__) # might need to change
#-----------------------------------------------------------------------
@app.route('/', methods=['GET'])
@app.route('/firstpage', methods=['GET'])
def firstpage():
    pronouns = flask.request.args.get('pronouns')
    classes = flask.request.args.get('classes')
    bio = flask.request.args.get('bio')
    availability = flask.request.args.get('availability')
    full_name = flask.request.args.get('full_name')
    display_name = flask.request.args.get('display_name')

    id = database_access.add_user(
        (pronouns, classes, bio, availability, full_name, display_name),'testdb.pgsql')
    
    output = database_access.get_user(id, 'testdb.pgsql')

    return output


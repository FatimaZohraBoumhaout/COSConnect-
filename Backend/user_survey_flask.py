#!/usr/bin/env python
#-----------------------------------------------------------------------
# user_survey_flask.py
#-----------------------------------------------------------------------
import flask
import database_access
from flask import jsonify
#-----------------------------------------------------------------------
app = flask.Flask(__name__) # might need to change
#-----------------------------------------------------------------------
@app.route('/', methods=['GET'])
@app.route('/firstpage', methods=['GET', 'POST'])
def firstpage():
    print(flask.request.method, 'me')
    if flask.request.method == 'POST':
        print('inside')
        data = flask.request.get_json()
        pronouns = data.get('pronouns')
        classes = data.get('classes')
        bio = data.get('bio')
        availability = data.get('availability')
        full_name = data.get('fullName')
        display_name = data.get('displayName')
        id = database_access.add_user(
            (pronouns, classes, bio, availability, full_name, display_name),'testdb_ery6')
        
        output = database_access.get_user(id, 'testdb_ery6')
        print('we returned')

        return output
    else:
        user_id = flask.request.args.get('id')
        if user_id:
            output = database_access.get_user(user_id, 'testdb_ery6')
            print(output)
            return jsonify(output)
        else:
            print('before we hit here')
            return "We hit here"

if __name__ == '__main__':
    app.run(debug=True)
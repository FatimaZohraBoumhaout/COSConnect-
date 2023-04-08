#!/usr/bin/env python
#-----------------------------------------------------------------------
# user_survey_flask.py
#-----------------------------------------------------------------------
import flask
import database_access
import receiver_sender_in_user_profile_db
from flask import jsonify
#-----------------------------------------------------------------------
app = flask.Flask(__name__) # might need to change
#-----------------------------------------------------------------------
@app.route('/add_class', methods=['POST'])
def add_class():
    data = flask.request.get_json()
    user_id = data.get('user_id')
    class_name = data.get('class_name')
    database_access.add_class((user_id, class_name), 'testdb_ery6')
    return jsonify({'status': 'success', 'message': 'Class added successfully'})

@app.route('/get_class', methods=['GET'])
def get_class():
    data = flask.request.get_json()
    user_id = data.get('user_id')
    output = database_access.get_classes(user_id, 'testdb_ery6')
    print(output)
    return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True)
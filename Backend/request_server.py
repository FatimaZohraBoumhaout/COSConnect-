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
@app.route('/add_request', methods=['POST'])
def add_request():
    data = flask.request.get_json()
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    
    receiver_sender_in_user_profile_db.add_request((sender_id, receiver_id), 'testdb_ery6')

@app.route('/getSentRequest', methods=['GET'])
def get_sent_request():
    data = flask.request.get_json()
    user_id = data.get('user_id')
    output = receiver_sender_in_user_profile_db.get_sent(user_id, 'testdb_ery6')

    return jsonify(output)

@app.route('/getReceievedRequest', methods=['GET'])
def get_received_request():
    data = flask.request.get_json()
    user_id = data.get('user_id')
    output = receiver_sender_in_user_profile_db.get_received(user_id, 'testdb_ery6')

    return jsonify(output)
    

if __name__ == '__main__':
    app.run(debug=True)
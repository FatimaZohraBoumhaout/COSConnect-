#!/usr/bin/env python
#-----------------------------------------------------------------------
# user_survey_flask.py
#-----------------------------------------------------------------------
import flask
import database_access
import receiver_sender_in_user_profile_db
import classes_access
from flask import jsonify, session
#-----------------------------------------------------------------------
app = flask.Flask(__name__) # might need to change
#-----------------------------------------------------------------------
@app.route('/', methods=['GET'])
@app.route('/classview', methods=['GET'])
def classview():
    user_id = session.get('user_id')
    #not sure what the data type is for sent and received so i just treated them like
    #arrays in this and in the frontend too
    sent = receiver_sender_in_user_profile_db.get_sent(user_id, 'testdb_ery6')
    received = receiver_sender_in_user_profile_db.get_received(user_id, 'testdb_ery6')
    pronouns, classes, bio, name, nickname = database_access.get_user(user_id, 'testdb_ery6')
    current_class = flask.request.cookies.get('class_cookie')
    class_detail = classes_access.get_class(current_class, 'testdb_ery6')

    #i'm returning the sent requests, received requests, list of classes that the student is enrolled,
    #and the details of the current class (that will be passed through cookies)

    #is this how you render a js file???
    return flask.make_response(flask.render_template('ClassView.js', 
                                                     sentreq=sent, receivedreq=received, classes=classes,
                                                     class_detail=class_detail))
    
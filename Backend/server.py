#!/usr/bin/env python
# -----------------------------------------------------------------------
# user_survey_flask.py
# -----------------------------------------------------------------------
import flask
import database_access
from flask import jsonify
# -----------------------------------------------------------------------
app = flask.Flask(__name__)  # might need to change
# -----------------------------------------------------------------------


@app.route('/firstpage', methods=['POST'])
def firstpage():
    print(flask.request.method, 'me')
    print('inside')
    data = flask.request.get_json()
    pronouns = data.get('pronouns')
    classes = data.get('classes')
    bio = data.get('bio')
    availability = data.get('availability')
    full_name = data.get('fullName')
    display_name = data.get('displayName')
    user_id = database_access.add_user(
        (pronouns, classes, bio, availability, full_name, display_name), 'testdb_ery6')

    print('we returned')
    return jsonify({'user_id': user_id})


@app.route('/get_info', methods=['GET'])
def get_info():
    user_id = flask.request.args.get('id')
    print('userid: ', user_id)
    if user_id:
        output = database_access.get_user(user_id, 'testdb_ery6')
        print(output)
        return jsonify(output)
    else:
        print('before we hit here')
        return "We hit here"


# a different api
@app.route('/add_request', methods=['POST'])
def add_request():
    data = flask.request.get_json()
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')

    database_access.add_request((sender_id, receiver_id), 'testdb_ery6')

# a different api


@app.route('/getSentRequest', methods=['GET'])
def get_sent_request():
    data = flask.request.get_json()
    user_id = data.get('user_id')
    output = database_access.get_sent(user_id, 'testdb_ery6')

    return jsonify(output)

# a different api


@app.route('/getReceievedRequest', methods=['GET'])
def get_received_request():
    data = flask.request.get_json()
    user_id = data.get('user_id')
    output = database_access.get_received(user_id, 'testdb_ery6')

    return jsonify(output)

# a diff


@app.route('/add_class', methods=['POST'])
def add_class():
    data = flask.request.get_json()
    user_id = data.get('user_id')
    class_name = data.get('class_name')
    database_access.add_class((user_id, class_name), 'testdb_ery6')
    print("added class: ", class_name)
    return jsonify({'status': 'success', 'message': 'Class added successfully'})

# a different


@app.route('/get_class', methods=['GET'])
def get_class():
    print("we are in get class)")
    user_id = flask.request.args.get('user_id')
    output = database_access.get_classes(user_id, 'testdb_ery6')
    print("we did it")
    print(output)
    return jsonify(output)

# @app.route('/', methods=['GET'])
# @app.route('/classview', methods=['GET'])
# def classview():
#     #user_id = session.get('user_id')
#     #not sure what the data type is for sent and received so i just treated them like
#     #arrays in this and in the frontend too
#     sent = database_access.get_sent(user_id, 'testdb_ery6')
#     received = database_access.get_received(user_id, 'testdb_ery6')
#     pronouns, classes, bio, name, nickname = database_access.get_user(user_id, 'testdb_ery6')
#     current_class = flask.request.cookies.get('class_cookie')
#     class_detail = database_access.get_class(current_class, 'testdb_ery6')

#     #i'm returning the sent requests, received requests, list of classes that the student is enrolled,
#     #and the details of the current class (that will be passed through cookies)

#     #is this how you render a js file???
#     return flask.make_response(flask.render_template('ClassView.js',
#                                                      sentreq=sent, receivedreq=received, classes=classes,
#                                                      class_detail=class_detail))


if __name__ == '__main__':
    app.run(debug=True)
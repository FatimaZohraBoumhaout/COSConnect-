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
@app.route('/', methods=['GET'])
def index():
    """Endpoint to check if the server is running"""
    return("Welcome, COSConnect Server is running.")


# @app.route('/signup', methods=['POST'])
# def sign_up():
#     """Endpoint to register a new user"""
#     try:
#         data = flask.request.get_json()
#         username = data.get('username')
#         email = data.get('email')
#         password = data.get('password')
#         if not username or not email or not password:
#             raise ValueError('Missing required fields')
#         user_id = database_access.sign_up(
#             (username, email, password), 'testdb_ery6')
#         return jsonify({'user_id': user_id})
#     except ValueError as vex:
#         print('Error in sign_up:', vex)
#         return jsonify({'error': 'Missing required fields'}), 400
#     except Exception as ex:
#         print('Error in sign_up:', ex)
#         return jsonify({'error': 'Failed to sign up user'}), 500


@app.route('/login', methods=['POST'])
def log_in():
    """Endpoint to authenticate a user"""
    print("looog")
    try:
        id_token = flask.request.get_json()
        decoded_token = id_token['decoded_token']
        email = decoded_token['email']
        print("email:", email)
        net_id = email.split("@")[0]
        print(net_id)
        displayname = database_access.authenticate_user(net_id, 'testdb_ery6')
        print(displayname)
        if displayname is None:
            return jsonify({'message': 'User not found', 'net_id': net_id}), 404
        else:
            return jsonify({'net_id': net_id, 'displayname': displayname}), 200
    except ValueError as vex:
        print('Error in log_in:', vex)
        return jsonify({'error': 'Missing required fields'}), 400
    except Exception as ex:
        print('Error in log_in:', ex)
        return jsonify({'error': 'Failed to log in user'}), 500



@app.route('/userprofile', methods=['POST'])
def user_profile():
    """Endpoint to update user profile"""
    try:
        data = flask.request.get_json()
        print("GOT HERE")
        print(data)
        net_id = data.get('netId')
        if not net_id:
            raise ValueError('Missing required fields')
        pronouns = data.get('pronouns')
        classes = data.get('classes')
        bio = data.get('bio')
        availability = data.get('availability')
        full_name = data.get('fullName')
        display_name = data.get('displayName')
        database_access.add_user(
            (net_id, pronouns, classes, bio, availability, full_name, display_name), 'testdb_ery6')
        #print(statement)
        return jsonify({'net_id': net_id})
    except ValueError as vex:
        print('Error in user_profile:', vex)
        return jsonify({'error': 'Missing required fields'}), 400
    except Exception as ex:
        print('Error in user_profile:', ex)
        return jsonify({'error': 'Failed to update user profile'}), 500


@app.route('/get_info', methods=['GET'])
def get_info():
    """Get user info for the given user ID."""
    try:
        net_id = flask.request.args.get('id')
        if not net_id:
            raise ValueError('Missing user ID')
        output = database_access.get_user(net_id, 'testdb_ery6')
        return jsonify(output)
    except Exception as ex:
        print('Error in get_info:', ex)
        return jsonify({'error': 'Failed to retrieve user info'}), 500


@app.route('/add_request', methods=['POST'])
def add_request():
    """Add a request to the database."""
    try:
        data = flask.request.get_json()
        sender_id = data.get('sender_id')
        receiver_id = data.get('receiver_id')
        course = data.get('course')
        if not sender_id or not receiver_id or not course:
            raise ValueError('Missing required fields')
        database_access.add_request((sender_id, receiver_id, course), 'testdb_ery6')
        return jsonify({'status': 'success'})
    except ValueError as vex:
        print('Error in add_request:', vex)
        return jsonify({'error': 'Missing required fields'}), 400
    except Exception as ex:
        print('Error in add_request:', ex)
        return jsonify({'error': 'Failed to add request'}), 500


# @app.route('/get_request', methods=['GET'])
# def get_request():
#     """Get request data for the given sender ID, receiver ID, and message."""
#     try:
#         sender_id = flask.request.args.get('sender_id')
#         receiver_id = flask.request.args.get('receiver_id')
#         course = flask.request.args.get('course')
#         requests = database_access.get_request((sender_id, receiver_id, course), 'testdb_ery6')
#         return jsonify(requests)
#     except Exception as ex:
#         print('Error in get_request:', ex)
#         return jsonify({'error': 'Failed to retrieve requests'}), 500


@app.route('/getSentRequest', methods=['GET'])
def get_sent_request():
    """Get all sent requests for the given user ID."""
    try:
        user_id = flask.request.args.get('user_id')
        course = flask.request.args.get('course')
        if not user_id or course:
            raise ValueError('Missing user ID or Course')
        output = database_access.get_sent((user_id, course), 'testdb_ery6')
        return jsonify(output)
    except ValueError as vex:
        print('Error in get_sent_request:', vex)
        return jsonify({'error': 'Missing user ID'}), 400
    except Exception as ex:
        print('Error in get_sent_request:', ex)
        return jsonify({'error': 'Failed to retrieve sent requests'}), 500


@app.route('/getReceivedRequest', methods=['GET'])
def get_received_request():
    """Get all received requests for the given user ID."""
    try:
        user_id = flask.request.args.get('user_id')
        course = flask.request.args.get('course')
        if not user_id or course:
            raise ValueError('Missing user ID or course')
        output = database_access.get_received((user_id, course), 'testdb_ery6')
        return jsonify(output)
    except ValueError as vex:
        print('Error in get_received_request:', vex)
        return jsonify({'error': 'Missing user ID'}), 400
    except Exception as ex:
        print('Error in get_received_request:', ex)
        return jsonify({'error': 'Failed to retrieve received requests'}), 500


@app.route('/add_class', methods=['POST'])
def add_class():
    """Add new classes for the given user ID."""
    try:
        data = flask.request.get_json()
        net_id = data.get('net_id')
        classes = data.get('classes')
        if not net_id or not classes:
            raise ValueError('Missing user ID or classes')
        for class_name in classes:
            database_access.add_class((net_id, class_name), 'testdb_ery6')
            print("added class: ", class_name)
        return jsonify({'status': 'success', 'message': 'Classes added successfully'})
    except ValueError as vex:
        print('Error in add_class:', vex)
        return jsonify({'error': 'Missing user ID or classes'}), 400
    except Exception as ex:
        print('Error in add_class:', ex)
        return jsonify({'error': 'Failed to add classes'}), 500


@app.route('/get_class', methods=['GET'])
def get_class():
    """Get all classes for the given user ID."""
    try:
        net_id = flask.request.args.get('net_id')
        if not net_id:
            raise ValueError('Missing netID')
        output = database_access.get_classes(net_id, 'testdb_ery6')
        print("we did it")
        print(output)
        return jsonify(output)
    except ValueError as vex:
        print('Error in get_class:', vex)
        return jsonify({'error': 'Missing user ID'}), 400
    except Exception as ex:
        print('Error in get_class:', ex)
        return jsonify({'error': 'Failed to retrieve classes'}), 500


# @app.route('/send_message', methods=['POST'])
# def send_message():
#     """Send a message from the given sender ID to the given receiver ID."""
#     try:
#         data = flask.request.get_json()
#         id_sender = data.get('userId')[0]
#         id_receiver = data.get('receiver')
#         message = data.get('message')
#         if not id_sender or not id_receiver or not message:
#             raise ValueError('Missing sender ID, receiver ID, or message')
#         database_access.add_request((id_sender, id_receiver, message), 'testdb_ery6')
#         print("sent message: ", message, "to user:", id_receiver, "from:", id_sender)
#         return jsonify({'status': 'success', 'message': 'Message sent successfully'})
#     except ValueError as vex:
#         print('Error in send_message:', vex)
#         return jsonify({'error': 'Missing sender ID, receiver ID, or message'}), 400
#     except Exception as ex:
#         print('Error in send_message:', ex)
#         return jsonify({'error': 'Failed to send message'}), 500


@app.route('/edit_profile', methods=['POST'])
def edit_profile():
    """Update the user's profile information."""
    try:
        data = flask.request.get_json()
        user_id = data.get('userId')[0]
        pronouns = data.get('pronouns')
        classes = data.get('classes')
        bio = data.get('bio')
        availability = data.get('availability')
        database_access.edit_user(
            (user_id, pronouns, classes, bio, availability), 'testdb_ery6')
        return jsonify({'message': 'Profile updated successfully'})
    except Exception as ex:
        print('Error in edit_profile:', ex)
        return jsonify({'error': 'Failed to update profile'}), 500


@app.route('/get_students', methods=['GET'])
def get_students():
    """Get a list of students who are enrolled in the given class."""
    try:
        classes = flask.request.args.get('class')
        if not classes:
            raise ValueError('Missing class name')
        students = database_access.get_students(classes, 'testdb_ery6')
        return jsonify(students)
    except ValueError as vex:
        print('Error in get_students:', vex)
        return jsonify({'error': 'Missing class name'}), 400
    except Exception as ex:
        print('Error in get_students:', ex)
        return jsonify({'error': 'Failed to retrieve students'}), 500

@app.route('/get_courses', methods=['GET'])
def get_courses():
    """Get a list of courses in COS."""
    try:
        classes = database_access.get_courses()
        return jsonify(classes)
    except Exception as ex:
        print('Error in calling API:', ex)
        return jsonify({'error': 'Failed to retrieve students'}), 500

@app.route('/post_status', methods=['POST'])
def post_status():
    try:
        data = flask.request.get_json()
        net_id = data.get('netId')
        status = data.get('status')
        database_access.post_status((net_id, status), 'testdb_ery6')
        return jsonify({'status': 'success', 'message': 'Status updated successfully'})
    except Exception as ex:
        print('Error in post_status:', ex)
        return jsonify({'error': 'Failed to post status'}), 500

@app.route('/post_talking', methods=['POST'])
def post_talking():
    try:
        data = flask.request.get_json()
        net_id = data.get('netId')
        talking = data.get('talking')
        database_access.post_talking((net_id, talking), 'testdb_ery6')
        return jsonify({'status': 'success', 'message': 'Talking updated successfully'})
    except Exception as ex:
        print('Error in post_status:', ex)
        return jsonify({'error': 'Failed to post talking'}), 500

@app.route('/get_status', methods=['GET'])
def get_status():
    try:
        data = flask.request.get_json()
        net_id = data.get('netId')
        status = database_access.get_status((net_id), 'testdb_ery6')
        if status == "True":
            status = "Available"
        else:
            status = "Not Available"
        return jsonify(status)
    except Exception as ex:
        print('Error in post_status:', ex)
        return jsonify({'error': 'Failed to get status'}), 500

@app.route('/get_talking', methods=['GET'])
def get_talking():
    try:
        data = flask.request.get_json()
        net_id = data.get('netId')
        talking = database_access.get_talking((net_id), 'testdb_ery6')
        return jsonify(talking)
    except Exception as ex:
        print('Error in post_status:', ex)
        return jsonify({'error': 'Failed to get talking'}), 500

if __name__ == '__main__':
    app.run(debug=True)

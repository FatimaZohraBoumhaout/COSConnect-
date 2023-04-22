#!/usr/bin/env python
# -----------------------------------------------------------------------
# user_survey_flask.py
# -----------------------------------------------------------------------
import flask
import database_access
from flask import jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_mail import Mail, Message


# -----------------------------------------------------------------------
app = flask.Flask(__name__)  # might need to change
# -----------------------------------------------------------------------
@app.route('/', methods=['GET'])
def index():
    """Endpoint to check if the server is running"""
    return("Welcome, COSConnect Server is running.")


@app.route('/signup', methods=['POST'])
def sign_up():
    """Endpoint to register a new user"""
    try:
        data = flask.request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        if not username or not email or not password:
            raise ValueError('Missing required fields')
        user_id = database_access.sign_up(
            (username, email, password), 'testdb_ery6')
        return jsonify({'user_id': user_id})
    except ValueError as vex:
        print('Error in sign_up:', vex)
        return jsonify({'error': 'Missing required fields'}), 400
    except Exception as ex:
        print('Error in sign_up:', ex)
        return jsonify({'error': 'Failed to sign up user'}), 500


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
        message = data.get('message')
        if not sender_id or not receiver_id or not message:
            raise ValueError('Missing required fields')
        database_access.add_request((sender_id, receiver_id, message), 'testdb_ery6')
        return jsonify({'status': 'success'})
    except ValueError as vex:
        print('Error in add_request:', vex)
        return jsonify({'error': 'Missing required fields'}), 400
    except Exception as ex:
        print('Error in add_request:', ex)
        return jsonify({'error': 'Failed to add request'}), 500


@app.route('/get_request', methods=['GET'])
def get_request():
    """Get request data for the given sender ID, receiver ID, and message."""
    try:
        sender_id = flask.request.args.get('sender_id')
        receiver_id = flask.request.args.get('receiver_id')
        message = flask.request.args.get('message')
        requests = database_access.get_request((sender_id, receiver_id, message), 'testdb_ery6')
        return jsonify(requests)
    except Exception as ex:
        print('Error in get_request:', ex)
        return jsonify({'error': 'Failed to retrieve requests'}), 500


@app.route('/getSentRequest', methods=['GET'])
def get_sent_request():
    """Get all sent requests for the given user ID."""
    try:
        user_id = flask.request.args.get('user_id')
        if not user_id:
            raise ValueError('Missing user ID')
        output = database_access.get_sent(user_id, 'testdb_ery6')
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
        if not user_id:
            raise ValueError('Missing user ID')
        output = database_access.get_received(user_id, 'testdb_ery6')
        return jsonify(output)
    except ValueError as vex:
        print('Error in get_received_request:', vex)
        return jsonify({'error': 'Missing user ID'}), 400
    except Exception as ex:
        print('Error in get_received_request:', ex)
        return jsonify({'error': 'Failed to retrieve received requests'}), 500


@app.route('/add_class', methods=['POST'])
def add_class():
    """Add a new class for the given user ID and class name."""
    try:
        data = flask.request.get_json()
        net_id = data.get('net_id')
        class_name = data.get('class_name')
        if not net_id or not class_name:
            raise ValueError('Missing user ID or class name')
        database_access.add_class((net_id, class_name), 'testdb_ery6')
        print("added class: ", class_name)
        return jsonify({'status': 'success', 'message': 'Class added successfully'})
    except ValueError as vex:
        print('Error in add_class:', vex)
        return jsonify({'error': 'Missing user ID or class name'}), 400
    except Exception as ex:
        print('Error in add_class:', ex)
        return jsonify({'error': 'Failed to add class'}), 500


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
    
#-------------------------------------------------------------------------------------------------------
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'cosconnectprinceton@gmail.com'
app.config['MAIL_PASSWORD'] = 'COSConnect2025'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = flask.request.json()
        sender_email = data.get('sender_email')
        receiver_email = data.get('receiver_email')
        subject = data.get('subject')
        body = data.get('body')

        msg = Message(subject, sender=sender_email, recipients=[receiver_email])
        msg.body = body

        mail.send(msg)

        return 'Email sent!'
    
    except ValueError as vex:
        print('Error in send_email:', vex)
        return jsonify({'error': 'Missing sender ID, receiver ID, or text message'}), 400
    except Exception as ex:
        print('Error in send_email:', ex)
        return jsonify({'error': 'Failed to send the email'}), 500
  
if __name__ == '__main__':
    app.run(debug=True)

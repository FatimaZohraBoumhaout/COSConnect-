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
import numpy as np


# -----------------------------------------------------------------------
app = flask.Flask(__name__)  # might need to change
# -----------------------------------------------------------------------
@app.route('/', methods=['GET'])
def index():
    """Endpoint to check if the server is running"""
    return("Welcome, COSConnect Server is running.")

def is_whitelisted(email):
    """return True if the email address is whitelisted"""
    whitelist = ('pnabare@gmail.com', 'cosconnect1@gmail.com', 'cosconnect3@gmail.com', 'cosconnect4@gmail.com')
    return email in whitelist

def princeton_email(email):
    """Verify that the email address has princeton.edu"""
    if (is_whitelisted(email)):
        return True
    extension = email.split('@')[1]
    print('extension', extension)    
    return extension == 'princeton.edu'

@app.route('/login', methods=['POST'])
def log_in():
    """Endpoint to authenticate a user"""
    print("looog")
    try:
        id_token = flask.request.get_json()
        decoded_token = id_token['decoded_token']
        email = decoded_token['email']
        if not princeton_email(email):
            return jsonify({'message': 'Please use a Princeton email address instead!'}), 401
        print("email:", email)
        net_id = email.split("@")[0]
        print(net_id)
        displayname = database_access.authenticate_user(net_id, 'testdb_ery6')
        print("display",displayname)
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
        checkUser = database_access.get_user(net_id, 'testdb_ery6')
        if len(checkUser) != 0:
            print('Duplicate Request for adding user')
            return jsonify({'net_id': net_id})
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
        checkRequest = database_access.get_request((sender_id, receiver_id, course), 'testdb_ery6')
        if len(checkRequest) != 0:
            print('Duplicate Request for adding request')
            return jsonify({'status': 'success'})
        database_access.add_request((sender_id, receiver_id, course), 'testdb_ery6')
        return jsonify({'status': 'success'})
    except ValueError as vex:
        print('Error in add_request:', vex)
        return jsonify({'error': 'Missing required fields'}), 400
    except Exception as ex:
        print('Error in add_request:', ex)
        return jsonify({'error': 'Failed to add request'}), 500

@app.route('/getSentRequest', methods=['GET'])
def get_sent_request():
    """Get all sent requests for the given user ID."""
    try:
        user_id = flask.request.args.get('user_id')
        course = flask.request.args.get('course')
        print(user_id)
        print("course", course)
        if not (user_id or course):
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
        if not user_id or not course:
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
            class_exists = database_access.get_class_status((net_id, class_name), 'testdb_ery6')
            if len(class_exists) != 0:
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

@app.route('/edit_profile', methods=['POST'])
def edit_profile():
    """Update the user's profile information."""
    try:
        data = flask.request.get_json()
        user_id = data.get('userId')
        pronouns = data.get('pronouns')
        classes = data.get('classes')
        bio = data.get('bio')
        availability = data.get('availability')
        print(user_id, pronouns, classes, bio, availability)
        old_classes = database_access.get_classes(user_id, 'testdb_ery6')[0][0]
        #print("old classes", old_classes)
        #print("new classes", classes)
        deleted_classes =  np.setdiff1d(old_classes, classes)
        added_classes = np.setdiff1d(classes, old_classes)
        for course in deleted_classes:
            database_access.delete_class((user_id, course), 'testdb_ery6')
            database_access.reject_all_requests((user_id, course), 'testdb_ery6')
        for course in added_classes:
            database_access.add_class((user_id, course), 'testdb_ery6')
        database_access.edit_user(
            (user_id, pronouns, classes, bio, availability), 'testdb_ery6')
        return jsonify({'message': 'Profile updated successfully'})
    except Exception as ex:
        print('Error in edit_profile:', ex)
        return jsonify({'error': 'Failed to update profile'}), 500

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
''' Some of the code for the send_email function is adapted from: https://mailtrap.io/blog/flask-email-sending/'''

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'cosconnectprinceton@gmail.com'
app.config['MAIL_PASSWORD'] = 'fymlapfgknffjdjg'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = flask.request.get_json()
        print(data)

        print ('Sending email')
        sender_email = data.get('sender_email')
        receiver_email = data.get('receiver_email')
        sender_id = data.get('sender_id')
        receiver_id = data.get('receiver_id')
        subject = data.get('subject')
        body = data.get('body')

        print ('Check if notifications on')
        notifications = database_access.get_notifications((sender_id), 'testdb_ery6')
        if notifications[0][0] == False:
            sender_email = 'cosconnectprinceton@gmail.com'

        notifications = database_access.get_notifications((receiver_id), 'testdb_ery6')
        if notifications[0][0] == False:
            receiver_email = 'cosconnectprinceton@gmail.com'

        msg = Message(subject, sender='cosconnectprinceton@gmail.com', recipients=[receiver_email], cc=[sender_email])
        msg.body = body

        mail.send(msg)

        return 'Email sent!'
    
    except ValueError as vex:
        print('Error in send_email:', vex)
        return jsonify({'error': 'Missing sender ID, receiver ID, or text message'}), 400
    except Exception as ex:
        print('Error in send_email:', ex)
        return jsonify({'error': 'Failed to send the email'}), 500
#-------------------------------------------------------------------------------------------------------

@app.route('/post_notifications', methods=['POST'])
def post_notifications():
    try:
        data = flask.request.get_json()
        net_id = data.get('netId')
        status = data.get('status')
        print("trying to change notifications to", status)
        database_access.post_notifications((net_id, status), 'testdb_ery6')
        return jsonify({'status': 'success', 'message': 'Talking updated successfully'})
    except Exception as ex:
        print('Error in post_status:', ex)
        return jsonify({'error': 'Failed to post notifications'}), 500

@app.route('/get_notifications', methods=['GET'])
def get_status():
    try:
        net_id = flask.request.args.get('id')
        notifications = database_access.get_notifications((net_id), 'testdb_ery6')
        print("GOT Notifications", notifications[0][0])
        if notifications[0][0] == True:
            notifications = "Available"
        else:
            notifications = "Not Available"
        print("GOT STATUS", notifications)
        return jsonify(notifications)
    except Exception as ex:
        print('Error in get_notifications:', ex)
        return jsonify({'error': 'Failed to get Notifications'}), 500

@app.route('/get_students_info', methods=['GET'])
def get_students_info():
    try:
        classes = flask.request.args.get('class')
        net_id = flask.request.args.get('id')
        accepted = database_access.get_accepted((net_id), 'testdb_ery6')
        for row in accepted:
            if row[2] == classes:
                return []
        students = database_access.get_students((classes, net_id), 'testdb_ery6')
        students_info = database_access.get_students_info(students, 'testdb_ery6')
        print("GOT TALKING", students_info)
        return jsonify(students_info)
    except Exception as ex:
        print('Error in get_students_info:', ex)
        return jsonify({'error': 'Failed to get_students_info'}), 500

@app.route('/getRecentSent', methods=['GET'])
def get_recent_sent():
    try:
        net_id = flask.request.args.get('id')
        output = database_access.get_recent_sent((net_id), 'testdb_ery6')
        print("got sent", output)
        if (len(output) > 0):
            output = output[len(output) - 1][0]
        print("got sent is now", output)
        return jsonify(output)
    except Exception as ex:
        print('Error in post_status:', ex)
        return jsonify({'error': 'Failed to get recent sent'}), 500

@app.route('/getRecentReceived', methods=['GET'])
def get_recent_received():
    try:
        net_id = flask.request.args.get('id')
        output = database_access.get_recent_received((net_id), 'testdb_ery6')
        print("got received", output)
        if (len(output) > 0):
            output = output[len(output) - 1][0]
        print("got received is now", output)
        return jsonify(output)
    except Exception as ex:
        print('Error in post_status:', ex)
        return jsonify({'error': 'Failed to recent received'}), 500

@app.route('/get_request', methods=['GET'])
def get_request_():
    try:
        net_id = flask.request.args.get('id')
        output = database_access.get_recent_received((net_id), 'testdb_ery6')
        print("got received", output)
        return jsonify(output)
    except Exception as ex:
        print('Error in post_status:', ex)
        return jsonify({'error': 'Failed to recent received'}), 500

@app.route('/accept_request', methods=['POST'])
def accept_request():
    try:
        data = flask.request.get_json()
        sender = data.get('sender')
        receiver = data.get('receiver')
        course = data.get('course')
        print(sender, receiver, course)
        database_access.accept_request((sender, receiver, course), 'testdb_ery6')
        database_access.reject_unaccepted_requests((sender, receiver, course), 'testdb_ery6')
        database_access.status_off((sender, course), 'testdb_ery6')
        database_access.status_off((receiver, course), 'testdb_ery6')
        return jsonify({'status': 'success', 'message': 'Request accepted successfully'}), 200
    except Exception as ex:
        print('Error in accept_request:', ex)
        return jsonify({'error': 'Failed to accept request'}), 500

@app.route('/reject_request', methods=['POST'])
def reject_request():
    try:
        data = flask.request.get_json()
        sender = data.get('sender')
        receiver = data.get('receiver')
        course = data.get('course')
        print(sender, receiver, course)
        database_access.reject_request((sender, receiver, course), 'testdb_ery6')
        return jsonify({'status': 'success', 'message': 'Request rejected successfully'})
    except Exception as ex:
        print('Error in reject_request:', ex)
        return jsonify({'error': 'Failed to reject request'}), 500

@app.route('/post_class_status', methods=['POST'])
def post_class_status():
    try:
        data = flask.request.get_json()
        net_id = data.get('netId')
        course = data.get('this_class')
        class_status = data.get('status')
        accepted = database_access.get_accepted_class((net_id, course), 'testdb_ery6')
        if len(accepted) != 0:
            database_access.status_off((net_id, course), 'testdb_ery6')
            return jsonify({'error': 'Already accepted partner'}), 500
        database_access.post_class_status((net_id, course, class_status), 'testdb_ery6')
        return jsonify({'status': 'success', 'message': 'Class status updated successfully'})
    except Exception as ex:
        print('Error in post_class_status:', ex)
        return jsonify({'error': 'Failed to update class status'}), 500

@app.route('/get_class_status', methods=['GET'])
def get_class_status():
    try:
        net_id = flask.request.args.get('id')
        course = flask.request.args.get('class')
        status = database_access.get_class_status((net_id, course), 'testdb_ery6')
        print("GOT class status", status[0][0])
        if status[0][0] == True:
            status = "Available"
        else:
            status = "Not Available"
        print("GOT STATUS", status)
        return jsonify(status)
    except Exception as ex:
        print('Error in get_class_status:', ex)
        return jsonify({'error': 'Failed to get status'}), 500

@app.route('/get_accepted', methods=['GET'])
def get_accepted():
    try:
        net_id = flask.request.args.get('id')
        accepted = database_access.get_accepted((net_id), 'testdb_ery6')
        print("got accepted", accepted)
        return jsonify(accepted)
    except Exception as ex:
        print('Error in get_accepted:', ex)
        return jsonify({'error': 'Failed to get accepted'}), 500

@app.route('/get_rejected', methods=['GET'])
def get_rejected():
    try:
        net_id = flask.request.args.get('id')
        rejected = database_access.get_rejected((net_id), 'testdb_ery6')
        print("got rejected", rejected)
        return jsonify(rejected)
    except Exception as ex:
        print('Error in get_rejected:', ex)
        return jsonify({'error': 'Failed to get rejected'}), 500

@app.route('/get_pending', methods=['GET'])
def get_pending():
    try:
        net_id = flask.request.args.get('id')
        pending = database_access.get_pending((net_id), 'testdb_ery6')
        sent = []
        received = []
        output = []
        for row in pending:
            if row[0] == net_id:
                sent.append((row[1], row[2]))
            else:
                received.append((row[0], row[2]))
        print("sent", sent)
        print("received", received)
        output.append(sent)
        output.append(received)
        return output
    except Exception as ex:
        print('Error in get_pending:', ex)
        return jsonify({'error': 'Failed to get pending'}), 500

@app.route('/cancel_accept', methods=['POST'])
def cancel_accept():
    try:
        data = flask.request.get_json()
        sender = data.get('sender')
        receiver = data.get('receiver')
        course = data.get('course')
        print(sender, receiver, course)
        database_access.reject_request((sender, receiver, course), 'testdb_ery6')
        return jsonify({'status': 'success', 'message': 'Request canceled successfully'}), 200
    except Exception as ex:
        print('Error in accept_request:', ex)
        return jsonify({'error': 'Failed to accept request'}), 500

if __name__ == '__main__':
    app.run(debug=True)

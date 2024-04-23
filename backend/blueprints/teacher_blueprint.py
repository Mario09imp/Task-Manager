from flask import Blueprint, request, jsonify
from backend import teacher
import datetime

teacher_blueprint = Blueprint('teacher', __name__)



@teacher_blueprint.route('/get_students/<int:teacherID>', methods=['GET'])
@teacher_blueprint.route('/get_students/<int:teacherID>/<int:classID>', methods=['GET'])
def get_students(teacherID, classID=None):
    try:
        students = teacher.get_students(teacherID, classID)
        return jsonify(students), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@teacher_blueprint.route('/get_assignment/<int:AssignmentID>', methods=['GET'])
def get_assignment(AssignmentID):
    assignment = teacher.get_assignment(AssignmentID)
    return jsonify(assignment)


@teacher_blueprint.route('/create_assignment', methods=['POST'])
def create_assignment():
    data = request.json
    result = teacher.create_assignment(data['classID'], data['Title'], data['Description'], data['DueDate'])
    return jsonify(result)


@teacher_blueprint.route('/update_assignment', methods=['PUT'])
def update_assignment():
    data = request.json
    result = teacher.update_assignment(data['AssignmentID'], data['Title'], data['Description'], data['DueDate'])
    return jsonify(result)


@teacher_blueprint.route('/delete_assignment/<int:assigmentID>', methods=['DELETE'])
def delete_assignment(assignmentID):
    result = teacher.delete_assignment(assignmentID)
    return jsonify(result)


@teacher_blueprint.route('/get_reminders', methods=['GET'])
def get_reminder():
    data = request.json
    result = teacher.get_reminder(data['teachedID'], data['reminderID'])
    return jsonify(result)


@teacher_blueprint.route('/create_reminder', methods=['POST'])
def create_reminder():
    data = request.json
    result = teacher.create_reminder(data['assignmentID'],
                                     datetime.datetime.strptime(data['reminderDate'], '%Y-%m-%d').date(), data['title'],
                                     data['description'])
    return jsonify(result)


@teacher_blueprint.route('/update_reminder', methods=['PUT'])
def update_reminder():
    data = request.json
    result = teacher.update_reminder(data['assignmentID'], data['reminderDate'], data['title'], data['description'])
    return jsonify(result)


@teacher_blueprint.route('/delete_reminder', methods=['DELETE'])
def delete_reminder():
    reminderID = request.json.args.get('reminderID', type=int)
    result = teacher.delete_reminder(reminderID)
    return jsonify(result)


@teacher_blueprint.route('/add_student_to_reminder', methods=['POST'])
def add_student_to_reminder():
    data = request.json
    result = teacher.add_student_to_reminder(data['reminderID', data['studentID']])
    return jsonify(result)


@teacher_blueprint.route('/delete_student_from_reminder', methods=['DELETE'])
def delete_students_from_reminder():
    data = request.json
    result = teacher.add_student_to_reminder(data['reminderID'], data['studentID'])
    return jsonify(result)

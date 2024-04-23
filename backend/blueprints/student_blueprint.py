from flask import Blueprint, request, jsonify
from backend import student
import datetime

student_blueprint = Blueprint('student', __name__)


@student_blueprint.route('/get_classes', methods=['GET'])
def get_classes():
    classes = student.get_classes()
    return jsonify(classes)


@student_blueprint.route('/drop_class', methods=['DELETE'])
def drop_class():
    data = request.data
    result = student.drop_class(data['studentID'], data['classID'])
    return jsonify(result)


@student_blueprint.route('/get_reminder', methods=['GET'])
def get_reminder():
    reminderID = request.args.get('reminderID', default=None, type=int)
    result = student.get_reminder(reminderID)
    return jsonify(result)


@student_blueprint.route('/create_reminder', methods=['POST'])
def create_reminder():
    data = request.json
    result = student.create_reminder(data['assignmentID'],
                                     datetime.strptime(data['reminderDate'], '%Y-%m-%d').date(), data['title'],
                                     data['description'])
    return jsonify(result)


@student_blueprint.route('/update_reminder', methods=['PUT'])
def update_reminder():
    data = request.json
    result = student.update_reminder(data['assignmentID'], data['reminderDate'], data['title'], data['description'])
    return jsonify(result)


@student_blueprint.route('/delete_reminder', methods=['DELETE'])
def delete_reminder():
    reminderID = request.args.get('reminderID', default=None, type=int)
    result = student.delete_reminder(reminderID)
    return jsonify(result)


@student_blueprint.route('/get_task', methods=['GET'])
def get_task():
    taskID = request.args.get('taskID', default=None, type=int)
    result = student.get_task(taskID)
    return jsonify(result)


@student_blueprint.route('/create_task', methods=['POST'])
def create_task():
    data = request.json
    result = student.create_task(data['title'],
                                 data['description'], datetime.strptime(data['dueDate'], '%Y-%m-%d').date(), data['status'],
                                 data['studentID'])
    return jsonify(result)


@student_blueprint.route('/update_task', methods=['PUT'])
def update_task():
    data = request.json
    result = student.update_task(data['taskID'], data['title'], data['description'], data['dueDate'], data['status'])
    return jsonify(result)


@student_blueprint.route('/delete_task', methods=['POST'])
def delete_task():
    data = request.json
    result = student.delete_task(data['taskID'])
    return jsonify(result)


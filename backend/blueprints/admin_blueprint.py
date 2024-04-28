import dataclasses
from flask import Blueprint, request, jsonify
from backend import admin

admin_blueprint = Blueprint('admin', __name__, url_prefix='/admin')


@admin_blueprint.route('/get_users', methods=['GET'])
def get_users():
    users = admin.get_users()
    return jsonify(users)


@admin_blueprint.route('/get_user_login', methods=['GET'])
def get_user_login():
    data = request.get_json()
    result = admin.get_user_login(data['password'], data['userName'], data['email_address'])
    return jsonify(result)


@admin_blueprint.route('/create_student', methods=['POST'])
def create_student():
    data = request.json
    result = admin.create_student(data['userName'], data['password'], data['email_address'], data['firstName'],
                                  data['lastName'])
    return jsonify(result)


@admin_blueprint.route('/create_teacher', methods=['POST'])
def create_teacher():
    data = request.json
    result = admin.create_teacher(data['userName'], data['password'], data['email_address'], data['firstName'],
                                  data['lastName'])
    return jsonify(result)


@admin_blueprint.route('/create_admin', methods=['POST'])
def create_admin():
    data = request.json
    result = admin.create_admin(data['userName'], data['password'], data['email_address'], data['firstName'],
                                data['lastName'])
    return jsonify(result)


@admin_blueprint.route('/update_student/<int:studentID>', methods=['PUT'])
def update_student(studentID):
    data = request.json
    result = admin.update_student(studentID, data['userName'], data['password'], data['email_address'],
                                  data['firstName'], data['lastName'])
    return jsonify(result)

@admin_blueprint.route('/update_teacher/<int:teacherID>', methods=['PUT'])
def update_teacher(teacherID):
    data = request.json
    result = admin.update_teacher(teacherID, data['userName'], data['password'], data['email_address'],
                                  data['firstName'], data['lastName'])
    return jsonify(result)

@admin_blueprint.route('/update_admin/<int:adminID>', methods=['PUT'])
def update_admin(adminID):
    data = request.json
    result = admin.update_admin(adminID, data['userName'], data['password'], data['email_address'],
                                data['firstName'], data['lastName'])
    return jsonify(result)


@admin_blueprint.route('/delete_student', methods=['DELETE'])
def delete_student():
    studentID = request.args.get('studentID', type=int)
    result = admin.delete_student(studentID)
    return jsonify(result)


@admin_blueprint.route('/delete_teacher', methods=['DELETE'])
def delete_teacher():
    teacherID = request.args.get('teacherID', type=int)
    result = admin.delete_teacher(teacherID)
    return jsonify(result)


@admin_blueprint.route('/delete_admin', methods=['DELETE'])
def delete_admin():
    adminID = request.args.get('adminID', type=int)
    result = admin.delete_admin(adminID)
    return jsonify(result)

    # QUERIES ON CLASSES



@admin_blueprint.route('/get_class', methods=['GET'])
def get_class():
    classes = admin.get_class()
    return jsonify(classes)


@admin_blueprint.route('/create_class', methods=['POST'])
def create_class():
    data = request.json
    result = admin.create_class(data['className'], data['description'], data['schedule'], data['teacherID'])
    return jsonify(result)


@admin_blueprint.route('/update_class', methods=['PUT'])
def update_class():
    data = request.json
    result = admin.update_class(data['classID'], data['className'], data['description'], data['schedule'],
                                data['teacherID'])
    return jsonify(result)


@admin_blueprint.route('/delete_class', methods=['DELETE'])
def delete_class():
    classID = request.args.get('classID', type=int)
    result = admin.delete_class(classID)
    return jsonify(result)

        # ADD OR REMOVE STUDENTS TO A CLASS

@admin_blueprint.route('/add_student_to_class', methods=['POST'])
def add_student_to_class():
    data = request.json
    admin.add_students_to_class(data['classID'], data['studentID'])
    return jsonify(result="Student added"), 200


@admin_blueprint.route('/remove_student_from_class', methods=['DELETE'])  # or DELETE, if you prefer
def remove_student_from_class():
    data = request.json
    result = admin.remove_students_from_class(data['classID'], data['studentID'])
    return jsonify(result)


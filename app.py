from flask_cors import CORS
from backend.settings import supabase_client
from flask import Flask, request, jsonify, redirect
from backend.blueprints.admin_blueprint import admin_blueprint
from backend.blueprints.teacher_blueprint import teacher_blueprint
from backend.blueprints.student_blueprint import student_blueprint


app = Flask(__name__)
CORS(app)
app.register_blueprint(admin_blueprint)
app.register_blueprint(teacher_blueprint)
app.register_blueprint(student_blueprint)


@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    user_type = data.get('user_type')
    user_data = {
        'userName': data.get('userName'),  # Fixed method call
        'password': data.get('password'),
        'email_address': data.get('email_address'),
        'firstName': data.get('firstName'),
        'lastName': data.get('lastName')
    }
    if user_type == 'Admin':
        response = supabase_client.table('Admin').insert(user_data).execute()
    elif user_type == 'Teacher':
        response = supabase_client.table('Teacher').insert(user_data).execute()
    elif user_type == 'Student':
        response = supabase_client.table('Student').insert(user_data).execute()  # Complete the function call
    else:
        return jsonify({'error': 'Invalid user type'}), 400

    return jsonify(response.data), response.status_code

@app.errorhandler(404)
def not_found(error):
    return "Page not found", 404

@app.before_request
def before_request():
    if not app.debug and not request.is_secure:
        url = request.url.replace("http://", "https://", 1)
        code = 301
        return redirect(url, code=code)


if __name__ == '__main__':
    app.run(host='127.0.0.2', port=5000, debug=True)

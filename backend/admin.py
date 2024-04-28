from backend.settings import supabase_client


def get_users():
        response = supabase_client.table('combined_users').select('*').execute()
        if response.data is None:
            print("No users found")
            return response.data
        else:
            print("Users")
            for user in response.data:
                print(user)
            return response.data



def get_user_login(password, userName=None, email_address=None):
    # First, we check which field (userName or email_address) is provided to construct the query
    if userName:
        query = supabase_client.table('combined_users').select('*').eq('userName', userName).eq('password', password)
    elif email_address:
        query = supabase_client.table('combined_users').select('*').eq('email_address', email_address).eq('password', password)
    else:
        print("Error: No username or email address provided.")
        return None

    # Execute the query
    response = query.execute()

    # Check the response and handle data accordingly
    if response.data:
        print("User Found:")
        for user in response.data:
            print(user)
        return response.data
    else:
        print("No user found with the provided credentials.")
        return None



def create_teacher(userName:str, password:str, email_address:str, firstName:str, lastName:str):
    response = supabase_client.table('Teacher').insert({
        "userName": userName,
        "password": password,
        "email_address": email_address,
        "firstName": firstName,
        "lastName": lastName
    }).execute()
    if response.data is None:
        print("Error while creating teacher", response.data)
    else:
        print("Teacher created", response.data)

def create_admin(userName:str, password:str, email_address:str, firstName:str, lastName:str):
    response = supabase_client.table('Admin').insert({
        "userName": userName,
        "password": password,
        "email_address": email_address,
        "firstName": firstName,
        "lastName": lastName
    }).execute()
    if response.data is None:
        print("Error while creating Admin", response.data)
    else:
        print("Admin created", response.data)

def update_student(studentID:int, userName:str, password:str, email_address:str, firstName:str, lastName:str):
    response = supabase_client
    data = {
        "userName": userName,
        "password": password,
        "email_address": email_address,
        "firstName": firstName,
        "lastName": lastName
    }
    response = supabase_client.table('Student').update(data).eq('studentID', studentID).execute()
    print("Student updated", response)

def update_teacher(teacherID:int, userName:str, password:str, email_address:str, firstName:str, lastName:str):
    data = {
        "userName": userName,
        "password": password,
        "email_address": email_address,
        "firstName": firstName,
        "lastName": lastName
    }
    response = supabase_client.table('Teacher').update(data).eq('teacherID', teacherID).execute()
    print("Teacher updated", response)

def update_admin(adminID:int, userName:str, password:str, email_address:str, firstName:str, lastName:str):
    data = {
        "userName": userName,
        "password": password,
        "email_address": email_address,
        "firstName": firstName,
        "lastName": lastName
    }
    response = supabase_client.table('Admin').update(data).eq('adminID', adminID).execute()
    print("Admin updated", response)

def delete_student(studentID:int):
    response = supabase_client.table('Student').delete('studentID', studentID).execute()
    return response

def delete_teacher(teacherID:int):
    response = supabase_client.table('Teacher').delete('teacherID', teacherID).execute()
    return response

def delete_admin(adminID:int):
    response = supabase_client.table('Admin').delete('adminID', adminID).execute()
    return response

#   Queries to get, create, update, and delete classes -----------------------------------------------------------------
def get_class(classID=None):
    if classID is not None:
        response = supabase_client.table('Class').select('*').eq('classID', classID).execute()
    else:
        response = supabase_client.table('Class').select('*').execute()
    return response.data
def create_class(className:str, description:str, schedule:str, teacherID:int):
    response = supabase_client.table('Class').insert({
        "className": className,
        "description": description,
        "schedule": schedule,
        "teacherID": teacherID
    }).execute()
    if response.data is None:
        print("Error while creating class", response.data)
        return response.data
    else:
        print("Class created", response.data)
        return response.data

def update_class(classID:int ,className:str, description:str, schedule:str, teacherID:int):
    data = {
        "className": className,
        "description": description,
        "schedule": schedule,
        "teacherID": teacherID
    }
    response = supabase_client.table('Class').update(data).eq('classID', classID).execute()
    print("Class updated", response.data)

def delete_class(classID:int):
    response = supabase_client.table('Class').delete('classID', classID).execute()
    return response

#   Queries to add and remove students to class ------------------------------------------------------------------------

def add_students_to_class(classID:int, studentID:int):
    data = {
        "classID": classID,
        "studentID": studentID
    }
    response = supabase_client.table('ClassStudents'). insert(data).execute()
    return response

def remove_students_from_class(classID: int, studentID: int):
    response = supabase_client.table('ClassStudents').delete().eq('classID', classID).eq('studentID', studentID).execute()
    return response

#get_users()
#get_class()
#create_student("student50", "thisThePass50", "student_50@dmail.com", "Grecia", "Rodriguez")
#create_teacher("teacher40", "ThePass40", "teacher_40@dmail.com", "Joanna", "Spence")
#create_admin("admin40", "thisPass40", "admin_40@dmail.com", "Albert", "Perez")
#get_users()



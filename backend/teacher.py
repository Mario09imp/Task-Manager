from backend.settings import supabase_client
from prettytable import PrettyTable
import datetime


def get_students(teacherID: int, classID=None):
    try:
        if classID is not None:
            response = supabase_client.table('ClassStudents').select('studentID').eq('classID', classID).execute()
            student_ids = [item['studentID'] for item in response.data if 'studentID' in item]

            if not student_ids:
                print("No students found for class ID:", classID)
                return []
            student_details_response = supabase_client.table('Student').select('email_address, firstName, lastName').in_('studentID', student_ids).execute()
            students_data = student_details_response.data

        else:
            # Fetch class IDs and names for the teacher
            classes_response = supabase_client.table('Class').select('classID, className').eq('teacherID', teacherID).execute()
            class_info = {c['classID']: c['className'] for c in classes_response.data if 'classID' in c}

            if not class_info:
                print("No classes found for teacher ID:", teacherID)
                return []

            student_response = supabase_client.table('ClassStudents').select('studentID, classID').in_('classID', list(class_info.keys())).execute()
            student_ids = {s['studentID']: class_info[s['classID']] for s in student_response.data if 'studentID' in s}

            if not student_ids:
                print("No students found for the teacher ID:", teacherID)
                return []

            student_details_response = supabase_client.table('Student').select('studentID, email_address, firstName, lastName').in_('studentID', list(student_ids.keys())).execute()
            students_data = [{**s, "className": student_ids[s['studentID']]} for s in student_details_response.data if 'studentID' in s]

        if students_data:
            table = PrettyTable()
            if classID is None:
                table.field_names = ['email_address', 'firstName', 'lastName', 'className']
            else:
                table.field_names = ['email_address', 'firstName', 'lastName']

            for row in students_data:
                table.add_row([row[field] for field in table.field_names])
            print(table)
            return students_data
        else:
            print("No detailed student information found.")
            return []

    except Exception as e:
        print("An error occurred:", e)
        return e


def get_assignment(AssignmentID):
    """Query: Get Assignment by ID"""
    assignment_query = supabase_client.from_("assignment").select("*").eq("assignmentid", AssignmentID)
    assignment_data = assignment_query.execute().get("data", [])
    if assignment_data:
        return assignment_data[0]
    else:
        return None


def create_assignment(ClassID: int, Title: str, Description: str, DueDate: datetime.date):
    """Query: Create New Assignment."""
    response = supabase_client.table('Assignment').insert(
        {
            "classid": ClassID,
            "title": Title,
            "description": Description,
            "dueDate": DueDate
        })
    assignment_result = response.execute()
    if assignment_result["error"]:
        return None, assignment_result["error"]
    else:
        AssignmentID = assignment_result["data"][0]["assignmentid"]
        return AssignmentID, None


def update_assignment(AssignmentID: int, Title: str, Description: str, DueDate: datetime.date):
    """Query: Update assignment Info by id"""
    data = {
        "title": Title,
        "description": Description,
        "dueDate": DueDate
    }
    response = supabase_client.table('Assignment').update(data).eq("AssignmentID", AssignmentID).execute()
    print("Assignment updated", response.data)
    return response.data


def delete_assignment(AssignmentID:int):
    response = supabase_client.table('Assignment').delete().eq("AssignmentID", AssignmentID).execute()
    return response


def get_reminder(teacherID:int, reminderID=None):
    class_response = supabase_client.table('Class').select('classID').eq('teacherID', teacherID).execute()
    class_ids = [c['classID'] for c in class_response.data if 'classID' in c]
    if not class_ids:
        return {'error': 'No classes found for this teacher or invalid teacher ID'}

    assignment_response = supabase_client.table('Assignment').select('assignmentID').in_('classID', class_ids).execute()
    assignment_ids = [a['assignmentID'] for a in assignment_response.data if 'assignmentID' in a]

    if not assignment_ids:
        return {'error': 'No assignments found for the teacher’s classes'}

    if reminderID is not None:
        reminder_response = supabase_client.table('Reminder').select('*').eq('reminderID', reminderID).in_('assignmentID', assignment_ids).execute()
        reminders = reminder_response.data if reminder_response.data else {'message': 'No reminder found with the provided ID for this teacher'}
    else:
        reminder_response = supabase_client.table('Reminder').select('*').in_('assignmentID', assignment_ids).execute()
        reminders = reminder_response.data if reminder_response.data else {'message': 'No reminders found for the teacher’s assignments'}

    return reminders


def create_reminder(assignmentID:int, reminderDate:datetime.date, title:str):
    response = supabase_client.table('Reminder').insert({
        "assignmentID": assignmentID,
        "reminderDate": reminderDate,
        "title": title
    }).execute()
    if response.data is None:
        print("No reminders", response.data)
        return None
    else:
        print("Reminders", response.data)
        return response.data

def update_reminder(reminderID: int, assignmentID: int, reminderDate:datetime.date, title:str, description: str):
    data = {
        "assignmentID": assignmentID,
        "reminderDate": reminderDate,
        "title": title,
        "description": description
    }
    response = supabase_client.table('Reminder').update(data).eq('ReminderID', reminderID).execute()
    print("Reminder updated", response.data)
    return response.data

def delete_reminder(reminderID: int):
    response = supabase_client.table('Reminder').delete('reminderID', reminderID).execute()
    return response.data


def add_student_to_reminder(reminderID: int, studentID: int):
    data = {
        "reminderID": reminderID,
        "studentID": studentID
    }
    response = supabase_client.table('ReminderStudents').insert(data).execute()
    return response.data


def remove_student_from_reminder(reminderID: int, studentID: int):
    response = supabase_client.table('ClassStudents').delete().eq('reminderID', reminderID).eq('studentID', studentID).execute()
    return response.data


#print(get_students(1))
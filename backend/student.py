from backend import teacher
from backend.settings import supabase_client
from prettytable import PrettyTable
import datetime

def get_classes(studentID:int):
    try:
        # Fetch class IDs associated with the student ID
        classes_response = supabase_client.table('ClassStudents').select('classID').eq('studentID', studentID).execute()
        student_classes = [c['classID'] for c in classes_response.data if 'classID' in c]

        if not student_classes:
            print("No classes found for student ID:", studentID)
            return []

        # Fetch details of all classes from the class IDs
        class_details_response = supabase_client.table('Class').select('*').in_('classID', student_classes).execute()
        class_data = class_details_response.data

        # Create and print the table
        if class_data:
            table = PrettyTable()
            table.field_names = class_data[0].keys()  # Assumes all dictionaries have the same structure
            for row in class_data:
                table.add_row([row[field] for field in table.field_names])
            print(table)
            return class_data
        else:
            print("No class details found.")
            return []

    except Exception as e:
        print("An error occurred:", e)
        return e


def drop_class(studentID=int, classID=int):
    try:
        response = supabase_client.table('ClassStudents').eq("studentID", studentID).eq("classID", classID).execute()
        if response.error:
            return f"Failed to drop the class: {response.error}"
        if response.status_code == 200:
            return "Class dropped succesfully."
        else:
            return "Failed to drop the class: Unknown error."
    except Exception as e:
        return f"An error ocurred: {e}"


def get_reminder(studentID, reminderID=None):
    base_query = supabase_client.table('ReminderStudents').select('reminderID').eq('studentID', studentID)
    if reminderID is not None:
        base_query = base_query.eq('reminderID', reminderID)
    reminder_students_response = base_query.execute()

    if not reminder_students_response.data:
        return {'error': 'No reminders found for this student or invalid student/reminder ID'}

    reminder_ids = [rs['reminderID'] for rs in reminder_students_response.data if 'reminderID' in rs]
    reminders_response = supabase_client.table('Reminder').select('*').in_('reminderID', reminder_ids).execute()

    return reminders_response.data if reminders_response.data else {
        'message': 'No reminders found for the student’s assignments'}


def create_reminder(studentID:int, assignmentID: int, reminderDate:datetime.date, title:str):
    result = teacher.create_reminder(assignmentID, reminderDate, title)
    reminderID = result[0]['reminderID']
    return teacher.add_student_to_reminder(reminderID, studentID)

def update_reminder(reminderID: int, assignmentID: int, reminderDate:datetime.date, title:str, description: str):
    return teacher.update_reminder(reminderID, assignmentID, reminderDate, title, description)


def delete_reminder(reminderID:int):
    return teacher.delete_reminder(reminderID)


def get_task(studentID:int, taskID=None):
    query = supabase_client.table('Task').select('*').eq('studentID', studentID)
    if taskID is not None:
        # Fetch a specific task by taskID
        response = query.eq('taskID', taskID).execute()
        if response.data:
            print(response.data)

            table = PrettyTable()
            table.field_names = response.data[0].keys()
            for task in response.data:
                table.add_row(list(task.values()))
            print(table)
            return response.data
        else:
            print("No task found")
            return {'message': 'Task not found or access denied'}
    else:
        response = query.execute()
        if response.data:
            table = PrettyTable()
            table.field_names = response.data[0].keys()
            for task in response.data:
                table.add_row(list(task.values()))
            print(table)
        else:
            print("No task")
        return response.data


def create_task(title:str, description:str, dueDate:datetime.date, status:str, studentID:int):
    response = supabase_client.table('Task').inser({
        'title': title,
        'description': description,
        'dueDate': dueDate,
        'status': status,
        'studentID': studentID
    }).execute()
    if response.data is None:
        print("No tasks", response.data)
        return response.data
    else:
        print("Task", response.data)
        return response.data


def update_task(taskID:int, title:str, description:str, dueDate:datetime.date, status:str):
    data = {
        "taskID": taskID,
        "title": title,
        "description": description,
        "dueDate": dueDate,
        "status": status
    }
    response = supabase_client.table('Task').update(data).eq('taskID', taskID).execute()
    return response.data

def delete_task(taskID:int):
    response = supabase_client.table('Task').delete('taskID', taskID).execute()
    return response.data


#get_classes(1)

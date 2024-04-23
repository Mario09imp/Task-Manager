import axios from 'axios';
import fetch from 'node-fetch';
export function getStudents(teacherID, classID = null) {
    const baseUrl = `http://localhost:5000/teacher/get_students/${teacherID}`;
    const url = classID ? `${baseUrl}/${classID}` : baseUrl;

    return axios.get(url)
        .then(response => {
            console.log('Students data:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching students:', error);
            return [];
        });
}

export function createAssignment(classID, title, description, dueDate) {
    const url = 'http://localhost:5000/teacher/create_assignment';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classID: classID,
            Title: title,
            Description: description,
            DueDate: dueDate
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`Assignment created:`, result);
    })
    .catch(error => console.error(`Error creating assignment:`, error));
}

export function updateAssignment(assignmentID, title, description, dueDate) {
    const url = 'http://localhost:5000/teacher/update_assignment';

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            AssignmentID: assignmentID,
            Title: title,
            Description: description,
            DueDate: dueDate
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`Assignment updated:`, result);
    })
    .catch(error => console.error(`Error updating assignment:`, error));
}

export function deleteAssignment(assignmentID) {
    const url = `http://localhost:5000/teacher/delete_assignment/${assignmentID}`;

    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`Assignment deleted:`, result);
    })
    .catch(error => console.error(`Error deleting assignment:`, error));
}

import axios from 'axios';

export function getReminders(teacherID, reminderID) {
    const url = `http://localhost:5000/teacher/get_reminders`;

    return axios.get(url, {
        params: {
            teacherID: teacherID,
            reminderID: reminderID
        }
    })
    .then(response => {
        console.log('Reminders data:', response.data);
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching reminders:', error);
        return [];
    });
}

export function createReminder(assignmentID, reminderDate, title, description) {
    const url = 'http://localhost:5000/teacher/create_reminder';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            assignmentID: assignmentID,
            reminderDate: reminderDate,
            title: title,
            description: description
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`Reminder created:`, result);
    })
    .catch(error => console.error(`Error creating reminder:`, error));
}

export function updateReminder(assignmentID, reminderDate, title, description) {
    const url = 'http://localhost:5000/teacher/update_reminder';

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            assignmentID: assignmentID,
            reminderDate: reminderDate,
            title: title,
            description: description
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`Reminder updated:`, result);
    })
    .catch(error => console.error(`Error updating reminder:`, error));
}


import axios from 'axios';
import fetch from 'node-fetch';

export function getClasses() {
    const url = 'http://localhost:5000/student/get_classes';

    return axios.get(url)
        .then(response => {
            console.log('Classes data:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching classes:', error);
            return [];
        });
}

export function dropClass(studentID, classID) {
    const url = 'http://localhost:5000/student/drop_class';

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            studentID: studentID,
            classID: classID
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`Class dropped:`, result);
    })
    .catch(error => console.error(`Error dropping class:`, error));
}

export function getReminder(reminderID = null) {
    const url = new URL('http://localhost:5000/student/get_reminder');

    // Add the reminderID as a query parameter if provided
    if (reminderID !== null) {
        url.searchParams.append('reminderID', reminderID);
    }

    return axios.get(url.toString())
        .then(response => {
            console.log('Reminder data:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching reminder:', error);
            return {};
        });
}

export function createReminder(assignmentID, reminderDate, title, description) {
    const url = 'http://localhost:5000/student/create_reminder';

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
    const url = 'http://localhost:5000/student/update_reminder';

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

export function deleteReminder(reminderID) {
    const url = new URL('http://localhost:5000/student/delete_reminder');
    url.searchParams.append('reminderID', reminderID);

    fetch(url.toString(), {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`Reminder deleted:`, result);
    })
    .catch(error => console.error(`Error deleting reminder:`, error));
}

import axios from 'axios';

export function getTask(taskID = null) {
    const url = new URL('http://localhost:5000/student/get_task');

    // Append the taskID as a query parameter if provided
    if (taskID !== null) {
        url.searchParams.append('taskID', taskID);
    }

    return axios.get(url.toString())
        .then(response => {
            console.log('Task data:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching task:', error);
            return {};
        });
}

export function createTask(title, description, dueDate, status, studentID) {
    const url = 'http://localhost:5000/student/create_task';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            dueDate: dueDate,  // Ensure this is in 'YYYY-MM-DD' format
            status: status,
            studentID: studentID
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`Task created:`, result);
    })
    .catch(error => console.error(`Error creating task:`, error));
}

export function updateTask(taskID, title, description, dueDate, status) {
    const url = 'http://localhost:5000/student/update_task';

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taskID: taskID,
            title: title,
            description: description,
            dueDate: dueDate,  // Ensure this is in 'YYYY-MM-DD' format
            status: status
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`Task updated:`, result);
    })
    .catch(error => console.error(`Error updating task:`, error));
}

export function deleteTask(taskID) {
    const url = 'http://localhost:5000/student/delete_task';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskID: taskID })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`Task deleted:`, result);
    })
    .catch(error => console.error(`Error deleting task:`, error));
}

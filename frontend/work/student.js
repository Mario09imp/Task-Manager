import axios from 'axios';
import fetch from 'node-fetch';

// Function to get classes
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

// Function to drop a class
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

// Function to fetch tasks from the server
function fetchTasks() {
    // Implement logic to fetch tasks from the server
    // For now, let's use mock data
    const tasks = [
        { id: 1, title: 'Complete Assignment 1', description: 'Finish assignment 1 before the deadline', dueDate: '2024-05-10', status: 'Incomplete' },
        { id: 2, title: 'Study for Test', description: 'Review study materials for the upcoming test', dueDate: '2024-05-15', status: 'Incomplete' }
    ];
    populateTasks(tasks);
}

// Function to populate tasks on the page
function populateTasks(tasks) {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = ''; // Clear existing content

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        tasksContainer.appendChild(taskCard);
    });
}

// Call the function to fetch tasks and populate them on the page
fetchTasks();

// Function to fetch reminders from the server
function fetchReminders() {
    // Implement logic to fetch reminders from the server
    // For now, let's use mock data
    const reminders = [
        { id: 1, title: 'Assignment Due', date: '2024-05-05', description: 'Complete assignment 3' },
        { id: 2, title: 'Test Reminder', date: '2024-05-10', description: 'Prepare for the upcoming test' }
    ];
    displayReminders(reminders);
}

// Function to display reminders on the page
function displayReminders(reminders) {
    const reminderList = document.getElementById('reminder-list');
    reminderList.innerHTML = ''; // Clear existing content

    reminders.forEach(reminder => {
        const reminderCard = document.createElement('div');
        reminderCard.classList.add('reminder-card');
        reminderCard.innerHTML = `
            <h3>${reminder.title}</h3>
            <p><strong>Date:</strong> ${reminder.date}</p>
            <p><strong>Description:</strong> ${reminder.description}</p>
            <button onclick="editReminder(${reminder.id})">Edit</button>
            <button onclick="deleteReminder(${reminder.id})">Delete</button>
        `;
        reminderList.appendChild(reminderCard);
    });
}

// Function to add a new reminder
function addReminder(reminder) {
    const url = 'http://localhost:5000/student/add_reminder';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reminder)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add reminder');
            }
            return response.json();
        })
        .then(result => {
            console.log('Reminder added:', result);
            // Optionally, you can perform additional actions after adding the reminder
        })
        .catch(error => {
            console.error('Error adding reminder:', error);
        });
}

// Function to edit an existing reminder
function editReminder(reminderId, updatedReminder) {
    const url = `http://localhost:5000/student/edit_reminder/${reminderId}`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedReminder)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to edit reminder');
            }
            return response.json();
        })
        .then(result => {
            console.log('Reminder edited:', result);
            // Optionally, you can perform additional actions after editing the reminder
        })
        .catch(error => {
            console.error('Error editing reminder:', error);
        });
}

// Function to delete an existing reminder
function deleteReminder(reminderId) {
    const url = `http://localhost:5000/student/delete_reminder/${reminderId}`;

    fetch(url, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete reminder');
            }
            return response.json();
        })
        .then(result => {
            console.log('Reminder deleted:', result);
            // Optionally, you can perform additional actions after deleting the reminder
        })
        .catch(error => {
            console.error('Error deleting reminder:', error);
        });
}

// Function to initialize the reminders section
function initReminders() {
    fetchReminders();
}

// Call the function to initialize the reminders section
initReminders();

// Function to get student profile
export function getProfile(studentID) {
    const url = 'http://localhost:5000/student/get_profile';

    return axios.get(url, {
        params: {
            studentID: studentID
        }
    })
        .then(response => {
            console.log('Profile data:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
            return {};
        });
}

// Function to populate profile information
function populateProfile(profile) {
    const profileContainer = document.getElementById('profile');

    const fullName = document.createElement('h2');
    fullName.textContent = `${profile.firstName} ${profile.lastName}`;

    const email = document.createElement('p');
    email.textContent = `Email: ${profile.email}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Profile';
    editButton.addEventListener('click', () => {
        // Logic to edit profile goes here
    });

    profileContainer.appendChild(fullName);
    profileContainer.appendChild(email);
    profileContainer.appendChild(editButton);
}

// On page load, fetch profile and populate profile information
document.addEventListener('DOMContentLoaded', () => {
    const studentID = ''; // Set the student ID here

    getProfile(studentID)
        .then(profile => {
            populateProfile(profile);
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
        });

    getClasses()
        .then(classes => {
            populateClassCards(classes);
        })
        .catch(error => {
            console.error('Error fetching classes:', error);
        });
});

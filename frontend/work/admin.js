import axios from 'axios';
import fetch from 'node-fetch';
import * as url from "url";

export function getUsers() {
    const url = 'http://localhost:5000/admin/get_users';
    return axios.get(url)
        .then(response => console.log(response.data))
        .catch(error => {
            console.error('Error loading users:', error)
            return [];
        });
}

export function createUser(userType, userData) {
    const url = `http://localhost:5000/admin/create_${userType.toLowerCase()}`;  // Make sure to provide the full URL
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: userData.userName,
            password: userData.password,
            email_address: userData.email_address,
            firstName: userData.firstName,
            lastName: userData.lastName
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`${userType} created:`, result);
        console.log(`${userType} created successfully!`); // Replaced alert with console.log for Node.js environment
    })
    .catch(error => console.error(`Error creating ${userType}:`, error));
}

export function updateUser(userType, userID, userData) {
    const url = `http://localhost:5000/admin/update_${userType.toLowerCase()}/${userID}`;  // Make sure to provide the full URL
    fetch(url, {
        method: 'PUT',  // Use PUT method for updating
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: userData.userName,  // Assuming you allow updating username
            password: userData.password,  // Consider safety implications of sending passwords like this
            email_address: userData.email_address,
            firstName: userData.firstName,
            lastName: userData.lastName
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(`${userType} updated:`, result);
        console.log(`${userType} updated successfully!`); // Replaced alert with console.log for Node.js environment
    })
    .catch(error => console.error(`Error updating ${userType}:`, error));
}

export function deleteUser(userID, userType) {
    const url = `/admin/delete_${userType.toLowerCase()}/${userID}`;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json()
    })
    .then(result => {
        console.log(`${userType} deleted succesfully`, result);
    })
    .catch(error => console.error('Error deleting teacher:', error));
}

export function getClass() {
    const url = 'admin/get_class';
    axios.get(url)
        .then(response => console.log(response.data))
        .catch(error => console.error('Error loading classes:', error))
}

export function createClass(classData) {
    const url = `http://localhost:5000/create_class}`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            className: classData.className,
            description: classData.description,
            schedule: classData.schedule,
            teacherID: classData.teacherID
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log('Class created:', result)
    })
    .catch(error => console.error('Error creating class:', error));
}

export function updateClass(classID, classData) {
    const url = `http://localhost:5000/admin/update_class`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classID: classData.classID,
            className: classData.className,
            description: classData.description,
            schedule: classData.schedule,
            teacherID: classData.teacherID
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log('Class updated:', result);
    })
    .catch(error => console.error('Error updating class:', error));
}

export function deleteClass(classID) {
    const url = `/admin/delete_class?classID=${classID}`;
    fetch(url,{
        method: 'DELETE'
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json()
    })
    .then(result => {
        console.log('Class deleted succesfully', result);
    })
    .catch(error => console.error('Error deleting class:', error));
}

export function addStudentToClass(classID, studentID) {
    const url = 'http://localhost:5000/admin/add_student_to_class';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classID: classID,
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
        console.log('Student added:', result);
    })
    .catch(error => console.error('Error adding student:', error));
}

export function removeStudentFromClass(classID, studentID) {
    const url = '/admin//localhost:5000/admin/remove_student_from_class';
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classID: classID,
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
        console.log('Student removed:', result);
    })
    .catch(error => console.error('Error removing student:', error));
}

getUsers()

/*const userData = {
    userName: 'Juan_dewey',
    password: 'thisPassKxL',
    email_address: 'juan.dwy@dmail.com',
    firstName: 'Juan',
    lastName: 'Dewey'
};
//createUser('Admin', userData);    //This function works
const userData = {
    userName: 'Juan_dewey2',
    password: 'thisPassKxLx',
    email_address: 'juan.dwy@dmail.com',
    firstName: 'Juan',
    lastName: 'Dewey'
};
//updateUser('Admin', 4, userData)  //This function works

 */
// Function to populate the users table with data
function populateUsersTable(users) {
    const usersTableBody = document.querySelector('#users-table tbody');
    usersTableBody.innerHTML = ''; // Clear existing rows

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.userType}</td>
            <td>${user.userId}</td>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${user.email}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
        `;
        usersTableBody.appendChild(row);
    });
}

// Function to handle the click event for adding a user
function handleAddUser() {
    // Add your logic here for adding a user
    console.log('Add user clicked');
}

// Function to handle the click event for editing a user
function handleEditUser() {
    // Add your logic here for editing a user
    console.log('Edit user clicked');
}

// Function to handle the click event for deleting a user
function handleDeleteUser() {
    // Add your logic here for deleting a user
    console.log('Delete user clicked');
}

// Add event listeners to the action buttons
document.querySelector('.add-user-button').addEventListener('click', handleAddUser);
document.querySelector('.edit-user-button').addEventListener('click', handleEditUser);
document.querySelector('.delete-user-button').addEventListener('click', handleDeleteUser);

// Sample user data (replace with data fetched from API)
const sampleUsers = [
    { userType: 'Admin', userId: 1, username: 'admin1', password: 'password1', email: 'admin1@example.com', firstName: 'Admin', lastName: 'One' },
    { userType: 'Teacher', userId: 2, username: 'teacher1', password: 'password1', email: 'teacher1@example.com', firstName: 'Teacher', lastName: 'One' },
    { userType: 'Student', userId: 3, username: 'student1', password: 'password1', email: 'student1@example.com', firstName: 'Student', lastName: 'One' }
];

// Populate the table with sample user data
populateUsersTable(sampleUsers);
// Function to populate the classes table with data
function populateClassesTable(classes) {
    const classesTableBody = document.querySelector('#classes-table tbody');
    classesTableBody.innerHTML = ''; // Clear existing rows

    classes.forEach(classInfo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${classInfo.classID}</td>
            <td>${classInfo.className}</td>
            <td>${classInfo.description}</td>
            <td>${classInfo.schedule}</td>
            <td>${classInfo.teacherID}</td>
        `;
        classesTableBody.appendChild(row);
    });
}

// Function to handle the click event for adding a class
function handleAddClass() {
    // Add your logic here for adding a class
    console.log('Add class clicked');
}

// Function to handle the click event for editing a class
function handleEditClass() {
    // Add your logic here for editing a class
    console.log('Edit class clicked');
}

// Function to handle the click event for deleting a class
function handleDeleteClass() {
    // Add your logic here for deleting a class
    console.log('Delete class clicked');
}

// Add event listeners to the action buttons
document.querySelector('.add-class-button').addEventListener('click', handleAddClass);
document.querySelector('.edit-class-button').addEventListener('click', handleEditClass);
document.querySelector('.delete-class-button').addEventListener('click', handleDeleteClass);

// Sample class data (replace with data fetched from API)
const sampleClasses = [
    { classID: 1, className: 'Mathematics', description: 'Math class', schedule: 'Mon/Wed/Fri 9:00 AM', teacherID: 101 },
    { classID: 2, className: 'English', description: 'English class', schedule: 'Tue/Thu 10:30 AM', teacherID: 102 }
];

// Populate the table with sample class data
populateClassesTable(sampleClasses);

// Function to handle form submission for student-class interaction
function handleStudentClassForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form input values
    const classID = document.getElementById('class-id').value;
    const studentID = document.getElementById('student-id').value;

    // Call the function to add or remove student from class based on the button clicked
    if (event.submitter.classList.contains('add-student-button')) {
        addStudentToClass(classID, studentID);
    } else if (event.submitter.classList.contains('remove-student-button')) {
        removeStudentFromClass(classID, studentID);
    }

    // Clear the form inputs
    document.getElementById('class-id').value = '';
    document.getElementById('student-id').value = '';
}

// Function to add a student to a class
function addStudentToClass(classID, studentID) {
    // Implement logic to add the student to the class
    // For now, let's just display an alert with the class and student IDs
    alert(`Added student ${studentID} to class ${classID}`);
}

// Function to remove a student from a class
function removeStudentFromClass(classID, studentID) {
    // Implement logic to remove the student from the class
    // For now, let's just display an alert with the class and student IDs
    alert(`Removed student ${studentID} from class ${classID}`);
}

// Add event listener to the student-class interaction form
document.getElementById('student-class-form').addEventListener('submit', handleStudentClassForm);

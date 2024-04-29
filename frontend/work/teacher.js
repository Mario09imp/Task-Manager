// Function to handle form submission for adding a new class
function handleAddClassForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form input values
    const className = document.getElementById('className').value;
    const classTeacher = document.getElementById('classTeacher').value;
    const classSchedule = document.getElementById('classSchedule').value;

    // Call the function to add the class
    addClass(className, classTeacher, classSchedule);

    // Clear the form inputs
    document.getElementById('className').value = '';
    document.getElementById('classTeacher').value = '';
    document.getElementById('classSchedule').value = '';
}

// Function to add a new class
function addClass(className, classTeacher, classSchedule) {
    // Implement logic to add the class
    // For now, let's just display an alert with the class details
    alert(`New Class Added:\nName: ${className}\nTeacher: ${classTeacher}\nSchedule: ${classSchedule}`);
}

// Add event listener to the add class form
document.getElementById('addClassForm').addEventListener('submit', handleAddClassForm);
// Function to display classes dynamically
function displayClasses(classes) {
    const classListContainer = document.getElementById('classList');
    classListContainer.innerHTML = ''; // Clear existing content

    classes.forEach(classInfo => {
        const classCard = document.createElement('div');
        classCard.classList.add('class-card');
        classCard.innerHTML = `
            <h3>${classInfo.name}</h3>
            <p><strong>Teacher:</strong> ${classInfo.teacher}</p>
            <p><strong>Schedule:</strong> ${classInfo.schedule}</p>
            <button class="drop-class-button" onclick="dropClass(${classInfo.id})">Drop Class</button>
        `;
        classListContainer.appendChild(classCard);
    });
}

// Sample data for testing (replace with actual data from API)
const sampleClasses = [
    { id: 1, name: 'Mathematics', teacher: 'Mr. Smith', schedule: 'Mon/Wed/Fri 9:00 AM' },
    { id: 2, name: 'English', teacher: 'Ms. Johnson', schedule: 'Tue/Thu 10:30 AM' }
];

// Display the sample classes
displayClasses(sampleClasses);

// Function to fetch student progress data from the server
function fetchStudentProgress() {
    // Implement logic to fetch student progress data from the server
    // For now, let's use mock data
    const studentProgressData = [
        { name: 'Student 1', grade: 'A', completion: '80%' },
        { name: 'Student 2', grade: 'B', completion: '65%' },
        { name: 'Student 3', grade: 'C', completion: '50%' }
    ];

    // Call function to populate student progress on the page
    populateStudentProgress(studentProgressData);
}

// Function to populate student progress on the page
function populateStudentProgress(progressData) {
    const progressList = document.getElementById('progressList');

    // Clear existing content
    progressList.innerHTML = '';

    // Iterate over the progress data and create HTML elements
    progressData.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.classList.add('student-card');
        studentCard.innerHTML = `
            <h3>${student.name}</h3>
            <p><strong>Grade:</strong> ${student.grade}</p>
            <p><strong>Completion:</strong> ${student.completion}</p>
        `;
        progressList.appendChild(studentCard);
    });
}

// Call the function to fetch and populate student progress data
fetchStudentProgress();

// Function to handle form submission for sending a message
function handleSendMessageForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form input values
    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;

    // Call the function to send the message
    sendMessage(recipient, message);

    // Clear the message input
    document.getElementById('message').value = '';
}

// Function to send a message
function sendMessage(recipient, message) {
    // Implement logic to send the message
    // For now, let's just display the sent message
    displaySentMessage(recipient, message);
}

// Function to display the sent message
function displaySentMessage(recipient, message) {
    const sentMessagesContainer = document.getElementById('sentMessages');

    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('sent-message');
    messageElement.innerHTML = `
        <p><strong>To:</strong> ${recipient}</p>
        <p>${message}</p>
    `;

    // Add the message element to the container
    sentMessagesContainer.appendChild(messageElement);
}

// Add event listener to the send message form
document.getElementById('sendMessageForm').addEventListener('submit', handleSendMessageForm);


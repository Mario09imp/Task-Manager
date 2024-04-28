// signup.js

// Function to handle form submission
function handleSignUp(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form inputs
    const userType = document.getElementById('user_type').value;
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Perform form validation
    if (userType === '' || firstName === '' || lastName === '' || username === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // If all validation passes, make an AJAX request to sign up the user
    const formData = {
        userType: userType,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password
    };

    // Perform an AJAX request (you can use fetch or XMLHttpRequest)
    // Replace the URL with the endpoint for your sign-up API
    fetch('your-signup-api-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful sign-up response
            console.log('Sign-up successful:', data);
            alert('Sign-up successful!');
            // Redirect the user to the login page or any other desired page
            window.location.href = 'login.html'; // Change the URL as needed
        })
        .catch(error => {
            // Handle errors
            console.error('Error signing up:', error);
            alert('An error occurred during sign-up. Please try again later.');
        });
}

// Add event listener to the form for form submission
document.getElementById('signUpForm').addEventListener('submit', handleSignUp);

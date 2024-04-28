// Function to validate the login form
function validateLoginForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email and password (you can add more validation if needed)
    if (!email || !password) {
        alert('Please enter both email and password.');
        return false;
    }
    return true;
}

// Function to handle form submission
function submitLoginForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate the form
    if (!validateLoginForm()) {
        return;
    }

    // Construct the login data
    const loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Send AJAX request to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => {
            if (response.ok) {
                // Redirect to dashboard after successful login
                window.location.href = '/dashboard.html';
            } else {
                // Handle login error (display error message, etc.)
                alert('Login failed. Please check your email and password.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle network error or other unexpected errors
            alert('An error occurred. Please try again later.');
        });
}

// Add event listener for form submission
document.getElementById('loginForm').addEventListener('submit', submitLoginForm);

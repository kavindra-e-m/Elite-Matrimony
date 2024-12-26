// Register user: Store email and password in localStorage
function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    // Store user details in local storage
    localStorage.setItem(email, password);
    alert('Registration successful');
    window.location.href = "login.html"; // Redirect to login page
    return false; // Prevent form submission to allow the redirect
}

// Login user: Check if email and password match stored data in localStorage
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Retrieve user details from local storage
    const storedPassword = localStorage.getItem(email);

    if (storedPassword === password) {
        alert('Login successful');
        window.location.href = "index.html"; // Redirect to index.html (home page or dashboard)
        return false; // Prevent form submission to allow the redirect
    } else {
        window.location.href = "error.html"; // Redirect to error page
        return false; // Prevent form submission
    }
}

// Reset password: Change password if the email exists in localStorage
function resetPassword() {
    const email = document.getElementById('forgotEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    // Check if the email exists in local storage
    if (localStorage.getItem(email)) {
        // Update the password in local storage
        localStorage.setItem(email, newPassword);
        alert('Password reset successful');
        window.location.href = "login.html"; // Redirect to login page
    } else {
        alert('Email not found');
    }
}

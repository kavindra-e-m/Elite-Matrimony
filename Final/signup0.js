// Register user and redirect to ind.html
function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    // Store email and password in local storage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    alert('Registration successful! Please provide additional information.');
    window.location.href = "signup.html"; 
    return false;
}

// Gather additional info and redirect to index.html
function submitAdditionalInfo() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const bio = document.getElementById('bio').value;

    // Store additional info in local storage
    localStorage.setItem('userAge', age);
    localStorage.setItem('userGender', gender);
    localStorage.setItem('userBio', bio);

    alert('Thank you for providing your details!');
    window.location.href = "land.html"; // Redirect to the main dashboard
    return false;
}

// Login user
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Retrieve stored credentials
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        alert('Login successful!');
        window.location.href = "ind.html"; // Redirect to the dashboard
        return false;
    } else {
        alert('Invalid email or password!');
        return false;
    }
}

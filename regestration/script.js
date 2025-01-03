document.addEventListener('DOMContentLoaded', function () {
    const formPages = document.querySelectorAll('.form-page');
    const nextBtns = document.querySelectorAll('button[id^="next-btn"]');
    const backBtns = document.querySelectorAll('button[id^="back-btn"]');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress-bar');
    const reviewDetails = document.getElementById('review-details');
    let currentPage = 0;

    // Show Page Function
    function showPage(pageIndex) {
        formPages.forEach((page, index) => {
            page.classList.remove('active');
            if (index === pageIndex) {
                page.classList.add('active');
            }
        });

        // Update progress bar
        progressBar.style.width = ((pageIndex + 1) / formPages.length) * 100 + '%';
        document.querySelectorAll('.step-indicator span').forEach((span, index) => {
            span.classList.remove('active', 'completed');
            if (index === pageIndex) {
                span.classList.add('active');
            } else if (index < pageIndex) {
                span.classList.add('completed');
            }
        });
    }

    // Validate Page Inputs (Including Age Validation)
    function validatePage(pageIndex) {
        const currentPageForm = formPages[pageIndex];
        const inputs = currentPageForm.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
                const errorMessage = input.parentNode.querySelector('.error-message');
                if (!errorMessage) {
                    const error = document.createElement('div');
                    error.classList.add('error-message');
                    error.textContent = 'This field is required';
                    input.parentNode.appendChild(error);
                }
            } else {
                input.style.borderColor = '';
                const errorMessage = input.parentNode.querySelector('.error-message');
                if (errorMessage) errorMessage.remove();
            }
        });

        // Age Validation
        const gender = document.querySelector('input[name="gender"]:checked');
        const dob = document.getElementById('dob');
        if (dob && gender) {
            const birthDate = new Date(dob.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const isValidAge = gender.value === 'Male' ? age >= 21 : age >= 18;
            if (!isValidAge) {
                isValid = false;
                const errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = gender.value === 'Male' ? 'You must be older than 21.' : 'You must be older than 18.';
                dob.parentNode.appendChild(errorMessage);
            }
        }

        return isValid;
    }

    // Next Button Event Listener
    nextBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (validatePage(index)) {
                currentPage++;
                showPage(currentPage);
            }
        });
    });

    // Back Button Event Listener
    backBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentPage--;
            showPage(currentPage);
        });
    });

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        // Validate the current page
        if (validatePage(currentPage)) {
            // Collect form data from all inputs
            const formData = new FormData(document.getElementById('registration-form'));
            
            // Display collected data for review
            displayReview(formData);
    
            // Show a confirmation dialog before the final submission
            const confirmSubmit = confirm("Are you sure you want to submit the form?");
            if (confirmSubmit) {
                // Final submission
                alert("Form submitted successfully!");
                document.getElementById('registration-form').submit();
            }
        }
    });
    
    

    function displayReview(formData) {
    let reviewHtml = '<h3>Review Your Details</h3><ul>';
    
    // Loop through FormData entries and format them for display
    formData.forEach((value, key) => {
        reviewHtml += `<li><strong>${key.replace(/-/g, ' ').toUpperCase()}:</strong> ${value}</li>`;
    });

    reviewHtml += '</ul>';
    reviewDetails.innerHTML = reviewHtml;

    // Scroll to the review section for better user experience
    reviewDetails.scrollIntoView({ behavior: 'smooth' });
}

    
    // File Preview
    document.getElementById('profile-pic').addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                document.getElementById('profile-pic-preview').style.display = 'block';
                document.getElementById('profile-pic-preview').src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Initialize the form
    showPage(currentPage);
});
function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Store user details in local storage
    localStorage.setItem(email, password);
    alert('Registration successful');
    window.location.href = "login.html"; // Redirect to login page
}


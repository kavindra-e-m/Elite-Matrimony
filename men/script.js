// Function to show more details for each profile
function showDetails(profileNumber) {
    document.getElementById("profile-details" + profileNumber).style.display = "block";
}

// Function to hide details for each profile
function hideDetails(profileNumber) {
    document.getElementById("profile-details" + profileNumber).style.display = "none";
}

// Function to initiate a Google Meet call (both voice and video)
function initiateGoogleMeetCall() {
    const googleMeetURL = "https://meet.google.com/xyz-abc-def"; // Replace with your actual Google Meet URL
    window.location.href = googleMeetURL;
}
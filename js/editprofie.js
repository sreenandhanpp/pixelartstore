// Function to show the alert
function showAlert(message = "Default message", title = "Alert") {
  const alertModal = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("alert-message");
  const alertTitle = document.querySelector("#custom-alert h3");

  alertMessage.textContent = message;
  alertTitle.textContent = title;
  alertModal.style.display = "flex"; // Change from removing 'hidden' to setting display
  alertModal.classList.remove("hidden");
}

// Function to close the alert
function closeAlert() {
  const alertModal = document.getElementById("custom-alert");
  alertModal.style.display = "none";
  alertModal.classList.add("hidden");
}

document.getElementById("close-alert").onclick = function () {
  closeAlert();
};
// Get form elements
const form = document.getElementById("profile-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const bioInput = document.getElementById("bio");
const successSound = document.getElementById("successSound");
const clickSound = document.getElementById("click-sound");

// Load user data from localStorage
window.addEventListener("load", () => {
  usernameInput.value = localStorage.getItem("username") || "";
  emailInput.value = localStorage.getItem("userEmail") || "";
  passwordInput.value = localStorage.getItem("userPassword") || "";
  bioInput.value = localStorage.getItem("userBio") || "";
});

// Add click sound to all buttons
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Update localStorage with new values
  localStorage.setItem("username", usernameInput.value);
  localStorage.setItem("userEmail", emailInput.value);
  localStorage.setItem("userPassword", passwordInput.value);
  localStorage.setItem("userBio", bioInput.value);

  // Play success sound
  successSound.play();

  // Show success message
  showAlert("Profile updated successfully!");
});

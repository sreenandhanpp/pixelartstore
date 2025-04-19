window.onload = () => {
  // Redirect to login.html if user is not logged in
  const isLoggedInCheck = localStorage.getItem("isLoggedIn");

  if (!isLoggedInCheck || isLoggedInCheck !== "true") {
    window.location.href = "auth.html"; // Use relative path!
    return;
  }
};
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
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const loginLink = document.querySelector('a[href="auth.html"]');
const userDropdown = document.querySelector(".dropdown");

// Only modify if the elements exist
if (loginLink && userDropdown) {
  if (isLoggedIn) {
    loginLink.style.display = "none";
    userDropdown.style.display = "inline-block";
  } else {
    loginLink.style.display = "inline-block";
    userDropdown.style.display = "none";
  }
}

const form = document.querySelector("form");
const submitButton = form.querySelector('button[type="submit"]');
const loadingScreen = document.getElementById("loadingScreen");
const clickSound = document.getElementById("clickSound");
const successSound = document.getElementById("successSound");

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Redirect to login.html if user is not logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "auth.html"; // Use relative path!
    return;
  }

  // Get input values
  const title = form.querySelector('input[type="text"]').value;
  const description = form.querySelector("textarea").value;
  const price = form.querySelector('input[type="number"]').value;
  const imageFile = form.querySelector('input[type="file"]').files[0];
  const priceWithDollerSign = `$${price}`;

  // Validate image file
  if (!imageFile) {
    showAlert("Please select an image to upload.");
    return;
  }

  // Convert image to base64
  const base64Image = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });

  // Create new artwork object
  const newArt = {
    title,
    description,
    priceWithDollerSign,
    image: base64Image,
    uploadedAt: new Date().toISOString(),
  };

  // Get current collections from localStorage
  const currentCollection =
    JSON.parse(localStorage.getItem("myCollections")) || [];

  // Add new art to collection
  currentCollection.push(newArt);

  // Save back to localStorage
  localStorage.setItem("myCollections", JSON.stringify(currentCollection));

  // Play success sound
  successSound.play();

  form.reset();

  showAlert("Pixel art uploaded successfully!", "Success");
});

// Store artist details in localStorage and redirect to the profile page
function storeArtistDetails(name, bio, image) {
  localStorage.setItem("artistName", name);
  localStorage.setItem("artistBio", bio);
  localStorage.setItem("artistImage", image);
}

// Check if user is logged in (you'll need to implement this based on your auth system)
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// Get the navbar elements
const loginLink = document.querySelector('a[href="auth.html"]');
const userDropdown = document.querySelector(".dropdown");

// Show/hide elements based on login state
if (isLoggedIn) {
  loginLink.style.display = "none";
  userDropdown.style.display = "inline-block";
} else {
  loginLink.style.display = "inline-block";
  userDropdown.style.display = "none";
}

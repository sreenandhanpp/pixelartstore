//Function to clear the cart,order_details,myCollections, user details from local storage on page load
window.onload = function () {
  localStorage.removeItem("cart");
  localStorage.removeItem("order_details");
  localStorage.removeItem("myCollections");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("username");
};
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// Replace the existing sound handling code with this
const clickSound = document.getElementById("clickSound");

document.getElementById("show-login").onclick = (e) => {
  e.preventDefault();
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
};

document.getElementById("show-signup").onclick = (e) => {
  e.preventDefault();
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
};

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  // Store login info
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email);

  // Redirect after a small delay to ensure sound plays
  setTimeout(() => {
    window.location.href = "/pixelartstore";
  }, 100);
};

signupForm.onsubmit = async (e) => {
  e.preventDefault();
  const username = signupForm.querySelector('input[type="text"]').value;
  const email = signupForm.querySelector('input[type="email"]').value;
  const password = signupForm.querySelector('input[type="password"]').value;

  // Store signup info
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", username);
  localStorage.setItem("userEmail", email);

  // Redirect after a small delay to ensure sound plays
  setTimeout(() => {
    window.location.href = "/pixelartstore";
  }, 100);
};

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});

const toggleBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const mobileMenu = document.getElementById("mobile-menu");

toggleBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

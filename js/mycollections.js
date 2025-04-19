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
const successSound = document.getElementById("successSound");
let userCreatedItems = JSON.parse(localStorage.getItem("myCollections")) || [];
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const clickSound = document.getElementById("click-sound");

function renderCollections() {
  const userContainer = document.getElementById("user-collection");
  const cartContainer = document.getElementById("cart-items");

  // Clear the current content before re-rendering
  userContainer.innerHTML = "";
  cartContainer.innerHTML = "";

  // Render user created items
  userCreatedItems.forEach((item) => {
    userContainer.innerHTML += `
  <div class="card p-4">
    <h2 class="text-xl font-bold mb-2">${item.title}</h2>
    <img src="${item.image}" alt="${item.title}" class="w-full h-40 object-contain mb-2" />
    <p class="text-sm mb-2">${item.description}</p>
    <div class="flex justify-between items-center">
      <span class="text-sm">Created by You</span>
      <button class="pixel-btn" onclick="removeFromBoth('${item.title}')">Remove</button>
    </div>
  </div>
`;
  });

  // Render cart items
  cartItems.forEach((item) => {
    const price = parseFloat(item.price.replace("$", ""));
    cartContainer.innerHTML += `
  <div class="card p-4">
    <h2 class="text-xl font-bold mb-2">${item.title}</h2>
    <img src="${item.image}" alt="${item.title}" class="w-full h-40 object-contain mb-2" />
    <p class="text-sm mb-2">${item.description}</p>
    <p class="text-sm font-bold mb-2">${item.price}</p>
    <button class="pixel-btn" onclick="removeFromBoth('${item.title}')">Remove</button>
  </div>
`;
  });

  // Update Total
  let total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")),
    0
  );
  document.getElementById(
    "item-count"
  ).textContent = `Items in Cart: ${cartItems.length}`;
  document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;

  // Handle Proceed Button
  document.getElementById("proceed-btn").disabled = cartItems.length === 0;
}

// Function to remove an item by matching the title from both collection and cart
function removeFromBoth(title) {
  // Remove from the collection by title
  userCreatedItems = userCreatedItems.filter((item) => item.title !== title);
  localStorage.setItem("myCollections", JSON.stringify(userCreatedItems));

  // Remove from the cart by title
  cartItems = cartItems.filter((item) => item.title !== title);
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // Re-render the collections and cart
  renderCollections();
}

renderCollections();

// Helper function to play sound with error handling
function playSound(audioElement) {
  if (audioElement) {
    audioElement.currentTime = 0;
    audioElement.play()
  }
}

// Update the click sound event listeners
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    playSound(clickSound);
  });
});

function checkout() {
  // Check if the cart has items
  if (cartItems.length === 0) {
    showAlert("Your cart is empty. Add items before checking out.");
    return;
  }

  // Calculate total price of items in the cart
  let totalAmount = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")),
    0
  );

  // Here, we would normally integrate a payment gateway
  // For simplicity, we simulate a successful checkout
  const isPaymentSuccessful = true; // Simulated successful payment

  if (isPaymentSuccessful) {
    // Add items to order details in localStorage
    const orderDetails = {
      items: cartItems,
      totalAmount: totalAmount.toFixed(2),
      date: new Date().toLocaleString(),
    };
    const existingOrders =
      JSON.parse(localStorage.getItem("order_details")) || [];
    existingOrders.push(orderDetails);
    localStorage.setItem("order_details", JSON.stringify(existingOrders));

    // Clear the cart
    localStorage.removeItem("cart");
    cartItems.length = 0;

    playSound(successSound);
    showAlert(`Checkout successful! Total: $${totalAmount.toFixed(2)}`);

    // ✅ Proper delay and redirect
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      closeAlert();
      window.location.href = "order-details.html";
    })();
  } else {
    showAlert("There was an issue with your payment. Please try again.");
  }
}

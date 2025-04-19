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
const loginLink = document.querySelector(".login-link");
const userDropdown = document.querySelector(".auth-dropdown");

if (loginLink && userDropdown) {
  if (isLoggedIn) {
    loginLink.style.display = "none";
    userDropdown.style.display = "inline-block";
  } else {
    loginLink.style.display = "inline-block";
    userDropdown.style.display = "none";
  }
}

// Sample pixel art items
const pixelArtItems = [
  {
    title: "Head 1",
    image: "./images/head1.png",
    description: "Stylized pixel head #1.",
    price: "$2.00",
  },
  {
    title: "Head 2",
    image: "./images/head2.png",
    description: "Stylized pixel head #2.",
    price: "$2.00",
  },
  {
    title: "Head 3",
    image: "./images/head3.png",
    description: "Stylized pixel head #3.",
    price: "$2.00",
  },
  {
    title: "Angular",
    image: "./images/angular.png",
    description: "Pixel art version of the Angular logo.",
    price: "$2.50",
  },

  {
    title: "Head 4",
    image: "./images/head4.png",
    description: "Stylized pixel head #4.",
    price: "$2.00",
  },
  {
    title: "Head 5",
    image: "./images/head5.png",
    description: "Stylized pixel head #5.",
    price: "$2.00",
  },
  {
    title: "Monster",
    image: "./images/monster.png",
    description: "Pixel monster from a spooky world.",
    price: "$3.50",
  },
  {
    title: "Bike",
    image: "./images/bike.png",
    description: "Retro pixel art of a cool bike.",
    price: "$2.80",
  },
  {
    title: "House",
    image: "./images/house.png",
    description: "Cute pixel house with cozy vibes.",
    price: "$3.00",
  },
  {
    title: "Pokemon",
    image: "./images/pokemon.png",
    description: "Pixel art tribute to classic Pokémon.",
    price: "$4.20",
  },
  {
    title: "Python",
    image: "./images/python.png",
    description: "Sleek pixel version of the Python logo.",
    price: "$2.50",
  },
  {
    title: "Star",
    image: "./images/star.jpg",
    description: "Shiny pixel star. Make a wish!",
    price: "$1.50",
  },
  {
    title: "JavaScript",
    image: "./images/js.png",
    description: "Powerful pixel art of the JS logo.",
    price: "$2.20",
  },
  {
    title: "Heart",
    image: "./images/heart.jpg",
    description: "Classic pixel red heart — full health!",
    price: "$1.00",
  },
  {
    title: "Bulb",
    image: "./images/bulb.jpg",
    description: "Bright idea in pixel form.",
    price: "$1.80",
  },
  {
    title: "Dragon",
    image: "./images/dragon.png",
    description: "Majestic pixel dragon breathing fire.",
    price: "$5.00",
  },
  {
    title: "Chicken",
    image: "./images/Chicken.png",
    description: "Pixel grilled chicken leg with juicy details.",
    price: "$4.00",
  },
  {
    title: "Apples",
    image: "./images/Applles.png",
    description: "Fresh red pixel apples. Crunchy and sweet!",
    price: "$2.50",
  },
  {
    title: "Banana",
    image: "./images/Bananas.png",
    description: "A peeled pixel banana, perfect for smoothies.",
    price: "$1.80",
  },
  {
    title: "Bell Pepper",
    image: "./images/Bell pepper.png",
    description: "Green pixel bell pepper, crisp and clean.",
    price: "$1.30",
  },
  {
    title: "Bowl of Rice",
    image: "./images/Bowl of rice.png",
    description: "Steamy pixel white rice in a bowl. Yum!",
    price: "$3.00",
  },
];

const gridContainer = document.getElementById("artGrid");
const myCollections = JSON.parse(localStorage.getItem("myCollections") || "[]");

// Merge pixelArtItems + myCollections (without duplicates)
const allItemsMap = new Map();

[...pixelArtItems, ...myCollections].forEach((item) => {
  allItemsMap.set(item.title, item);
});

const allItems = Array.from(allItemsMap.values());

const isInMyCollections = (title) =>
  myCollections.some((item) => item.title === title);

function renderArt(items) {
  items.forEach((item) => {
    const alreadyCollected = isInMyCollections(item.title);

    const card = document.createElement("div");
    card.className = "card p-4";

    card.innerHTML = `
    <h2 class="text-xl font-bold mb-2">${item.title}</h2>
    <img
      src="${item.image}"
      alt="${item.title}"
      class="w-full h-40 object-contain mb-2"
    />
    <p class="text-sm mb-2">${item.description}</p>
    <div class="flex justify-between items-center">
      <span class="font-bold">${item.price}</span>
      <button class="pixel-btn collect-btn" 
${alreadyCollected ? "disabled" : ""} 
data-title="${item.title}" 
onclick='collectToCart(${JSON.stringify(item)})'>
${alreadyCollected ? "Collected" : "Collect"}
</button>
    </div>
  `;

    gridContainer.appendChild(card);
  });

  // Attach collect button events
  document.querySelectorAll(".collect-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-title");
      const selectedItem = allItems.find((i) => i.title === title);

      if (!isInMyCollections(title)) {
        // Add item to the user's "myCollections" (only once)
        const updatedCollection = [...myCollections, selectedItem];
        localStorage.setItem(
          "myCollections",
          JSON.stringify(updatedCollection)
        );

        // Change button state to "Collected"
        btn.innerText = "Collected";
        btn.disabled = true;
      }
    });
  });
}

const searchInput = document.getElementById("searchInput");

function filterAndRender(query) {
  const filtered = allItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
  gridContainer.innerHTML = "";
  renderArt(filtered);
}

filterAndRender(""); // Initial render

searchInput.addEventListener("input", (e) => {
  filterAndRender(e.target.value);
});

function collectToCart(item) {
  // Get existing cart or create a new one
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Redirect to login.html if user is not logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "auth.html"; // Use relative path!
    return;
  }

  // Check if item already exists in cart
  const alreadyCollected = cart.some(
    (cartItem) => cartItem.title === item.title
  );
  if (alreadyCollected) {
    showAlert("You already collected this art!");
    return;
  }

  // Add item to cart
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));

  // Optional: Give user feedback
  showAlert(`"${item.title}" added to your cart!`);

  // Disable the button after adding to the cart
  const button = document.querySelector(`button[data-title="${item.title}"]`);
  if (button) {
    button.disabled = true;
    button.innerText = "Collected";
    button.classList.add("opacity-50", "cursor-not-allowed");
  }
}

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});

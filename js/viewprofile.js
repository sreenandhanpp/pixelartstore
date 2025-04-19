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
// Function to render 3 random pixel art items
function renderRandomPixelArt() {
  const selectedItems = [];
  while (selectedItems.length < 3) {
    const randomIndex = Math.floor(Math.random() * pixelArtItems.length);
    const randomItem = pixelArtItems[randomIndex];
    if (!selectedItems.includes(randomItem)) {
      selectedItems.push(randomItem);
    }
  }

  const container = document.getElementById("pixel-art-container");
  container.innerHTML = "";

  selectedItems.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card", "p-4");
    card.innerHTML = `
            <h3 class="text-lg font-bold mb-2">${item.title}</h3>
            <img
              src="${item.image}"
              alt="${item.title}"
              class="w-full h-40 object-contain mb-2"
            />
            <p class="text-sm mb-2">${item.description}</p>
            <span class="font-bold block mb-2">${item.price}</span>
            <button class="pixel-btn w-full">Collect</button>
          `;
    container.appendChild(card);
  });
}

// Function to retrieve artist details from localStorage
function loadArtistDetails() {
  const name = localStorage.getItem("artistName");
  const bio = localStorage.getItem("artistBio");
  const image = localStorage.getItem("artistImage");

  // Update profile information on the page
  if (name && bio && image) {
    document.getElementById("profile-name").textContent = name;
    document.getElementById("profile-bio").textContent = bio;
    document.getElementById("profile-pic").src = image;
  } else {
    // Default values in case the localStorage is empty
    document.getElementById("profile-name").textContent = "PixelWarrior";
    document.getElementById("profile-bio").textContent =
      "Lover of retro sprites and digital dragons 🐉";
    document.getElementById("profile-pic").src =
      "https://i.pravatar.cc/150?img=1"; // Default image
  }
}

// Load artist details when the page loads
loadArtistDetails();

// Render random pixel art on page load
renderRandomPixelArt();

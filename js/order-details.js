// Function to play sound
function playSound() {
  const sound = document.getElementById("successSound");
  sound.play();
}
function downloadItems(orderIndex) {
  // Play success sound
  playSound();
  // Retrieve the order data from localStorage
  const allOrders = JSON.parse(localStorage.getItem("order_details"));
  const order = allOrders[orderIndex];

  const zip = new JSZip();

  // Loop through each item in the order and add to ZIP
  order.items.forEach((item, index) => {
    const imageUrl = item.image;

    // Fetch image data and add it to the zip file
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        zip.file(`item-${index + 1}.png`, blob);

        // If all files are added, generate the ZIP file
        if (index === order.items.length - 1) {
          zip.generateAsync({ type: "blob" }).then(function (content) {
            // Save the ZIP file
            saveAs(content, `order-${orderIndex + 1}-images.zip`);
          });
        }
      });
  });
}

window.onload = function () {
  // Retrieve all order details from localStorage
  const allOrders = JSON.parse(localStorage.getItem("order_details"));

  if (allOrders && Array.isArray(allOrders)) {
    const orderCardsContainer = document.getElementById("order-cards");

    // Loop through each order and create a card for it
    allOrders.forEach((order, index) => {
      // Create the card for this order
      const orderCard = document.createElement("div");
      orderCard.classList.add("card", "p-6", "mb-8");

      // Header for the card
      const orderHeader = document.createElement("h2");
      orderHeader.classList.add("text-3xl", "font-bold", "mb-4");
      orderHeader.textContent = `Order ${index + 1} Summary`;
      orderCard.appendChild(orderHeader);

      // Art Badges
      const artBadgesContainer = document.createElement("div");
      artBadgesContainer.classList.add("flex", "flex-wrap", "mb-6");
      order.items.forEach((item) => {
        const badge = document.createElement("div");
        badge.classList.add("badge");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title;

        badge.appendChild(img);
        artBadgesContainer.appendChild(badge);
      });
      orderCard.appendChild(artBadgesContainer);

      // Confirmation Message
      const confirmationMessage = document.createElement("p");
      confirmationMessage.classList.add("confirmation-message");
      confirmationMessage.textContent =
        "Your order has been confirmed! Thank you for purchasing.";
      orderCard.appendChild(confirmationMessage);

      // Order Summary
      const orderSummary = document.createElement("div");
      orderSummary.classList.add("order-summary", "text-lg");
      orderSummary.innerHTML = `
        <p>Total Number of Items: ${order.items.length}</p>
        <p>Total Price: $${order.totalAmount}</p>
      `;
      orderCard.appendChild(orderSummary);

      // Download Button
      const downloadButton = document.createElement("button");
      downloadButton.classList.add("download-btn");
      downloadButton.textContent = "Download All Items";
      downloadButton.onclick = () => downloadItems(index); // Pass order index to download function
      downloadButton.style.float = "right";
      orderCard.appendChild(downloadButton);

      // Append this order card to the container
      orderCardsContainer.appendChild(orderCard);
    });
  } else {
    showAlert("No order details found in localStorage.");
  }
};

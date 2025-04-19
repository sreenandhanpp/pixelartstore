class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="bg-white md:max-w-4xl mx-auto card">
        <div class="px-4 py-3 flex items-center justify-between">
          <a href="/pixelartstore/" class="text-xl font-bold text-black">RetroPixel</a>

          <!-- Hamburger -->
          <button id="menu-toggle" class="md:hidden text-2xl text-black focus:outline-none">☰</button>

          <!-- Nav links -->
          <nav id="menu" class="hidden md:flex space-x-6 items-center">
            <a href="/pixelartstore/" class="block text-black hover:text-yellow-500">Explore</a>
            <a href="artists.html" class="text-black hover:text-yellow-500">Artists</a>
            <a href="uploadart.html" class="text-black hover:text-yellow-500">Upload</a>

            <!-- User dropdown -->
            <div class="relative group">
              <i class="hn hn-user-solid text-2xl cursor-pointer" style="color: #ffd700"></i>
              <div class="absolute hidden group-hover:block right-0 top-5 mt-2 w-48 bg-white card z-20">
                <a href="mycollections.html" class="block px-4 py-2 text-black hover:bg-yellow-100 border-b border-black">My Art Collection</a>
                <a href="uploadart.html" class="block px-4 py-2 text-black hover:bg-yellow-100 border-b border-black">Upload New Pixel Art</a>
                <a href="editprofile.html" class="block px-4 py-2 text-black hover:bg-yellow-100 border-b border-black">Edit Profile</a>
                <a href="order-details.html" class="block px-4 py-2 text-black hover:bg-yellow-100 border-b border-black">Order Details</a>
                <a href="auth.html" class="block px-4 py-2 text-black hover:bg-yellow-100 border-b border-black">Logout</a>
              </div>
            </div>
          </nav>
        </div>

        <!-- Mobile nav menu -->
        <div id="mobile-menu" class="md:hidden hidden px-4 pb-4 space-y-2">
          <a href="/pixelartstore/" class="block text-black hover:text-yellow-500">Explore</a>
          <a href="artists.html" class="block text-black hover:text-yellow-500">Artists</a>
          <a href="uploadart.html" class="block text-black hover:text-yellow-500">Upload</a>
          <div class="pt-2 border-t">
            <a href="mycollections.html" class="block text-black hover:text-yellow-500">My Art Collection</a>
            <a href="uploadart.html" class="block text-black hover:text-yellow-500">Upload New Pixel Art</a>
            <a href="editprofile.html" class="block text-black hover:text-yellow-500">Edit Profile</a>
            <a href="order-details.html" class="block text-black hover:text-yellow-500">Order Details</a>
            <a href="auth.html" class="block text-black hover:text-yellow-500">Logout</a>
          </div>
        </div>
      </header>
    `;

    // ✅ Put the script logic here after innerHTML is set
    const toggleBtn = this.querySelector("#menu-toggle");
    const mobileMenu = this.querySelector("#mobile-menu");

    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  }
}

customElements.define("app-header", HeaderComponent);

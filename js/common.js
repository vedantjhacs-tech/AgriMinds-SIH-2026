/* ==========================================================================
   AgriMinds - Common Utilities & Layout Injector
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  injectLayout();
  setupLanguageToggle();
  checkAuthNavbar();
});

function injectLayout() {
  const currentLang = localStorage.getItem("agri_lang") || "en";
  const t = AGRIMINDS_DATA.translations[currentLang];

  // Inject Prototype Banner & Navbar
  const headerHTML = `
    <div class="prototype-banner">
      <span>${t.prototypeBadge}</span>
    </div>
    <nav class="navbar">
      <a href="index.html" class="nav-brand">
        <img src="assets/logo.svg" alt="AgriMinds Logo">
      </a>
      <div class="hamburger" onclick="toggleMobileMenu()">&#9776;</div>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html" data-key="home">${t.home}</a></li>
        <li><a href="slot.html" data-key="bookSlot">${t.bookSlot}</a></li>
        <li><a href="queue.html" data-key="liveQueue">${t.liveQueue}</a></li>
        <li><a href="history.html" data-key="myBookings">${t.myBookings}</a></li>
        <li><a href="msp.html" data-key="mspRates">${t.mspRates}</a></li>
        <li><a href="marketplace.html" data-key="marketplace">${t.marketplace}</a></li>
        <li><a href="about.html" data-key="about">${t.about}</a></li>
        <li><a href="contact.html" data-key="contact">${t.contact}</a></li>
      </ul>
      <div class="nav-actions" id="navActions">
        <button class="btn btn-outline" id="langToggleBtn" onclick="switchLanguage()">${currentLang === 'en' ? 'हिन्दी' : 'English'}</button>
        <a href="login.html" class="btn btn-primary" id="authBtn" data-key="login">${t.login}</a>
      </div>
    </nav>
  `;

  // Inject Footer
  const footerHTML = `
    <footer>
      <div class="footer-content">
        <div class="footer-col">
          <h4>AgriMinds (SIH 2026)</h4>
          <p>Zero Wait. Full Transparency. Revolutionizing agricultural procurement and mandi queue management.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="slot.html">Digital Slot Booking</a></li>
            <li><a href="queue.html">Real-Time Queue</a></li>
            <li><a href="msp.html">MSP Calculator</a></li>
            <li><a href="marketplace.html">Farmer Marketplace</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Team AgriMinds</h4>
          <p>Maharaja Agrasen University, Baddi (HP)<br>Vedant Jha, Shruti, Sparsh, Pranjal Yadav, Nandani, Rachit</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 AgriMinds. Smart India Hackathon 2026 Demo Prototype. Not an official government portal.</p>
      </div>
    </footer>
    <div id="toast-container"></div>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);
  document.body.insertAdjacentHTML("beforeend", footerHTML);

  highlightActivePage();
}

function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

function highlightActivePage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-links a");
  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

function switchLanguage() {
  const currentLang = localStorage.getItem("agri_lang") || "en";
  const newLang = currentLang === 'en' ? 'hi' : 'en';
  localStorage.setItem("agri_lang", newLang);
  location.reload();
}

function checkAuthNavbar() {
  const currentUser = JSON.parse(localStorage.getItem("agri_current_user"));
  const authBtn = document.getElementById("authBtn");
  if (currentUser && authBtn) {
    authBtn.textContent = currentUser.name.split(" ")[0];
    authBtn.href = "history.html";
    
    const navActions = document.getElementById("navActions");
    if (!document.getElementById("logoutBtn")) {
      const logoutBtn = document.createElement("button");
      logoutBtn.id = "logoutBtn";
      logoutBtn.className = "btn btn-outline";
      logoutBtn.textContent = "Logout";
      logoutBtn.style.marginLeft = "8px";
      logoutBtn.onclick = () => {
        localStorage.removeItem("agri_current_user");
        showToast("Logged out successfully", "success");
        setTimeout(() => location.href = "index.html", 1000);
      };
      navActions.appendChild(logoutBtn);
    }
  }
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
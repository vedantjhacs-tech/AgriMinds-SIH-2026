/* ==========================================================================
   AgriMinds - Marketplace Logic (SIH 2026 Prototype)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initDefaultListings();
  renderListings();
});

function initDefaultListings() {
  if (!localStorage.getItem("agri_listings")) {
    const defaultListings = [
      { id: "LST-1", crop: "Basmati Rice (1121)", qty: "200 Quintals", price: "₹3,400 / Qtl", district: "Karnal, Haryana", contact: "Ramesh Kumar (9876543210)" },
      { id: "LST-2", crop: "Wheat (HD-2967)", qty: "150 Quintals", price: "₹2,650 / Qtl", district: "Panipat, Haryana", contact: "Suresh Sharma (9123456789)" },
      { id: "LST-3", crop: "Mustard Seeds", qty: "80 Quintals", price: "₹6,700 / Qtl", district: "Hisar, Haryana", contact: "Vikram Singh (9988776655)" },
      { id: "LST-4", crop: "Yellow Soyabean", qty: "120 Quintals", price: "₹5,800 / Qtl", district: "Ludhiana, Punjab", contact: "Gurpreet Singh (9811223344)" }
    ];
    localStorage.setItem("agri_listings", JSON.stringify(defaultListings));
  }
}

function renderListings(filterQuery = "") {
  let listings = JSON.parse(localStorage.getItem("agri_listings")) || [];

  if (filterQuery) {
    const q = filterQuery.toLowerCase();
    listings = listings.filter(l => l.crop.toLowerCase().includes(q) || l.district.toLowerCase().includes(q));
  }

  const grid = document.getElementById("listingsGrid");
  grid.innerHTML = "";

  if (listings.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No crop listings found matching your search.</p>`;
    return;
  }

  listings.forEach(item => {
    const card = document.createElement("div");
    card.className = "listing-card";
    card.innerHTML = `
      <div>
        <span class="crop-tag">${item.district}</span>
        <h3 style="color: var(--primary-dark); margin-bottom: 0.5rem;">${item.crop}</h3>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 0.25rem;"><strong>Quantity:</strong> ${item.qty}</p>
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--primary); margin-bottom: 1.25rem;">${item.price}</p>
      </div>
      <button class="btn btn-outline" style="width: 100%;" onclick="openContactModal('${item.contact}')">Contact Farmer</button>
    `;
    grid.appendChild(card);
  });
}

function filterListings() {
  const query = document.getElementById("searchInput").value;
  renderListings(query);
}

function openAddModal() {
  document.getElementById("addModal").style.display = "flex";
}

function openContactModal(contactInfo) {
  document.getElementById("contactDetailsText").textContent = contactInfo;
  document.getElementById("contactModal").style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function handleAddNewListing(e) {
  e.preventDefault();

  const crop = document.getElementById("listCrop").value.trim();
  const qty = document.getElementById("listQty").value.trim();
  const price = "₹" + parseFloat(document.getElementById("listPrice").value).toLocaleString('en-IN') + " / Qtl";
  const district = document.getElementById("listDistrict").value.trim();
  const contact = document.getElementById("listContact").value.trim();

  let listings = JSON.parse(localStorage.getItem("agri_listings")) || [];
  const newListing = {
    id: "LST-" + Date.now(),
    crop, qty, price, district, contact
  };

  listings.unshift(newListing);
  localStorage.setItem("agri_listings", JSON.stringify(listings));

  closeModal('addModal');
  document.getElementById("addListingForm").reset();
  showToast("Crop listing published successfully!", "success");
  renderListings();
}
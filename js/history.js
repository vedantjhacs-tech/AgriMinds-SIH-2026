/* ==========================================================================
   AgriMinds - My Bookings / History Logic (SIH 2026 Prototype)
   ========================================================================== */

let currentTabStatus = "Upcoming";

document.addEventListener("DOMContentLoaded", () => {
  // Auth Guard
  const currentUser = JSON.parse(localStorage.getItem("agri_current_user"));
  if (!currentUser) {
    showToast("Please login to view your bookings.", "error");
    setTimeout(() => location.href = "login.html", 1000);
    return;
  }

  renderBookings();
});

function switchTab(status, element) {
  currentTabStatus = status;
  document.querySelectorAll(".status-tab").forEach(tab => tab.classList.remove("active"));
  element.classList.add("active");
  renderBookings();
}

function renderBookings() {
  const currentUser = JSON.parse(localStorage.getItem("agri_current_user"));
  let bookings = JSON.parse(localStorage.getItem("agri_bookings")) || [];

  // Filter user bookings and current status
  const userBookings = bookings.filter(b => b.userId === currentUser.id && b.status === currentTabStatus);
  const container = document.getElementById("bookingsList");

  if (userBookings.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3 style="color: var(--text-muted); margin-bottom: 0.5rem;">No ${currentTabStatus.toLowerCase()} bookings found</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem;">You don't have any slots under this tab right now.</p>
        ${currentTabStatus === 'Upcoming' ? '<a href="slot.html" class="btn btn-primary">Book a Slot Now</a>' : ''}
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  userBookings.forEach(item => {
    const card = document.createElement("div");
    card.className = "booking-card";

    let badgeClass = "badge-upcoming";
    if (item.status === "Completed") badgeClass = "badge-completed";
    if (item.status === "Cancelled") badgeClass = "badge-cancelled";

    card.innerHTML = `
      <div class="booking-info">
        <h4>${item.crop} (${item.quantity})</h4>
        <div class="booking-details">
          <strong>Mandi:</strong> ${item.mandi}<br>
          <strong>Date & Time:</strong> ${item.date} | ${item.timeSlot}<br>
          <strong>Token ID:</strong> ${item.bookingId}
        </div>
      </div>
      <div>
        <span class="booking-badge ${badgeClass}">${item.status}</span>
        <div class="booking-actions" style="margin-top: 0.75rem;">
          <button class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.85rem;" onclick="viewReceipt('${item.bookingId}')">View Receipt</button>
          ${item.status === 'Upcoming' ? `<button class="btn btn-accent" style="padding: 0.35rem 0.75rem; font-size: 0.85rem;" onclick="openCancelModal('${item.bookingId}')">Cancel</button>` : ''}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function viewReceipt(tokenId) {
  let bookings = JSON.parse(localStorage.getItem("agri_bookings")) || [];
  const item = bookings.find(b => b.bookingId === tokenId);

  if (!item) return;

  const detailsEl = document.getElementById("modalReceiptDetails");
  detailsEl.innerHTML = `
    <p><strong>Token ID:</strong> ${item.bookingId}</p>
    <p><strong>Farmer:</strong> ${item.userName} (${item.userMobile})</p>
    <p><strong>Mandi:</strong> ${item.mandi}</p>
    <p><strong>Crop & Qty:</strong> ${item.crop} (${item.quantity})</p>
    <p><strong>Date & Slot:</strong> ${item.date} | ${item.timeSlot}</p>
  `;

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: `AGRIMINDS_VERIFY:${item.bookingId}|${item.userMobile}|${item.crop}|${item.date}`,
    width: 140,
    height: 140
  });

  document.getElementById("receiptModal").style.display = "flex";
}

function openCancelModal(tokenId) {
  document.getElementById("cancelBookingId").value = tokenId;
  document.getElementById("cancelModal").style.display = "flex";
}

function confirmCancelBooking() {
  const tokenId = document.getElementById("cancelBookingId").value;
  let bookings = JSON.parse(localStorage.getItem("agri_bookings")) || [];

  bookings = bookings.map(b => {
    if (b.bookingId === tokenId) {
      return { ...b, status: "Cancelled" };
    }
    return b;
  });

  localStorage.setItem("agri_bookings", JSON.stringify(bookings));
  closeModal('cancelModal');
  showToast("Booking slot cancelled successfully", "success");
  renderBookings();
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}
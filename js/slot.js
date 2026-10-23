/* ==========================================================================
   AgriMinds - Slot Booking Logic (SIH 2026 Prototype)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Auth guard
  const currentUser = JSON.parse(localStorage.getItem("agri_current_user"));
  if (!currentUser) {
    showToast("Please login first to book a slot.", "error");
    setTimeout(() => location.href = "login.html", 1000);
    return;
  }

  populateDropdowns();
  setupDateRestriction();
});

function populateDropdowns() {
  // Populate Mandis
  const mandiSelect = document.getElementById("mandiSelect");
  AGRIMINDS_DATA.mandis.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.name + " (" + m.district + ", " + m.state + ")";
    opt.textContent = m.name + " — " + m.district + " (" + m.state + ")";
    mandiSelect.appendChild(opt);
  });

  // Populate Crops (Combine Kharif & Rabi)
  const cropSelect = document.getElementById("cropSelect");
  const allCrops = [...AGRIMINDS_DATA.mspKharif, ...AGRIMINDS_DATA.mspRabi];
  allCrops.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.crop;
    opt.textContent = c.crop;
    cropSelect.appendChild(opt);
  });
}

function setupDateRestriction() {
  const dateInput = document.getElementById("dateInput");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;
  
  dateInput.min = minDate;

  // Max 7 days ahead
  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 7);
  const maxyyyy = maxDateObj.getFullYear();
  const maxmm = String(maxDateObj.getMonth() + 1).padStart(2, '0');
  const maxdd = String(maxDateObj.getDate()).padStart(2, '0');
  dateInput.max = `${maxyyyy}-${maxmm}-${maxdd}`;
  dateInput.value = minDate;
}

let selectedSlotValue = "";
function selectTimeSlot(slotText, element) {
  document.querySelectorAll(".time-slot-card").forEach(card => card.classList.remove("selected"));
  element.classList.add("selected");
  selectedSlotValue = slotText;
  document.getElementById("selectedTimeSlot").value = slotText;
}

function handleSlotBooking(e) {
  e.preventDefault();

  const currentUser = JSON.parse(localStorage.getItem("agri_current_user"));
  const mandi = document.getElementById("mandiSelect").value;
  const crop = document.getElementById("cropSelect").value;
  const quantity = document.getElementById("quantityInput").value;
  const date = document.getElementById("dateInput").value;
  const timeSlot = document.getElementById("selectedTimeSlot").value;

  if (!timeSlot) {
    showToast("Please select an available time slot.", "error");
    return;
  }

  // Check double-booking (Same user, same date, same crop)
  let bookings = JSON.parse(localStorage.getItem("agri_bookings")) || [];
  const duplicate = bookings.find(b => b.userId === currentUser.id && b.date === date && b.crop === crop && b.status === "Upcoming");
  if (duplicate) {
    showToast("You already have an active booking for this crop on the same date!", "error");
    return;
  }

  const dateStrForId = date.replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const tokenId = `AGM-${dateStrForId}-${randomSuffix}`;

  const newBooking = {
    bookingId: tokenId,
    userId: currentUser.id,
    userName: currentUser.name,
    userMobile: currentUser.mobile,
    mandi: mandi,
    crop: crop,
    quantity: quantity + " Quintals",
    date: date,
    timeSlot: timeSlot,
    status: "Upcoming",
    bookedAt: new Date().toISOString()
  };

  bookings.push(newBooking);
  localStorage.setItem("agri_bookings", JSON.stringify(bookings));

  // Render Receipt Data
  document.getElementById("recTokenId").textContent = tokenId;
  document.getElementById("recName").textContent = currentUser.name + " (" + currentUser.mobile + ")";
  document.getElementById("recMandi").textContent = mandi;
  document.getElementById("recCrop").textContent = crop + " (" + quantity + " Qtl)";
  document.getElementById("recSlot").textContent = date + " | " + timeSlot;

  // Generate QR Code inside modal
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: `AGRIMINDS_VERIFY:${tokenId}|${currentUser.mobile}|${crop}|${date}`,
    width: 140,
    height: 140
  });

  document.getElementById("receiptModal").style.display = "flex";
  showToast("Slot successfully booked!", "success");
}

function closeReceiptAndRedirect() {
  window.location.href = "history.html";
}
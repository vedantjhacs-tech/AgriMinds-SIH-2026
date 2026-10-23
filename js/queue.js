/* ==========================================================================
   AgriMinds - Queue Tracker Logic (SIH 2026 Prototype)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  populateQueueMandis();
  updateQueueView();

  // Auto-refresh simulation every 8 seconds
  setInterval(() => {
    simulateQueueProgression();
  }, 8000);
});

function populateQueueMandis() {
  const select = document.getElementById("queueMandiSelect");
  AGRIMINDS_DATA.mandis.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.name;
    opt.textContent = m.name + " (" + m.district + ")";
    select.appendChild(opt);
  });
}

function updateQueueView() {
  const selectedMandi = document.getElementById("queueMandiSelect").value || AGRIMINDS_DATA.mandis[0].name;
  
  // Get all bookings from localStorage or create simulated queue items
  let bookings = JSON.parse(localStorage.getItem("agri_bookings")) || [];
  
  // Filter for selected mandi or generate dummy active queue if none
  let mandiBookings = bookings.filter(b => b.mandi.includes(selectedMandi) && b.status === "Upcoming");

  if (mandiBookings.length === 0) {
    // Generate simulated active queue items for demo richness
    mandiBookings = [
      { bookingId: "AGM-20261023-1040", userName: "Ramesh Kumar", crop: "Wheat", quantity: "45 Quintals", status: "Serving" },
      { bookingId: "AGM-20261023-1041", userName: "Suresh Sharma", crop: "Paddy Common", quantity: "60 Quintals", status: "Waiting" },
      { bookingId: "AGM-20261023-1042", userName: "Gurpreet Singh", crop: "Barley", quantity: "30 Quintals", status: "Waiting" },
      { bookingId: "AGM-20261023-1043", userName: "Rajinder Singh", crop: "Gram", quantity: "25 Quintals", status: "Waiting" },
      { bookingId: "AGM-20261023-1044", userName: "Amit Verma", crop: "Bajra", quantity: "50 Quintals", status: "Waiting" },
      { bookingId: "AGM-20261023-1045", userName: "Vikram Yadav", crop: "Maize", quantity: "40 Quintals", status: "Waiting" }
    ];
  } else {
    // Mark first as Serving, others as Waiting
    mandiBookings = mandiBookings.map((b, idx) => ({
      ...b,
      status: idx === 0 ? "Serving" : "Waiting"
    }));
  }

  // Render Stats
  const servingItem = mandiBookings.find(b => b.status === "Serving") || mandiBookings[0];
  const waitingCount = mandiBookings.filter(b => b.status === "Waiting").length;

  document.getElementById("nowServingToken").textContent = servingItem ? servingItem.bookingId : "AGM-2026-0001";
  document.getElementById("queueCount").textContent = waitingCount;
  document.getElementById("estWaitTime").textContent = (waitingCount * 3) + " mins";

  // Render Table
  const tbody = document.getElementById("queueTableBody");
  tbody.innerHTML = "";

  mandiBookings.forEach(item => {
    const tr = document.createElement("tr");
    const isServing = item.status === "Serving" || item.status === "Now Serving";
    
    tr.innerHTML = `
      <strong><td>${item.bookingId}</strong></td>
      <td>${item.userName || "Verified Farmer"}</td>
      <td>${item.crop}</td>
      <td>${item.quantity}</td>
      <td><span class="${isServing ? 'badge-serving' : 'badge-waiting'}">${isServing ? 'NOW SERVING' : 'WAITING'}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function simulateQueueProgression() {
  // Subtle visual simulation tick
  const countEl = document.getElementById("queueCount");
  if (countEl) {
    let current = parseInt(countEl.textContent);
    if (current > 2 && Math.random() > 0.5) {
      countEl.textContent = current - 1;
    }
  }
}
/* ==========================================================================
   AgriMinds - MSP & Earnings Calculator Logic (SIH 2026 Prototype)
   ========================================================================== */

let currentSeason = "Kharif";

document.addEventListener("DOMContentLoaded", () => {
  renderMspTable();
  populateCalculatorCrops();
  calculateEarnings();
});

function switchSeason(season, element) {
  currentSeason = season;
  document.querySelectorAll(".season-tab").forEach(tab => tab.classList.remove("active"));
  element.classList.add("active");
  renderMspTable();
}

function renderMspTable() {
  const tbody = document.getElementById("mspTableBody");
  const thead = document.getElementById("tableHeader");
  tbody.innerHTML = "";

  if (currentSeason === "Kharif") {
    thead.innerHTML = `
      <th>Crop Name / फसल</th>
      <th>MSP Kharif 2026-27 (₹ / Quintal)</th>
    `;
    AGRIMINDS_DATA.mspKharif.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${item.crop}</strong></td>
        <td>₹${item.rate.toLocaleString('en-IN')}</td>
      `;
      tbody.appendChild(tr);
    });
  } else {
    thead.innerHTML = `
      <th>Crop Name / फसल</th>
      <th>MSP Rabi 2027-28 (₹ / Quintal)</th>
      <th>Previous Rate (2026-27)</th>
      <th>Increase (₹)</th>
    `;
    AGRIMINDS_DATA.mspRabi.forEach(item => {
      const tr = document.createElement("tr");
      const diff = item.rate - item.prevRate;
      tr.innerHTML = `
        <td><strong>${item.crop}</strong></td>
        <td>₹${item.rate.toLocaleString('en-IN')}</td>
        <td>₹${item.prevRate.toLocaleString('en-IN')}</td>
        <td style="color: var(--success); font-weight: 600;">+₹${diff}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

function populateCalculatorCrops() {
  const select = document.getElementById("calcCrop");
  select.innerHTML = "";
  const allCrops = [...AGRIMINDS_DATA.mspKharif, ...AGRIMINDS_DATA.mspRabi];

  allCrops.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.rate;
    opt.dataset.name = c.crop;
    opt.textContent = `${c.crop} (₹${c.rate}/Qtl)`;
    select.appendChild(opt);
  });
}

function updateCropRateDisplay() {
  calculateEarnings();
}

function calculateEarnings(e) {
  if (e) e.preventDefault();

  const select = document.getElementById("calcCrop");
  if (!select.value) return;

  const ratePerQtl = parseFloat(select.value) || 0;
  const qty = parseFloat(document.getElementById("calcQty").value) || 0;
  const transportCost = parseFloat(document.getElementById("calcTransport").value) || 0;
  const moistureRate = parseFloat(document.getElementById("calcMoisture").value) || 0;

  const grossVal = ratePerQtl * qty;
  const totalMoistureDeduction = moistureRate * qty;
  const totalDeductions = transportCost + totalMoistureDeduction;
  const netVal = Math.max(0, grossVal - totalDeductions);

  document.getElementById("netPayout").textContent = "₹" + Math.round(netVal).toLocaleString('en-IN');
  document.getElementById("calcBreakdown").textContent = 
    `Gross Value: ₹${Math.round(grossVal).toLocaleString('en-IN')} | Total Deductions: ₹${Math.round(totalDeductions).toLocaleString('en-IN')}`;
}
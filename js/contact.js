/* ==========================================================================
   AgriMinds - Contact Page Logic (SIH 2026 Prototype)
   ========================================================================== */

function handleContactSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const mobile = document.getElementById("contactMobile").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name || !mobile || !message) {
    showToast("Please fill all required fields.", "error");
    return;
  }

  showToast(`Thank you, ${name}! Your query has been logged (Demo feedback saved).`, "success");
  document.getElementById("contactForm").reset();
}
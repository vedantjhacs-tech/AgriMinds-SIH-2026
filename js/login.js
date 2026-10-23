/* ==========================================================================
   AgriMinds - Authentication Logic (SIH 2026 Prototype)
   Local Auth, Form Validation, Demo OTP, and LocalStorage Session Handling
   ========================================================================== */

function switchAuthTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabLoginBtn = document.getElementById("tabLoginBtn");
  const tabRegisterBtn = document.getElementById("tabRegisterBtn");

  if (tab === "login") {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    tabLoginBtn.classList.add("active");
    tabRegisterBtn.classList.remove("active");
  } else {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    tabRegisterBtn.classList.add("active");
    tabLoginBtn.classList.remove("active");
  }
}

// Simple Base64 Hash helper for local simulation (Not for real production)
function simpleHash(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function validateMobile(mobile) {
  const re = /^[6-9]\d{9}$/;
  return re.test(mobile);
}

function generateDemoOtp() {
  const name = document.getElementById("regName").value.trim();
  const mobile = document.getElementById("regMobile").value.trim();
  const district = document.getElementById("regDistrict").value.trim();
  const village = document.getElementById("regVillage").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!name || !district || !village) {
    showToast("Please fill all profile details first.", "error");
    return;
  }

  if (!validateMobile(mobile)) {
    showToast("Enter a valid 10-digit Indian mobile number (6-9 starting).", "error");
    return;
  }

  if (password.length < 6) {
    showToast("Password must be at least 6 characters long.", "error");
    return;
  }

  document.getElementById("otpSection").style.display = "block";
  document.getElementById("getOtpBtn").style.display = "none";
  document.getElementById("regSubmitBtn").style.display = "block";
  showToast("Demo OTP Generated: 123456", "success");
}

function handleRegister(e) {
  e.preventDefault();

  const name = document.getElementById("regName").value.trim();
  const mobile = document.getElementById("regMobile").value.trim();
  const district = document.getElementById("regDistrict").value.trim();
  const village = document.getElementById("regVillage").value.trim();
  const password = document.getElementById("regPassword").value;
  const otpInput = document.getElementById("otpInput").value.trim();

  if (otpInput !== "123456") {
    showToast("Invalid OTP code! Use 123456 for demo.", "error");
    return;
  }

  let users = JSON.parse(localStorage.getItem("agri_users")) || [];

  if (users.some(u => u.mobile === mobile)) {
    showToast("Mobile number already registered! Please login.", "error");
    switchAuthTab("login");
    document.getElementById("loginMobile").value = mobile;
    return;
  }

  const newUser = {
    id: "USR-" + Date.now().toString().slice(-6),
    name: name,
    mobile: mobile,
    district: district,
    village: village,
    passwordHash: simpleHash(password),
    registeredOn: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem("agri_users", JSON.stringify(users));
  localStorage.setItem("agri_current_user", JSON.stringify(newUser));

  showToast("Registration Successful! Welcome to AgriMinds.", "success");
  setTimeout(() => {
    window.location.href = "slot.html";
  }, 1200);
}

function handleLogin(e) {
  e.preventDefault();

  const mobile = document.getElementById("loginMobile").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!validateMobile(mobile)) {
    showToast("Enter a valid 10-digit Indian mobile number.", "error");
    return;
  }

  let users = JSON.parse(localStorage.getItem("agri_users")) || [];
  const foundUser = users.find(u => u.mobile === mobile && u.passwordHash === simpleHash(password));

  if (foundUser) {
    localStorage.setItem("agri_current_user", JSON.stringify(foundUser));
    showToast(`Welcome back, ${foundUser.name}!`, "success");
    setTimeout(() => {
      window.location.href = "slot.html";
    }, 1200);
  } else {
    showToast("Invalid mobile number or password!", "error");
  }
}
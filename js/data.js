/* ==========================================================================
   AgriMinds - Master Data Repository (SIH 2026 Prototype)
   Contains Mandis, Verified MSP Data, Crops, and Translations
   ========================================================================== */

const AGRIMINDS_DATA = {
  mandis: [
    { id: "MND-001", name: "Panipat Anaj Mandi", town: "Panipat", district: "Panipat", state: "Haryana" },
    { id: "MND-002", name: "Karnal Anaj Mandi", town: "Karnal", district: "Karnal", state: "Haryana" },
    { id: "MND-003", name: "Thanesar Anaj Mandi", town: "Thanesar", district: "Kurukshetra", state: "Haryana" },
    { id: "MND-004", name: "Pehowa Anaj Mandi", town: "Pehowa", district: "Kurukshetra", state: "Haryana" },
    { id: "MND-005", name: "Shahabad Markanda Anaj Mandi", town: "Shahabad", district: "Kurukshetra", state: "Haryana" },
    { id: "MND-006", name: "Ambala City Anaj Mandi", town: "Ambala City", district: "Ambala", state: "Haryana" },
    { id: "MND-007", name: "Ambala Cantt Anaj Mandi", town: "Ambala Cantt", district: "Ambala", state: "Haryana" },
    { id: "MND-008", name: "Jagadhri Anaj Mandi", town: "Jagadhri", district: "Yamunanagar", state: "Haryana" },
    { id: "MND-009", name: "Kaithal Anaj Mandi", town: "Kaithal", district: "Kaithal", state: "Haryana" },
    { id: "MND-010", name: "Jind Anaj Mandi", town: "Jind", district: "Jind", state: "Haryana" },
    { id: "MND-011", name: "Narwana Anaj Mandi", town: "Narwana", district: "Jind", state: "Haryana" },
    { id: "MND-012", name: "Hisar Anaj Mandi", town: "Hisar", district: "Hisar", state: "Haryana" },
    { id: "MND-013", name: "Sirsa Anaj Mandi", town: "Sirsa", district: "Sirsa", state: "Haryana" },
    { id: "MND-014", name: "Fatehabad Anaj Mandi", town: "Fatehabad", district: "Fatehabad", state: "Haryana" },
    { id: "MND-015", name: "Rohtak Anaj Mandi", town: "Rohtak", district: "Rohtak", state: "Haryana" },
    { id: "MND-016", name: "Sonipat Anaj Mandi", town: "Sonipat", district: "Sonipat", state: "Haryana" },
    { id: "MND-017", name: "Panchkula Anaj Mandi", town: "Panchkula", district: "Panchkula", state: "Haryana" },
    { id: "MND-018", name: "Khanna Grain Market", town: "Khanna", district: "Ludhiana", state: "Punjab" },
    { id: "MND-019", name: "Ludhiana Grain Market", town: "Ludhiana", district: "Ludhiana", state: "Punjab" },
    { id: "MND-020", name: "Amritsar Grain Market", town: "Amritsar", district: "Amritsar", state: "Punjab" },
    { id: "MND-021", name: "Patiala Grain Market", town: "Patiala", district: "Patiala", state: "Punjab" },
    { id: "MND-022", name: "Rajpura Grain Market", town: "Rajpura", district: "Patiala", state: "Punjab" },
    { id: "MND-023", name: "Sangrur Grain Market", town: "Sangrur", district: "Sangrur", state: "Punjab" },
    { id: "MND-024", name: "Bathinda Grain Market", town: "Bathinda", district: "Bathinda", state: "Punjab" },
    { id: "MND-025", name: "Moga Grain Market", town: "Moga", district: "Moga", state: "Punjab" }
  ],

  mspKharif: [
    { crop: "Paddy Common", rate: 2441 },
    { crop: "Paddy Grade A", rate: 2461 },
    { crop: "Jowar Hybrid", rate: 4023 },
    { crop: "Jowar Maldandi", rate: 4073 },
    { crop: "Bajra", rate: 2900 },
    { crop: "Ragi", rate: 5205 },
    { crop: "Maize", rate: 2410 },
    { crop: "Tur (Arhar)", rate: 8450 },
    { crop: "Moong", rate: 8780 },
    { crop: "Urad", rate: 8200 },
    { crop: "Groundnut", rate: 7517 },
    { crop: "Sunflower Seed", rate: 8343 },
    { crop: "Soyabean Yellow", rate: 5708 },
    { crop: "Sesamum", rate: 10346 },
    { crop: "Nigerseed", rate: 10052 },
    { crop: "Cotton Medium Staple", rate: 8267 },
    { crop: "Cotton Long Staple", rate: 8667 }
  ],

  mspRabi: [
    { crop: "Wheat", rate: 2610, prevRate: 2585 },
    { crop: "Barley", rate: 2286, prevRate: 2150 },
    { crop: "Gram", rate: 5958, prevRate: 5875 },
    { crop: "Masur (Lentil)", rate: 7390, prevRate: 7000 },
    { crop: "Rapeseed & Mustard", rate: 6613, prevRate: 6200 },
    { crop: "Safflower", rate: 7215, prevRate: 6540 }
  ],

  translations: {
    en: {
      brandTitle: "Agriminds",
      tagline: "Zero Wait. Full Transparency.",
      prototypeBadge: "Smart India Hackathon 2026 - Demo Prototype",
      home: "Home",
      bookSlot: "Book Slot",
      liveQueue: "Live Queue",
      myBookings: "My Bookings",
      mspRates: "MSP & Calculator",
      marketplace: "Marketplace",
      about: "About",
      contact: "Contact",
      login: "Login",
      logout: "Logout"
    },
    hi: {
      brandTitle: "Agriminds",
      tagline: "शून्य इंतजार। पूर्ण पारदर्शिता।",
      prototypeBadge: "स्मार्ट इंडिया हैकथॉन 2026 - डेमो प्रोटोटाइप",
      home: "होम",
      bookSlot: "स्लॉट बुक करें",
      liveQueue: "लाइव कतार",
      myBookings: "मेरी बुकिंग",
      mspRates: "MSP और कैलकुलेटर",
      marketplace: "मार्केटप्लेस",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
      login: "लॉगिन",
      logout: "लॉग आउट"
    }
  }
};
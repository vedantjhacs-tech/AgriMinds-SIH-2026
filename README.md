# AgriMinds - Smart Procurement & Queue Management System

> **Tagline:** "Zero Wait. Full Transparency."
> **Smart India Hackathon 2026 - Static Prototype**

---

## 🌾 Project Overview

**AgriMinds** is an integrated web-based procurement slot booking and queue tracking system designed to eliminate overnight waiting lines at local agricultural mandis across India. Built with a **Hindi-first, mobile-responsive layout**, AgriMinds empowers farmers with token booking, real-time queue visibility, and official MSP price transparency.

---

## 🚀 Key Pillars & Features

1. **Digital Slot Booking (`slot.html`)**
   - Advance token booking for 25+ Mandis in Haryana & Punjab.
   - Crop selection, quintal validation, and date/time slot capacity management.
   - Instant QR code token receipt generation (printable and viewable anytime).

2. **Real-Time Live Queue Tracker (`queue.html`)**
   - Simulated live gate progress showing currently serving token IDs.
   - Live waiting count and accurate estimated wait times in minutes.
   - Mandi-wise filtering.

3. **Transparent MSP & Earnings Calculator (`msp.html`)**
   - Official Kharif 2026-27 & Rabi 2027-28 MSP rates (Source: Cabinet decisions via PIB / DA&FW).
   - Sugarcane Fair & Remunerative Price (FRP) section.
   - Net earnings calculator with transport and moisture deduction options.

4. **Direct Farmer Marketplace (`marketplace.html`)**
   - Direct listing of surplus agricultural produce.
   - Search and location-based filter for wholesale buyers.

5. **Farmer Authentication & My Bookings (`login.html`, `history.html`)**
   - 10-digit Indian mobile registration with simulated OTP flow (`123456`).
   - Upcoming, Completed, and Cancelled slot tabs with digital QR receipt viewer.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox/Grid), Vanilla JavaScript (ES6)
- **Data Storage:** Browser `localStorage` (Zero external database dependency)
- **CDN Libraries:** `qrcodejs` (Pin version `1.0.0`)
- **Hosting:** Static GitHub Pages hosting ready

---

## 📂 Project Directory Structure

```text
AgriMinds-SIH-2026/
├── index.html          # Landing page with problem vs solution & FAQs
├── login.html          # Farmer register & login tabs with Demo OTP
├── slot.html           # Digital slot booking & QR generation
├── queue.html          # Live queue status tracker
├── history.html        # My Bookings dashboard with cancellation
├── msp.html            # Verified MSP tables & earnings calculator
├── marketplace.html    # Surplus crop marketplace
├── about.html          # Team overview, vision, and future roadmap
├── contact.html        # Support desk and feedback form
├── 404.html            # Custom 404 page
├── README.md           # Technical documentation
├── css/
│   └── style.css       # Unified design system stylesheet
├── js/
│   ├── data.js         # Verified MSP rates, mandis, and translations
│   ├── common.js       # Layout injector, auth guard, and language toggle
│   ├── login.js        # Auth logic
│   ├── slot.js         # Slot booking & QR generator
│   ├── queue.js        # Live queue simulator
│   ├── history.js      # Booking history & receipt view
│   ├── msp.js          # MSP table and calculator
│   ├── marketplace.js  # Marketplace search & add listing
│   └── contact.js      # Contact form handling
└── assets/
    └── logo.svg        # Emerald Green & Warm Amber SVG Logo
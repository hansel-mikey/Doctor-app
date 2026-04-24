# 🩺 MediBook — Doctor Appointment App

A production-ready React doctor appointment system with token booking, admin panel, and AdSense integration.

---

## 📁 Folder Structure

```
doctor-app/
├── public/
│   └── index.html              # HTML shell + AdSense script tag
├── src/
│   ├── index.js                # React entry point
│   ├── App.js                  # Root component
│   ├── components/
│   │   ├── DoctorApp.js        # Main layout, state, routing
│   │   ├── ProfilePage.js      # Doctor profile, degrees, certs
│   │   ├── BookPage.js         # Appointment booking form
│   │   └── AdminPage.js        # Admin panel & token control
│   ├── data/
│   │   └── doctor.js           # ← Edit doctor info, hours, password here
│   ├── utils/
│   │   ├── storage.js          # localStorage persistence
│   │   └── notify.js           # Email (SendGrid) & SMS (Twilio) stubs
│   └── styles/
│       └── theme.js            # All design tokens & inline styles
├── package.json
└── README.md
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Build for production
npm run build
```

---

## ✏️ Customise the Doctor

Edit **`src/data/doctor.js`**:

```js
export const DOCTOR = {
  name: "Dr. Your Name",
  title: "Your Specialisation",
  hospital: "Your Hospital",
  photo: "https://your-photo-url.com/photo.jpg",
  // ...degrees, certificates, timings, phone, email
};

export const CLINIC_START_HOUR = 7;   // 7 AM
export const CLINIC_END_HOUR   = 12;  // 12 PM — tokens reset here
export const MAX_TOKENS        = 100;
export const ADMIN_PASSWORD    = "YourSecurePassword"; // ⚠️ Change this!
```

---

## 💰 Google AdSense Setup

1. Add your script in **`public/index.html`**:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```

2. Replace the placeholder comments in **`src/components/DoctorApp.js`** with your `<ins>` tags:
   ```jsx
   <ins className="adsbygoogle"
     style={{ display: "block" }}
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true" />
   ```

   Ad slots available:
   - **Top banner** — 728×90 Leaderboard
   - **Sidebar** — 160×600 Wide Skyscraper  
   - **Footer banner** — 728×90 Leaderboard

---

## 🔔 Enable Real Notifications

### Email — SendGrid
1. `npm install @sendgrid/mail`
2. Add to `.env`: `REACT_APP_SENDGRID_KEY=your_key`
3. Uncomment the fetch block in **`src/utils/notify.js`** → `sendEmail()`

### SMS — Twilio
1. Add to `.env`:
   ```
   REACT_APP_TWILIO_SID=ACxxxxxxxx
   REACT_APP_TWILIO_TOKEN=your_token
   REACT_APP_TWILIO_FROM=+1XXXXXXXXXX
   ```
2. Uncomment the fetch block in **`src/utils/notify.js`** → `sendSMS()`

> ⚠️ **Important:** Never call third-party APIs directly from the browser in production — API keys will be exposed. Instead, create a small backend (Node/Express, Firebase Functions, etc.) and proxy the requests through it.

---

## 🔐 Admin Panel

- URL: Click **Admin** tab in the nav
- Default password: `doctor123` (change in `src/data/doctor.js`)
- Features:
  - Live token progress bar (0 → 100)
  - **▶ Next Token** — increment the serving token
  - **↺ Reset Day** — wipe all tokens for a fresh start
  - Full appointments table with name, email, phone, time

---

## ⏰ Token Rules

| Rule | Value |
|------|-------|
| Tokens start | `#001` |
| Tokens end | `#100` |
| Clinic opens | 7:00 AM |
| Tokens reset | 12:00 PM (noon) |
| Reset trigger | Auto on page load if date changed |

---

## 📦 Tech Stack

- **React 18** — UI framework
- **localStorage** — token persistence (swap with Firebase/Supabase for multi-device sync)
- **Inline styles** — zero CSS dependencies
- **SendGrid** (optional) — email notifications
- **Twilio** (optional) — SMS notifications
- **Google AdSense** (optional) — monetisation

---

© 2026 MediBook

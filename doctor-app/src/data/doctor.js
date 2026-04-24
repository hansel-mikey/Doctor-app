// src/data/doctor.js
// ── Edit this file to update the doctor's information ──────────────────────

export const DOCTOR = {
  name: "Dr. Arjun Mehta",
  title: "Senior Cardiologist & Internal Medicine Specialist",
  hospital: "Apollo Wellness Centre, Mumbai",
  photo: "https://i.pravatar.cc/300?img=11",
  experience: "18+ Years",
  patients: "12,000+",
  rating: "4.9",
  about:
    "Dr. Arjun Mehta is a board-certified cardiologist with over 18 years of clinical excellence. " +
    "He specialises in preventive cardiology, interventional procedures, and holistic internal medicine. " +
    "Committed to patient-centred care and the latest evidence-based treatments.",
  degrees: [
    { title: "MBBS",                           institution: "AIIMS, New Delhi",        year: "2006" },
    { title: "MD – Internal Medicine",          institution: "KEM Hospital, Mumbai",    year: "2009" },
    { title: "DM – Cardiology",                 institution: "PGIMER, Chandigarh",      year: "2012" },
    { title: "Fellowship – Interventional Cardiology", institution: "Cleveland Clinic, USA", year: "2014" },
  ],
  certificates: [
    "Board Certified Cardiologist – NMC India",
    "Fellow of the American College of Cardiology (FACC)",
    "Advanced Cardiac Life Support (ACLS) – AHA",
    "Certified in Echocardiography – IAE",
    "ISO 9001:2015 – Quality Practice Certification",
  ],
  timings: "Mon – Sat  |  7:00 AM – 12:00 PM",
  phone: "+91 98200 00000",
  email: "appointments@drmehta.in",
};

// Clinic hours: tokens issued between START_HOUR and END_HOUR (24h format)
export const CLINIC_START_HOUR = 7;   // 7 AM
export const CLINIC_END_HOUR   = 12;  // 12 PM noon  → reset happens here

export const MAX_TOKENS = 100;
export const ADMIN_PASSWORD = "doctor123"; // ⚠️ Change before going live!

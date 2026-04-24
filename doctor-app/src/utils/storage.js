// src/utils/storage.js
// ── Persistent localStorage helpers ───────────────────────────────────────
// In production replace with your backend API / Firebase / Supabase

const STORAGE_KEY = "doctor_app_state";

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveState(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Storage write failed:", e);
  }
}

export function todayStr() {
  return new Date().toISOString().split("T")[0];
}

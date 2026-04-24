// src/components/DoctorApp.js
import { useState, useEffect, useCallback } from "react";
import { DOCTOR, ADMIN_PASSWORD, MAX_TOKENS, CLINIC_START_HOUR, CLINIC_END_HOUR } from "../data/doctor";
import { loadState, saveState, todayStr } from "../utils/storage";
import { sendNotification } from "../utils/notify";
import { styles } from "../styles/theme";
import ProfilePage from "./ProfilePage";
import BookPage from "./BookPage";
import AdminPage from "./AdminPage";

export default function DoctorApp() {
  const [tab, setTab]                 = useState("home");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPass, setAdminPass]     = useState("");
  const [adminError, setAdminError]   = useState("");

  const [nextToken, setNextToken]     = useState(1);
  const [currentToken, setCurrentToken] = useState(0);
  const [lastReset, setLastReset]     = useState(todayStr());
  const [appointments, setAppointments] = useState([]);
  const [loaded, setLoaded]           = useState(false);

  // ── Load persisted state ──────────────────────────────────────────────────
  useEffect(() => {
    const s = loadState();
    if (s) {
      const today = todayStr();
      if (s.lastReset !== today) {
        // New day → reset all tokens
        setNextToken(1); setCurrentToken(0);
        setLastReset(today); setAppointments([]);
      } else {
        setNextToken(s.nextToken ?? 1);
        setCurrentToken(s.currentToken ?? 0);
        setLastReset(s.lastReset ?? today);
        setAppointments(s.appointments ?? []);
      }
    }
    setLoaded(true);
  }, []);

  // ── Persist on change ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    saveState({ nextToken, currentToken, lastReset, appointments });
  }, [nextToken, currentToken, lastReset, appointments, loaded]);

  // ── Clinic hours check ───────────────────────────────────────────────────
  function isWithinHours() {
    const h = new Date().getHours();
    return h >= CLINIC_START_HOUR && h < CLINIC_END_HOUR;
  }

  // ── Book appointment ──────────────────────────────────────────────────────
  const bookAppointment = useCallback(
    ({ name, email, phone, method }) => {
      if (nextToken > MAX_TOKENS) return { ok: false, msg: `All ${MAX_TOKENS} tokens for today are booked.` };
      const token = nextToken;
      const appt  = { token, name, email, phone, time: new Date().toLocaleTimeString() };
      setNextToken((t) => t + 1);
      setAppointments((a) => [...a, appt]);
      sendNotification({ name, email, phone, token, method });
      return { ok: true, token };
    },
    [nextToken]
  );

  const incrementCurrent = () => setCurrentToken((c) => Math.min(c + 1, MAX_TOKENS));
  const resetAll = () => {
    setNextToken(1); setCurrentToken(0);
    setLastReset(todayStr()); setAppointments([]);
  };

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0a1628", color: "#7eb8f7", fontFamily: "sans-serif" }}>
      Loading…
    </div>
  );

  return (
    <div style={styles.root}>
      {/* ── Top AdSense Banner ── */}
      <div style={styles.adBanner}>
        <span style={styles.adLabel}>Advertisement</span>
        <div style={styles.adSlot}>
          {/*
            REPLACE THIS COMMENT WITH YOUR ADSENSE TAG:
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
              data-ad-format="auto"
              data-full-width-responsive="true" />
          */}
          <span style={styles.adPlaceholderText}>[ Google AdSense — 728×90 Leaderboard ]</span>
        </div>
      </div>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header style={styles.header}>
        <div style={styles.logoWrap}>
          <span style={styles.logoIcon}>⚕</span>
          <span style={styles.logoText}>MediBook</span>
        </div>
        <nav style={styles.nav}>
          {[["home","🏠 Profile"],["book","📅 Book"],["admin","🔐 Admin"]].map(([t, label]) => (
            <button key={t} style={{ ...styles.navBtn, ...(tab === t ? styles.navBtnActive : {}) }} onClick={() => setTab(t)}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Live Token Status Bar ─────────────────────────────────────────── */}
      <div style={styles.tokenBar}>
        <div style={styles.tokenBarInner}>
          {[
            ["NOW SERVING",  currentToken === 0 ? "—" : `#${String(currentToken).padStart(3,"0")}`,  "#7eb8f7"],
            ["NEXT TOKEN",   nextToken > MAX_TOKENS ? "FULL" : `#${String(nextToken).padStart(3,"0")}`, nextToken > MAX_TOKENS ? "#f87171" : "#34d399"],
            ["BOOKED TODAY", `${nextToken - 1}/${MAX_TOKENS}`, "#f59e0b"],
            ["STATUS",       isWithinHours() ? "● OPEN" : "● CLOSED", isWithinHours() ? "#34d399" : "#f87171"],
          ].map(([label, value, color], i, arr) => (
            <span key={label} style={{ display: "contents" }}>
              <div style={styles.tokenItem}>
                <span style={styles.tokenLabel}>{label}</span>
                <span style={{ ...styles.tokenNumber, color, fontSize: label === "STATUS" ? 14 : undefined }}>{value}</span>
              </div>
              {i < arr.length - 1 && <div style={styles.tokenDivider} />}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <main style={styles.main}>
        {tab === "home"  && <ProfilePage doctor={DOCTOR} onBook={() => setTab("book")} />}
        {tab === "book"  && <BookPage nextToken={nextToken} maxTokens={MAX_TOKENS} isOpen={isWithinHours()} onBook={bookAppointment} />}
        {tab === "admin" && (
          <AdminPage
            unlocked={adminUnlocked}
            pass={adminPass} setPass={setAdminPass}
            error={adminError}
            onLogin={() => {
              if (adminPass === ADMIN_PASSWORD) { setAdminUnlocked(true); setAdminError(""); }
              else setAdminError("Incorrect password.");
            }}
            currentToken={currentToken} nextToken={nextToken}
            maxTokens={MAX_TOKENS} appointments={appointments}
            onIncrement={incrementCurrent} onReset={resetAll}
          />
        )}

        {/* ── Sidebar AdSense ── */}
        <aside style={styles.sideAd}>
          <span style={styles.adLabel}>Advertisement</span>
          <div style={styles.sideAdSlot}>
            {/*
              REPLACE WITH:
              <ins className="adsbygoogle"
                style={{ display: "inline-block", width: 160, height: 600 }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX" />
            */}
            <span style={styles.adPlaceholderText}>[ AdSense<br/>160×600<br/>Skyscraper ]</span>
          </div>
        </aside>
      </main>

      {/* ── Footer AdSense Banner ─────────────────────────────────────────── */}
      <div style={{ ...styles.adBanner, marginTop: 0 }}>
        <span style={styles.adLabel}>Advertisement</span>
        <div style={styles.adSlot}>
          <span style={styles.adPlaceholderText}>[ Google AdSense — 728×90 Footer Banner ]</span>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>© 2026 Dr. Arjun Mehta — MediBook. Tokens reset daily at 12:00 PM.</p>
        <p style={{ color: "#4a6fa5", fontSize: 12 }}>For emergencies call 112</p>
      </footer>
    </div>
  );
}

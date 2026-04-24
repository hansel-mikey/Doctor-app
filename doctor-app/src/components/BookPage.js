// src/components/BookPage.js
import { useState } from "react";
import { styles } from "../styles/theme";

export default function BookPage({ nextToken, maxTokens, isOpen, onBook }) {
  const [form, setForm]           = useState({ name: "", email: "", phone: "" });
  const [notifMethod, setMethod]  = useState("both");
  const [result, setResult]       = useState(null);
  const [sending, setSending]     = useState(false);

  const full = nextToken > maxTokens;

  const handleBook = async () => {
    if (!form.name || !form.email || !form.phone) { alert("Please fill all fields."); return; }
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    const res = onBook({ ...form, method: notifMethod });
    setSending(false);
    setResult(res);
  };

  if (result?.ok) return (
    <div style={styles.page}>
      <div style={styles.successCard}>
        <div style={styles.successIcon}>✅</div>
        <h2 style={styles.successTitle}>Appointment Confirmed!</h2>
        <div style={styles.bigToken}>
          <span style={styles.bigTokenLabel}>Your Token</span>
          <span style={styles.bigTokenNum}>#{String(result.token).padStart(3, "0")}</span>
        </div>
        <div style={styles.successInfo}>
          <p>👤 {form.name}</p>
          <p>📧 {form.email}</p>
          <p>📱 {form.phone}</p>
        </div>
        <div style={styles.notifBox}>
          <p>🔔 Confirmation sent via {notifMethod === "email" ? "Email" : notifMethod === "phone" ? "SMS" : "Email & SMS"}</p>
          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
            (Connect SendGrid / Twilio in <code>src/utils/notify.js</code> to enable real notifications)
          </p>
        </div>
        <p style={styles.successNote}>Please arrive by <strong>7:00 AM</strong>. Tokens reset at <strong>12:00 PM</strong>.</p>
        <button style={styles.bookBtn} onClick={() => setResult(null)}>Book Another</button>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.bookCard}>
        <h2 style={styles.bookTitle}>Book an Appointment</h2>
        <p  style={styles.bookSub}>Tokens: 7:00 AM – 12:00 PM  •  Max {maxTokens}/day</p>

        {!isOpen && (
          <div style={styles.warningBox}>
            ⚠️ Clinic is currently <strong>CLOSED</strong>. Tokens are issued between 7:00 AM and 12:00 PM.
          </div>
        )}
        {full && (
          <div style={{ ...styles.warningBox, background: "#450a0a", borderColor: "#f87171" }}>
            ❌ All {maxTokens} tokens for today are booked. Please come back tomorrow.
          </div>
        )}

        {!full && (
          <>
            <label style={styles.formLabel}>Full Name</label>
            <input style={styles.input} placeholder="e.g. Rahul Sharma"   value={form.name}  onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <label style={styles.formLabel}>Email Address</label>
            <input style={styles.input} type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

            <label style={styles.formLabel}>Phone Number</label>
            <input style={styles.input} type="tel" placeholder="+91 98000 00000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

            <label style={styles.formLabel}>Notification Preference</label>
            <div style={styles.radioGroup}>
              {[["email","📧 Email"], ["phone","📱 SMS"], ["both","📧 + 📱 Both"]].map(([v, l]) => (
                <label key={v} style={styles.radioLabel}>
                  <input type="radio" value={v} checked={notifMethod === v} onChange={() => setMethod(v)} style={{ marginRight: 6 }} />
                  {l}
                </label>
              ))}
            </div>

            <div style={styles.tokenPreview}>
              You will receive: <strong>Token #{String(nextToken).padStart(3,"0")}</strong>
            </div>

            <button style={{ ...styles.bookBtn, width: "100%", marginTop: 20 }} onClick={handleBook} disabled={sending}>
              {sending ? "Processing…" : "Confirm Appointment"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

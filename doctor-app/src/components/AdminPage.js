// src/components/AdminPage.js
import { styles } from "../styles/theme";

export default function AdminPage({ unlocked, pass, setPass, error, onLogin, currentToken, nextToken, maxTokens, appointments, onIncrement, onReset }) {
  if (!unlocked) return (
    <div style={styles.page}>
      <div style={styles.adminLoginCard}>
        <div style={styles.lockIcon}>🔐</div>
        <h2 style={styles.bookTitle}>Doctor Admin Panel</h2>
        <p  style={styles.bookSub}>Enter your admin password to continue</p>
        <input
          style={styles.input} type="password" placeholder="Password"
          value={pass} onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onLogin()}
        />
        {error && <p style={styles.errorText}>{error}</p>}
        <button style={{ ...styles.bookBtn, width: "100%", marginTop: 12 }} onClick={onLogin}>Login</button>
        <p style={{ fontSize: 12, color: "#4a6fa5", marginTop: 12 }}>
          Default password: <code>doctor123</code><br/>
          Change in <code>src/data/doctor.js</code>
        </p>
      </div>
    </div>
  );

  const progress = Math.min((currentToken / maxTokens) * 100, 100);

  return (
    <div style={styles.page}>
      <div style={styles.adminCard}>
        <h2 style={styles.bookTitle}>🩺 Admin Control Panel</h2>

        {/* Progress bar */}
        <div style={styles.progressSection}>
          <div style={styles.progressHeader}>
            <span>Token Progress</span>
            <span>{currentToken} / {maxTokens}</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
        </div>

        {/* Big counters */}
        <div style={styles.adminTokenDisplay}>
          <div style={styles.adminTokenBox}>
            <span style={styles.adminTokenLabel}>CURRENTLY SERVING</span>
            <span style={styles.adminTokenNum}>{currentToken === 0 ? "—" : `#${String(currentToken).padStart(3,"0")}`}</span>
          </div>
          <div style={styles.adminTokenBox}>
            <span style={styles.adminTokenLabel}>TOTAL BOOKED</span>
            <span style={{ ...styles.adminTokenNum, color: "#f59e0b" }}>{nextToken - 1}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={styles.adminBtnRow}>
          <button
            style={{ ...styles.bookBtn, flex: 1, background: currentToken >= maxTokens ? "#1e293b" : "linear-gradient(135deg,#059669,#10b981)", cursor: currentToken >= maxTokens ? "not-allowed" : "pointer" }}
            onClick={onIncrement} disabled={currentToken >= maxTokens}
          >
            ▶ Next Token
          </button>
          <button
            style={{ ...styles.bookBtn, flex: 1, background: "linear-gradient(135deg,#b45309,#d97706)" }}
            onClick={() => { if (window.confirm("Reset all tokens for today?")) onReset(); }}
          >
            ↺ Reset Day
          </button>
        </div>

        {/* Appointments table */}
        <h3 style={{ ...styles.sectionTitle, marginTop: 32 }}>📋 Today's Appointments ({appointments.length})</h3>
        {appointments.length === 0
          ? <p style={{ color: "#4a6fa5", textAlign: "center" }}>No appointments booked yet.</p>
          : (
            <div style={styles.apptTable}>
              <div style={styles.apptRow}>
                {["Token","Name","Email","Phone","Booked At"].map((h) => (
                  <div key={h} style={styles.apptHeader}>{h}</div>
                ))}
              </div>
              {appointments.map((a) => (
                <div key={a.token} style={{ ...styles.apptRow, ...(a.token === currentToken ? styles.apptRowActive : {}) }}>
                  <div style={styles.apptCell}><strong>#{String(a.token).padStart(3,"0")}</strong></div>
                  <div style={styles.apptCell}>{a.name}</div>
                  <div style={styles.apptCell}>{a.email}</div>
                  <div style={styles.apptCell}>{a.phone}</div>
                  <div style={styles.apptCell}>{a.time}</div>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
}

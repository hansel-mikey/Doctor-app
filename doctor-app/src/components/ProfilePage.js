// src/components/ProfilePage.js
import { styles } from "../styles/theme";

export default function ProfilePage({ doctor, onBook }) {
  return (
    <div style={styles.page}>
      {/* ── Hero Card ─────────────────────────────────────────────────────── */}
      <div style={styles.heroCard}>
        <div style={styles.heroLeft}>
          <img src={doctor.photo} alt={doctor.name} style={styles.doctorPhoto} />
          <div style={styles.statRow}>
            {[["Experience", doctor.experience], ["Patients", doctor.patients], ["Rating", `⭐ ${doctor.rating}`]].map(([l, v]) => (
              <div key={l} style={styles.statBox}>
                <span style={styles.statValue}>{v}</span>
                <span style={styles.statLabel}>{l}</span>
              </div>
            ))}
          </div>
          <button style={styles.bookBtn} onClick={onBook}>📅 Book Appointment</button>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.badge}>Verified Doctor ✓</div>
          <h1 style={styles.doctorName}>{doctor.name}</h1>
          <p  style={styles.doctorTitle}>{doctor.title}</p>
          <p  style={styles.doctorHospital}>🏥 {doctor.hospital}</p>
          <p  style={styles.doctorTimings}>🕖 {doctor.timings}</p>
          <p  style={styles.doctorAbout}>{doctor.about}</p>
          <div style={styles.contactRow}>
            <a href={`tel:${doctor.phone}`}      style={styles.contactBtn}>📞 {doctor.phone}</a>
            <a href={`mailto:${doctor.email}`}   style={styles.contactBtn}>✉ {doctor.email}</a>
          </div>
        </div>
      </div>

      {/* ── Education ─────────────────────────────────────────────────────── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🎓 Education & Degrees</h2>
        <div style={styles.degreeGrid}>
          {doctor.degrees.map((d, i) => (
            <div key={i} style={styles.degreeCard}>
              <div style={styles.degreeYear}>{d.year}</div>
              <div style={styles.degreeTitle}>{d.title}</div>
              <div style={styles.degreeInst}>{d.institution}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────────────────── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🏅 Certifications</h2>
        <div style={styles.certList}>
          {doctor.certificates.map((c, i) => (
            <div key={i} style={styles.certItem}>
              <span style={styles.certIcon}>✦</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

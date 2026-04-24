// src/utils/notify.js
// ── Notification helpers ───────────────────────────────────────────────────
// Plug in SendGrid (email) and Twilio (SMS) API calls here.
// Currently logs to console — replace with real API calls for production.

/**
 * Send appointment confirmation to the patient.
 * @param {{ name: string, email: string, phone: string, token: number, method: string }} opts
 */
export async function sendNotification({ name, email, phone, token, method }) {
  const msg = `Your appointment token is #${String(token).padStart(3, "0")}. Please arrive at the clinic by 7:00 AM. – Dr. Arjun Mehta`;

  if (method === "email" || method === "both") {
    await sendEmail({ to: email, name, message: msg, token });
  }
  if (method === "phone" || method === "both") {
    await sendSMS({ to: phone, message: msg });
  }
}

// ── Email via SendGrid ─────────────────────────────────────────────────────
async function sendEmail({ to, name, message, token }) {
  console.log(`📧 [EMAIL] To: ${to} | Token: #${token}`);
  /*
  // Uncomment and configure for production (call from your backend):
  await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.REACT_APP_SENDGRID_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to, name }] }],
      from: { email: "noreply@drmehta.in", name: "Dr. Arjun Mehta Clinic" },
      subject: `Appointment Confirmed – Token #${String(token).padStart(3, "0")}`,
      content: [{ type: "text/plain", value: message }],
    }),
  });
  */
}

// ── SMS via Twilio ─────────────────────────────────────────────────────────
async function sendSMS({ to, message }) {
  console.log(`📱 [SMS] To: ${to} | Message: ${message}`);
  /*
  // Uncomment and configure for production (call from your backend):
  const accountSid = process.env.REACT_APP_TWILIO_SID;
  const authToken  = process.env.REACT_APP_TWILIO_TOKEN;
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + btoa(`${accountSid}:${authToken}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      From: process.env.REACT_APP_TWILIO_FROM,
      To: to,
      Body: message,
    }),
  });
  */
}

import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

async function POST({ request }) {
  try {
    const { name, email, subject, message } = await request.json();
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const apiKey = undefined                              ;
    if (!apiKey) {
      console.log("Contact form submission (no API key configured):", { name, email, subject, message });
      return new Response(
        JSON.stringify({ success: true, message: "Message received (demo mode)" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    const from = undefined                                   || "";
    const to = undefined                                 || "";
    if (!from || !to) {
      console.error("Missing CONTACT_EMAIL_FROM or CONTACT_EMAIL_TO env vars");
      return new Response(
        JSON.stringify({ error: "Contact form not fully configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message)}</p>
      `,
      replyTo: email
    });
    if (error) {
      console.error("Resend error:", error);
      const message2 = typeof error === "object" && error !== null ? error.message || JSON.stringify(error) : String(error);
      return new Response(
        JSON.stringify({ error: message2 }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ success: true, message: "Message sent! I'll get back to you soon." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

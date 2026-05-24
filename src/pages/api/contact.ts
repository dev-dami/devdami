import { Resend } from 'resend';

export async function POST({ request }: { request: Request }) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If no API key, just log and return success (for development)
    const apiKey = import.meta.env.RESEND_API_KEY as string | undefined;
    if (!apiKey) {
      console.log('Contact form submission (no API key configured):', { name, email, subject, message });
      return new Response(
        JSON.stringify({ success: true, message: 'Message received (demo mode)' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Resend sender domain must be verified in your Resend dashboard.
    // The onboarding@resend.dev sender is restricted to testing only —
    // it can only send to the email address you registered with Resend.
    // Set CONTACT_EMAIL_FROM to an address on your verified domain, e.g.:
    //   Portfolio Contact <noreply@varityweb.com>
    const from = (import.meta.env.CONTACT_EMAIL_FROM as string) || '';
    const to = (import.meta.env.CONTACT_EMAIL_TO as string) || '';

    if (!from || !to) {
      console.error('Missing CONTACT_EMAIL_FROM or CONTACT_EMAIL_TO env vars');
      return new Response(
        JSON.stringify({ error: 'Contact form not fully configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(apiKey);

    // Send email using Resend
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
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      const message = typeof error === 'object' && error !== null
        ? (error as { message?: string }).message || JSON.stringify(error)
        : String(error);
      return new Response(
        JSON.stringify({ error: message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent! I\'ll get back to you soon.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

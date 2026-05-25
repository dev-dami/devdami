import { Resend } from 'resend';
import { contactNotificationEmail } from '../../lib/email-template';

export async function POST({ request }: { request: Request }) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = import.meta.env.RESEND_API_KEY as string | undefined;
    if (!apiKey) {
      console.log('Contact form submission (no API key configured):', { name, email, subject, message });
      return new Response(
        JSON.stringify({ success: true, message: 'Message received (demo mode)' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
    const { subject: emailSubject, html } = contactNotificationEmail({ name, email, subject, message });

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: emailSubject,
      html,
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
      JSON.stringify({ success: true, message: "Message sent! I'll get back to you soon." }),
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

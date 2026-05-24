import { Resend } from 'resend';

export async function POST({ request }: { request: Request }) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If no API key, just log and return success (for development)
    if (!import.meta.env.RESEND_API_KEY) {
      console.log('Newsletter subscription (no API key configured):', { email });
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Subscribed (demo mode — no API key configured)',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Resend only when API key exists
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    // Add subscriber via Resend Contacts API
    const { data, error } = await resend.contacts.create({
      email,
      audienceId: import.meta.env.RESEND_AUDIENCE_ID || '',
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
      JSON.stringify({ success: true, data }),
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

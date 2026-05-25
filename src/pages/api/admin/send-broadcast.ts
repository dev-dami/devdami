import { Resend } from 'resend';
import { blogPostEmail } from '../../../lib/email-template';

export async function POST({ request }: { request: Request }) {
  try {
    const secret = import.meta.env.ADMIN_SECRET as string | undefined;
    if (!secret) {
      return new Response(
        JSON.stringify({ error: 'ADMIN_SECRET not configured on server' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const auth = request.headers.get('authorization') || '';
    const body: { token?: string } = {};
    try {
      Object.assign(body, await request.clone().json());
    } catch {}
    const bodyToken = body.token;
    const bearerMatch = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    const isValid = bearerMatch === secret || bodyToken === secret;

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized — invalid or missing admin token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { slug, title, description } = await request.json();
    if (!slug || !title) {
      return new Response(
        JSON.stringify({ error: 'slug and title are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = import.meta.env.RESEND_API_KEY as string | undefined;
    const audienceId = import.meta.env.RESEND_AUDIENCE_ID as string | undefined;
    const from = (import.meta.env.CONTACT_EMAIL_FROM as string) || '';

    if (!apiKey || !audienceId) {
      return new Response(
        JSON.stringify({ error: 'Missing RESEND_API_KEY or RESEND_AUDIENCE_ID' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(apiKey);
    const { subject, html } = blogPostEmail({
      title,
      description: description || 'New blog post',
      slug,
    });

    const { data, error } = await resend.broadcasts.create({
      audienceId,
      from,
      subject,
      html,
      send: true,
    });

    if (error) {
      console.error('Resend broadcast error:', error);
      return new Response(
        JSON.stringify({ error: typeof error === 'object' && error !== null ? JSON.stringify(error) : String(error) }),
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

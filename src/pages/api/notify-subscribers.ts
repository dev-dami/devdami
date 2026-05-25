import { Resend } from 'resend';
import { blogPostEmail } from '../../lib/email-template';

export async function POST({ request }: { request: Request }) {
  try {
    const secret = import.meta.env.NOTIFY_SECRET as string | undefined;
    if (!secret) {
      return new Response(
        JSON.stringify({ error: 'NOTIFY_SECRET not configured on server' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(request.url);
    const queryToken = url.searchParams.get('secret');
    const auth = request.headers.get('authorization') || '';
    const match = auth === `Bearer ${secret}` || queryToken === secret;
    if (!match) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
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

    const { error } = await resend.broadcasts.create({
      audienceId,
      from,
      subject,
      html,
      send: true,
    });

    if (error) {
      console.error('Resend broadcast error:', error);
      const message = typeof error === 'object' && error !== null
        ? (error as { message?: string }).message || JSON.stringify(error)
        : String(error);
      return new Response(
        JSON.stringify({ error: message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
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

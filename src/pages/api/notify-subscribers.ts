import { Resend } from 'resend';

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
    const siteUrl = 'https://devdami.varityweb.com';
    const postUrl = `${siteUrl}/blog/${slug}/`;
    const desc = description || 'New blog post';

    const { error } = await resend.broadcasts.create({
      audienceId,
      from,
      subject: `New blog post: ${title}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <p style="color: #666; font-size: 14px; margin-bottom: 8px;">New from devdami.varityweb.com</p>
          <h1 style="font-size: 22px; font-weight: 600; margin: 0 0 12px; color: #111;">
            ${escapeHtml(title)}
          </h1>
          <p style="font-size: 15px; line-height: 1.6; color: #333; margin: 0 0 20px;">
            ${escapeHtml(desc)}
          </p>
          <a href="${postUrl}"
             style="display: inline-block; padding: 10px 20px; background: #2563eb; color: #fff;
                    text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
            Read the post →
          </a>
          <p style="margin-top: 28px; font-size: 12px; color: #999;">
            If you no longer want these emails, you can unsubscribe at any time.
          </p>
        </div>
      `,
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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

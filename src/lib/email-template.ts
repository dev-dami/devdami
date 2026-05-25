// ---------------------------------------------------------------------------
// HTML email template matching the devdami.varityweb.com dark aesthetic.
// All styles are inline for maximum email client compatibility.
// ---------------------------------------------------------------------------

const BRAND = {
  name: "Damilare Osibanjo",
  site: "https://devdami.varityweb.com",
  bg: "#080808",
  surface: "#0f0f0f",
  border: "#1e1e1e",
  text: "#ffffff",
  muted: "#a0a0a0",
  accent: "#059669",
  accentHover: "#047857",
  radius: "6px",
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'JetBrains Mono', 'Fira Code', monospace",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface BaseEmailOptions {
  subject: string;
  previewText?: string;
  body: string;
}

function baseWrapper({ subject, previewText, body }: BaseEmailOptions): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:${BRAND.bg}; font-family:${BRAND.font}; -webkit-font-smoothing:antialiased;">
    ${previewText ? `<!--[if !mso]><!-- --><div style="display:none;font-size:1px;color:${BRAND.bg};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(previewText)}</div><!--<![endif]-->` : ""}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <!-- header -->
          <table role="presentation" width="100%" style="max-width:560px;">
            <tr>
              <td style="padding-bottom:24px;">
                <table role="presentation" width="100%">
                  <tr>
                    <td style="font-family:${BRAND.fontMono}; font-size:13px; color:${BRAND.muted};">
                      <span style="color:${BRAND.accent};">&gt;</span> ${BRAND.name}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- content card -->
          <table role="presentation" width="100%" style="max-width:560px; background-color:${BRAND.surface}; border:1px solid ${BRAND.border}; border-radius:${BRAND.radius};">
            <tr>
              <td style="padding:32px; font-family:${BRAND.font}; color:${BRAND.text};">
                ${body}
              </td>
            </tr>
          </table>

          <!-- footer -->
          <table role="presentation" width="100%" style="max-width:560px;">
            <tr>
              <td style="padding:24px 0 0; font-family:${BRAND.fontMono}; font-size:11px; color:${BRAND.muted}; text-align:center; line-height:1.6;">
                <p style="margin:0 0 4px;">
                  <a href="${BRAND.site}" style="color:${BRAND.accent}; text-decoration:none;">${BRAND.name}</a>
                  &nbsp;·&nbsp; Systems &amp; Software
                </p>
                <p style="margin:0;">
                  If you no longer want these emails, you can <a href="${BRAND.site}/#unsubscribe" style="color:${BRAND.muted}; text-decoration:underline;">unsubscribe</a> at any time.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function blogPostEmail({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}): { subject: string; html: string } {
  const postUrl = `${BRAND.site}/blog/${slug}/`;
  const subject = `New blog post: ${title}`;
  const desc = description || "New blog post from Damilare Osibanjo";
  const previewText = `${title} — ${desc.slice(0, 120)}`;

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="font-family:${BRAND.fontMono}; font-size:12px; color:${BRAND.muted}; padding-bottom:16px;">
          <span style="color:${BRAND.accent};">&gt;</span> new blog post
        </td>
      </tr>
      <tr>
        <td style="font-size:20px; font-weight:600; padding-bottom:12px; line-height:1.3; color:${BRAND.text};">
          ${escapeHtml(title)}
        </td>
      </tr>
      <tr>
        <td style="font-size:14px; line-height:1.6; color:${BRAND.muted}; padding-bottom:24px;">
          ${escapeHtml(desc)}
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background-color:${BRAND.accent}; border-radius:${BRAND.radius};">
                <a href="${postUrl}"
                   style="display:inline-block; padding:10px 24px; font-family:${BRAND.fontMono}; font-size:13px; font-weight:500; color:#fff; text-decoration:none; letter-spacing:0.01em;">
                  Read the post &rarr;
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top:24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BRAND.border};">
            <tr>
              <td style="padding-top:16px; font-family:${BRAND.fontMono}; font-size:12px; color:${BRAND.muted};">
                ${escapeHtml(postUrl)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return {
    subject,
    html: baseWrapper({ subject, previewText, body }),
  };
}

export function contactNotificationEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { subject: string; html: string } {
  const emailSubject = `Portfolio Contact: ${subject}`;
  const previewText = `New message from ${name} — ${subject}`;

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="font-family:${BRAND.fontMono}; font-size:12px; color:${BRAND.muted}; padding-bottom:16px;">
          <span style="color:${BRAND.accent};">&gt;</span> new contact form submission
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:20px;">
          <table role="presentation" width="100%" cellpadding="10" cellspacing="0" style="border:1px solid ${BRAND.border}; border-radius:${BRAND.radius};">
            <tr>
              <td style="font-family:${BRAND.fontMono}; font-size:12px; color:${BRAND.muted}; width:80px; vertical-align:top; white-space:nowrap;">name</td>
              <td style="font-size:14px; color:${BRAND.text};">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="font-family:${BRAND.fontMono}; font-size:12px; color:${BRAND.muted}; vertical-align:top;">email</td>
              <td style="font-size:14px; color:${BRAND.accent};">
                <a href="mailto:${escapeHtml(email)}" style="color:${BRAND.accent}; text-decoration:none;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="font-family:${BRAND.fontMono}; font-size:12px; color:${BRAND.muted}; vertical-align:top;">subject</td>
              <td style="font-size:14px; color:${BRAND.text};">${escapeHtml(subject)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:12px; font-family:${BRAND.fontMono}; font-size:11px; color:${BRAND.muted}; text-transform:uppercase; letter-spacing:0.06em;">
          message
        </td>
      </tr>
      <tr>
        <td style="font-size:14px; line-height:1.7; color:${BRAND.text}; white-space:pre-wrap;">
          ${escapeHtml(message)}
        </td>
      </tr>
    </table>
  `;

  return {
    subject: emailSubject,
    html: baseWrapper({ subject: emailSubject, previewText, body }),
  };
}

export { escapeHtml };

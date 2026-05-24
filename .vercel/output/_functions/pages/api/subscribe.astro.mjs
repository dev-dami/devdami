import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

async function POST({ request }) {
  try {
    const { email } = await request.json();
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!undefined                              ) {
      console.log("Newsletter subscription (no API key configured):", { email });
      return new Response(
        JSON.stringify({
          success: true,
          message: "Subscribed (demo mode — no API key configured)"
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    const resend = new Resend(undefined                              );
    const { data, error } = await resend.contacts.create({
      email,
      audienceId: undefined                                   || ""
    });
    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to subscribe" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ success: true, data }),
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

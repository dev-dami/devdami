import { ImageResponse } from '@vercel/og';
import React__default from 'react';
export { renderers } from '../../renderers.mjs';

const h = React__default.createElement;
async function GET({ request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Damilare Osibanjo";
  const tagsParam = url.searchParams.get("tags");
  const tags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];
  return new ImageResponse(
    h("div", {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#080808",
        fontFamily: "JetBrains Mono, monospace"
      },
      children: [
        // Accent bar at top
        h("div", {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(to right, #10b981, #34d399)"
          }
        }),
        // Decorative grid
        h("div", {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }
        }),
        // Content
        h("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            position: "relative"
          },
          children: [
            // Domain badge
            h("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24
              },
              children: [
                h("div", {
                  style: {
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10b981"
                  }
                }),
                h("span", {
                  style: {
                    fontSize: 20,
                    color: "#10b981",
                    letterSpacing: "0.1em",
                    fontWeight: 500
                  },
                  children: "devdami.varityweb.com"
                })
              ]
            }),
            // Title
            h("h1", {
              style: {
                fontSize: 52,
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.25,
                margin: 0,
                marginBottom: tags.length > 0 ? 24 : 32,
                letterSpacing: "-0.01em"
              },
              children: title
            }),
            // Tags
            tags.length > 0 && h("div", {
              style: {
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 32
              },
              children: tags.map(
                (tag) => h("span", {
                  key: tag,
                  style: {
                    padding: "6px 14px",
                    fontSize: 18,
                    color: "#d4d4d4",
                    background: "#0f0f0f",
                    border: "1px solid #1e1e1e",
                    borderRadius: 4
                  },
                  children: tag
                })
              )
            }),
            // Author
            h("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 20,
                color: "#d4d4d4"
              },
              children: [
                h("span", { children: "Damilare Osibanjo" }),
                h("span", { style: { color: "#1e1e1e" }, children: "·" }),
                h("span", {
                  style: { color: "#10b981" },
                  children: "Systems & Software Programmer"
                })
              ]
            })
          ]
        }),
        // Corner accent
        h("div", {
          style: {
            position: "absolute",
            bottom: 40,
            right: 80,
            width: 80,
            height: 80,
            border: "2px solid #10b981",
            borderRadius: 12,
            opacity: 0.15
          }
        })
      ]
    }),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  );
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

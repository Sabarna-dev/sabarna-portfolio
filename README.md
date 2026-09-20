# Sabarna Das portfolio

A production-minded portfolio built with Next.js, TypeScript, and a server-side contact route.

## Direction

The experience is a developer atelier: editorial typography, warm paper, near-black ink, and acid-lime signals. It makes the work feel like a system in motion instead of a collection of generic cards.

The site is organized around a concise introduction, selected work, practical capabilities, a personal point of view, and a direct contact path. `lib/content.ts` holds the profile and project content so it stays easy to update.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact delivery

The form validates input with Zod, includes a hidden honeypot, and rate-limits repeated requests in a single server instance. To activate delivery:

1. Copy `.env.example` to `.env.local`.
2. Create a Resend account and API key, then verify a sending domain.
3. Fill in `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`.

For a high-traffic deployment, replace the in-memory limiter in `app/api/contact/route.ts` with a shared store such as Upstash Redis.

## Deploy

1. Create a GitHub repository and push this folder.
2. Import the repository into Vercel.
3. Add the three contact environment variables in the Vercel project settings.
4. Update `https://sabarna.dev` in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and `app/page.tsx` when the final domain is chosen.

## Personalize before launch

- Add real screenshots or a walkthrough video to the CodeGPM project entry.
- Add individual project case-study pages as the work grows.

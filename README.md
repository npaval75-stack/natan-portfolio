# Natanael Paval — Portfolio

Graphic design portfolio at [natanpaval.dev](https://natanpaval.dev). Built with Next.js, React, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and add your Resend API key. Do not commit `.env.local`.

## Production environment

Set these on Vercel (Project → Settings → Environment Variables):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend secret. Never commit this value. |
| `SENDER_EMAIL` | Verified from-address. Expected: `hello@natanpaval.dev` |
| `CONTACT_EMAIL` | Inbox that receives form submissions. Expected: `npaval75@gmail.com` |

If `SENDER_EMAIL` or `CONTACT_EMAIL` are omitted, the API uses those same defaults. The form stays offline until `RESEND_API_KEY` is set.

## Scripts

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

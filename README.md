# NextPro Blog

NextPro Blog is a Next.js 16 app backed by Convex and Better Auth. It currently includes a shared marketing layout, blog routes, theme switching, and email/password authentication wired through Convex.

## Stack

- Next.js 16 App Router
- React 19
- Convex
- Better Auth with `@convex-dev/better-auth`
- Tailwind CSS 4
- shadcn/ui, Radix UI, Sonner
- React Hook Form and Zod

## Current Routes

- `/` home page in the shared layout
- `/blog` blog listing page
- `/blog/[blogid]` individual blog page
- `/auth/login` login form
- `/auth/signup` signup form

## Environment Variables

Create a root `.env.local` file with the values required by Next.js and Convex:

```env
CONVEX_DEPLOYMENT=your-dev-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-project.convex.site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SITE_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
```

Notes:

- `BETTER_AUTH_SECRET` must be set locally and in your Convex deployment env.
- `SITE_URL` is used by the server-side Better Auth config.
- `NEXT_PUBLIC_*` values are used by the browser-facing app.

To set Convex deployment variables:

```bash
npx convex env set BETTER_AUTH_SECRET "your-secret"
npx convex env set SITE_URL "http://localhost:3000"
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the Next.js app:

```bash
npm run dev
```

Run Convex in a separate terminal:

```bash
npx convex dev
```

Open `http://localhost:3000`.

## Auth Notes

- Auth routes are served from `app/api/auth/[...all]/route.ts`.
- Client auth state is provided through `components/web/ConvexClientProvider.tsx`.
- Login and signup forms use Zod schemas from `app/schema/auth.ts`.

## Project Structure

```txt
app/
  (shared-layout)/
  api/auth/[...all]/
  auth/login/
  auth/signup/
  schema/
components/
  ui/
  web/
convex/
lib/
```

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npx convex dev
```

## Important Note For Contributors

This project uses Next.js 16. Before making framework-level changes, read the relevant guide in `node_modules/next/dist/docs/` because this version has breaking changes compared with older Next.js releases.


# Audit King — Complete Package

This repo contains a complete, deployable app:
- Vite + React + Tailwind frontend (full single-file UI at `src/ui/App.tsx`)
- Supabase auth (email/password + magic link)
- Admin-secure serverless API routes (`/api/*`) for user management
- Minimal SQL for `profiles` admin checks (`supabase.sql`)
- Local-first data for templates/inspections/actions so it works out of the box

## Run locally
```
npm i
cp .env.example .env   # and fill in your keys (optional; app works locally without auth)
npm run dev
```

## Deploy to Vercel
- Push this folder to a new GitHub repo
- Import to Vercel
- Set Environment Variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE` (required for /api)
- Build: `vite build`
- Output: `dist`

## Supabase
Run `supabase.sql` in Supabase SQL editor (creates `profiles` with `is_admin` & `is_banned`). After you log in once, insert your user_id as admin.

## Notes
- Frontend currently stores Templates/Inspections/Actions in local storage for instant usability. You can wire these to Supabase tables later.
- Print a report from the Inspections list → Report → browser Print to save as PDF.

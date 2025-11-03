
import type { VercelRequest, VercelResponse } from '@vercel/node'
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const role = process.env.SUPABASE_SERVICE_ROLE
  res.status(200).json({ ok: true, hasUrl: !!url, hasServiceRole: !!role })
}


import { createClient } from '@supabase/supabase-js'

export function serverClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE
  if (!url) throw new Error('Missing SUPABASE_URL or VITE_SUPABASE_URL')
  if (!key) throw new Error('Missing SUPABASE_SERVICE_ROLE')
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function requireAdmin(req: Request) {
  try {
    const auth = req.headers.get('authorization') || ''
    const m = auth.match(/^Bearer\s+(.+)$/i)
    if (!m) return { ok: false as const, status: 401, error: 'Missing bearer token' as const }
    const accessToken = m[1]
    const srv = serverClient()

    const { data: userData, error: userErr } = await srv.auth.getUser(accessToken)
    if (userErr || !userData?.user) return { ok: false as const, status: 401, error: 'Invalid token' as const }

    const uid = userData.user.id
    const { data: prof, error: profErr } = await srv
      .from('profiles')
      .select('is_admin,is_banned')
      .eq('user_id', uid)
      .maybeSingle()

    if (profErr) return { ok: false as const, status: 500, error: `Profile lookup failed: ${profErr.message}` as const }
    if (!prof?.is_admin) return { ok: false as const, status: 403, error: 'Admin only' as const }
    if (prof?.is_banned) return { ok: false as const, status: 403, error: 'Banned user' as const }

    return { ok: true as const, uid }
  } catch (e:any) {
    return { ok: false as const, status: 500, error: e?.message || 'Server error' as const }
  }
}


import type { VercelRequest, VercelResponse } from '@vercel/node'
import { serverClient, requireAdmin } from './_lib'
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const r = await requireAdmin(new Request('http://x', { headers: { authorization: (req.headers.authorization as any) || '' } }))
  if (!r.ok) return res.status(r.status).json({ error: r.error })
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const user_id = body.user_id
    if (!user_id) return res.status(400).json({ error: 'user_id required' })
    const srv = serverClient()
    const { error } = await srv.auth.admin.deleteUser(user_id)
    if (error) return res.status(500).json({ error: `admin.deleteUser failed: ${error.message}` })
    return res.json({ deleted: true })
  } catch (e:any) { return res.status(500).json({ error: e?.message || 'Server error' }) }
}

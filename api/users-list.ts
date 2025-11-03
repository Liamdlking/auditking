
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { serverClient, requireAdmin } from './_lib'
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const r = await requireAdmin(new Request('http://x', { headers: { authorization: (req.headers.authorization as any) || '' } }))
  if (!r.ok) return res.status(r.status).json({ error: r.error })
  try {
    const srv = serverClient()
    const page = Number(req.query.page || 1)
    const perPage = Number(req.query.perPage || 50)
    const { data, error } = await srv.auth.admin.listUsers({ page, perPage })
    if (error) return res.status(500).json({ error: `admin.listUsers failed: ${error.message}` })
    return res.json({ users: data.users })
  } catch (e:any) { return res.status(500).json({ error: e?.message || 'Server error' }) }
}

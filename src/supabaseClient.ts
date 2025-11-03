
import { createClient } from '@supabase/supabase-js'
const url = (import.meta as any).env?.VITE_SUPABASE_URL as string
const anon = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string
export const supabase = (url && anon) ? createClient(url, anon) : null
;(window as any).supabase = supabase

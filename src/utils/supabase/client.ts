import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://dummy.supabase.co',  // Dummy URL
    'dummy-key'  // Dummy key
  )
}
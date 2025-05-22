import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  // Default redirect
  const redirectTo = new URL('/', request.url)

  const supabase = await createClient()

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (error) {
      redirectTo.pathname = '/error'
      return NextResponse.redirect(redirectTo)
    }
  }

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      redirectTo.pathname = '/error'
      return NextResponse.redirect(redirectTo)
    }

    const user = data?.user
    if (!user) {
      redirectTo.pathname = '/error'
      return NextResponse.redirect(redirectTo)
    }

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile?.full_name || !profile?.role) {
      redirectTo.pathname = '/setup'
    } else {
      if (profile.role==="admin") redirectTo.pathname = '/admin/dashboard'
      else if (profile.role==="data_provider") redirectTo.pathname = '/provider-landing'
        //else if (profile.role==="contributor") redirectTo.pathname = '/contributor/dashboard'
      else redirectTo.pathname = '/'
    }

    return NextResponse.redirect(redirectTo)
  }

  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}

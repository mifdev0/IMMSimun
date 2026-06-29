import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (email === adminEmail && password === adminPassword) {
    return NextResponse.json({ success: true, user: { email, role: 'super_admin' } })
  }

  return NextResponse.json({ success: false, message: 'Email atau password salah' }, { status: 401 })
}

import { createSession } from '@/lib/session'
import { useLogin } from '@/models/User/useLogin'
import { LoginFormData } from '@/types/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body: LoginFormData = await req.json()

    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: 'Usuário e palavra-passe são obrigatórios' },
        { status: 400 },
      )
    }

    const data = await useLogin(body)

    if (data.id) {
      await createSession(data.id)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    )
  }
}

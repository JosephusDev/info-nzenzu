import { createSession } from '@/app/lib/session'
import { loginSchema } from '@/types/schema'
import { useLogin } from '@/useCases/User/useLogin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body: loginSchema = await req.json()

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
    return NextResponse.json({ error: error }, { status: 404 })
  }
}

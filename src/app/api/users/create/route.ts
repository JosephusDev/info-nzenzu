import { userSchema } from '@/types/schema'
import { useCreateUser } from '@/useCases/User/useCreateUser'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const body: z.infer<typeof userSchema> = await req.json()

    if (!body) {
      return NextResponse.json(
        { error: 'Dados de usuário inválidos' },
        { status: 400 },
      )
    }

    const data = await useCreateUser(body)

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error }, { status: 404 })
  }
}

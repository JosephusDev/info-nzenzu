import { NextResponse } from 'next/server'
import { updateUser } from '@/models/User/useUpdateUser'
import { verifySession } from '@/lib/dal'
import { User } from '@prisma/client'
import { createUser } from '@/models/User/useCreateUser'

export async function POST(request: Request) {
  try {
    const body: User = await request.json()

    const user = await createUser(body)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { isAuth, userId } = await verifySession()

    if (!isAuth) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { id, data } = body

    if (id !== userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const user = await updateUser({ id, data })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' },
      { status: 500 },
    )
  }
}

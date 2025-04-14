import { NextResponse } from 'next/server'
import { updateUser } from '@/models/User/useUpdateUser'
import { verifySession } from '@/lib/dal'
import { User } from '@prisma/client'
import { createUser } from '@/models/User/useCreateUser'
import { deleteUser } from '@/models/User/useDeleteUser'
import { revalidateUsers } from '@/models/User/useFetchUsers'
export async function POST(request: Request) {
  try {
    const body: User = await request.json()

    const user = await createUser(body)
    await revalidateUsers()
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
    await revalidateUsers()
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { isAuth, userId } = await verifySession()

    if (!isAuth) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const user = await deleteUser(id)
    await revalidateUsers()
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

import { NextResponse } from 'next/server'
import { updateUser } from '@/models/User/useUpdateUser'
import { verifySession } from '@/lib/dal'
import { revalidateUsers } from '@/models/User/useFetchUsers'

export async function POST(request: Request) {
  try {
    const { isAuth, userId } = await verifySession()

    if (!isAuth) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { id } = body

    const user = await updateUser({
      id,
      data: { level: 'ADMIN' },
    })

    await revalidateUsers()

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao promover usuário' },
      { status: 500 },
    )
  }
}

import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export async function useUpdateLevelUser({
  id,
  data,
}: { id: string; data: Pick<User, 'level'> }) {
  try {
    const user = await prisma.user.update({
      data,
      where: {
        id,
      },
    })
    return user
  } catch (error) {
    throw new Error('Error creating user')
  }
}

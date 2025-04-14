import { User } from '@prisma/client'
import prisma from '@/lib/prisma'
import { revalidateTag, unstable_cache } from 'next/cache'
import { verifySession } from '@/lib/dal'

export async function useFetchUsers(): Promise<User[]> {
  const { userId } = await verifySession()
  const users = await unstable_cache(
    async () => {
      return await prisma.user.findMany({
        where: {
          level: {
            equals: 'USER',
          },
          id: {
            not: userId,
          },
        },
        orderBy: {
          name: 'asc',
        },
      })
    },
    [`get-users-${userId}`],
    {
      tags: [`get-users-${userId}`],
      revalidate: false,
    },
  )()
  return users
}

export async function revalidateUsers() {
  const { userId } = await verifySession()
  revalidateTag(`get-users-${userId}`)
}

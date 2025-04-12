import { User } from '@prisma/client'
import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export async function useFetchUsers(): Promise<User[]> {
  const users = await unstable_cache(
    async () => {
      return await prisma.user.findMany({
        orderBy: {
          name: 'asc',
        },
      })
    },
    ['get-users'],
    {
      tags: ['get-users'],
      revalidate: false,
    },
  )()
  return users
}

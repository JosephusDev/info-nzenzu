import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export async function useFetchUsers() {
  const users = await unstable_cache(
    async () => {
      return await prisma.user.findMany()
    },
    ['get-users'],
    {
      tags: ['get-users'],
      revalidate: false,
    },
  )()
  return users
}

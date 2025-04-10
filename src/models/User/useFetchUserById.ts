import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export async function getUser({ userId }: { userId: string }) {
  const user = await unstable_cache(
    async () => {
      return await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
    },
    ['get-user'],
    {
      tags: ['get-user'],
      revalidate: false,
    },
  )()

  return user
}

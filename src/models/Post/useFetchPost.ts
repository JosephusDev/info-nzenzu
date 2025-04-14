import prisma from '@/lib/prisma'
import { revalidateTag, unstable_cache } from 'next/cache'

export async function getUniquePost({ id }: { id: string }) {
  const posts = await unstable_cache(
    async () => {
      return prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              name: true,
              avatarImage: true,
            },
          },
        },
      })
    },
    [`post-${id}`],
    {
      tags: ['post'],
      revalidate: false,
    },
  )()
  return posts
}

export async function revalidatePost({ id }: { id: string }) {
  revalidateTag(`post-${id}`)
}

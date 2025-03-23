import prisma from '@/lib/prisma'

export async function useFetchPost({ id }: { id: string }) {
  const posts = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })
  return posts
}

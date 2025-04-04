import prisma from '@/lib/prisma'

export async function getUniquePost({ id }: { id: string }) {
  const posts = await prisma.post.findUnique({
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
  return posts
}

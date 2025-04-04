import prisma from '@/lib/prisma'

export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,
          avatarImage: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })
  return posts
}

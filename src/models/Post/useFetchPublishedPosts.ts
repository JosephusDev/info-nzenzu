import prisma from '@/lib/prisma'

interface getPostProps {
  skip?: number
  limit?: number
  search?: string
}

export async function getPublishedPosts({
  limit = 6,
  skip = 1,
  search = '',
}: getPostProps) {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,
          avatarImage: true,
        },
      },
    },
    where: {
      title: {
        contains: search,
        mode: 'insensitive',
      },
      published: true,
    },
    orderBy: {
      created_at: 'desc',
    },
    skip,
    take: limit,
  })
  return posts
}

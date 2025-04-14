import prisma from '@/lib/prisma'

interface getPostProps {
  skip?: number
  limit?: number
  search?: string
}

export async function getPosts({
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
    },
    orderBy: {
      title: 'asc',
    },
    skip,
    take: limit,
  })
  const totalPosts = await prisma.post.count()
  return { posts, totalPosts }
}

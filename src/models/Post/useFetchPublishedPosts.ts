import prisma from '@/lib/prisma'
import { revalidateTag, unstable_cache } from 'next/cache'

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
  const posts = await unstable_cache(
    async () => {
      return prisma.post.findMany({
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
    },
    [`posts-published-${skip}-${limit}-${search}`],
    {
      tags: ['posts-published'],
      revalidate: false, // Não revalidar automaticamente, apenas quando invocado
    },
  )()

  return posts
}

// Função para revalidar o cache
export async function revalidatePublishedPosts() {
  revalidateTag('posts-published')
}

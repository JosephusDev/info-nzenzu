import prisma from '@/lib/prisma'
import type { Post } from '@prisma/client'

interface UpdatePostParams {
  id: string
  data: Partial<Post>
}

export async function updatePost({ id, data }: UpdatePostParams) {
  try {
    const post = await prisma.post.update({
      data,
      where: {
        id,
      },
    })
    return post
  } catch (error) {
    throw new Error('Error updating post')
  }
}

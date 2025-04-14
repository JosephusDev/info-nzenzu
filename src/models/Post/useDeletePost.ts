import prisma from '@/lib/prisma'
import { deleteImage } from '@/hooks/use-supabase-delete'

export async function deletePost({ id }: { id: string }) {
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    })
    if (post.image) {
      await deleteImage(post.image, 'posts')
    }
    return post
  } catch (error) {
    throw new Error('Error deleting post')
  }
}

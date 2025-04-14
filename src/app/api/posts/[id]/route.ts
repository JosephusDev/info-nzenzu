import { updatePost } from '@/models/Post/useUpdatePost'
import { deletePost } from '@/models/Post/useDeletePost'
import { type NextRequest, NextResponse } from 'next/server'
import { revalidatePublishedPosts } from '@/models/Post/useFetchPublishedPosts'
import { revalidatePost } from '@/models/Post/useFetchPost'
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json()
    const post = await updatePost({ id: params.id, data: body })
    await revalidatePublishedPosts()
    await revalidatePost({ id: params.id })
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await deletePost({ id: params.id })
    await revalidatePublishedPosts()
    await revalidatePost({ id: params.id })
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

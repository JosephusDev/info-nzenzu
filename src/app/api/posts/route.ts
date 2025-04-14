import { getPosts } from '@/models/Post/useFetchPosts'
import { type NextRequest, NextResponse } from 'next/server'
import { useCreatePost } from '@/models/Post/useCreatePost'
import { revalidatePublishedPosts } from '@/models/Post/useFetchPublishedPosts'
import { verifySession } from '@/lib/dal'
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 6)
  const search = searchParams.get('search') || ''

  const skip = (page - 1) * limit

  try {
    const data = await getPosts({ limit, search, skip })

    if (!data) {
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 404 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await verifySession()
    const body = await req.json()
    console.log(body)
    const post = await useCreatePost({ ...body, userId })
    await revalidatePublishedPosts()
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

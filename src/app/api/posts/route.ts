import { getPosts } from '@/useCases/Post/useFetchPosts'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const data = await getPosts()

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

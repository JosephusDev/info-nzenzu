import { type NextRequest, NextResponse } from 'next/server'
import { getPublishedPosts } from '@/models/Post/useFetchPublishedPosts'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 6)
  const search = searchParams.get('search') || ''

  const skip = (page - 1) * limit

  try {
    const data = await getPublishedPosts({ limit, search, skip })

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

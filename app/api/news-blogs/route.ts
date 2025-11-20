import { NextResponse } from 'next/server'
import { getNewsBlogs } from '@/lib/wordpress'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '10')
    const type = searchParams.get('type') as 'news' | 'blogs' | undefined

    const result = await getNewsBlogs({ page, perPage, type })

    return NextResponse.json(result)
  } catch (error) {
    console.error('News/Blogs API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch news/blogs',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
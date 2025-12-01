import { NextResponse } from 'next/server'
import { getNewsBlogs } from '@/lib/wordpress'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '10')
    const type = searchParams.get('type') as 'news' | 'blogs' | undefined

    const result = await getNewsBlogs({ page, perPage, type })

    // 添加CORS头以支持跨域请求
    const origin = request.headers.get('origin')
    const headers = new Headers()
    
    // 允许的源（可以根据需要调整）
    if (origin) {
      headers.set('Access-Control-Allow-Origin', origin)
    } else {
      headers.set('Access-Control-Allow-Origin', '*')
    }
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type')
    headers.set('Access-Control-Max-Age', '86400')

    return NextResponse.json(result, { headers })
  } catch (error) {
    console.error('News/Blogs API error:', error)
    
    // 错误响应也需要CORS头
    const origin = request.headers.get('origin')
    const headers = new Headers()
    if (origin) {
      headers.set('Access-Control-Allow-Origin', origin)
    } else {
      headers.set('Access-Control-Allow-Origin', '*')
    }
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type')
    
    return NextResponse.json(
      {
        error: 'Failed to fetch news/blogs',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers }
    )
  }
}

// 处理OPTIONS预检请求
export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin')
  const headers = new Headers()
  
  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin)
  } else {
    headers.set('Access-Control-Allow-Origin', '*')
  }
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type')
  headers.set('Access-Control-Max-Age', '86400')
  
  return new NextResponse(null, { status: 200, headers })
}
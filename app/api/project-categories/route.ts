import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    return NextResponse.json(
      { error: 'WordPress API URL not configured' },
      { status: 500 }
    )
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const perPage = searchParams.get('per_page') || '100'

    const apiUrl = `${wpApiUrl}/wp-json/wp/v2/project_category?per_page=${perPage}`

    const res = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `WordPress API error: ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project categories' },
      { status: 500 }
    )
  }
}


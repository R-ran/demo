import { NextResponse } from 'next/server'

export async function GET() {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!wpApiUrl) {
    return NextResponse.json({
      success: false,
      error: 'NEXT_PUBLIC_WORDPRESS_API_URL 环境变量未设置',
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV,
      }
    }, { status: 500 })
  }

  const testResults = {
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
    api_url: wpApiUrl,
    tests: []
  }

  // 测试1: 基础连通性测试
  try {
    const baseUrl = `${wpApiUrl}/wp-json/`
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Next.js-WordPress-Test',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000) // 10秒超时
    })

    testResults.tests.push({
      name: '基础连通性测试',
      url: baseUrl,
      status: response.status,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
      success: response.ok
    })
  } catch (error) {
    testResults.tests.push({
      name: '基础连通性测试',
      url: `${wpApiUrl}/wp-json/`,
      error: error instanceof Error ? error.message : '未知错误',
      success: false
    })
  }

  // 测试2: 成功案例API测试
  try {
    const projectsUrl = `${wpApiUrl}/wp-json/wp/v2/successful_project?per_page=5&_embed&status=publish`
    const response = await fetch(projectsUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Next.js-WordPress-Test',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(10000)
    })

    let data = null
    if (response.ok) {
      data = await response.json()
    }

    testResults.tests.push({
      name: '成功案例API测试',
      url: projectsUrl,
      status: response.status,
      ok: response.ok,
      count: Array.isArray(data) ? data.length : 0,
      headers: Object.fromEntries(response.headers.entries()),
      success: response.ok,
      sample_data: Array.isArray(data) && data.length > 0 ? {
        title: data[0].title?.rendered,
        id: data[0].id,
        slug: data[0].slug,
        has_featured_media: !!data[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url,
        has_categories: !!(data[0]._embedded?.['wp:term']?.[0]?.length > 0)
      } : null
    })
  } catch (error) {
    testResults.tests.push({
      name: '成功案例API测试',
      url: `${wpApiUrl}/wp-json/wp/v2/successful_project?per_page=5`,
      error: error instanceof Error ? error.message : '未知错误',
      success: false
    })
  }

  // 测试3: 分类API测试
  try {
    const categoriesUrl = `${wpApiUrl}/wp-json/wp/v2/project_category?per_page=10`
    const response = await fetch(categoriesUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Next.js-WordPress-Test',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000)
    })

    let data = null
    if (response.ok) {
      data = await response.json()
    }

    testResults.tests.push({
      name: '项目分类API测试',
      url: categoriesUrl,
      status: response.status,
      ok: response.ok,
      count: Array.isArray(data) ? data.length : 0,
      success: response.ok,
      sample_categories: Array.isArray(data) ? data.slice(0, 3).map((cat: any) => ({
        name: cat.name,
        slug: cat.slug,
        count: cat.count
      })) : null
    })
  } catch (error) {
    testResults.tests.push({
      name: '项目分类API测试',
      url: `${wpApiUrl}/wp-json/wp/v2/project_category?per_page=10`,
      error: error instanceof Error ? error.message : '未知错误',
      success: false
    })
  }

  // 计算总体结果
  const successCount = testResults.tests.filter(test => test.success).length
  const overallSuccess = successCount === testResults.tests.length

  return NextResponse.json({
    success: overallSuccess,
    timestamp: new Date().toISOString(),
    summary: {
      total_tests: testResults.tests.length,
      successful_tests: successCount,
      failed_tests: testResults.tests.length - successCount,
      overall_status: overallSuccess ? '✅ 所有测试通过' : '❌ 部分测试失败'
    },
    ...testResults
  }, {
    status: overallSuccess ? 200 : 500
  })
}
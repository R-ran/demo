import { MetadataRoute } from 'next'
import { getAboutSections } from '@/lib/wordpress'
import { getProjects } from '@/lib/wordpress'

// 标记为动态路由，允许在运行时获取数据
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cnxhanchor.com'
  
  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/successful-projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news-blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // 动态页面 - About sections
  let aboutPages: MetadataRoute.Sitemap = []
  try {
    const sections = await getAboutSections()
    aboutPages = sections.map((section) => ({
      url: `${baseUrl}/about?section=${section.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching about sections for sitemap:', error)
  }

  // 动态页面 - Projects
  let projectPages: MetadataRoute.Sitemap = []
  try {
    const projects = await getProjects()
    projectPages = projects
      .filter((project) => project.slug) // 过滤掉没有slug的项目
      .map((project) => ({
        url: `${baseUrl}/successful-projects/${project.category?.slug || 'default'}/${project.slug}`,
        lastModified: project.modified ? new Date(project.modified) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  return [...staticPages, ...aboutPages, ...projectPages]
}


import { MetadataRoute } from 'next'
import { getAboutSections, getProjects } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://cnxhanchor.com').replace(/\/$/, '')

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/successful-projects`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/news-blogs`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  let aboutPages: MetadataRoute.Sitemap = []
  try {
    const sections = await getAboutSections()
    aboutPages = sections.map((section) => ({
      url: `${baseUrl}/about?section=${section.id}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch (e) {
    console.error('Error fetching about sections for sitemap:', e)
  }

  let projectPages: MetadataRoute.Sitemap = []
  try {
    const projects = await getProjects()
    projectPages = projects
      .filter((p) => p.slug && !p.slug.includes('default'))
      .map((p) => ({
        url: `${baseUrl}/successful-projects/${p.category?.slug || 'default'}/${p.slug}`,
        lastModified: p.modified ? new Date(p.modified) : undefined,
        changeFrequency: 'monthly',
        priority: 0.6,
      }))
  } catch (e) {
    console.error('Error fetching projects for sitemap:', e)
  }

  return [...staticPages, ...aboutPages, ...projectPages]
}

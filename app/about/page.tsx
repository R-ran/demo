// 改为动态渲染，确保 WordPress 更新能及时显示
export const dynamic = 'force-dynamic'

import { Metadata } from "next"
import AboutPageClient from "./about-page-content"
import { getAboutSections, type AboutSection } from "@/lib/wordpress"
import { StructuredData } from "@/components/structured-data"
import { getPageTitle, getFullPageTitle } from "@/lib/page-titles"

// 从统一配置获取页面标题
const pageConfig = getPageTitle('/about')

export const metadata: Metadata = {
  title: pageConfig.title,
  description: pageConfig.description,
  keywords: pageConfig.keywords,
  openGraph: {
    title: getFullPageTitle('/about'),
    description: pageConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: getFullPageTitle('/about'),
    description: pageConfig.description,
  },
}

// 改为动态渲染，不再使用静态缓存
// export const revalidate = 3600 // 1小时重新验证

export default async function AboutPage() {
  let sections: AboutSection[] = []

  try {
    sections = await getAboutSections()
  } catch (error) {
    console.error("Failed to load sections in AboutPage:", error)
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "XINHONG",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://cnxhanchor.com",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://cnxhanchor.com"}/logo.png`,
    "description": "Leading provider of geotechnical anchoring solutions",
    "foundingDate": "2003",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN",
      "addressLocality": "Wuxi",
      "addressRegion": "Jiangsu"
    }
  }

  return (
    <>
      <StructuredData data={organizationSchema} />
      <AboutPageClient sections={sections} />
    </>
  )
}

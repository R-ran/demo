// 改为动态渲染，确保 WordPress 更新能及时显示
export const dynamic = 'force-dynamic'

import { Metadata } from "next"
import AboutPageClient from "./about-page-content"
import { getAboutSections, type AboutSection } from "@/lib/wordpress"
import { StructuredData } from "@/components/structured-data"




export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about XINHONG company, team, and state-of-the-art manufacturing facilities. Leading provider of geotechnical anchoring solutions with over 20 years of experience.",
  keywords: ["XINHONG", "about us", "company history", "manufacturing facilities", "geotechnical solutions"],
  openGraph: {
    title: "About Us | XINHONG",
    description: "Learn more about XINHONG company, team, and state-of-the-art manufacturing facilities.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | XINHONG",
    description: "Learn more about XINHONG company, team, and state-of-the-art manufacturing facilities.",
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

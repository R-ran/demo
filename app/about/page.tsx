export const dynamic = 'force-static'

import { Metadata } from "next"
import AboutPageClient from "./about-page-content"
import { getAboutSections, type AboutSection } from "@/lib/wordpress"




export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company, team, and state-of-the-art manufacturing facilities.",
}

// 允许静态生成

export const revalidate = 3600 // 1小时重新验证

export default async function AboutPage() {
  let sections: AboutSection[] = []

  try {
    sections = await getAboutSections()
  } catch (error) {
    console.error("Failed to load sections in AboutPage:", error)
  }

  return <AboutPageClient sections={sections} />
}

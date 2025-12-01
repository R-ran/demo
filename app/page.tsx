import { HeroCarousel } from "@/components/hero-carousel"
import { ProductsSection } from "@/components/products-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsBlogSection } from "@/components/news-blog-section"
import { CustomerMessagesSection } from "@/components/customer-messages-section"
import { PartnersSection } from "@/components/partners-section"
import { Footer } from "@/components/footer"
import { StickyNav } from "@/components/sticky-nav"
import { TopHeader } from "@/components/top-header"
import { Metadata } from "next"
import { getProjects, getAboutSections } from "@/lib/wordpress"

export const metadata: Metadata = {
  title: "Hollow Anchor bolt | China Manufacturer | Wuxi Xinghong SDA systems",
  description: " ISO-certified XINGHONG manufacturer is specializing in hollow anchor bolt, combination hollow core bolts, self-drilling rockbolts(SDA), expansion-shell rock bolt for global tunneling&mining projects.",
  keywords: ["hollow anchor bolt",
     "hollow core bolt",
      "self-drilling rock bolt", 
      "Expansion-shell rock bolt", 
      "self-drilling anchor bolt"],
  openGraph: {
    title: "XINHONG - Industrial Anchoring Solutions",
    description: "Leading provider of geotechnical anchoring solutions - Safer Space, Better Life",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XINHONG - Industrial Anchoring Solutions",
    description: "Leading provider of geotechnical anchoring solutions - Safer Space, Better Life",
  },
}

export default async function Home() {
  // 在服务器端获取成功案例数据
  let projects = []
  let aboutSections = []
  
  try {
    const allProjects = await getProjects()
    
    // 筛选国内项目中的两个特定项目
    const chinaProjects = allProjects.filter(project => {
      const categories = project.categories || []
      const isChinaProject = categories.some(cat => 
        cat.toLowerCase().includes('china') || 
        cat.toLowerCase().includes('国内')
      )
      
      if (!isChinaProject) return false
      
      const title = project.title
      return title.includes("Huishan Tunnel Project") || 
             title.includes("Qinghai Guanjiao Tunnel")
    })
    
    // 按指定顺序排序：先 Huishan，再 Qinghai
    const sortedChinaProjects = chinaProjects.sort((a, b) => {
      const aIsHuishan = a.title.includes("Huishan Tunnel Project")
      const bIsHuishan = b.title.includes("Huishan Tunnel Project")
      if (aIsHuishan && !bIsHuishan) return -1
      if (!aIsHuishan && bIsHuishan) return 1
      return 0
    })
    
    // 筛选海外项目
    const overseasProjects = allProjects.filter(project => {
      const categories = project.categories || []
      return categories.some(cat => 
        cat.toLowerCase().includes('overseas') || 
        cat.toLowerCase().includes('海外')
      )
    })
    
    // 取海外项目的前两个
    const selectedOverseasProjects = overseasProjects.slice(0, 2)
    
    // 组合：国内项目2个 + 海外项目2个
    projects = [
      ...sortedChinaProjects.slice(0, 2),
      ...selectedOverseasProjects
    ]
    
    // 如果找不到足够的项目，使用原始数据的前4个作为后备
    if (projects.length < 4) {
      console.warn('未找到足够的固定项目，使用默认项目')
      projects = allProjects.slice(0, 4)
    }
  } catch (error) {
    console.error('首页获取成功案例失败:', error)
    // 如果获取失败，使用空数组，组件会显示"暂无数据"
  }

  // 在服务器端获取 About Sections 数据
  try {
    aboutSections = await getAboutSections()
  } catch (error) {
    console.error('首页获取 About Sections 失败:', error)
    // 如果获取失败，使用空数组，组件会使用 fallback 数据
  }

  return (
    <main className="min-h-screen">
      <TopHeader />
      <StickyNav />
      <HeroCarousel />
      <ProductsSection />
      <TestimonialsSection projects={projects} />
      <AboutSection initialSections={aboutSections} />
      <CustomerMessagesSection />
      <NewsBlogSection />
      <PartnersSection />
      <Footer />
    </main>
  )
}

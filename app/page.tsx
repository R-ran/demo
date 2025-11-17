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
import { getProjects } from "@/lib/wordpress"

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
}

export default async function Home() {
  // 在服务器端获取成功案例数据
  let projects = []
  try {
    projects = await getProjects()
  } catch (error) {
    console.error('首页获取成功案例失败:', error)
    // 如果获取失败，使用空数组，组件会显示"暂无数据"
  }

  return (
    <main className="min-h-screen">
      <TopHeader />
      <StickyNav />
      <HeroCarousel />
      <ProductsSection />
      <TestimonialsSection projects={projects} />
      <AboutSection />
      <CustomerMessagesSection />
      <NewsBlogSection />
      <PartnersSection />
      <Footer />
    </main>
  )
}

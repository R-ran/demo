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

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopHeader />
      <StickyNav />
      <HeroCarousel />
      <ProductsSection />
      <TestimonialsSection />
      <AboutSection />
      <CustomerMessagesSection />
      <PartnersSection />
      <NewsBlogSection />
      <Footer />
    </main>
  )
}

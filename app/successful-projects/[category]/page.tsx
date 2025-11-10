"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft } from "lucide-react"

// 项目分类数据
const projectCategories: Record<string, {  title: string; subtitle: string }> = {
  "China Projects": {
    title: "China Projects",
    subtitle: "China Projects",
  },
  "Overseas Projects": {
    title: "Overseas Projects",
    subtitle: "Overseas Projects",
  },

}

// 各分类的项目数据
const projectsByCategory: Record<string, Array<{
  id: number
  title: string
  description: string
  image: string
  imageAlt: string
  slug: string
}>> = {
  ChinaProjects: [
    {
      id: 1,
      title: "The Application of Self Drilling Anchor Bolt at the Tala Hydro Project for Tunneling in Poor Rock Mass Conditions",
      description: "The Tala hydroelectric project is located in Chukha Dzongkhag in western Bhutan. The dam structure required extensive tunneling through challenging rock mass conditions. Our self-drilling anchor bolts provided reliable support during the excavation process.",
      image: "/beijing.jpg",
      imageAlt: "Tala Hydro Project tunnel supported by SINOROCK self-drilling anchor bolts",
      slug: "tala-hydro-project",
    },
    {
      id: 2,
      title: "Pre-support with Pipe Umbrella System for Gaojiaping Tunnel",
      description: "The success of the Gaojiaping Tunnel's construction demonstrates the ingenuity of Sinorock's pipe umbrella system. This innovative approach ensured safe and efficient tunnel excavation through complex geological formations.",
      image: "/sichuan.jpg",
      imageAlt: "Gaojiaping Tunnel excavation reinforced with SINOROCK pipe umbrella system",
      slug: "gaojiaping-tunnel",
    },
    {
      id: 5,
      title: "Beijing Subway Line 16 Underground Construction",
      description: "Successfully provided rock bolt solutions for the construction of Beijing Subway Line 16, ensuring structural stability in complex geological conditions.",
      image: "/beijing.jpg",
      imageAlt: "Beijing Subway Line 16 tunnel under construction with SINOROCK bolts",
      slug: "beijing-subway-line-16",
    },
  ],
  "Overseas Projects": [
    {
      id: 3,
      title: "Foundation Reinforcement Project for High-Rise Building",
      description: "Applied advanced anchor bolt systems for foundation reinforcement in challenging soil conditions, ensuring the stability of a 50-story high-rise building in Shanghai.",
      image: "/overseas1.jpg",
      imageAlt: "Construction crew reinforcing high-rise foundation with SINOROCK anchor systems",
      slug: "high-rise-foundation",
    },
    {
      id: 6,
      title: "Sichuan Hydropower Station Foundation",
      description: "Delivered high-performance anchor systems for the underground powerhouse excavation of a major hydropower project in mountainous terrain.",
      image: "/sichuan.jpg",
      imageAlt: "Sichuan hydropower excavation stabilized by SINOROCK anchoring solutions",
      slug: "sichuan-hydropower-foundation",
    },
  ],
 
}

export default function CategoryProjectsPage({ params }: { params: { category: string } }) {
  const category = params?.category || ""
  const categoryInfo = projectCategories[category]
  const projects = projectsByCategory[category] || []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <Link href="/successful-projects">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-4">
          <div className="text-muted-foreground text-sm">
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt;{" "}
            <Link href="/successful-projects" className="hover:text-primary">Project</Link> &gt;{" "}
            {categoryInfo.title}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 mb-16">
          {/* Category Header */}
          <div className="mb-8 bg-muted/30 py-8 px-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/successful-projects">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="text-primary">{categoryInfo.title}</span>
                </h1>
                <p className="text-muted-foreground">{categoryInfo.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Project Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link key={project.id} href={`/successful-projects/${category}/${project.slug}`}>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all bg-white h-full">
                  <CardContent className="p-0">
                    {/* Image Section */}
                    <div className="relative w-full h-64 overflow-hidden bg-muted">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.imageAlt || project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Text Section */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        View More <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


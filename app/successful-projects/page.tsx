"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

// 项目分类数据
const projectCategories = [
  {
    id: "China Projects",
    title: "China Projects",
    subtitle: "China Projects",
    href: "/successful-projects/china",
  },
  {
    id: "Overseas Projects",
    title: "Overseas Projects",
    subtitle: "Overseas Projects",
    href: "/successful-projects/overseas",
  },
]

// 所有项目数据
const allProjects = [
  {
    id: 1,
    title: "The Application of Self Drilling Anchor Bolt at the Tala Hydro Project for Tunneling in Poor Rock Mass Conditions",
    description: "The Tala hydroelectric project is located in Chukha Dzongkhag in western Bhutan. The dam s...",
    fullDescription: "The Tala hydroelectric project is located in Chukha Dzongkhag in western Bhutan. The dam structure required extensive tunneling through challenging rock mass conditions. Our self-drilling anchor bolts provided reliable support during the excavation process, ensuring the safety and stability of the tunnel construction. The project successfully navigated through poor rock mass conditions, demonstrating the effectiveness of our anchoring solutions in challenging geological environments.",
    image: "/beijing.jpg",
    category: "underground",
    slug: "tala-hydro-project",
    projectType: "china", // 国内项目
    location: "Chukha Dzongkhag, Bhutan",
    year: "2023",
  },
  {
    id: 2,
    title: "Pre-support with Pipe Umbrella System for Gaojiaping Tunnel",
    description: "The success of the Gaojiaping Tunnel's construction demonstrates the ingenuity of Sinoroc...",
    fullDescription: "The success of the Gaojiaping Tunnel's construction demonstrates the ingenuity of Sinorock's pipe umbrella system. This innovative approach ensured safe and efficient tunnel excavation through complex geological formations. The pipe umbrella pre-support system provided excellent ground stabilization, allowing for smooth tunnel advancement while maintaining structural integrity throughout the construction process.",
    image: "/sichuan.jpg",
    category: "underground",
    slug: "gaojiaping-tunnel",
    projectType: "china", // 国内项目
    location: "China",
    year: "2022",
  },
  {
    id: 3,
    title: "Foundation Reinforcement Project for High-Rise Building",
    description: "Applied advanced anchor bolt systems for foundation reinforcement in challenging soil conditions...",
    fullDescription: "Applied advanced anchor bolt systems for foundation reinforcement in challenging soil conditions, ensuring the stability of a 50-story high-rise building in Shanghai. The project involved extensive foundation work to support the massive structure, utilizing our high-performance anchor bolts to provide reliable load-bearing capacity in soft soil conditions.",
    image: "/overseas1.jpg",
    category: "foundation",
    slug: "high-rise-foundation",
    projectType: "overseas", // 海外项目
    location: "Shanghai, China",
    year: "2023",
  },
  {
    id: 4,
    title: "Slope Stabilization for Mountain Highway",
    description: "Successfully stabilized unstable slopes using self-drilling anchor bolts along critical highway sections...",
    fullDescription: "Successfully stabilized unstable slopes using self-drilling anchor bolts along critical highway sections, preventing landslides and ensuring road safety. The project involved extensive slope reinforcement work along a mountainous highway, where unstable rock formations posed significant risks to traffic safety. Our self-drilling anchor bolt system provided reliable slope stabilization, ensuring long-term road safety and preventing potential geological hazards.",
    image: "/overseas2.jpg",
    category: "slope-stabilization",
    slug: "mountain-highway-slope",
    projectType: "overseas", // 海外项目
    location: "Mountain Region, China",
    year: "2023",
  },
]

export default function SuccessfulProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SuccessfulProjectsPageContent />
    </Suspense>
  )
}

function SuccessfulProjectsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<typeof allProjects[0] | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const normalized = categoryParam?.toLowerCase()
    const categoryMap: Record<string, string> = {
      china: "China Projects",
      overseas: "Overseas Projects",
    }
    if (normalized && categoryMap[normalized]) {
      setSelectedCategory(categoryMap[normalized])
      setSelectedProject(null)
      setTimeout(() => {
        const navElement = document.querySelector('[data-nav-section]')
        if (navElement) {
          navElement.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
      router.replace("/successful-projects", { scroll: false })
    }
  }, [searchParams, router])

  // 根据选中的分类过滤项目
  const filteredProjects = selectedCategory
    ? allProjects.filter((project) => {
        if (selectedCategory === "China Projects") {
          return project.projectType === "china"
        } else if (selectedCategory === "Overseas Projects") {
          return project.projectType === "overseas"
        }
        return true
      })
    : allProjects

  // 处理项目卡片点击
  const handleProjectClick = (project: typeof allProjects[0], e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedProject(project)
    // 滚动到导航栏位置
    setTimeout(() => {
      const navElement = document.querySelector('[data-nav-section]')
      if (navElement) {
        navElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-4">
          <div className="text-muted-foreground text-sm">
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt; Project
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 mb-16">
          {/* Project Title Section */}
          <div className="mb-8 bg-muted/30 py-8 px-6 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-2">
                  <span className="text-primary">PROJECT</span>
                </h1>
                <p className="text-muted-foreground text-sm">
                  world's leading self drilling anchor bolt manufacturer.
                </p>
              </div>
            </div>
          </div>


{/* Project Categories Navigation */}
<div className="mb-8 bg-gray-800 rounded-lg overflow-hidden" data-nav-section>
  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-700">
    {projectCategories.map((category) => {
      const isSelected = selectedCategory === category.id
      return (
        <div
          key={category.id}
          onClick={() => {
            setSelectedCategory(category.id)
            setSelectedProject(null) // 清除选中的项目
          }}
          className={`p-6 transition-colors cursor-pointer flex flex-col items-center justify-center h-full ${
            isSelected ? "bg-primary" : "hover:bg-gray-700"
          }`}
        >
          <div className="flex items-center gap-4 mb-2">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                isSelected ? "bg-gray-800" : "bg-primary"
              }`}
            >
              {/* 你可以在这里放图标或图片 */}
            </div>
            <div className="text-center">
              <h3 className="text-white text-3xl font-bold mb-1">{category.title}</h3>
              <p className="text-white/80 text-sm">{category.subtitle}</p>
            </div>
          </div>
        </div>
      )
    })}
  </div>
</div>

          {/* Project Detail View */}
          {selectedProject ? (
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Image Section */}
                <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg">
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Section */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{selectedProject.title}</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-2">
                        <span className="font-semibold">Location:</span>
                        {selectedProject.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold">Year:</span>
                        {selectedProject.year}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold">Category:</span>
                        {selectedProject.projectType === "china" ? "China Projects" : "Overseas Projects"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>
                  <Button
                    onClick={() => setSelectedProject(null)}
                    variant="outline"
                    className="mt-6"
                  >
                    Back to Projects
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Project Listings */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={(e) => handleProjectClick(project, e)}
                  className="cursor-pointer"
                >
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all bg-white h-full">
                    <CardContent className="p-0">
                      {/* Image Section */}
                      <div className="relative w-full h-64 overflow-hidden bg-muted">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Text Section */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                          View More <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}


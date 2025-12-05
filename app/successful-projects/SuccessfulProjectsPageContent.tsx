"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { PageBanner } from "@/components/page-banner"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft } from "lucide-react"
import { type Project, type ProjectCategory } from "@/lib/wordpress"

interface Props {
  initialProjects: Project[]
  initialCategories: ProjectCategory[]
  serverError: string | null
}

export default function SuccessfulProjectsPageContent({
  initialProjects,
  initialCategories,
  serverError
}: Props) {
  // ============= 状态管理 =============
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [categories, setCategories] = useState<ProjectCategory[]>(initialCategories)
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  // ============= 服务器端错误处理 =============
  if (serverError) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <PageBanner 
          title="Successful Projects" 
          subtitle="Explore our successful projects and case studies"
          backgroundImage="/project-banner.jpg"
        />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="p-8 border border-red-500 rounded-lg">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Server Error</h2>
              <p className="text-muted-foreground">{serverError}</p>
              <Link href="/" className="inline-block mt-4">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // ============= URL参数处理 =============
  useEffect(() => {
    const projectParam = searchParams.get("project")
    const categoryParam = searchParams.get("category")

    // 如果有project参数，显示对应项目
    if (projectParam) {
      let decodedSlug = projectParam
      try {
        decodedSlug = decodeURIComponent(projectParam)
      } catch (error) {
        console.warn('无法解码项目slug:', projectParam)
      }

      const foundProject = projects.find(p => p.slug === decodedSlug)
      if (foundProject) {
        setSelectedProject(foundProject)
        // 根据项目分类设置选中的分类
        if (foundProject.categories && foundProject.categories.length > 0) {
          const categorySlug = foundProject.categories[0]
          if (categorySlug === 'china-projects') {
            setSelectedCategory('China Projects')
          } else if (categorySlug === 'overseas-projects') {
            setSelectedCategory('Overseas Projects')
          }
        }

        // 滚动到项目详情区域
        setTimeout(() => {
          const navElement = document.querySelector('[data-nav-section]')
          if (navElement) {
            navElement.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 300)
      }

      // 清除URL参数，保持URL干净
      router.replace("/successful-projects", { scroll: false })
    }
    // 处理category参数（保留原有逻辑）
    else if (categoryParam) {
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
    }
  }, [searchParams, router, projects])

  // ============= 筛选逻辑 =============
  const filteredProjects = selectedCategory
    ? projects.filter((project) => {
        if (selectedCategory === "China Projects") {
          // 只显示明确分类为china-projects的项目
          return project.categories.includes('china-projects')
        } else if (selectedCategory === "Overseas Projects") {
          // 只显示明确分类为overseas-projects的项目
          return project.categories.includes('overseas-projects')
        }
        return true
      })
    : projects

  // ============= 点击处理 =============
  const handleProjectClick = (project: Project, e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedProject(project)
    setTimeout(() => {
      const navElement = document.querySelector('[data-nav-section]')
      if (navElement) {
        navElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // ============= 主渲染 =============
  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <PageBanner 
        title="Successful Projects" 
        subtitle="Explore our successful projects and case studies"
        backgroundImage="/project-banner.jpg"
      />
      <main className="pt-12">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-4">
          <div className="text-muted-foreground text-sm">
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt; Project
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 mb-16">

          {/* Project Categories Navigation */}
          <div className="mb-8 bg-gray-800 rounded-lg overflow-hidden" data-nav-section>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-700">
              {/* 动态生成分类导航 */}
              {categories.map((category) => {
                const isSelected = selectedCategory === category.name
                return (
                  <div
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.name)
                      setSelectedProject(null)
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
                        <h3 className="text-white text-3xl font-bold mb-1">{category.name}</h3>
                        <p className="text-white/80 text-sm">{category.name}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Project Detail View */}
          {selectedProject && (
            <div className="mb-16 p-6 bg-blue-50 rounded-lg border border-blue-200">
              {/* Title Section - 标题在上面 */}
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-blue-800">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Location:</span>
                    {selectedProject.location || 'N/A'}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Year:</span>
                    {selectedProject.date || 'N/A'}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Category:</span>
                    {selectedProject.categories.join(', ') || 'General'}
                  </span>
                </div>
              </div>

              {/* Image Section - 图片在中间 */}
              <div className="mb-8 relative w-full overflow-hidden rounded-lg shadow-lg">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-auto max-h-[400px] object-cover"
                />
              </div>

              {/* Content Section - 文案内容在下面 */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Project Overview</h3>
                  <div
                    className="text-xl text-gray-700 leading-loose"
                    dangerouslySetInnerHTML={{ __html: selectedProject.content }}
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => {setSelectedProject(null);
                      setSelectedCategory(null);
                    }}
                    variant="outline"
                    className="mt-6"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                  </Button>
                  <Link href="/contact">
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                      Contact Us for Similar Projects
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Project Listings - 只在没有选中项目时显示 */}
          {!selectedProject && (
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
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"
                          }}
                        />
                      </div>

                      {/* Text Section */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.excerpt}
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
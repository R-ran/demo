"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft } from "lucide-react"
import { getProjectsByCategory, getProjectCategories, truncateExcerpt, type Project, type ProjectCategory } from "@/lib/wordpress"
import { useRouter } from "next/navigation"

// ============= 删除静态数据，只保留样式 =============

export default function CategoryProjectsPage({ params }: { params: { category: string } }) {
  const router = useRouter()
  const category = params?.category || ""
  
  // ============= 添加状态管理 =============
  const [categoryInfo, setCategoryInfo] = useState<{ title: string; subtitle: string } | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function loadData() {
      try {
        // 加载当前分类的项目
        const projectsData = await getProjectsByCategory(category)
        setProjects(projectsData)

        // 加载所有分类信息，用于显示标题和副标题
        const categoriesData = await getProjectCategories()
        const currentCategory = categoriesData.find(
          (cat) => cat.slug === category.toLowerCase().replace(/\s+/g, '-') ||
                   cat.slug === category.toLowerCase()
        )

        if (currentCategory) {
          setCategoryInfo({
            title: currentCategory.name,
            subtitle: currentCategory.name
          })
        } else {
          // 如果没有找到分类，使用默认映射
          const defaultInfo = {
            "china-projects": { title: "China Projects", subtitle: "China Projects" },
            "overseas-projects": { title: "Overseas Projects", subtitle: "Overseas Projects" },
            "china": { title: "China Projects", subtitle: "China Projects" },
            "overseas": { title: "Overseas Projects", subtitle: "Overseas Projects" },
            "China-Projects": { title: "China Projects", subtitle: "China Projects" },
            "Overseas-Projects": { title: "Overseas Projects", subtitle: "Overseas Projects" }
          }
          setCategoryInfo(defaultInfo[category as keyof typeof defaultInfo] || null)
        }
      } catch (error) {
        console.error('Failed to load category projects:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [category])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 如果分类不存在，重定向到项目列表页
  useEffect(() => {
    if (!loading && !categoryInfo) {
      router.replace("/successful-projects")
    }
  }, [loading, categoryInfo, router])

  // 在重定向过程中显示加载状态
  if (!categoryInfo && !loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  // ============= 你的原有JSX，100%不变 =============
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
              <Link key={project.id} href={`/successful-projects/${project.slug}`}>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all bg-white h-full">
                  <CardContent className="p-0">
                    {/* Image Section */}
                    <div className="relative w-full h-64 overflow-hidden bg-muted">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.imageAlt || project.title}
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
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {truncateExcerpt(project.excerpt, 120)}
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
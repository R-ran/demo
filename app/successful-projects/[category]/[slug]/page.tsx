"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getProjectBySlug, getProjectCategories, type Project, type ProjectCategory } from "@/lib/wordpress"
import { notFound, useParams } from "next/navigation"

// ============= 删除所有静态数据 =============

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const category = params?.category as string // 虽然不使用，但保留用于路由匹配
  
  // ============= 添加状态管理 =============
  const [project, setProject] = useState<Project | null>(null)
  const [categories, setCategories] = useState<ProjectCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // ============= 加载WordPress数据 =============
  useEffect(() => {
    async function loadData() {
      if (!slug) {
        console.error('Slug 参数为空')
        setLoading(false)
        return
      }

      console.log('开始加载项目详情，slug:', slug)
      
      try {
        const [projectData, categoriesData] = await Promise.all([
          getProjectBySlug(slug),
          getProjectCategories()
        ])
        
        console.log('项目数据加载结果:', projectData ? '找到项目' : '未找到项目')
        console.log('项目详情:', projectData)
        
        setProject(projectData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('加载项目详情失败:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [slug])

  // ============= 加载状态 =============
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading project details...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // ============= 未找到处理 =============
  if (!project && !loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">项目未找到</h1>
              <p className="text-muted-foreground mb-8">
                抱歉，找不到您要查看的项目。可能该项目已被删除或链接不正确。
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/successful-projects">
                  <Button>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    返回项目列表
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">
                    返回首页
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
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
            {project.categories.map((cat) => (
              <Link key={cat} href={`/successful-projects/${cat}`} className="hover:text-primary">
                {cat}
              </Link>
            ))} &gt; {project.title}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <Link href="/successful-projects">
                <Button variant="ghost">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
            </div>

            {/* Project Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-96 object-cover"
                onError={(e) => { 
                  (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" 
                }}
              />
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Location:</span>
                    {project.location || 'N/A'}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Year:</span>
                    {project.date || 'N/A'}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Categories:</span>
                    {project.categories.join(', ') || 'General'}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <div 
                  className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Superior strength and durability</li>
                  <li>• Corrosion-resistant materials</li>
                  <li>• Easy installation process</li>
                  <li>• Compliant with industry standards</li>
                  <li>• Proven track record in similar projects</li>
                </ul>
              </div>

              <div className="pt-6">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Contact Us for Similar Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
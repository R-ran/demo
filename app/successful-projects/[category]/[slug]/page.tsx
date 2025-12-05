"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getProjectBySlug, getProjectCategories, type Project, type ProjectCategory } from "@/lib/wordpress"
import { notFound, useParams, useRouter } from "next/navigation"

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  let slug = params?.slug as string
  const category = params?.category as string

  // 解码 URL 参数中的 slug
  if (slug) {
    try {
      slug = decodeURIComponent(slug)
    } catch (error) {
      console.warn('Unable to decode slug in URL:', slug)
    }
  }
  
  // 添加状态管理
  const [project, setProject] = useState<Project | null>(null)
  const [categories, setCategories] = useState<ProjectCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 加载 WordPress 数据
  useEffect(() => {
    async function loadData() {
      if (!slug) {
        console.error('Slug parameter is empty')
        setLoading(false)
        return
      }

      console.log('Starting to load project details, slug:', slug)
      
      try {
        const [projectData, categoriesData] = await Promise.all([
          getProjectBySlug(slug),
          getProjectCategories()
        ])
        
        console.log('Project data loading result:', projectData ? 'Project found' : 'Project not found')
        console.log('Project details:', projectData)
        
        setProject(projectData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Failed to load project details:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [slug])

  // 加载状态
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

  // 项目未找到，返回 404 页面
  if (!project) {
    notFound()
  }

  // 以下代码不应该被执行，但如果项目存在则正常渲染
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

            {/* Project Title Section */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{project.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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

            {/* Project Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-auto max-h-[600px] object-cover"
                onError={(e) => { 
                  (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" 
                }}
              />
            </div>

            {/* Project Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <div 
                  className="text-xl text-muted-foreground leading-loose whitespace-pre-line"
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

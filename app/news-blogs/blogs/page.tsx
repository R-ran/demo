"use client"

import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Calendar, PenLine, ArrowLeft } from "lucide-react"
import { useEffect, useState, Suspense } from "react"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { truncateExcerpt } from "@/lib/wordpress"
import type { NewsBlogArticle } from "@/lib/wordpress"

// 获取数据的辅助函数
async function getBlogsData() {
  try {
    // 使用相对路径避免跨域问题
    const response = await fetch('/api/news-blogs?perPage=12&type=blogs', {
      cache: 'no-store'
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result.data || []
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return []
  }
}

// truncateExcept 函数已在 wordpress.ts 中定义，这里不再重复定义

type BlogItem = {
  id: string | number
  slug: string
  title: string
  date: string
  excerpt: string
  image: string
  author?: string
  content: string
  category?: string
}

// 内部组件：处理 useSearchParams
function BlogContent() {
  const [posts, setPosts] = useState<BlogItem[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogItem | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 从 WordPress 获取 Blogs 类型文章
  useEffect(() => {
    let mounted = true

    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/news-blogs?perPage=12&type=blogs')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        const remotePosts = result.data || []

        if (!mounted || !remotePosts?.length) {
          return
        }

        // 转换数据格式以匹配你的组件
        const transformed: BlogItem[] = remotePosts.map((post: NewsBlogArticle) => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          date: post.publish_date,
          // 清理 HTML 标签
          excerpt: truncateExcerpt(post.excerpt, 150),
          image: post.featured_image || '',
          author: post.author_name,
          content: post.content,
          category: post.categories?.[0] || 'Blogs',
        }))

        setPosts(transformed)
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()

    return () => {
      mounted = false
    }
  }, [])

  // 处理 URL 参数选中文章
  useEffect(() => {
    const articleSlug = searchParams.get("article")
    if (!articleSlug) return

    const found = posts.find((post) => String(post.slug) === articleSlug)
    if (found) {
      setSelectedPost(found)
      router.replace("/news-blogs/blogs", { scroll: false })
    }
  }, [searchParams, posts, router])

  
  
  return (
    <>
      <div className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="ml-4 text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : selectedPost ? (
          <div className="rounded-2xl border bg-card shadow-sm">
            <div className="flex flex-col gap-10 p-6 lg:p-10">
              {/* 标题部分 - 最上面 */}
              <div className="space-y-4">
                {selectedPost.category && (
                  <span className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded">
                    {selectedPost.category}
                  </span>
                )}
                <h2 className="text-4xl font-bold text-balance">
                  {selectedPost.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedPost.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {selectedPost.author && (
                    <span className="flex items-center gap-2">
                      <PenLine className="h-4 w-4" />
                      {selectedPost.author}
                    </span>
                  )}
                </div>
              </div>

              {/* 图片部分 - 中间 */}
              <div className="w-full">
                <div className="relative w-full overflow-hidden rounded-xl bg-muted aspect-[16/9]">
                  <Image
                    src={selectedPost.image || "/placeholder.svg"}
                    alt={selectedPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* 内容部分 - 最下面 */}
              <div className="space-y-6">
                <div
                  className="prose prose-2xl max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  style={{ lineHeight: "1.8" }}
                />

                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" onClick={() => setSelectedPost(null)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to list
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded">
                    {post.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 text-balance">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 text-pretty line-clamp-3">
                    {truncateExcerpt(post.excerpt, 150)}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => setSelectedPost(post)}
                  >
                    View More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

// 外部组件：包装 Suspense
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12">
        <div className="container mx-auto px-4 mb-4">
          <div className="text-muted-foreground text-sm">
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt; News & Blogs &gt; Blogs
          </div>
        </div>

        <div className="container mx-auto px-4 mb-8">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-foreground">BLOGS</span>
          </h1>
          <div className="w-20 h-1 bg-primary" />
          <p className="text-lg text-muted-foreground mt-4">
            Industry insights, technical guides, and success stories from XINGHONG.
          </p>
        </div>

        <Suspense fallback={
          <div className="container mx-auto px-4 pb-20">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="ml-4 text-muted-foreground">Loading...</p>
            </div>
          </div>
        }>
          <BlogContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
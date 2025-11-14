'use client'

import { Suspense, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Calendar, PenLine, ArrowLeft } from "lucide-react"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getNewsBlogs, truncateExcerpt } from "@/lib/wordpress"
import type { NewsBlogArticle } from "@/lib/wordpress"

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

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <BlogPageContent />
    </Suspense>
  )
}

function BlogPageContent() {
  const [posts, setPosts] = useState<BlogItem[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogItem | null>(null)
  const [loading, setLoading] = useState(false)
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
        const { data: remotePosts } = await getNewsBlogs({ page: 1, perPage: 12, type: 'blogs' })
        
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
            Industry insights, technical guides, and success stories from SINOROCK.
          </p>
        </div>

        <div className="container mx-auto px-4 pb-20">
          {selectedPost ? (
            <div className="rounded-2xl border bg-card shadow-sm">
              <div className="flex flex-col gap-10 p-6 lg:flex-row lg:p-10">
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full overflow-hidden rounded-xl bg-muted aspect-[4/5] lg:aspect-[3/4]">
                    <Image
                      src={selectedPost.image || "/placeholder.svg"}
                      alt={selectedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="w-full space-y-6 lg:w-1/2">
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

                  <div
                    className="prose prose-lg max-w-none"
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
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
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
                    <p className="text-muted-foreground mb-4 text-pretty flex-1 line-clamp-3">
                      {truncateExcerpt(post.excerpt, 150)}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary self-start"
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
      </main>

      <Footer />
    </div>
  )
}
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, PenLine, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"

// WordPress API 导入
import type { NewsBlogArticle } from "@/lib/wordpress"

// 获取数据的辅助函数
async function getNewsBlogsData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/api/news-blogs?perPage=12`, {
      cache: 'no-store'
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result.data || []
  } catch (error) {
    console.error("Failed to fetch articles:", error)
    return []
  }
}

export default async function NewsBlogPage() {
  // 服务器端获取数据
  const articles = await getNewsBlogsData()

  return <NewsBlogPageContent articles={articles} />
}

function NewsBlogPageContent({ articles }: { articles: NewsBlogArticle[] }) {
  "use client"

  const [selectedArticle, setSelectedArticle] = useState<NewsBlogArticle | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-4">
          <div className="text-muted-foreground text-sm">
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt; News & Blogs
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 mb-8">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-foreground">NEWS & </span>
            <span className="text-primary">BLOGS</span>
          </h1>
          <div className="w-20 h-1 bg-primary" />
          <p className="text-lg text-muted-foreground mt-4 whitespace-nowrap">
            Stay updated with the latest news, product launches, industry insights, and success stories from SINOROCK.
          </p>
        </div>

        {/* News and Blogs Navigation */}
        <div className="container mx-auto px-4 mb-8">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-700">
              <Link href="/news-blogs/news">
                <div className="p-6 hover:bg-gray-700 transition-colors cursor-pointer flex items-center justify-center h-full gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0" />
                  <div className="text-center">
                    <h3 className="text-white text-3xl font-bold mb-1">News</h3>
                    <p className="text-white/80 text-sm">Company updates and news</p>
                  </div>
                </div>
              </Link>

              <Link href="/news-blogs/blogs">
                <div className="p-6 hover:bg-gray-700 transition-colors cursor-pointer flex items-center justify-center h-full gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0" />
                  <div className="text-center">
                    <h3 className="text-white text-3xl font-bold mb-1">Blogs</h3>
                    <p className="text-white/80 text-sm">Industry insights & technical guides</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* News Cards */}
        <div className="container mx-auto px-4 pb-20">
          {selectedArticle ? (
            <div className="rounded-2xl border bg-card shadow-sm">
              <div className="flex flex-col gap-10 p-6 lg:p-10">
                {/* 标题部分 - 最上面 */}
                <div className="space-y-4">
                  <span className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded">
                    {selectedArticle.categories?.[0] || selectedArticle.type}
                  </span>
                  <h2 className="text-5xl md:text-6xl font-bold text-balance">{selectedArticle.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(selectedArticle.publish_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {selectedArticle.author_name && (
                      <span className="flex items-center gap-2">
                        <PenLine className="h-4 w-4" />
                        {selectedArticle.author_name}
                      </span>
                    )}
                  </div>
                </div>

                {/* 图片部分 - 中间 */}
                <div className="w-full">
                  <div className="relative w-full overflow-hidden rounded-xl bg-muted aspect-[16/9]">
                    <img
                      src={selectedArticle.featured_image || "/placeholder.svg"}
                      alt={selectedArticle.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* 内容部分 - 最下面 */}
                <div className="space-y-6">
                  <div
                    className="prose prose-2xl max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                    style={{
                      lineHeight: "1.8",
                    }}
                  />

                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" onClick={() => setSelectedArticle(null)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to list
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((item) => (
                <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.featured_image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded">
                      {item.categories?.[0] || item.type}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(item.publish_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-balance">{item.title}</h3>
                    <p className="text-muted-foreground mb-4 text-pretty">{item.excerpt}</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary"
                      onClick={() => setSelectedArticle(item)}
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
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, PenLine, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { articles } from "@/lib/news-blogs-data"

export default function NewsBlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[number] | null>(null)

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
                    <p className="text-white/80 text-sm">Compay updates and news</p>
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
              <div className="flex flex-col gap-10 p-6 lg:flex-row lg:p-10">
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full overflow-hidden rounded-xl bg-muted aspect-[4/5] lg:aspect-[3/4]">
                    <img
                      src={selectedArticle.image || "/placeholder.svg"}
                      alt={selectedArticle.imageAlt || selectedArticle.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="w-full space-y-6 lg:w-1/2">
                  <div className="space-y-4">
                    <span className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded">
                      {selectedArticle.category}
                    </span>
                    <h2 className="text-4xl font-bold text-balance">{selectedArticle.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(selectedArticle.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {selectedArticle.author && (
                        <span className="flex items-center gap-2">
                          <PenLine className="h-4 w-4" />
                          {selectedArticle.author}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className="prose prose-lg max-w-none"
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
                      src={item.image || "/placeholder.svg"}
                      alt={item.imageAlt || item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded">
                      {item.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(item.date).toLocaleDateString("en-US", {
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


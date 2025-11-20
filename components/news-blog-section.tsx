"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
// 从 WordPress API 导入
import { getNewsBlogs, truncateExcerpt } from "@/lib/wordpress"
import type { NewsBlogArticle } from "@/lib/wordpress"

export function NewsBlogSection() {
  const [displayNews, setDisplayNews] = useState<NewsBlogArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news-blogs?perPage=3&type=news')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setDisplayNews(result.data || [])
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <section id="news-blogs" className="py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section id="news-blogs" className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/news-blogs/news" className="group inline-flex flex-col">
            <h2 className="text-4xl font-bold mb-2 transition-colors group-hover:text-primary">
              <span className="text-foreground group-hover:text-primary/80">NE</span>
              <span className="text-primary">WS</span>
            </h2>
          </Link>
          <div className="w-20 h-1 bg-primary" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {displayNews.map((item) => (
            <article
              key={item.id}
              className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col"
            >
              <Link href={`/news-blogs/news?article=${item.id}`} className="relative block h-48 w-full">
                <Image
                  src={item.featured_image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </Link>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold text-balance flex-1">{item.title}</h3>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(item.publish_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty flex-1 line-clamp-3">
                  {truncateExcerpt(item.excerpt, 120)}
                </p>
                <Link href={`/news-blogs/news?article=${item.id}`}>
                  <Button variant="link" className="p-0 h-auto text-primary group/btn">
                    VIEW MORE
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/news-blogs/news">
            <Button variant="outline" size="lg" className="group bg-transparent">
              VIEW MORE
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

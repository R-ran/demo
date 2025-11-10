import { Calendar, ArrowLeft, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

import { articles, getArticleById } from "@/lib/news-blogs-data"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "News & Blogs",
  description: "News & Blogs",
}

export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }))
}

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const article = getArticleById(params.id)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <TopHeader />
      <StickyNav />

      <article className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href={article.type === "news" ? "/news-blogs/news" : "/news-blogs/blogs"}>
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {article.type === "news" ? "News" : "Blogs"}
            </Button>
          </Link>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="w-full lg:w-1/2">
              <div className="relative w-full overflow-hidden rounded-xl bg-muted aspect-[4/5] lg:aspect-[3/4]">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.imageAlt || article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="w-full space-y-6 lg:w-1/2">
              <div className="space-y-4">
                <span className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded">
                  {article.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-balance">{article.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {article.author && (
                    <span className="flex items-center gap-2">
                      <PenLine className="h-4 w-4" />
                      {article.author}
                    </span>
                  )}
                </div>
              </div>

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  lineHeight: "1.8",
                }}
              />
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}


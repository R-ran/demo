"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { truncateExcerpt } from "@/lib/wordpress"
import type { Project } from "@/lib/wordpress"

interface TestimonialsSectionProps {
  projects?: Project[]
}

export function TestimonialsSection({ projects = [] }: TestimonialsSectionProps) {
  // 只显示前4个项目
  const displayProjects = projects && projects.length > 0 ? projects.slice(0, 4) : []

  return (
    <section id="testimonials" className="py-2 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/successful-projects" className="inline-block group">
            <h2 className="text-4xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
              <span className="text-foreground">SUCCESSFUL </span>
              <span className="text-primary">PROJECTS</span>
            </h2>
            <div className="w-20 h-1 bg-primary group-hover:w-24 transition-all" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProjects.length > 0 ? (
            displayProjects.map((project, index) => {
              // 构建跳转到成功案例列表页面的链接，带项目参数
              const detailUrl = `/successful-projects?project=${encodeURIComponent(project.slug)}`

              return (
                <Link
                  key={project.id}
                  href={detailUrl}
                  //手机端隐藏
                  className={index >= 2 ? "hidden md:block" : ""}
                >
                <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all h-full">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.imageAlt || project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => { 
                          (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" 
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-primary font-semibold mb-2 text-sm">
                          {project.date}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground mb-2 text-sm">{project.location}</p>
                      <p className="text-muted-foreground line-clamp-5 text-sm leading-relaxed">
                        {truncateExcerpt(project.homepageDescription || project.excerpt, 250)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p>暂无成功案例数据</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

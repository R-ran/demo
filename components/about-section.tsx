"use client"

import { useCallback, useEffect, useState } from "react"
import type { SyntheticEvent } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Factory, Award, History } from "lucide-react"

import type { AboutSection as AboutSectionType } from "@/lib/wordpress"

// 图标映射
const iconMap = {
  Award,
  Factory,
  Building2,
  History,
} as const

// Fallback 图片映射（与详情页保持一致）
const FALLBACK_IMAGES: Record<string, string> = {
  "why-choose-us": "/why.jpg",
  "factory-overview": "/industrial-factory-production-floor.jpg",
  factory: "/industrial-factory-production-floor.jpg",
  history: "/history.jpg",
  certificate: "/certificate.jpg",
  overview: "/construction-site-with-installed-rock-bolts.jpg",
}

// 处理图片 URL，确保使用 WordPress 图片或正确的 fallback
function processSectionImage(section: AboutSectionType): string {
  const sanitizeImageUrl = (url?: string | null): string => {
    if (!url) return ""
    const normalized = url.trim()
    if (!normalized) return ""
    const lower = normalized.toLowerCase()
    if (
      lower === "/placeholder.svg" ||
      lower.endsWith("/placeholder.svg") ||
      lower === "placeholder.svg"
    ) {
      return ""
    }
    return normalized
  }

  const baseImage = sanitizeImageUrl(section.image)
  const fallbackImage = FALLBACK_IMAGES[section.id] ?? "/placeholder.svg"

  return baseImage || fallbackImage
}

interface AboutSectionProps {
  initialSections?: AboutSectionType[]
}

export function AboutSection({ initialSections = [] }: AboutSectionProps) {
  const [aboutSections, setAboutSections] = useState<AboutSectionType[]>(initialSections)
  const [loading, setLoading] = useState(initialSections.length === 0)

  useEffect(() => {
    // 如果已经有初始数据，先使用它们
    if (initialSections.length > 0) {
      setAboutSections(initialSections)
      setLoading(false)
    }

    async function fetchAboutSections() {
      try {
        // 通过 API 路由获取数据，避免 CORS 问题
        const timestamp = Date.now()
        const res = await fetch(`/api/about-sections?_=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`)
        }

        const sections = await res.json()
        console.log('首页获取到的 About Sections:', sections)
        setAboutSections(sections)
      } catch (error) {
        console.error('Failed to fetch about sections:', error)
        // 如果获取失败且有初始数据，保持使用初始数据
        if (initialSections.length === 0) {
          setLoading(false)
        }
      } finally {
        setLoading(false)
      }
    }

    // 如果没有初始数据，立即获取；如果有初始数据，延迟获取以更新
    if (initialSections.length === 0) {
      fetchAboutSections()
    } else {
      // 延迟获取，确保初始数据先显示
      setTimeout(fetchAboutSections, 1000)
    }

    // 每30秒重新获取一次，确保 WordPress 更新能及时显示
    const interval = setInterval(fetchAboutSections, 30000)
    return () => clearInterval(interval)
  }, [initialSections])

  // 添加调试日志来确认使用的数据来源
  useEffect(() => {
    if (!loading) {
      if (aboutSections.length > 0) {
        console.log('首页使用 WordPress 数据:', aboutSections)
      } else {
        console.log('首页使用 fallback 数据，WordPress 数据未加载')
      }
    }
  }, [loading, aboutSections])

  // Fallback static data if loading or error（与详情页保持一致）
  const fallbackAboutSections = [
    {
      id: "why-choose-us",
      title: "Why choose us",
      subtitle: "Why choose us",
      description:
        "Discover what sets us apart in the geotechnical anchoring industry with our commitment to quality and innovation.",
      detailedDescription: "SINOROCK stands out as a leading provider of geotechnical anchoring solutions through our unwavering commitment to quality, innovation, and customer satisfaction. With years of expertise in the industry, we have established ourselves as a trusted partner for projects worldwide. Our comprehensive product range, cutting-edge technology, and dedicated support team ensure that every project receives the highest level of service and attention to detail.",
      icon: "Award" as const,
      image: "/why.jpg",
      imageAlt: "Engineering team collaborating on SINOROCK geotechnical solutions",
      href: "/about?section=why-choose-us",
      order: 0,
    },
    {
      id: "factory-overview",
      title: "Factory Overview",
      subtitle: "Factory Overview",
      description:
        "Explore our state-of-the-art manufacturing facilities equipped with advanced technology and quality control systems.",
      detailedDescription: "Our state-of-the-art manufacturing facilities represent the pinnacle of modern production capabilities. Spanning over extensive grounds, our factories are equipped with advanced machinery and cutting-edge technology that enable us to produce high-quality anchor bolts and geotechnical solutions at scale. We maintain strict quality control systems throughout the production process, ensuring that every product meets international standards. Our facilities feature automated production lines, precision testing equipment, and dedicated quality assurance teams that work together to deliver excellence in every product we manufacture.",
      icon: "Factory" as const,
      image: "/industrial-factory-production-floor.jpg",
      imageAlt: "Interior of SINOROCK's advanced anchor bolt manufacturing facility",
      href: "/about?section=factory-overview",
      order: 1,
    },
    {
      id: "history",
      title: "History",
      subtitle: "History",
      description:
        "From a startup to an industry benchmark, we focus on innovative geotechnical anchoring technology, continuously investing in research, development, and manufacturing upgrades. We have now grown into a world-leading provider of anchor solutions, serving markets across multiple continents and committed to providing safe and reliable support for construction and mining clients worldwide.",
      detailedDescription: "From a startup to an industry benchmark, we focus on innovative geotechnical anchoring technology, continuously investing in research, development, and manufacturing upgrades. We have now grown into a world-leading provider of anchor solutions, serving markets across multiple continents and committed to providing safe and reliable support for construction and mining clients worldwide.",
      icon: "History" as const,
      image: "/history.jpg",
      imageAlt: "Historical display of SINOROCK project milestones",
      href: "/about?section=history",
      order: 2,
    },
    {
      id: "certificate",
      title: "Certificate",
      subtitle: "Certificate",
      description:
        "View our certifications and quality standards that demonstrate our commitment to excellence and safety.",
      detailedDescription: "Quality and safety are at the core of everything we do at SINOROCK. We have obtained numerous international certifications and quality standards that validate our commitment to excellence. Our certifications include ISO 9001:2015 for quality management systems, demonstrating our systematic approach to maintaining the highest standards in all our operations. These certifications are not just badges of honor—they represent our ongoing dedication to continuous improvement, rigorous quality control, and adherence to international best practices. We regularly undergo audits and assessments to ensure we maintain these standards and continue to exceed industry expectations.",
      icon: "Award" as const,
      image: "/certificate.jpg",
      imageAlt: "Certificates highlighting SINOROCK quality and safety achievements",
      href: "/about?section=certificate",
      order: 3,
    },
  ]

  // 确保总是按正确顺序显示
  const getOrderedSections = (sections: any[]) => {
    const correctOrder = ['why-choose-us', 'factory-overview', 'history', 'certificate']

    // 按照预设顺序重新排序
    const orderedSections = []
    for (const sectionId of correctOrder) {
      const section = sections.find(s => s.id === sectionId || s.slug === sectionId)
      if (section) {
        orderedSections.push(section)
      }
    }

    // 如果有其他不在预设顺序中的section，添加到最后
    const otherSections = sections.filter(s => !correctOrder.includes(s.id) && !correctOrder.includes(s.slug))
    orderedSections.push(...otherSections)

    return orderedSections
  }

  const displaySections = loading || !aboutSections || aboutSections.length === 0
    ? fallbackAboutSections
    : getOrderedSections(aboutSections).map(section => {
        // 如果是 history，使用正确的描述文字
        const isHistory = section.id?.toLowerCase() === 'history'
        return {
          ...section,
          image: processSectionImage(section),
          description: isHistory 
            ? 'From a startup to an industry benchmark, we focus on innovative geotechnical anchoring technology, continuously investing in research, development, and manufacturing upgrades. We have now grown into a world-leading provider of anchor solutions, serving markets across multiple continents and committed to providing safe and reliable support for construction and mining clients worldwide.'
            : section.description
        }
      })

  const handleImageError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>, fallback: string) => {
      const target = event.currentTarget
      if (!target || target.dataset.fallbackApplied === "true") {
        return
      }

      target.dataset.fallbackApplied = "true"
      target.src = fallback || "/placeholder.svg"
    },
    []
  )

  return (
    <section id="about" className="py-2 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/about" className="inline-block group">
            <h2 className="text-4xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
              <span className="text-foreground">ABOUT </span>
              <span className="text-primary">US</span>
            </h2>
            <div className="w-20 h-1 bg-primary group-hover:w-24 transition-all" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displaySections.map((item) => {
            const IconComponent = iconMap[item.icon] || Building2
            return (
              <Link key={item.id} href={item.href}>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all h-full">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.imageAlt || item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(event) => {
                          const fallback = FALLBACK_IMAGES[item.id] || "/placeholder.svg"
                          handleImageError(event, fallback)
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <IconComponent className="h-12 w-12 text-primary mb-2" />
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className={`text-muted-foreground ${item.id.toLowerCase() === 'history' ? 'line-clamp-6' : 'line-clamp-5'}`}>
                        {item.id.toLowerCase() === 'history' 
                          ? 'From a startup to an industry benchmark, we focus on innovative geotechnical anchoring technology, continuously investing in research, development, and manufacturing upgrades. We have now grown into a world-leading provider of anchor solutions, serving markets across multiple continents and committed to providing safe and reliable support for construction and mining clients worldwide.'
                          : item.description
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

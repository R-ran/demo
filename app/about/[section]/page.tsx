import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Award, Factory, Building2 } from "lucide-react"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Metadata } from "next"
import { getAboutSections } from "@/lib/wordpress"
import type { AboutSection } from "@/lib/wordpress"
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


// 时间线事件接口
interface TimelineEvent {
  year: string
  title: string
  description: string
}

// 清理描述中的引号、年份和标题前缀
function cleanDescription(desc: string, year?: string, title?: string): string {
  if (!desc) return ''
  let cleaned = desc.replace(/^[""]|[""]$/g, '').trim()
  
  // 移除描述开头的年份（如果存在）
  if (year) {
    cleaned = cleaned.replace(new RegExp(`^${year}\\s*[:：.\\s\\-–—]+`, 'i'), '')
  }
  
  // 移除描述开头的标题（如果存在）
  if (title) {
    cleaned = cleaned.replace(new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*[:：.\\s\\-–—]+`, 'i'), '')
  }
  
  // 移除任何开头的年份模式（4位数字）
  cleaned = cleaned.replace(/^\d{4}\s*[:：.\s\-–—]+/i, '')
  
  // 移除只包含年份的描述
  if (/^\d{4}[-–—]?\d{0,4}$/.test(cleaned.trim())) {
    return ''
  }
  
  return cleaned.trim()
}

// 从 HTML 元素中提取文本内容
function extractTextFromHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

// 解析 WordPress HTML 内容为时间线事件
function parseTimelineEvents(htmlContent: string): TimelineEvent[] {
  const events: TimelineEvent[] = []

  if (!htmlContent || htmlContent.trim().length === 0) {
    return events
  }

  console.log('开始解析历史内容，原始内容长度:', htmlContent.length)
  console.log('原始HTML内容:', htmlContent.substring(0, 500) + '...')

  // 策略1: 尝试解析 WordPress 时间线插件的 HTML 结构
  // 使用正则表达式匹配常见的时间线插件 HTML 结构
  
  // 匹配包含 data-year 或 data-date 的 div 元素
  const dataYearPattern = /<div[^>]*(?:data-year|data-date)="(\d{4})"[^>]*>([\s\S]*?)<\/div>/gi
  let match
  while ((match = dataYearPattern.exec(htmlContent)) !== null) {
    const year = match[1]
    const content = match[2]
    
    // 尝试提取标题和描述
    const titleMatch = content.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>|<strong[^>]*>([^<]+)<\/strong>|<[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)<\/[^>]+>/i)
    const title = titleMatch ? (titleMatch[1] || titleMatch[2] || titleMatch[3] || '').trim() : ''
    
    // 提取描述（通常是段落或带有 description/content class 的元素）
    const descMatch = content.match(/<p[^>]*>([\s\S]*?)<\/p>|<div[^>]*class="[^"]*(?:description|content)[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
    let description = ''
    if (descMatch) {
      description = extractTextFromHtml(descMatch[1] || descMatch[2] || '')
    } else {
      // 如果没有找到描述元素，从整个内容中提取（排除标题）
      description = extractTextFromHtml(content.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>|<strong[^>]*>[\s\S]*?<\/strong>/gi, ''))
    }
    
    const finalYear = year.match(/\d{4}/)?.[0] || year
    const finalTitle = title || 'Event'
    const finalDescription = cleanDescription(description, finalYear, finalTitle)
    
    if (finalYear && (finalTitle !== 'Event' || finalDescription)) {
      // 检查是否已存在相同年份的事件
      const existingIndex = events.findIndex(e => e.year === finalYear)
      if (existingIndex >= 0) {
        if (finalDescription.length > events[existingIndex].description.length || 
            (finalTitle !== 'Event' && events[existingIndex].title === 'Event')) {
          events[existingIndex] = {
            year: finalYear,
            title: finalTitle,
            description: finalDescription,
          }
        }
      } else {
        events.push({
          year: finalYear,
          title: finalTitle,
          description: finalDescription,
        })
      }
    }
  }

  // 匹配包含 timeline-item, timeline-entry 等 class 的元素
  const timelineClassPattern = /<div[^>]*class="[^"]*(?:timeline-item|timeline-entry|timeline-event|timeline-block)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi
  while ((match = timelineClassPattern.exec(htmlContent)) !== null) {
    const content = match[1]
    
    // 尝试从内容中提取年份
    const yearMatch = content.match(/(\d{4})/)
    if (!yearMatch) continue
    
    const year = yearMatch[1]
    
    // 提取标题
    const titleMatch = content.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>|<strong[^>]*>([^<]+)<\/strong>|<[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)<\/[^>]+>/i)
    const title = titleMatch ? (titleMatch[1] || titleMatch[2] || titleMatch[3] || '').trim() : ''
    
    // 提取描述
    const descMatch = content.match(/<p[^>]*>([\s\S]*?)<\/p>|<div[^>]*class="[^"]*(?:description|content)[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
    let description = ''
    if (descMatch) {
      description = extractTextFromHtml(descMatch[1] || descMatch[2] || '')
    } else {
      description = extractTextFromHtml(content.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>|<strong[^>]*>[\s\S]*?<\/strong>/gi, ''))
    }
    
    if (year && (title || description)) {
      // 避免重复
      if (!events.find(e => e.year === year && e.title === title)) {
        events.push({
          year,
          title: title || 'Event',
          description: cleanDescription(description),
        })
      }
    }
  }

  console.log('从时间线HTML结构解析到的事件数:', events.length)

  // 策略2: 如果时间线结构解析失败，尝试文本解析
  if (events.length < 2) {
    console.log('时间线HTML结构解析事件较少，尝试文本解析')
    
    // 解码 HTML 实体
    let cleanContent = htmlContent
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#8211;/g, '–')
      .replace(/&#8212;/g, '—')
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8230;/g, '...')
      .replace(/&#39;/g, "'")
      .replace(/&#8217;/g, "'")

    // 按段落和列表项分割
    const paragraphs = cleanContent
      .split(/<\/p>|<\/li>|<br\s*\/?>|\n/)
      .map(p => extractTextFromHtml(p))
      .filter(p => p.length > 0)

    console.log('分割后的段落数:', paragraphs.length)

    // 尝试从段落中提取时间线事件
    for (const paragraph of paragraphs) {
      // 模式1: 年份: 标题 - 描述
      let match = paragraph.match(/^(\d{4})[:：]\s*([^–—\n]+?)(?:\s*[–—\-]\s*(.+))?$/)
      if (match) {
        const year = match[1]
        const title = match[2].trim()
        const description = cleanDescription(match[3] ? match[3].trim() : '', year, title)
        
        const existingIndex = events.findIndex(e => e.year === year)
        if (existingIndex >= 0) {
          if (description.length > events[existingIndex].description.length || 
              (title !== 'Event' && events[existingIndex].title === 'Event')) {
            events[existingIndex] = { year, title, description }
          }
        } else {
          events.push({ year, title, description })
        }
        continue
      }

      // 模式2: 年份. 标题 - 描述
      match = paragraph.match(/^(\d{4})[.．]\s*([^–—\n]+?)(?:\s*[–—\-]\s*(.+))?$/)
      if (match) {
        const year = match[1]
        const title = match[2].trim()
        const description = cleanDescription(match[3] ? match[3].trim() : '', year, title)
        
        const existingIndex = events.findIndex(e => e.year === year)
        if (existingIndex >= 0) {
          if (description.length > events[existingIndex].description.length || 
              (title !== 'Event' && events[existingIndex].title === 'Event')) {
            events[existingIndex] = { year, title, description }
          }
        } else {
          events.push({ year, title, description })
        }
        continue
      }

      // 模式3: 年份 标题 - 描述 (无分隔符)
      match = paragraph.match(/^(\d{4}|\d{4}[–—-]\d{4})\s+([^0-9–—\n]{5,}?)(?:\s*[–—\-]\s*(.+))?$/)
      if (match) {
        const year = match[1]
        const title = match[2].trim()
        const description = cleanDescription(match[3] ? match[3].trim() : '', year, title)
        
        const existingIndex = events.findIndex(e => e.year === year)
        if (existingIndex >= 0) {
          if (description.length > events[existingIndex].description.length || 
              (title !== 'Event' && events[existingIndex].title === 'Event')) {
            events[existingIndex] = { year, title, description }
          }
        } else {
          events.push({ year, title, description })
        }
        continue
      }
    }

    console.log('文本解析后的事件数:', events.length)

    // 策略3: 如果解析的事件太少，使用更宽松的整体文本匹配
    if (events.length < 2) {
      console.log('使用整体文本匹配策略')

      const textContent = cleanContent
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

      console.log('整体文本内容前500字符:', textContent.substring(0, 500))

      // 更宽松的匹配模式 - 匹配年份到下一个年份之间的内容
      const yearPattern = /(\d{4})[:：.\s\-–—]+(.+?)(?=\s*\d{4}[:：.\s\-–—]|$)/gi
      let match
      while ((match = yearPattern.exec(textContent)) !== null) {
        const year = match[1]
        const content = match[2].trim()
        
        // 尝试分离标题和描述
        // 如果包含破折号，尝试分割
        const dashMatch = content.match(/^(.+?)[–—\-]\s*(.+)$/)
        let title: string
        let description: string
        
        if (dashMatch) {
          title = dashMatch[1].trim()
          description = cleanDescription(dashMatch[2].trim(), year, title)
        } else {
          // 如果没有破折号，前50个字符作为标题，其余作为描述
          title = content.substring(0, 50).trim()
          description = cleanDescription(content.substring(50).trim(), year, title)
        }
        
        // 检查是否已存在相同年份的事件
        const existingIndex = events.findIndex(e => e.year === year)
        if (existingIndex >= 0) {
          if (description.length > events[existingIndex].description.length || 
              (title !== 'Event' && events[existingIndex].title === 'Event')) {
            events[existingIndex] = { year, title, description }
          }
        } else {
          events.push({ year, title, description })
        }
        
        // 避免无限循环
        if (events.length >= 20) break
      }
    }
  }

  console.log('最终解析到的事件数:', events.length)
  console.log('解析到的事件:', events)

  // 去重和排序 - 对于相同年份，选择描述最完整的那个
  const yearMap = new Map<string, TimelineEvent>()
  
  for (const event of events) {
    const year = event.year.match(/\d{4}/)?.[0] || event.year
    const existing = yearMap.get(year)
    
    // 如果不存在，或者新事件的描述更长，或者新事件的标题更完整，则使用新事件
    if (!existing || 
        event.description.length > existing.description.length ||
        (event.title !== 'Event' && existing.title === 'Event') ||
        (event.title.length > existing.title.length && event.description.length >= existing.description.length)) {
      yearMap.set(year, {
        year,
        title: event.title !== 'Event' ? event.title : existing?.title || 'Event',
        description: event.description || existing?.description || '',
      })
    }
  }
  
  const uniqueEvents = Array.from(yearMap.values())
  
  // 过滤掉描述为空或只有年份的事件
  const filteredEvents = uniqueEvents.filter(e => 
    e.description.length > 0 && 
    !/^\d{4}[-–—]?\d{0,4}$/.test(e.description.trim()) &&
    e.title !== 'Event'
  )

  console.log('去重后的事件数:', filteredEvents.length)

  // 按年份排序
  return filteredEvents.sort((a, b) => {
    const yearA = parseInt(a.year.match(/\d{4}/)?.[0] || '0')
    const yearB = parseInt(b.year.match(/\d{4}/)?.[0] || '0')
    return yearA - yearB
  })
}

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about XINHONG company sections including factory overview, history, certificates, and why choose us.",
  keywords: ["XINHONG", "about us", "factory", "history", "certificates"],
  openGraph: {
    title: "About Us | XINHONG",
    description: "Learn more about XINHONG company sections including factory overview, history, certificates, and why choose us.",
    type: "website",
  },
}

// 强制动态渲染，避免缓存问题
export const dynamic = 'force-dynamic'
export const revalidate = 0

// 图标映射
const iconMap: Record<string, typeof Award> = {
  Award,
  Factory,
  Building2,
  History: Building2,
  Certificate: Award,
}



interface TimelineItem {
  year: string;
  desc: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* 垂直线 */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-500 md:left-1/2 md:transform md:-translate-x-1/2" />
      
      {/* 时间节点列表 */}
      {items.map((item, index) => (
        <div key={index} className="relative mb-12 flex items-center md:justify-center">
          {/* 圆点 */}
          <div className="absolute left-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md md:left-1/2 md:transform md:-translate-x-1/2" />
          
          {/* 内容卡片 */}
          <div className={`
            bg-gray-100 p-6 rounded-lg shadow-md md:w-5/12
            ${index % 2 === 0 
              ? 'md:mr-auto md:mr-[55%] ml-16 md:ml-0' 
              : 'md:ml-auto md:ml-[55%] ml-16 md:ml-0'
            }
          `}>
            <h3 className="text-lg font-bold">{item.year}</h3>
            <p className="text-gray-600 mt-1">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


// Factory Overview 和 Certificate 的图片数组
const factoryImages = [
  "/industrial-factory-production-floor.jpg",
  "/construction-site-with-installed-rock-bolts.jpg",
  "/anchor-bolt-drilling-equipment.jpg",
  "/industrial-construction-site-with-rock-bolts.jpg",
]

const certificateImages = [
  "/certificate.jpg",
  "/industrial-factory-production-floor.jpg",
  "/construction-site-with-installed-rock-bolts.jpg",
  "/anchor-bolt-drilling-equipment.jpg",
]

// 静态 fallback 数据（当 WordPress 数据不可用时使用）
const fallbackAboutItems: Record<string, {
  title: string
  description: string
  detailedDescription: string
  image: string
  imageAlt: string
  icon: typeof Award
}> = {
  "why-choose-us": {
    title: "Why choose us",
    description: "Discover what sets us apart in the geotechnical anchoring industry with our commitment to quality and innovation.",
    detailedDescription: "XINHONG stands out as a leading provider of geotechnical anchoring solutions through our unwavering commitment to quality, innovation, and customer satisfaction. With years of expertise in the industry, we have established ourselves as a trusted partner for projects worldwide. Our comprehensive product range, cutting-edge technology, and dedicated support team ensure that every project receives the highest level of service and attention to detail.",
    image: "/why.jpg",
    imageAlt: "Engineers collaborating on XINHONG self-drilling anchor bolt solutions",
    icon: Award,
  },
  "factory": {
    title: "Factory Overview",
    description: "Explore our state-of-the-art manufacturing facilities equipped with advanced technology and quality control systems.",
    detailedDescription: "Our state-of-the-art manufacturing facilities represent the pinnacle of modern production capabilities. Spanning over extensive grounds, our factories are equipped with advanced machinery and cutting-edge technology that enable us to produce high-quality anchor bolts and geotechnical solutions at scale. We maintain strict quality control systems throughout the production process, ensuring that every product meets international standards. Our facilities feature automated production lines, precision testing equipment, and dedicated quality assurance teams that work together to deliver excellence in every product we manufacture.",
    image: "/industrial-factory-production-floor.jpg",
    imageAlt: "Automated production lines operating inside XINHONG's factory",
    icon: Factory,
  },
  "history": {
    title: "History",
    description: "From a startup to an industry benchmark, we focus on innovative geotechnical anchoring technology, continuously investing in research, development, and manufacturing upgrades. We have now grown into a world-leading provider of anchor solutions, serving markets across multiple continents and committed to providing safe and reliable support for construction and mining clients worldwide.",
    detailedDescription: "From a startup to an industry benchmark, we focus on innovative geotechnical anchoring technology, continuously investing in research, development, and manufacturing upgrades. We have now grown into a world-leading provider of anchor solutions, serving markets across multiple continents and committed to providing safe and reliable support for construction and mining clients worldwide.",
    image: "/history.jpg",
    imageAlt: "Historical images tracing XINHONG's development milestones",
    icon: Building2,
  },
  "certificate": {
    title: "Certificate",
    description: "View our certifications and quality standards that demonstrate our commitment to excellence and safety.",
    detailedDescription: "Quality and safety are at the core of everything we do at XINHONG. We have obtained numerous international certifications and quality standards that validate our commitment to excellence. Our certifications include ISO 9001:2015 for quality management systems, demonstrating our systematic approach to maintaining the highest standards in all our operations. These certifications are not just badges of honor—they represent our ongoing dedication to continuous improvement, rigorous quality control, and adherence to international best practices. We regularly undergo audits and assessments to ensure we maintain these standards and continue to exceed industry expectations.",
    image: "/certificate.jpg",
    imageAlt: "Wall showcasing XINHONG quality and safety certifications",
    icon: Award,
  },
}

export default async function AboutPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = await params
  const section = resolvedParams?.section || ""
  
  // 优先从 WordPress 获取数据
  let item: {
    title: string
    description: string
    detailedDescription: string
    image: string
    imageAlt: string
    icon: typeof Award
  } | null = null

  // 如果是 history 部分，跳过 WordPress 数据获取，使用静态数据
  const isHistory = section.toLowerCase() === 'history'
  
  
  
  // 确保 history 部分不使用 WordPress 数据
  if (!isHistory) {
    try {
      const sections = await getAboutSections()
      const wpSection = sections.find(s => {
        const sectionId = s.id.toLowerCase()
        const sectionLower = section.toLowerCase()
        return sectionId === sectionLower || 
               (sectionId === 'factory-overview' && sectionLower === 'factory') ||
               (sectionLower === 'factory' && sectionId === 'factory-overview')
      })
      
      if (wpSection) {
        // 从 WordPress 数据转换
        const IconComponent = iconMap[wpSection.icon] || Award
        item = {
          title: wpSection.title,
          description: wpSection.description,
          detailedDescription: wpSection.detailedDescription || wpSection.description,
          image: wpSection.image || "/placeholder.svg",
          imageAlt: wpSection.imageAlt || wpSection.title,
          icon: IconComponent,
        }
      }
    } catch (error) {
      console.error("Failed to load section from WordPress:", error)
    }
  }

  // 如果 WordPress 数据不可用，使用 fallback 数据
  if (!item) {
    item = fallbackAboutItems[section] || null
  }

  // 如果 section 不存在，重定向到 about 页面
  if (!item) {
    redirect("/about")
  }

  const IconComponent = item.icon

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />
      <main className="pt-12">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-4">
          <div className="text-muted-foreground text-sm">
            当前位置: <Link href="/" className="hover:text-primary">Home</Link> &gt; <Link href="/about" className="hover:text-primary">About</Link> &gt; {item.title}
          </div>
        </div>

        <div className="container mx-auto px-4 mb-16">
          <Link href="/about">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to About Us
            </Button>
          </Link>

          {isHistory ? (
            // History 时间线布局 - 竖着的垂直时间轴（使用静态数据）
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Development History</h1>
                <p className="text-muted-foreground text-lg mb-6">发展历程时间轴</p>
                {/* History 卡片下方的描述文字 - 放在标题下方 */}
                <div className="mt-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    From a startup to an industry benchmark, we focus on innovative geotechnical anchoring technology, continuously investing in research, development, and manufacturing upgrades. We have now grown into a world-leading provider of anchor solutions, serving markets across multiple continents and committed to providing safe and reliable support for construction and mining clients worldwide.
                  </p>
                </div>
              </div>

              {/* 直接渲染时间轴，使用静态数据 staticTimelineData - 使用 grid 布局左右交替显示 */}
              
              
              {section.toLowerCase() === "factory" || section.toLowerCase() === "factory-overview" ? (
                // Factory Overview: 上下结构 - 标题 -> 文字 -> 轮播图
                <div className="space-y-8">
                  {/* 标题 */}
                  <div className="flex items-center gap-4">
                    <IconComponent className="h-12 w-12 text-primary" />
                    <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>
                  </div>
                  
                  {/* 文字描述 */}
                  <div 
                    className="text-lg text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.detailedDescription }}
                  />
                  
                  {/* 轮播图 */}
                  <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
                    <Carousel className="w-full h-full">
                      <CarouselContent className="h-full">
                        {factoryImages.map((img, index) => (
                          <CarouselItem key={index} className="h-full">
                            <div className="h-full flex items-center justify-center bg-gray-50">
                              <img
                                src={img}
                                alt={`${item.imageAlt || item.title} - ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  if (!target.src.includes("placeholder")) {
                                    target.src = "/placeholder.svg?height=500&width=800"
                                  }
                                }}
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  </div>
                </div>
              ) : section.toLowerCase() === "certificate" ? (
                // Certificate: 上下结构 - 标题 -> 文字 -> 多张图片排列
                <div className="space-y-8">
                  {/* 标题 */}
                  <div className="flex items-center gap-4">
                    <IconComponent className="h-12 w-12 text-primary" />
                    <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>
                  </div>
                  
                  {/* 文字描述 */}
                  <div 
                    className="text-lg text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.detailedDescription }}
                  />
                  
                  {/* 多张图片排列 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificateImages.map((img, index) => (
                      <div key={index} className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
                        <img
                          src={img}
                          alt={`${item.imageAlt || item.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            if (!target.src.includes("placeholder")) {
                              target.src = "/placeholder.svg?height=400&width=600"
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // 其他部分的默认布局（左右结构）
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                  {/* Image Section */}
                  <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg">
                    <img
                      src={
                        // 如果是 why-choose-us，强制使用 public 中的图片，否则使用 WordPress 图片或 fallback
                        section.toLowerCase() === "why-choose-us" 
                          ? "/why11.avif"
                          : (item.image || "/placeholder.svg")
                      }
                      alt={item.imageAlt || item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                      <IconComponent className="h-12 w-12 text-primary" />
                      <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>
                    </div>
                    <div 
                      className="text-lg text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.detailedDescription }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );  
}

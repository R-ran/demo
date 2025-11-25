"use client"

import { Suspense, useEffect, useState } from "react"
import type { FormEvent, MouseEvent, SyntheticEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Building2, Factory, Award, X, History, ScrollText } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { AboutSection as WordPressAboutSection } from "@/lib/wordpress"

type AboutSection = WordPressAboutSection & {
  fallbackImage?: string
}

const FALLBACK_IMAGES: Record<string, string> = {
  "why-choose-us": "/why.jpg",
  "factory-overview": "/industrial-factory-production-floor.jpg",
  factory: "/industrial-factory-production-floor.jpg",
  history: "/history.jpg",
  certificate: "/certificate.jpg",
  overview: "/construction-site-with-installed-rock-bolts.jpg",
}

const PRIORITY_SECTION_IDS = ["why-choose-us"]

// 图标映射
const iconMap: Record<string, LucideIcon> = {
  Award,
  Factory,
  Building2,
  History,
  Certificate: ScrollText,
}

// 时间线事件接口
interface TimelineEvent {
  year: string
  title: string
  description: string
}

// 静态时间轴数据（用于 history 部分）- 不使用 WordPress 数据
const staticTimelineData: TimelineEvent[] = [
  {
    year: '2003',
    title: 'Company Founded',
    description: 'Established in 2003, our company began as a steel pipe manufacturer, primarily producing steel pipes for rock bolt applications.'
  },
  {
    year: '2007',
    title: 'Breakthrough in R&D',
    description: 'In 2007, we successfully developed and manufactured hollow rock bolts through independent research and development. These products were first used in the construction of Huishan Tunnel on Wuxi’s Inner Ring Road.'
  },
  {
    year: '2008',
    title: 'Certified Supplier for Major Projects',
    description: 'Our hollow rock bolts were applied in the Daguangnan Expressway project. In the same year, we were certified as a qualified supplier by China Railway Tunnel Group.'
  },
  {
    year: '2009',
    title: 'Major Project Win',
    description: 'We won the bid to supply hollow rock bolts for the Yinping Mountain Tunnel in Guangdong, which was the largest mountain tunnel in the province at the time.'
  },
  {
    year: '2013',
    title: 'Global Expansion Begins',
    description: 'In 2013, we entered the international market, with our first overseas client from Japan.'
  },
  {
    year: '2014',
    title: 'Worldwide Reach',
    description: 'By 2014, our products were exported to Europe, the Americas, and Africa, further expanding our global footprint.'
  },
  {
    year: '2015',
    title: 'Production Capacity Expansion',
    description: 'To meet growing demand, we opened a new factory branch in 2015, significantly increasing our production capacity. Monthly production capacity: up to 2000 metric tons.'
  },
  {
    year: '2015-2025',
    title: 'Sustained Growth',
    description: 'From 2015 to 2025, with the exception of a temporary impact during the COVID-19 pandemic, we have maintained an annual growth rate of 10%. Our current annual sales exceed 100 million RMB.'
  }
]

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

// 检测是否包含 WordPress 时间线插件的 HTML 结构
function hasTimelineStructure(html: string): boolean {
  if (!html) return false
  
  // 检测常见的时间线插件标识
  const timelineIndicators = [
    /class="[^"]*(?:timeline-item|timeline-entry|timeline-event|timeline-block|timeline)[^"]*"/i,
    /data-year|data-date/i,
    /<div[^>]*timeline[^>]*>/i,
    /<ul[^>]*class="[^"]*timeline[^"]*"[^>]*>/i,
  ]
  
  return timelineIndicators.some(pattern => pattern.test(html))
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
  // 创建临时 DOM 来解析 HTML（仅在浏览器环境）
  if (typeof document !== 'undefined') {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlContent, 'text/html')
      
      // 查找时间线相关的元素 - 更全面的选择器
      const timelineElements = doc.querySelectorAll(
        '[class*="timeline"], [data-year], [data-date], ' +
        '.timeline-item, .timeline-entry, .timeline-event, .timeline-block, ' +
        'ul.timeline li, .wp-block-timeline, [id*="timeline"]'
      )
      
      if (timelineElements.length > 0) {
        console.log('找到时间线元素:', timelineElements.length)
        timelineElements.forEach((element, idx) => {
          console.log(`处理时间线元素 ${idx + 1}:`, element.outerHTML.substring(0, 200))
          
          // 提取年份 - 多种方式
          let year = element.getAttribute('data-year') || 
                     element.getAttribute('data-date') ||
                     ''
          
          // 如果没有 data 属性，尝试从文本中提取年份
          if (!year) {
            const yearMatch = element.textContent?.match(/\b(19|20)\d{2}\b/)
            year = yearMatch ? yearMatch[0] : ''
          }
          
          // 提取标题
          const titleElement = element.querySelector(
            '[class*="title"], [class*="heading"], h1, h2, h3, h4, h5, h6, strong, b, .event-title'
          )
          let title = titleElement?.textContent?.trim() || ''
          
          // 如果没有找到标题元素，尝试从第一个 strong 或第一个文本节点提取
          if (!title) {
            const firstStrong = element.querySelector('strong, b')
            if (firstStrong) {
              title = firstStrong.textContent?.trim() || ''
            } else {
              // 尝试从文本中提取（排除年份）
              const text = element.textContent?.trim() || ''
              const parts = text.split(/\n|\r|\.|–|—|-/)
              if (parts.length > 0) {
                title = parts[0].replace(/\d{4}[:：.\s]*/, '').trim()
              }
            }
          }
          
          // 提取描述
          const descElement = element.querySelector(
            '[class*="description"], [class*="content"], [class*="text"], p, .event-description, .timeline-content'
          )
          let description = descElement?.textContent?.trim() || ''
          
          // 如果没有找到描述元素，尝试从整个元素中提取（排除标题和年份）
          if (!description && element.textContent) {
            const fullText = element.textContent.trim()
            // 移除年份和标题部分
            let remainingText = fullText
              .replace(/\b(19|20)\d{2}\b/, '')
              .replace(title, '')
              .trim()
            
            // 如果还有内容，作为描述
            if (remainingText.length > 10) {
              description = remainingText
            }
          }
          
          // 清理描述
          description = description
            .replace(/[\r\n]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
          
          // 清理标题（移除年份前缀）
          title = title.replace(/^\d{4}[:：.\s\-–—]+/, '').trim()
          
          const finalYear = year.match(/\d{4}/)?.[0] || year
          const finalTitle = title || 'Event'
          const finalDescription = cleanDescription(description, finalYear, finalTitle)
          
          console.log(`解析结果 ${idx + 1}:`, { year: finalYear, title: finalTitle.substring(0, 50), description: finalDescription.substring(0, 50) })
          
          // 检查是否已存在相同年份的事件，如果存在且新事件的描述更长，则替换
          if (finalYear && (finalTitle !== 'Event' || finalDescription)) {
            const existingIndex = events.findIndex(e => e.year === finalYear)
            if (existingIndex >= 0) {
              // 如果新事件的描述更长或标题更完整，替换旧事件
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
        })
        
        if (events.length > 0) {
          console.log('从时间线HTML结构解析到的事件:', events)
          return events.sort((a, b) => {
            const yearA = parseInt(a.year.match(/\d{4}/)?.[0] || '0')
            const yearB = parseInt(b.year.match(/\d{4}/)?.[0] || '0')
            return yearA - yearB
          })
        }
      }
    } catch (e) {
      console.warn('DOM解析失败，使用文本解析:', e)
    }
  }

  // 策略2: 解码 HTML 实体并清理内容
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

  // 策略3: 尝试按 HTML 结构解析（列表、段落等）
  // 先尝试解析列表结构
  const listItems = cleanContent.match(/<li[^>]*>([\s\S]*?)<\/li>/gi)
  if (listItems && listItems.length > 0) {
    console.log('找到列表项:', listItems.length)
    for (const li of listItems) {
      const text = li.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      
      // 尝试匹配年份开头的格式
      const match = text.match(/^(\d{4})[:：.\s\-–—]+(.+?)(?:[–—\-]\s*(.+))?$/)
      if (match) {
        const year = match[1]
        const rest = match[2].trim()
        const description = match[3] ? match[3].trim() : ''
        
        // 尝试从 rest 中分离标题和描述
        const titleMatch = rest.match(/^(.+?)(?:[–—\-]\s*(.+))?$/)
        const title = titleMatch ? titleMatch[1].trim() : rest
        const desc = description || (titleMatch?.[2]?.trim() || '')
        const finalDescription = cleanDescription(desc, year, title)
        
        if (year && title && finalDescription) {
          // 检查是否已存在相同年份的事件
          const existingIndex = events.findIndex(e => e.year === year)
          if (existingIndex >= 0) {
            if (finalDescription.length > events[existingIndex].description.length || 
                (title !== 'Event' && events[existingIndex].title === 'Event')) {
              events[existingIndex] = { year, title, description: finalDescription }
            }
          } else {
            events.push({ year, title, description: finalDescription })
          }
        }
      }
    }
  }

  // 策略4: 按段落和列表项分割
  if (events.length === 0) {
    const paragraphs = cleanContent
      .split(/<\/p>|<br\s*\/?>|<\/li>|<\/h[1-6]>/)
      .map(p => p.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim())
      .filter(p => p.length > 0 && /\d{4}/.test(p))

    console.log('分割后的段落数:', paragraphs.length)
    console.log('前5个段落:', paragraphs.slice(0, 5))

    // 尝试从段落中提取时间线事件
    for (const paragraph of paragraphs) {
      // 模式1: 年份: 标题 - 描述 (4位年份)
      let match = paragraph.match(/^(\d{4})[:：]\s*([^–—\n]+?)(?:\s*[–—\-]\s*(.+))?$/)
      if (match) {
        events.push({
          year: match[1],
          title: match[2].trim(),
          description: cleanDescription(match[3] ? match[3].trim() : '')
        })
        continue
      }

      // 模式2: 年份. 标题 - 描述
      match = paragraph.match(/^(\d{4})[.．]\s*([^–—\n]+?)(?:\s*[–—\-]\s*(.+))?$/)
      if (match) {
        events.push({
          year: match[1],
          title: match[2].trim(),
          description: cleanDescription(match[3] ? match[3].trim() : '')
        })
        continue
      }

      // 模式3: 年份 标题 - 描述 (无分隔符，但标题至少5个字符)
      match = paragraph.match(/^(\d{4})\s+([^0-9–—\n]{5,}?)(?:\s*[–—\-]\s*(.+))?$/)
      if (match) {
        events.push({
          year: match[1],
          title: match[2].trim(),
          description: cleanDescription(match[3] ? match[3].trim() : '')
        })
        continue
      }
    }
  }

  console.log('段落解析后的事件数:', events.length)

  // 策略5: 如果解析的事件太少，使用更宽松的整体文本匹配
  if (events.length < 2) {
    console.log('使用整体文本匹配策略')

    // 将内容转换为单行文本，保留基本结构
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

interface Props {
  sections: AboutSection[]
}

export default function AboutPageClient({ sections }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AboutPageContent initialSections={sections} />
    </Suspense>
  )
}

function withFallbackImages(sections: AboutSection[]): AboutSection[] {
  if (!Array.isArray(sections)) return []

  const processedSections = sections.map((section) => {
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

    return {
      ...section,
      fallbackImage,
      image: baseImage || fallbackImage,
    }
  })

  if (PRIORITY_SECTION_IDS.length === 0) {
    return processedSections
  }

  const priorityOrder = PRIORITY_SECTION_IDS.map((id) => id.toLowerCase())
  const prioritySections: AboutSection[] = []
  const remainingSections: AboutSection[] = []

  for (const section of processedSections) {
    const normalizedId = section.id.toLowerCase()
    if (priorityOrder.includes(normalizedId)) {
      prioritySections.push(section)
    } else {
      remainingSections.push(section)
    }
  }

  const orderedPrioritySections = priorityOrder.flatMap((id) =>
    prioritySections.filter((section) => section.id.toLowerCase() === id)
  )

  return [...orderedPrioritySections, ...remainingSections]
}

function AboutPageContent({ initialSections }: { initialSections: AboutSection[] }) {
  const [sections, setSections] = useState<AboutSection[]>(withFallbackImages(initialSections))
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>, fallback: string) => {
    if (!fallback) {
      return
    }

    const target = event.currentTarget

    if (!target || target.dataset.fallbackApplied === "true") {
      return
    }

    target.dataset.fallbackApplied = "true"

    try {
      const resolved = fallback.startsWith("http")
        ? fallback
        : new URL(fallback, target.baseURI || window.location.origin).toString()

      target.src = resolved
    } catch (error) {
      console.error("Failed to apply fallback image:", error)
      target.src = fallback
    }
  }

  useEffect(() => {
    const processedSections = withFallbackImages(initialSections)
    console.log('Client sections after processing:', processedSections.map(s => ({ id: s.id, title: s.title })))
    setSections(processedSections)
  }, [initialSections])

  useEffect(() => {
    let isMounted = true

    const fetchSections = async () => {
      try {
        // 使用 API 路由而不是直接调用 getAboutSections
        const response = await fetch('/api/about-sections')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('About 页面获取到的 Sections:', data)
        if (isMounted) {
          setSections(withFallbackImages(data))
        }
      } catch (error) {
        console.error("Failed to fetch about sections on client:", error)
        // 如果获取失败，保持使用初始数据
      }
    }

    fetchSections()
    // 每30秒重新获取一次，确保 WordPress 更新能及时显示
    const interval = setInterval(fetchSections, 30000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, []) // 移除对initialSections的依赖，确保每次都重新获取数据

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const sectionParam = searchParams.get("section")
    if (sectionParam && sections.length > 0) {
      const normalized = sectionParam.toLowerCase()
      const matchingCategory = sections.find(
        (section) => section.id.toLowerCase() === normalized
      )
      if (matchingCategory) {
        setSelectedCategory(matchingCategory.id)
        // 延迟清理 URL，确保状态已设置
        setTimeout(() => {
          const navElement = document.querySelector('[data-nav-section]')
          if (navElement) {
            navElement.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          // 清理 URL 查询参数，但保留选中的状态
          router.replace("/about", { scroll: false })
        }, 200)
      }
    }
  }, [searchParams, router, sections])

  const selectedItem = selectedCategory
    ? sections.find((item) => item.id === selectedCategory) ?? null
    : null
  const SelectedIcon = selectedItem ? iconMap[selectedItem.icon] : null

  const handleCardClick = (itemId: string) => {
    setSelectedCategory(itemId)
    setTimeout(() => {
      const navElement = document.querySelector('[data-nav-section]')
      if (navElement) {
        navElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleLearnMoreClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted")
    alert("Message sent successfully!")
    setShowModal(false)
  }

  // 无数据时展示占位
  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">敬请期待，我们正在准备关于我们的内容。</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-4">
          <div className="text-muted-foreground text-sm">
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt; About Us
          </div>
        </div>

        <div className="container mx-auto px-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About <span className="text-primary">Us</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Learn more about our company, team, and state-of-the-art manufacturing facilities.
          </p>
        </div>

        {/* About Categories Navigation */}
        <div className="container mx-auto px-4 mb-8" data-nav-section>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-700">
              {sections.map((section) => {
                const isSelected = selectedCategory === section.id
                const IconComponent = iconMap[section.icon]
                return (
                  <div
                    key={section.id}
                    onClick={() => setSelectedCategory(section.id)}
                    className={`p-6 transition-colors cursor-pointer flex flex-col items-center justify-center h-full ${
                      isSelected ? "bg-primary" : "hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "bg-gray-800" : "bg-primary"
                        }`}
                      >
                        {IconComponent && <IconComponent className="h-8 w-8 text-white" />}
                      </div>
                      <div className="text-center">
                        <h3 className="text-white text-2xl font-bold mb-1">{section.title}</h3>
                        <p className="text-white/80 text-sm">
                          {section.subtitle || section.title}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* About Content - Image and Text */}
        {selectedItem ? (
          selectedItem.id.toLowerCase() === 'history' ? (
            // History 时间线布局
            <div className="container mx-auto px-4 mb-16">
              <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-4">
                    {SelectedIcon && <SelectedIcon className="h-12 w-12 text-primary" />}
                    <h2 className="text-3xl md:text-4xl font-bold">{selectedItem.title}</h2>
                  </div>
                  {/* History 卡片下方的描述文字 - 放在标题下方 */}
                  <div className="mt-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      From a startup to an industry benchmark, we focus on innovative geotechnical anchoring technology, continuously investing in research, development, and manufacturing upgrades. We have now grown into a world-leading provider of anchor solutions, serving markets across multiple continents and committed to providing safe and reliable support for construction and mining clients worldwide.
                    </p>
                  </div>
                </div>

                {(() => {
                  // 使用静态时间轴数据，不从 WordPress 解析
                  const timelineEvents = staticTimelineData
                  console.log('History timeline events (使用静态数据):', timelineEvents)
                  
                  return timelineEvents.length > 0 ? (
                    /* Timeline - 使用 grid 布局左右交替显示 */
                    <>
                      <ol className="relative max-w-4xl mx-auto py-8 timeline-container list-none m-0 p-0">
                        {/* 中心垂直线 */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300 md:left-1/2 md:-translate-x-1/2"></div>
                        
                        {timelineEvents.map((event, index) => {
                          const isLeft = index % 2 === 0
                          return (
                            <li key={index} className={`timeline-item grid grid-cols-1 md:grid-cols-2 gap-4 ${index < timelineEvents.length - 1 ? 'mb-10' : ''} list-none m-0 p-0 relative`}>
                              {isLeft ? (
                                <>
                                  {/* 左侧内容（奇数项） */}
                                  <div className="md:pr-8 md:text-right">
                                    <time className="text-4xl font-bold leading-none text-blue-600 block" style={{ fontSize: '2.25rem', fontWeight: '700' }}>{event.year}</time>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 my-2" style={{ fontSize: '1.5rem', fontWeight: '700' }}>{event.title}</h3>
                                    <p className="text-lg font-normal text-muted-foreground leading-relaxed whitespace-normal" style={{ fontSize: '1.125rem' }}>
                                      {event.description}
                                    </p>
                                  </div>
                                  
                                  {/* 中心圆点 */}
                                  <div className="absolute left-8 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow-md md:left-1/2 md:-translate-x-1/2 z-10"></div>
                                  
                                  {/* 右侧占位（奇数项） */}
                                  <div className="hidden md:block"></div>
                                </>
                              ) : (
                                <>
                                  {/* 左侧占位（偶数项） */}
                                  <div className="hidden md:block"></div>
                                  
                                  {/* 中心圆点 */}
                                  <div className="absolute left-8 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow-md md:left-1/2 md:-translate-x-1/2 z-10"></div>
                                  
                                  {/* 右侧内容（偶数项） */}
                                  <div className="md:pl-8">
                                    <time className="text-4xl font-bold leading-none text-blue-600 block" style={{ fontSize: '2.25rem', fontWeight: '700' }}>{event.year}</time>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 my-2" style={{ fontSize: '1.5rem', fontWeight: '700' }}>{event.title}</h3>
                                    <p className="text-lg font-normal text-muted-foreground leading-relaxed whitespace-normal" style={{ fontSize: '1.125rem' }}>
                                      {event.description}
                                    </p>
                                  </div>
                                </>
                              )}
                            </li>
                          )
                        })}
                      </ol>
                      
                    </>
                  ) : (
                    /* 如果解析失败，显示原始内容 */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="relative w-full flex items-center justify-center">
                        <img
                          src={selectedItem.image || selectedItem.fallbackImage || "/placeholder.svg"}
                          alt={selectedItem.imageAlt || selectedItem.title}
                          className="w-full h-auto max-h-[600px] object-contain rounded-lg"
                          data-fallback={selectedItem.fallbackImage || "/placeholder.svg"}
                          onError={(event) =>
                            handleImageError(event, selectedItem.fallbackImage || "/placeholder.svg")
                          }
                        />
                      </div>
                      <div 
                        className="text-lg text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: selectedItem.detailedDescription }}
                      />
                    </div>
                  )
                })()}
              </div>
            </div>
          ) : (
            // 其他部分的默认布局
            <div className="container mx-auto px-4 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative w-full flex items-center justify-center">
                  <img
                    src={selectedItem.image || selectedItem.fallbackImage || "/placeholder.svg"}
                    alt={selectedItem.imageAlt || selectedItem.title}
                    className="w-full h-auto max-h-[600px] object-contain rounded-lg"
                    data-fallback={selectedItem.fallbackImage || "/placeholder.svg"}
                    onError={(event) =>
                      handleImageError(event, selectedItem.fallbackImage || "/placeholder.svg")
                    }
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    {SelectedIcon && <SelectedIcon className="h-12 w-12 text-primary" />}
                    <h2 className="text-3xl md:text-4xl font-bold">{selectedItem.title}</h2>
                  </div>
                  <div 
                    className="text-lg text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedItem.detailedDescription }}
                  />
                  <button
                    onClick={handleLearnMoreClick}
                    className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="container mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sections.map((item) => {
                const IconComponent = iconMap[item.icon]
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item.id)}
                    className="cursor-pointer"
                  >
                    <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all h-full">
                      <CardContent className="p-0">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={item.image || item.fallbackImage || "/placeholder.svg"}
                            alt={item.imageAlt || item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            data-fallback={item.fallbackImage || "/placeholder.svg"}
                            onError={(event) =>
                              handleImageError(event, item.fallbackImage || "/placeholder.svg")
                            }
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            {IconComponent && <IconComponent className="h-12 w-12 text-primary mb-2" />}
                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className={`text-muted-foreground ${item.id.toLowerCase() === 'history' ? 'line-clamp-6' : ''}`}>
                            {item.id.toLowerCase() === 'history' 
                              ? 'From a startup to an industry benchmark, we focus on innovative geotechnical anchoring technology, continuously investing in research, development, and manufacturing upgrades. We have now grown into a world-leading provider of anchor solutions, serving markets across multiple continents and committed to providing safe and reliable support for construction and mining clients worldwide.'
                              : item.description
                            }
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company Name *
                    </label>
                    <Input id="company" placeholder="Your company name" required />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input id="phone" type="tel" placeholder="+86 123 4567 8900" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea id="message" placeholder="Tell us about your project or inquiry..." rows={6} required />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
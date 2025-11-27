"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { X, Download, Mail, Phone, Printer, MapPin, MessageSquare, Send, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// 产品种类数据（与产品列表页保持一致）
const productCategories = [
  {
    id: "self-drilling",
    name: "XH self-drilling hollow anchor bolt",
    href: "/products?category=self-drilling",
  },
  {
    id: "common-anchor-bolt",
    name: "XH common anchor bolt",
    href: "/products?category=common-anchor-bolt",
  },
  {
    id: "combination-hollow",
    name: "Combination hollow anchor bolt",
    href: "/products?category=combination-hollow",
  },
  {
    id: "expansion-shell",
    name: "Expansion-shell hollow anchor bolt",
    href: "/products?category=expansion-shell",
  },
  {
    id: "accessories",
    name: "Accessories",
    href: "/products?category=accessories",
  },
]

// 产品数据类型定义
type Product = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  model: string
  specs: string
  tech_params: string
  application_areas: string
  features: Array<{ feature: string }>
  case_images: Array<any>
  categories: string[]
}

// 有效的产品 slug 列表（移到组件外部，避免重复创建）
const validProductSlugs = [
  "T-self-drilling-bolt",
  "R-self-drilling-bolt",
  "common-anchor-bolt",
  "combination-hollow-bolt",
  "expansion-shell-bolt",
  "accessories"
]

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const [slug, setSlug] = useState<string>("")
  const [product, setProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("introduction")
  const [isValidProduct, setIsValidProduct] = useState<boolean | null>(null)
  // 表单状态管理
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Handle async params
  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug || "")
    }
    getSlug()
  }, [params])

  useEffect(() => {
    if (!slug) return // 等待 slug 被设置
    
    // 检查 slug 是否有效
    if (!validProductSlugs.includes(slug)) {
      // 无效的产品 slug，重定向到产品列表页
      setIsValidProduct(false)
      router.replace("/products")
      return
    }

    // 有效的 slug，获取产品数据
    setIsValidProduct(true)
    setProduct(getDefaultProductData(slug))
  }, [slug, router])

  // 根据slug获取默认产品数据（仅在有效 slug 时调用）
  const getDefaultProductData = (productSlug: string): Product | null => {
    const defaultProducts: Record<string, Product> = {
      "T-self-drilling-bolt": {
        id: "self-drilling-1",
        title: "T-Thread Self Drilling Anchor Bolt",
        slug: "T-self-drilling-bolt",
        content: "T-thread self drilling rock bolts offer superior load capacity & wide diameter range. Ideal for loose ground, broken rock & narrow space applications.",
        excerpt: "Xinhong self-drilling anchor (SDA) system enables simultaneous drilling & grouting. Cost-saving hollow anchor bolt solution for tunnels, mining & slope stabilization. Cuttable & extendable.",
        featured_image: "/product1.jpg",
        model: "XH-25, XH-32, XH-40",
        specs: "Diameter: 25-40mm, Length: 1.0-6.0m, Tensile Strength: ≥600MPa",
        tech_params: "Drilling Speed: 0.5-1.0m/min, Grouting Pressure: 1.5-3.0MPa",
        application_areas: "Tunneling, Slope Stabilization, Mining, Foundation Engineering",
        features: [
          { feature: "Combined drilling and anchoring in one operation" },
          { feature: "High tensile strength and corrosion resistance" },
          { feature: "Suitable for various geological conditions" },
          { feature: "Reduced installation time and costs" }
        ],
        case_images: [
          
          "/product11.jpg",
          "/product111.jpg",
          "/product1111.jpg"
        ],
        categories: ["self-drilling"]
      },
      "R-self-drilling-bolt": {
        id: "self-drilling-2",
        title: "R-Thread Self Drilling Anchor Bolt",
        slug: "R-self-drilling-bolt",
        content: "XH R-thread self drilling anchor system enables simultaneous drilling, grouting & anchoring. No drill hole collapse risk. Ideal for unstable ground, tunnels & mining.",
        excerpt: "Xinhong self-drilling anchor (SDA) system enables simultaneous drilling & grouting. Cost-saving hollow anchor bolt solution for tunnels, mining & slope stabilization. Cuttable & extendable.",
        featured_image: "/product1.jpg",
        model: "XH-25, XH-32, XH-40",
        specs: "Diameter: 25-40mm, Length: 1.0-6.0m, Tensile Strength: ≥600MPa",
        tech_params: "Drilling Speed: 0.5-1.0m/min, Grouting Pressure: 1.5-3.0MPa",
        application_areas: "Tunneling, Slope Stabilization, Mining, Foundation Engineering",
        features: [
          { feature: "Combined drilling and anchoring in one operation" },
          { feature: "High tensile strength and corrosion resistance" },
          { feature: "Suitable for various geological conditions" },
          { feature: "Reduced installation time and costs" }
        ],
        case_images: [
          
          "/product11.jpg",
          "/product111.jpg",
          "/product1111.jpg"
        ],
        categories: ["self-drilling"]
      },
      "common-anchor-bolt": {
        id: "common-anchor-1",
        title: "XH Common Anchor Bolt",
        slug: "common-anchor-bolt",
        content: "Common hollow anchor bolt provides economical grouting support for moderate ground conditions. Cost-effective common hollow rockbolt with integrated injection function.",
        excerpt: "Advanced common anchor system with superior corrosion resistance and high load-bearing capacity.",
        featured_image: "/product3.png",
        model: "XH-C-25, XH-C-32, XH-C-40",
        specs: "Diameter: 25-40mm, Length: 1.0-6.0m, Common Diameter: 15-25mm",
        tech_params: "Common Pressure: 1.5-3.0MPa, Bond Strength: ≥15MPa",
        application_areas: "Underground Works, Slope Protection, Rock Reinforcement",
        features: [
          { feature: "Efficient installation through common body" },
          { feature: "Superior corrosion resistance" },
          { feature: "High load-bearing capacity" },
          { feature: "Long-term durability" }
        ],
        case_images: [
          "/product33.jpg",
          "/product333.jpg",

        ],
        categories: ["common-anchor-bolt"]
      },
      "combination-hollow-bolt": {
        id: "combination-hollow-1",
        title: "Combination Hollow Anchor Bolt",
        slug: "combination-hollow-bolt",
        content: "Combination anchor bolt system integrates hollow grouting sections with solid anchoring rods. Versatile combination hollow rockbolt for challenging geological conditions.",
        excerpt: "Advanced combination anchor system with superior corrosion resistance and high load-bearing capacity.",
        featured_image: "/product4.jpg",
        model: "XH-C-25, XH-C-32, XH-C-40",
        specs: "Diameter: 25-40mm, Length: 1.0-6.0m, Common Diameter: 15-25mm",
        tech_params: "Common Pressure: 1.5-3.0MPa, Bond Strength: ≥15MPa",
        application_areas: "Underground Works, Slope Protection, Rock Reinforcement",
        features: [
          { feature: "Efficient installation through combination body" },
          { feature: "Superior corrosion resistance" },
          { feature: "High load-bearing capacity" },
          { feature: "Long-term durability" }
        ],
        case_images: [
          
          "/product44.jpg",
          "/product444.jpg",
          "/product4444.jpg"
        ],
        categories: ["combination-hollow"]
      },
      "expansion-shell-bolt": {
        id: "expansion-shell-1",
        title: "Expansion-Shell Hollow Anchor Bolt",
        slug: "expansion-shell-bolt",
        content: " Expansion shell hollow anchor bolt combines instant mechanical anchoring & grouting reinforcement. Swell hollow rock anchors deliver 180-500kN capacity for tunnels & mining.",
        excerpt: "Reliable expansion-shell anchor system for immediate support in tunneling and mining applications.",
        featured_image: "/product5.jpg",
        model: "ES-25, ES-32, ES-40",
        specs: "Shell Diameter: 45-65mm, Bolt Diameter: 25-40mm",
        tech_params: "Expansion Force: 200-500kN, Installation Torque: 150-300Nm",
        application_areas: "Tunneling, Mining, Cavern Construction",
        features: [
          { feature: "Immediate support upon installation" },
          { feature: "Mechanical expansion mechanism" },
          { feature: "High initial load capacity" },
          { feature: "Easy installation" }
        ],
        case_images: [
          "/product55.jpg",
          "/product5555.jpg",
          "/product555.jpg",
          
        ],
        categories: ["expansion-shell"]
      },
      "accessories": {
        id: "accessories-1",
        title: "Accessories",
        slug: "accessories",
        content: "One-stop supply of hollow anchor bolt accessories: plastic anchor head, hemispheric nut, flexible plate, steel coupler, rubber grouting stopper, cross/word/arc drill bits and centralizer for 20 mm annular grout thickness, full corrosion protection and high pull-out strength. OEM & fast delivery.",
        excerpt: "Hollow Anchor Bolt Accessories Kit – Anchor Head, Nut, Plate, Coupler, Stopper, Bit, Centralizer",
        featured_image: "/product6.jpg",
        model: "Accessories",
        specs: "Accessories",
        tech_params: "Accessories",
        application_areas: "Accessories",
        features: [
          { feature: "Accessories" }
        ],
        case_images: [
          "/product66.jpg",
          "/product666.jpg",
          "/product6666.jpg"
        ],
        categories: ["accessories"]
      },
    }

    return defaultProducts[productSlug] || null
  }

  // 如果产品无效，显示加载状态或返回 null（重定向会处理）
  if (isValidProduct === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  // 如果还在验证中或产品数据未加载，显示加载状态
  if (isValidProduct === null || !product) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 获取产品数据或默认值（保持你原来的fallback逻辑）
  const productTitle = product?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const productImage = product?.featured_image || "/product1.jpg"
  const productImageAlt = product?.title || "XINHONG anchor bolt system"
  const productDescription = product?.excerpt || "High-quality anchoring solution designed for demanding geotechnical applications."
  const productContent = product?.content || "Product introduction and detailed description."
  
  // ACF 字段映射（根据你的接口定义）
  const productModel = product?.model || ""
  const productSpecs = product?.specs || ""
  const techParams = product?.tech_params || ""
  const applicationAreas = product?.application_areas || ""
  const productFeatures = product?.features || []

  // Case studies images from ACF gallery field
  const caseStudiesImages = product?.case_images || []

  // 准备轮播图图片数组：合并主图和案例图片
  const productImages = [
    productImage, // 主图放在第一位
    ...(caseStudiesImages.length > 0 
      ? caseStudiesImages.map((img: any) => img.url || img).slice(0, 5) // 最多显示5张案例图
      : []),
  ].filter(Boolean) // 过滤掉空值

  // 将特性数组转换为 conditions 格式
  const conditions = productFeatures.length > 0 
    ? productFeatures.map((f: any) => f.feature)
    : ["Tunneling", "Mining", "Slope Stabilization"]

  // 获取当前产品所属的分类（用于高亮显示）
  const currentCategoryId = product?.categories && product.categories.length > 0 
    ? product.categories[0] 
    : null

  // 根据产品 slug 获取特定的应用场景数据
  const getApplicationScenarios = (productSlug: string) => {
    // T-Thread 和 R-Thread 使用相同的应用场景
    const sharedScenarios = [
      {
        category: "Tunneling & Underground Engineering",
        scenarios: [
          {
            title: "Tunnel roof and wall support",
            subtitle: "Tunneling & Underground Engineering",
            image: "/tunneling-scenarios.avif",
            imageAlt: "Tunnel roof and wall support",
          },
          {
            title: "Highway and railway tunnel reinforcement",
            subtitle: "Tunneling & Underground Engineering",
            image: "/industrial-construction-site-with-rock-bolts.jpg",
            imageAlt: "Highway and railway tunnel reinforcement",
          },
          {
            title: "Subway station excavation support",
            subtitle: "Tunneling & Underground Engineering",
            image: "/construction-site-with-installed-rock-bolts.jpg",
            imageAlt: "Subway station excavation support",
          }
        ]
      },
      {
        category: "Mining Support Systems",
        scenarios: [
          {
            title: "Coal mine roadway support",
            subtitle: "Mining Support Systems",
            image: "/mining.png",
            imageAlt: "Coal mine roadway support",
          },
          {
            title: "Metal mine shaft stabilization",
            subtitle: "Mining Support Systems",
            image: "/anchor-bolt-drilling-equipment.jpg",
            imageAlt: "Metal mine shaft stabilization",
          },
          {
            title: "Open-pit slope reinforcement",
            subtitle: "Mining Support Systems",
            image: "/anchor-accessories-and-tools.jpg",
            imageAlt: "Open-pit slope reinforcement",
          }
        ]
      },
      {
        category: "Civil Construction",
        scenarios: [
          {
            title: "Slope stabilization and landslide prevention",
            subtitle: "Civil Construction",
            image: "/slope-stablization.avif",
            imageAlt: "Slope stabilization and landslide prevention",
          },
          {
            title: "Foundation underpinning",
            subtitle: "Civil Construction",
            image: "/construction-site-with-installed-rock-bolts.jpg",
            imageAlt: "Foundation underpinning",
          },
          {
            title: "Soil nailing for retaining walls",
            subtitle: "Civil Construction",
            image: "/tunnel-construction-project.jpg",
            imageAlt: "Soil nailing for retaining walls",
          }
        ]
      }
    ]

    if (productSlug === "T-self-drilling-bolt" || productSlug === "R-self-drilling-bolt") {
      return sharedScenarios
    }
    return null
  }

  // 处理表单提交
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // 将 company 映射为 API 期望的 name 字段
          name: formData.company,
          email: formData.email,
          phone: formData.phone,
          country: 'Not provided', // 表单没有这个字段，提供默认值
          message: formData.message
        })
      })

      if (res.ok) {
        setStatus('success')
        // 清空表单
        setFormData({ company: '', email: '', phone: '', message: '' })
        // 3秒后自动关闭弹窗
        setTimeout(() => {
          setShowModal(false)
          setStatus('idle')
        }, 3000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // 处理 WhatsApp 跳转
  const handleWhatsAppClick = () => {
    // WhatsApp 号码: +86 189 6183 8902
    const phoneNumber = '8618961838902' // 移除 + 和空格
    window.open(`https://wa.me/${phoneNumber}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12">
        {/* Top Section - Title and Breadcrumbs */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="text-primary">PRODUCTS</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                world&apos;s leading self drilling anchor bolt manufacturer.
              </p>
            </div>
            <div className="text-muted-foreground text-sm">
              Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt;{" "}
              <Link href="/products" className="hover:text-primary">Products</Link> &gt; {productTitle}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white p-6 shadow-sm mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">PRODUCT LIST</h2>
                <ul className="space-y-2">
                  {/* 添加"全部产品"选项 */}
                  <li>
                      <Link
                      href="/products"
                      className={`flex items-center gap-3 py-2 px-3 transition-colors group ${
                        !currentCategoryId
                          ? 'text-primary bg-primary/10 font-medium border-l-4 border-primary'
                          : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span className={`text-sm transition-all ${
                        !currentCategoryId ? 'font-medium' : 'group-hover:font-medium'
                      }`}>
                        All Products
                      </span>
                      </Link>
                    </li>
                  {productCategories.map((categoryItem) => {
                    // 检查当前分类是否被选中
                    const isActive = currentCategoryId === categoryItem.id
                    return (
                      <li key={categoryItem.id}>
                        <Link
                          href={categoryItem.href}
                          className={`flex items-center gap-3 py-2 px-3 transition-colors group ${
                            isActive
                              ? 'text-primary bg-primary/10 font-medium border-l-4 border-primary'
                              : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4 flex-shrink-0 text-primary" />
                          <span className={`text-sm transition-all ${
                            isActive ? 'font-medium' : 'group-hover:font-medium'
                          }`}>
                            {categoryItem.name}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              

              <div className="bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6">CONTACT US</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Phone</div>
                      <div className="text-sm text-gray-700">+86 18961838902</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">E-mail</div>
                      <div className="text-sm text-gray-700">export@cnxhanchor.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Factory Address</div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                      Ronghu Village, Yuqi Supporting Area, Huishan Economic Development Zone, Wuxi City, Jiangsu Province, China
                      </div>
                    </div>
                  </div>

                  {/* Office Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Office Address</div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                      Room 2208, Fengshang Cultural and Creative Center, Minfeng Road, Liangxi District, Wuxi City, Jiangsu Province, China.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Product Display Section */}
              <div className="bg-white p-4 shadow-sm mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Product Image Carousel */}
                  <div className="rounded-lg overflow-hidden h-80 md:h-[400px] relative">
                    {productImages.length > 1 ? (
                      <Carousel className="w-full h-full">
                        <CarouselContent className="h-full">
                          {productImages.map((img, index) => (
                            <CarouselItem key={index} className="h-full">
                              <div className="h-full flex items-center justify-center bg-gray-50">
                                <img
                                  src={img}
                                  alt={`${productImageAlt} - ${index + 1}`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    if (!target.src.includes("placeholder")) {
                                      target.src = "/placeholder.svg?height=500&width=500"
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
                    ) : (
                      <div className="h-full flex items-center justify-center bg-gray-50">
                        <img
                          src={productImage}
                          alt={productImageAlt}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            if (!target.src.includes("placeholder")) {
                              target.src = "/placeholder.svg?height=500&width=500"
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{productTitle}</h2>
                      <p className="text-muted-foreground leading-relaxed">{productDescription}</p>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setShowModal(true)}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Messages
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={handleWhatsAppClick}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Information Section */}
              <div className="bg-white shadow-sm">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab("introduction")}
                      className={`px-6 py-4 font-semibold transition-colors ${
                        activeTab === "introduction"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Introduction
                    </button>
                    <button
                      onClick={() => setActiveTab("parameters")}
                      className={`px-6 py-4 font-semibold transition-colors ${
                        activeTab === "parameters"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Parameters
                    </button>
                    <button
                      onClick={() => setActiveTab("application-scenarios")}
                      className={`px-6 py-4 font-semibold transition-colors ${
                        activeTab === "application-scenarios"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Application Scenarios
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                  {activeTab === "introduction" && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{productContent}</p>
                      
                      {/* R-Thread Self Drilling Anchor Bolt Detailed Content */}
                      {slug === "R-self-drilling-bolt" && (
                        <div className="space-y-6 mt-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                              R-Thread Self Drilling Anchor Bolt System: One-Step Ground Stabilization Solution
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                              The R-thread self drilling anchor bolt system revolutionizes ground support by integrating drilling, grouting, and anchoring into a single, seamless operation. This advanced hollow anchor bolt eliminates the risk of borehole collapse in challenging conditions, making it the ideal solution for unstable rock formations and difficult ground conditions.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">System Benefits</h3>
                            
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-3">One-Step Installation Efficiency</h4>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                    Simultaneous Operations: Drill, grout, and anchor in one continuous process
                                  </li>
                                  <li className="list-disc">
                                    45% Faster Installation: Reduces project timelines and labor costs
                                  </li>
                                  <li className="list-disc">
                                    No Hole Collapse Risk: Self-drilling design prevents borehole instability in fractured rock or loose soil
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-3">Superior Performance in Unstable Conditions</h4>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                    Ideal for Complex Ground: Engineered for weathered rock, sandy soil, and clay formations
                                  </li>
                                  <li className="list-disc">
                                    Continuous Support: Maintains borehole integrity throughout installation
                                  </li>
                                  <li className="list-disc">
                                    Real-time Grouting: Ensures complete ground contact and load transfer
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-3">Easy Processing & Handling</h4>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                    Simplified Logistics: No separate drilling equipment required
                                  </li>
                                  <li className="list-disc">
                                    On-site Flexibility: Quick coupling system allows length adjustments
                                  </li>
                                  <li className="list-disc">
                                    Reduced Labor: One-operator installation with standard drilling machinery
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Why R-Thread SDA System Excels</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Unlike conventional rock bolts, the R-thread self drilling anchor system combines the drill rod and anchor bar into one component. This design is particularly effective in unstable ground conditions where traditional pre-drilling methods would cause hole collapse or require casing pipes. The R-thread profile provides optimal load transfer while allowing quick coupling for extended lengths.
                              </p>
                            <p className="text-muted-foreground leading-relaxed">
                              Technical Advantage: The system&apos;s hollow core enables continuous grouting during drilling, filling fractures and voids in real-time—critical for maintaining borehole stability in weak formations.
                            </p>
                          </div>
                        </div>
                      )}


                      {/* T-Thread Self Drilling Anchor Bolt Detailed Content */}
                      {slug === "T-self-drilling-bolt" && (
                        <div className="space-y-6 mt-8">
                      <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            T-Thread Self Drilling Anchor Bolt: Heavy-Duty Ground Stabilization System
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                            The T-thread self drilling anchor bolt system delivers exceptional support strength across an extensive diameter range, engineered specifically for the most demanding ground conditions. This heavy-duty hollow rock bolt excels in complex geological environments, providing reliable reinforcement in loose strata, fractured rock, and confined spaces where conventional bolting fails.ng into a single, seamless operation. This advanced hollow anchor bolt eliminates the risk of borehole collapse in challenging conditions, making it the ideal solution for unstable rock formations and difficult ground conditions.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">System Advantages</h3>
                            
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-3">Superior Load Capacity</h4>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                    Heavy-Duty Performance: 30% higher load-bearing capacity than standard rock bolts
                                  </li>
                                  <li className="list-disc">
                                   Wide Diameter Selection: T30, T40, T52, T73, T76, T103 options for customized support
                                  </li>
                                  <li className="list-disc">
                                  Versatile Applications: Ideal for slopeHigh-Strength Steel: Grade 830 MPa material ensures long-term structural integrity reinforcement, tunnel support, and unstable ground stabilization
                                  </li>
                        </ul>
                      </div>

                      <div>
                                <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-3">Engineered for Extreme Conditions</h4>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                  Loose Ground Stabilization: Self-drilling design prevents borehole collapse in granular soils
                                  </li>
                                  <li className="list-disc">
                                  Broken Rock Reinforcement: Ideal for highly fractured and weathered formations
                                  </li>
                                  <li className="list-disc">
                                  Narrow Space Installation: Compact drilling equipment fits confined tunnel sections and limited access areas
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-3">Installation Efficiency</h4>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                  Single-Pass Operation: Drilling and grouting completed simultaneously
                                  </li>
                                  <li className="list-disc">
                                  Reduced Equipment Needs: Eliminates casing pipes in unstable conditions
                                  </li>
                                  <li className="list-disc">
                                  On-Site Flexibility: Quick coupling system allows length adjustment from 2m to 12m+
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Why Choose T-Thread Self Drilling Anchors?</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                            The T-thread self drilling rock bolt system's trapezoidal thread design provides superior torque transmission and load distribution compared to conventional round thread systems. This makes it particularly effective for:
                              </p>
                              <ul className="space-y-2 text-muted-foreground ml-4">
                                <li className="list-disc">
                                Deep installations requiring multiple coupled sections
                                </li>
                                <li className="list-disc">
                                High-stress environments where maximum anchorage capacity is critical
                                </li>
                                <li className="list-disc">
                                Variable ground conditions transitioning from soil to rock
                                </li>
                              </ul>
                              
                            <p className="text-muted-foreground leading-relaxed mt-6">Specialized Solution: When projects involve extremely broken geological conditions or require heavy-duty support in narrow spaces, T-thread SDA bolts offer the optimal balance of strength, adaptability, and installation speed.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Expansion-Shell Hollow Anchor Bolt Detailed Content */}
                      {slug === "expansion-shell-bolt" && (
                        <div className="space-y-6 mt-8">
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Swell Hollow Anchor Bolt: Dual-Action Ground Support Technology
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                            The swell hollow anchor bolt system represents an advanced reinforcement solution that integrates immediate mechanical anchoring with post-installation grouting enhancement. By combining the frictional grip of an expansion shell with the structural bonding of cement-based grout, these expansion shell hollow anchor bolts provide dual-anchoring security essential for critical geotechnical applications in tunnels, mining operations, and slope stabilization projects.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Structural Components & Design</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                            Swell hollow rock anchors feature a sophisticated four-part assembly engineered for optimal performance:
                            </p>
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-3">Components</h4>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                  |Expansion Shell Anchor Head| Hollow Anchor Bar| Grout Stopper|Bearing Plate & Nut|
                                  </li>
                                  
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-3">Performance Specifications</h4>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                  Ultimate Tensile Capacity: 180-500kN depending on bar diameter
                                  </li>
                                  <li className="list-disc">
                                  System Elongation: ≥6% for ductile failure behavior
                                  </li>
                                  <li className="list-disc">
                                  Lock-off Prestress: 80-300kN adjustable range
                                  </li>
                                  <li className="list-disc">
                                  Grout Annulus: Optimized for complete encapsulation and corrosion protection
                                  </li>
                                </ul>
                              </div>

                            </div>
                          </div>

                          <div>
                            <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Application Advantages</h4>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                            Expansion shell hollow anchor bolts excel where immediate ground support is critical. The mechanical shell provides instant load-bearing capacity, while subsequent grouting transforms the swell hollow anchor bolt into a fully bonded, corrosion-resistant permanent reinforcement element. This dual-phase capability makes swell hollow rock anchors particularly effective in fractured rock, weathered strata, and time-sensitive tunneling operations where borehole stability cannot be guaranteed.
                              </p> 
                            <p className="text-muted-foreground leading-relaxed mt-4">The system&apos;s hollow design eliminates separate casing requirements, reducing installation time by 40% compared to conventional systems while ensuring superior long-term performance through complete grout encapsulation.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Common Hollow Anchor Bolt Detailed Content */}
                      {slug === "common-anchor-bolt" && (
                        <div className="space-y-6 mt-8">
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Common Hollow Anchor Bolt: Economical Grouting Solution for Rock Support
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                            The common hollow anchor bolt is a structurally straightforward and cost-efficient grouting anchor system that utilizes a hollow rod for pressure injection. This common hollow rockbolt solution delivers reliable performance in moderately stable to good ground conditions where separate pre-drilling is practical. Unlike self-drilling or expansion shell alternatives, the common hollow anchor requires independent drilling operations and does not incorporate drilling or mechanical expansion capabilities, making it ideal for systematic support applications where advanced features are unnecessary.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">1. Structural Components of Common Hollow Anchor Rod Systems</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                            The common hollow anchor rod assembly comprises standardized elements designed for efficient installation: Anchor Head, Hollow Fully-Threaded Rod, Grout Stopper, Bearing Plate and Lock Nut.
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">2. Key Design Advantage</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">The common hollow anchor bolt's integrated hollow design eliminates separate grout tube withdrawal, preventing grout loss and ensuring complete rod encapsulation.</p>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">3. Superior Grouting Fullness</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">Pressure injection capability (up to several MPa) allows cement-based anchoring grout to penetrate rock fractures, improving ground structure around the common hollow anchor</p>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">4. Excellent Corrosion Protection:</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">Centralized rod positioning ensures full-length grout coverage, meeting long-term durability requirements for permanent support</p>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">5. Streamlined Installation</h3>
                            <p className="text-muted-foreground leading-relaxed mb-2">Pre-threaded common hollow anchor rod facilitates quick assembly; plate and nut installation reduces labor time by approximately 30%</p> 
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">6. Outstanding Cost Efficiency</h3>
                            <p className="text-muted-foreground leading-relaxed mb-2">The common hollow rockbolt system offers the lowest material cost among grouted anchors, providing optimal value for projects in moderately stable geological conditions</p> 
                            <p className="text-muted-foreground leading-relaxed mb-6">
                            The common anchor bolt system delivers proven reliability where routine ground support is required, making it the economical choice for civil engineering and mining applications with predictable geology.
                            </p>
                          </div>
                        </div>
                      )}

                      {/*Combination Hollow Anchor Bolt Detailed Content */}
                      {slug === "combination-hollow-bolt" && (
                        <div className="space-y-6 mt-8">
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Combination Hollow Anchor: Advanced Dual-Section Anchor System
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                            The combination anchor bolt is an innovative ground reinforcement system engineered by integrating different materials and structural configurations, typically featuring a free section paired with a bonded anchoring segment. This combination hollow anchor optimizes both grouting efficiency and load transfer by combining hollow anchor technology with conventional mortar anchoring principles, delivering exceptional performance in complex geological scenarios where standard systems prove inadequate.</p>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Structure Composition of Combination Hollow Anchor Rod Systems</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                            Combination hollow rockbolt assemblies consist of specialized components designed for modular functionality-Structural Components:
                            </p>
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-3"> Rod Body Structure</h4>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                  Hollow Grouting Section
                                  </li>
                                  <li className="list-disc">
                                  Anchoring Section
                                  </li>
                                  <li className="list-disc"> 
                                  Connecting Coupler (or Connection Sleeve)
                                  </li>
                                </ul>
                                <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-3"> Accessory Components</h4>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                  Grout Stopper
                                  </li>
                                  <li className="list-disc">
                                  Bearing Plate & Nut
                                  </li>
                                  <li className="list-disc"> 
                                  Vent Pipe (or Exhaust Tube)
                                  </li>
                                  <li className="list-disc"> 
                                  Anchor Head (Drill Bit)
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-3">Technical Advantages</h3>
                                <p className="text-muted-foreground leading-relaxed mb-4">Combination hollow anchors deliver unique benefits through their hybrid design:</p>
                                <ul className="space-y-2 text-muted-foreground ml-4">
                                  <li className="list-disc">
                                  Optimized Functionality: Hollow section enables high-pressure grouting while solid section maximizes bond length in stable strata
                                  </li>
                                  <li className="list-disc">
                                  Flexible Configuration: Modular combination hollow core bolt design allows field adjustment of grouting versus anchoring ratios
                                  </li>
                                  <li className="list-disc">
                                  Cost Efficiency: Reduces grout consumption compared to full-length hollow systems while maintaining injection capability
                                  </li>
                                  <li className="list-disc">
                                  Superior Performance: Ideal for variable geology transitions from fractured rock to competent bedrock
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                            The combination hollow rockbolt system represents the optimal compromise between advanced hollow anchor technology and traditional solid bar economics, making it the preferred solution for engineers facing challenging ground support requirements.
                              </p> 
                          </div>
                        </div>
                      )}

                      {/* Accessories Detailed Content */}
                      {slug === "accessories" && (
                        <div className="space-y-6 mt-8">
                          <div className="space-y-8">
                            {/* Anchor Head */}
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">ANCHOR HEAD</h3>
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-full md:w-1/3 flex-shrink-0">
                                  <img
                                    src="/anchor-head.png"
                                    alt="Anchor Head"
                                    className="w-full h-auto rounded-lg object-cover max-w-xs"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = "/placeholder.svg?height=300&width=400"
                                    }}
                                  />
                                </div>
                                <div className="w-full md:flex-1">
                                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">Plastic rubber material made. It connected with one side of anchor rod and buried together into the ground for the purpose of fixing and mediating the anchor rod.</p>
                                </div>
                              </div>
                            </div>

                            {/* Anchor Nut */}
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">ANCHOR NUT</h3>
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-full md:w-1/3 flex-shrink-0">
                                  <img
                                    src="/anchor-nut.jpg"
                                    alt="Anchor Nut"
                                    className="w-full h-auto rounded-lg object-cover max-w-xs"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = "/placeholder.svg?height=300&width=400"
                                    }}
                                  />
                                </div>
                                <div className="w-full md:flex-1">
                                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">Using hemisphere or hex nuts,it can put the stress to the rod through the nut.</p>
                                </div>
                              </div>
                            </div>

                            {/* Plate */}
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">ANCHOR PLATE</h3>
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-full md:w-1/3 flex-shrink-0">
                                  <img
                                    src="/Plate.png"
                                    alt="Plate"
                                    className="w-full h-auto rounded-lg object-cover max-w-xs"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = "/placeholder.svg?height=300&width=400"
                                    }}
                                  />
                                </div>
                                <div className="w-full md:flex-1">
                                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">A hot-rolling plate. Given its flexibility, it helps the stress transfer . The plate with its adjustable angle fit with the rock surface tightly.</p>
                                </div>
                              </div>
                            </div>

                            {/* Coupler */}
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">ANCHOR COUPLER</h3>
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-full md:w-1/3 flex-shrink-0">
                                  <img
                                    src="/coupler.png"
                                    alt="Coupler"
                                    className="w-full h-auto rounded-lg object-cover max-w-xs"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = "/placeholder.svg?height=300&width=400"
                                    }}
                                  />
                                </div>
                                <div className="w-full md:flex-1">
                                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">It is a Mechanical made steel case with a step in the middle of its inside. It can combine anchors to adjust the length in case of different demands.</p>
                                </div>
                              </div>
                            </div>

                            {/* Grouting Stopper */}
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">GROUTING STOPPER</h3>
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-full md:w-1/3 flex-shrink-0">
                                  <img
                                    src="/grouting-stopper.png"
                                    alt="Grouting Stopper"
                                    className="w-full h-auto rounded-lg object-cover max-w-xs"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = "/placeholder.svg?height=300&width=400"
                                    }}
                                  />
                                </div>
                                <div className="w-full md:flex-1">
                                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">Grouting stopper is made of rubber and plastic materials. It provides a sealing effect to prevent the exhaust when grouting. Let the pressure grouting feasible. It also increased the fullness and density of the grouting solution. The stopper also could be a positioning support.</p>
                                </div>
                              </div>
                            </div>

                            {/* Drill Bit */}
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">DRILL BIT</h3>
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-full md:w-1/3 flex-shrink-0">
                                  <img
                                    src="/drill-bit.png"
                                    alt="Drill Bit"
                                    className="w-full h-auto rounded-lg object-cover max-w-xs"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = "/placeholder.svg?height=300&width=400"
                                    }}
                                  />
                                </div>
                                <div className="w-full md:flex-1">
                                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">Bit is an important part of self drilling anchor, used for drilling to the ground. Variety range, include cross bit, word bit, arc edge drill, mud drill etc. Applied to various geological conditions and meets different demands.</p>
                                </div>
                              </div>
                            </div>

                            {/* Centralizer/Spacer */}
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">CENTRALIZER/SPACER</h3>
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-full md:w-1/3 flex-shrink-0">
                                  <img
                                    src="/centralizer-spacer.jpg"
                                    alt="Centralizer/Spacer"
                                    className="w-full h-auto rounded-lg object-cover max-w-xs"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = "/placeholder.svg?height=300&width=400"
                                    }}
                                  />
                                </div>
                                <div className="w-full md:flex-1">
                                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">It Keeps the hollow bar in the true centre of the bore-hole while drilling and grouting, meanwhile it also Guarantees a minimum 20 mm annular grout thickness all round the bar, so the steel is completely encased and protected against corrosion.</p>
                                </div>
                              </div>
                            </div>
                          </div>

                         

                        </div>
                      )}

                    </div>
                  )}

                  {activeTab === "parameters" && (
                    <div className="space-y-4">
                      {/* R-Thread Detailed Technical Specifications Table */}
                      {slug === "R-self-drilling-bolt" && (
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-700 text-white">
                                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Anchor Rods</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Outer Diameter (mm)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Internal Diameter (mm)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Wall Thickness (mm)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Ultimate tensile load (kN)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Yield load (kN)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Weight (kg/m)</th>
                            </tr>
                          </thead>
                          <tbody>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">R25N</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">25</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">14</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">5.5</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">200</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">150</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.3</td>
                              </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">R32L</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">32</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">21.5</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">5.25</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">210</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">160</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.8</td>
                              </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">R32N</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">32</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">19</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">6.5</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">280</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">230</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">3.4</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">R32S</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">32</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">16</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">8</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">360</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">280</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">4.1</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">R38</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">38</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>17</span>
                                      <span>19</span>
                                      <span>22</span>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>10.5</span>
                                      <span>9.5</span>
                                      <span>8</span>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>450</span>
                                      <span>400</span>
                                      <span>350</span>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>550</span>
                                      <span>500</span>
                                      <span>420</span>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>6.3</span>
                                      <span>5.9</span>
                                      <span>5.2</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">R51</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">51</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>29</span>
                                      <span>33</span>
                                      <span>35</span>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>11</span>
                                      <span>9</span>
                                      <span>8</span>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>800</span>
                                      <span>660</span>
                                      <span>550</span>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>640</span>
                                      <span>540</span>
                                      <span>450</span>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>9</span>
                                      <span>7.7</span>
                                      <span>7</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4 text-sm text-muted-foreground italic">
                            We can satisfy customized needs. For more information, send email to us.
                          </div>
                        </div>
                      )}

                      {/* T-Thread Detailed Technical Specifications Table */}
                      {slug === "T-self-drilling-bolt" && (
                        <div className="space-y-4">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                              <thead>
                                <tr className="bg-gray-700 text-white">
                                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Anchor Rods</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Outer Diameter (mm)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Internal Diameter (mm)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Wall Thickness (mm)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Ultimate tensile load (kN)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Yield load (kN)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Weight (kg/m)</th>
                              </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T76N</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">76</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">51</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.5</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">1600</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">1200</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">15</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T76S</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">76</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">45</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">15.5</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">1900</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">1500</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">19.7</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T103N</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">103</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">78</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.5</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2282</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">1800</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">27.3</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T103S</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">103</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">51</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">26</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">3460</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2750</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">42</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T30/11</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">30</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">11</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">9.5</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">320</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">260</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">3.1</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T30/14</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">30</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">14</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">8</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">260</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">220</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.8</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T30/16</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">30</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">15</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">7.5</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">220</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">180</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.7</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T40/16</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">40</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">16</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">660</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">525</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">7</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T40/20</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">40</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">22</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">9</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">539</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">430</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">5.6</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T52/26</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">52</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">26</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">13</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">929</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">730</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">10</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T73/53</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">73</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">53</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">10</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">1630</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">970</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.3</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T73/56</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">73</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">56</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">8.5</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">1414</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">785</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">11</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T73/45</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">73</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">45</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">14</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">1630</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">1180</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">17.8</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">T130/60</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">130</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">60</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">35</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">7940</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">5250</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">75</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4 text-sm text-muted-foreground italic">
                            We can satisfy customized needs. For more information, send email to us.
                          </div>
                        </div>
                      )}

                      {/* Expansion-Shell Detailed Technical Specifications Table */}
                      {slug === "expansion-shell-bolt" && (
                        <div className="space-y-4">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                              <thead>
                                <tr className="bg-gray-700 text-white">
                                  <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Spec</th>
                                  <th className="border border-gray-300 px-3 py-3 text-center font-semibold">Outer Diameter (mm)</th>
                                  <th className="border border-gray-300 px-3 py-3 text-center font-semibold">Ultimate tensile Force (kN)</th>
                                  <th className="border border-gray-300 px-3 py-3 text-center font-semibold">Prestressed Force (kN)</th>
                                  <th className="border border-gray-300 px-3 py-3 text-center font-semibold">Elongation Rate (%)</th>
                                  <th className="border border-gray-300 px-3 py-3 text-center font-semibold">Thread Direction</th>
                                  <th className="border border-gray-300 px-3 py-3 text-center font-semibold">Pitch</th>
                                  <th className="border border-gray-300 px-3 py-3 text-center font-semibold">Anchor Hole Diameter</th>
                                  <th className="border border-gray-300 px-3 py-3 text-center font-semibold">Standard Length</th>
                                  <th className="border border-gray-300 px-3 py-3 text-center font-semibold">Other Spec</th>
                              </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-3 py-3 font-semibold text-gray-800">φ25</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">φ25/5</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">180</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">80</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">≥6</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">φ42</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">-</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-3 py-3 font-semibold text-gray-800">φ28</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">φ28/5</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">200</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">100</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">≥6</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">φ46</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">-</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-3 py-3 font-semibold text-gray-800">φ32</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">φ32/6</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">280</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">120</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">≥6</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">φ51</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">
                                    <div className="flex flex-col gap-1">
                                      <span>φ42</span>
                                      <span>φ51</span>
                                      <span>φ60</span>
                                      <span>φ76</span>
                                      <span>φ89</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-3 py-3 font-semibold text-gray-800">φ38</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">φ38/7</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">350</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">200</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">≥6</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">φ75</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">-</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-3 py-3 font-semibold text-gray-800">φ51</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">φ51/8</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">500</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">300</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">≥6</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">φ85</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                  <td className="border border-gray-300 px-3 py-3 text-center">-</td>
                                </tr>
                          </tbody>
                        </table>
                      </div>
                          <div className="mt-4 text-sm text-muted-foreground italic">
                            We can satisfy customized needs. For more information, send email to us.
                          </div>
                        </div>
                      )}

                      {/* Common Anchor Bolt Detailed Technical Specifications Table */}
                      {slug === "common-anchor-bolt" && (
                        <div className="space-y-4">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                              <thead>
                                <tr className="bg-gray-700 text-white">
                                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Spec</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Outer Diameter (mm)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Ultimate tensile Force (kN)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Thread Direction</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Pitch</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Standard Length</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">φ25</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">25</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">180</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">φ28</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">28</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">220</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">φ32</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">32</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">320</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">φ38</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">38</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">380</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                </tr>
                          </tbody>
                        </table>
                      </div>
                          <div className="mt-4 text-sm text-muted-foreground italic">
                            We support customized needs.
                          </div>
                    </div>
                  )}

                      {/* Combination Hollow Anchor Bolt Detailed Technical Specifications Table */}
                      {slug === "combination-hollow-bolt" && (
                        <div className="space-y-4">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                              <thead>
                                <tr className="bg-gray-700 text-white">
                                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Spec</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Outer Diameter (mm)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Ultimate tensile Force (kN)</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Thread Direction</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Pitch</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Standard Length</th>
                                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Other Spec</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">φ25</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">25</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">180</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center align-middle" rowSpan={4}>
                                    <div className="flex flex-col gap-1">
                                      <span>φ42</span>
                                      <span>φ51</span>
                                      <span>φ60</span>
                                      <span>φ76</span>
                                      <span>φ89</span>
                </div>
                                  </td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">φ28</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">28</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">220</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">φ32</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">32</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">320</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">φ38</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">38</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">380</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">Left</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">12.7</td>
                                  <td className="border border-gray-300 px-4 py-3 text-center">2.5/3/3.5/4/4.5/5</td>
                                </tr>
                              </tbody>
                            </table>
              </div>
                          <div className="mt-4 text-sm text-muted-foreground italic">
                            We satisfy tailored demands from our overseas clients.
                          </div>
                        </div>
                      )}

                      {/* Accessories Parameter Table */}
                      {slug === "accessories" && (
                        <div className="space-y-4">
                          {/* Anchor Rods Table */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800">Anchor Rods (杆体)</h3>
                            <div className="w-full">
                              <table className="w-full border-collapse text-xs">
                                <thead>
                                  <tr className="bg-gray-700 text-white">
                                    <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Unit</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R25N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32L</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32S</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R38N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R51L</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R51N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">T76N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">T76S</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Outer Diameter (mm)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">25</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">32</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">32</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">32</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">38</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">51</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">51</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">76</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">76</td>
                                  </tr>
                                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Internal Diameter (mm)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">14</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">21.5</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">19</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">16</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">19</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">36</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">33</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">51</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">45</td>
                                  </tr>
                                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Ultimate tensile load (kN)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">200</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">210</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">280</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">360</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">500</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">550</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">800</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1600</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1900</td>
                                  </tr>
                                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Yield load (kN)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">150</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">160</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">230</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">280</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">400</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">450</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">630</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1200</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1500</td>
                                  </tr>
                                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Weight per m (kg)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">2.3</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">2.8-2.9</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">3.2</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">3.6</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">5.5</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">6.5</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">8</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">16</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">19.7</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Coupler Table */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800">Coupler</h3>
                            <div className="w-full">
                              <table className="w-full border-collapse text-xs">
                                <thead>
                                  <tr className="bg-gray-700 text-white">
                                    <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Unit</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R25N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32L</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32S</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R38N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R51L</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R51N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">T76N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">T76S</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Diameter (mm)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">35</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">42</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">42</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">42</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">52</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">63</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">63</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">95</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">95</td>
                                  </tr>
                                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Length (mm)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">120</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">145</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">145</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">160or190</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">180</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">180</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">200</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">200</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">200</td>
                                  </tr>
                                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Weight (kg)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.45</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.8</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.7</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.75</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1.4</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1.7</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1.9</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">6.4</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">6.4</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Anchor Nuts Table */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800">Anchor Nuts</h3>
                            <div className="w-full">
                              <table className="w-full border-collapse text-xs">
                                <thead>
                                  <tr className="bg-gray-700 text-white">
                                    <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Unit</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R25N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32L</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32S</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R38N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R51L</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R51N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">T76N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">T76S</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Key size (mm)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">41</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">46</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">46</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">46</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">50</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                                  </tr>
                                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Length (mm)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">35</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">45</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">45</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">45</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">55</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">70</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">70</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">80</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">80</td>
                                  </tr>
                                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Weight (kg)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.25</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.4</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.4</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.4</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.5</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1.55</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1.55</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">3.6</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">3.6</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Anchor Plates Table */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800">Anchor Plates</h3>
                            <div className="w-full">
                              <table className="w-full border-collapse text-xs">
                                <thead>
                                  <tr className="bg-gray-700 text-white">
                                    <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Unit</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R25N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32L</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32S</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R38N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R51L</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R51N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">T76N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">T76S</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Dimensions (mm)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">150x150</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">150x150</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">200x200</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">200x200</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">200x200</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">200x200</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">250x250</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">250x250</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">250x250</td>
                                  </tr>
                                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Thickness (mm)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">8</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">8</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">10</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">12</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">12</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">30</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">40</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">40</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">40</td>
                                  </tr>
                                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Hole Diameter (mm)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">30</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">35</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">35</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">35</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">41</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">60</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">60</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">80</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">80</td>
                                  </tr>
                                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Weight (kg)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1.4</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1.4</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">3</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">3.7</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">3.6</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">8.8</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">18.5</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">18</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">18</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Centralizer Table */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800">Centralizer</h3>
                            <div className="w-full">
                              <table className="w-full border-collapse text-xs">
                                <thead>
                                  <tr className="bg-gray-700 text-white">
                                    <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Unit</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R25N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32L</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R32S</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R38N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R51L</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">R51N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">T76N</th>
                                    <th className="border border-gray-300 px-2 py-2 text-center font-semibold">T76S</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Outer diameter (mm)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">70</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">71</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">71</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">71</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">78</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">91</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">91</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">130</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">130</td>
                                  </tr>
                                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-800">Unit weight (kg)</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.35</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.33</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.33</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.33</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.4</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.55</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">0.55</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                                    <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="mt-4 text-sm text-muted-foreground italic">
                            We can satisfy customized needs. For more information, send email to us.
                          </div>
                        </div>
                      )}
                      
                    </div>
                  )}

                  {activeTab === "application-scenarios" && (
                    <div className="space-y-4">
                      <div className="mt-8">
                        <div className="space-y-8">
                          {(() => {
                            // XH Common Anchor Bolt 的专属应用场景
                            if (slug === "common-anchor-bolt") {
                              const commonAnchorScenarios = [
                                {
                                  title: "Tunneling & Underground Construction",
                                  image: "/tunnel-construction-project.png",
                                  description: [
                                    "Primary support: Radial reinforcement in highway/railway tunnels and subway sections, combined with shotcrete and steel arches to stabilize excavation faces and prevent collapse.",
                                    "Forepoling: Serving as advance pipe roofing in weak (Grade IV/V) surrounding rock where conventional drilling fails Specialized.",
                                    "Support: Ideal for roof support, footing locking, and face stabilization."
                                  ]
                                },
                                {
                                  title: "Mining Operations",
                                  image: "/mining-operations.png",
                                  description: [
                                    "Roadway support: Reinforcing fractured roof and rib strata in underground mine roadways, accounting for >60% of total hollow bolt usage.",
                                    "Deep shaft reinforcement: Supporting high-stress environments in deep mine shafts and working faces.",
                                    "Corrosion resistance: Full-length grout encapsulation provides superior protection vs. traditional partial coating."
                                  ]
                                },
                                {
                                  title: "Slope & Foundation Pit Stabilization",
                                  image: "/Slope-Foundation-Pit-Stabilization.png",
                                  description: [
                                    "Slope reinforcement: Filling internal fissures in roadbeds, hydraulic structures, and mine slopes to prevent landslides, especially in complex geological conditions.",
                                    "Excavation support: Vertical/horizontal bracing for deep foundation pits with water-sealing function in water-rich strata.",
                                    "Soil nailing: Acting as soil/rock nails for weathered or highly jointed rock slopes."
                                  ]
                                }
                              ]
                              
                              return commonAnchorScenarios.map((scenario, index) => (
                                <div key={index} className="space-y-4">
                                  <h4 className="text-xl md:text-2xl font-bold text-gray-800">{scenario.title}</h4>
                                  <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-full md:w-1/3 flex-shrink-0">
                                      <img
                                        src={scenario.image}
                                        alt={scenario.title}
                                        className="w-full h-auto rounded-lg object-cover max-w-xs"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement
                                          target.src = "/placeholder.svg?height=300&width=400"
                                        }}
                                      />
                                    </div>
                                    <div className="w-full md:flex-1 space-y-3">
                                      {scenario.description.map((paragraph, pIndex) => (
                                        <p key={pIndex} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                                          {paragraph}
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ));
                            }
                            
                            // Combination Hollow Anchor Bolt 的专属应用场景
                            if (slug === "combination-hollow-bolt") {
                              const combinationHollowScenarios = [
                                {
                                  title: "Tunneling & Underground Construction",
                                  image: "/tunnel-construction-project.png",
                                  description: [
                                    "Primary support: Radial reinforcement in highway/railway tunnels and subway sections, combined with shotcrete and steel arches to stabilize excavation faces and prevent collapse.",
                                    "Forepoling: Serving as advance pipe roofing in weak (Grade IV/V) surrounding rock where conventional drilling fails.",
                                    "Support: Ideal for roof support, footing locking, and face stabilization."
                                  ]
                                },
                                {
                                  title: "Mining Operations",
                                  image: "/mining-operations.png",
                                  description: [
                                    "Roadway support: Reinforcing fractured roof and rib strata in underground mine roadways, accounting for >60% of total hollow bolt usage.",
                                    "Deep shaft reinforcement: Supporting high-stress environments in deep mine shafts and working faces.",
                                    "Corrosion resistance: Full-length grout encapsulation provides superior protection vs. traditional partial coating."
                                  ]
                                },
                                {
                                  title: "Slope & Foundation Pit Stabilization",
                                  image: "/Slope-Foundation-Pit-Stabilization.png",
                                  description: [
                                    "Slope reinforcement: Filling internal fissures in roadbeds, hydraulic structures, and mine slopes to prevent landslides, especially in complex geological conditions.",
                                    "Excavation support: Vertical/horizontal bracing for deep foundation pits with water-sealing function in water-rich strata.",
                                    "Soil nailing: Acting as soil/rock nails for weathered or highly jointed rock slopes."
                                  ]
                                }
                              ]
                              
                              return combinationHollowScenarios.map((scenario, index) => (
                                <div key={index} className="space-y-4">
                                  <h4 className="text-xl md:text-2xl font-bold text-gray-800">{scenario.title}</h4>
                                  <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-full md:w-1/3 flex-shrink-0">
                                      <img
                                        src={scenario.image}
                                        alt={scenario.title}
                                        className="w-full h-auto rounded-lg object-cover max-w-xs"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement
                                          target.src = "/placeholder.svg?height=300&width=400"
                                        }}
                                      />
                                    </div>
                                    <div className="w-full md:flex-1 space-y-3">
                                      {scenario.description.map((paragraph, pIndex) => (
                                        <p key={pIndex} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                                          {paragraph}
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ));
                            }
                            
                            // Expansion-Shell Hollow Anchor Bolt 的专属应用场景
                            if (slug === "expansion-shell-bolt") {
                              const expansionShellScenarios = [
                                {
                                  title: "Tunneling & Underground Construction",
                                  image: "/tunnel-construction-project.png",
                                  description: [
                                    "Primary support: Radial reinforcement in highway/railway tunnels and subway sections, combined with shotcrete and steel arches to stabilize excavation faces and prevent collapse.",
                                    "Forepoling: Serving as advance pipe roofing in weak (Grade IV/V) surrounding rock where conventional drilling fails.",
                                    "Support: Ideal for roof support, footing locking, and face stabilization."
                                  ]
                                },
                                {
                                  title: "Mining Operations",
                                  image: "/mining-operations.png",
                                  description: [
                                    "Roadway support: Reinforcing fractured roof and rib strata in underground mine roadways, accounting for >60% of total hollow bolt usage.",
                                    "Deep shaft reinforcement: Supporting high-stress environments in deep mine shafts and working faces.",
                                    "Corrosion resistance: Full-length grout encapsulation provides superior protection vs. traditional partial coating."
                                  ]
                                },
                                {
                                  title: "Slope & Foundation Pit Stabilization",
                                  image: "/Slope-Foundation-Pit-Stabilization.png",
                                  description: [
                                    "Slope reinforcement: Filling internal fissures in roadbeds, hydraulic structures, and mine slopes to prevent landslides, especially in complex geological conditions.",
                                    "Excavation support: Vertical/horizontal bracing for deep foundation pits with water-sealing function in water-rich strata.",
                                    "Soil nailing: Acting as soil/rock nails for weathered or highly jointed rock slopes."
                                  ]
                                }
                              ]
                              
                              return expansionShellScenarios.map((scenario, index) => (
                                <div key={index} className="space-y-4">
                                  <h4 className="text-xl md:text-2xl font-bold text-gray-800">{scenario.title}</h4>
                                  <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-full md:w-1/3 flex-shrink-0">
                                      <img
                                        src={scenario.image}
                                        alt={scenario.title}
                                        className="w-full h-auto rounded-lg object-cover max-w-xs"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement
                                          target.src = "/placeholder.svg?height=300&width=400"
                                        }}
                                      />
                                    </div>
                                    <div className="w-full md:flex-1 space-y-3">
                                      {scenario.description.map((paragraph, pIndex) => (
                                        <p key={pIndex} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                                          {paragraph}
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ));
                            }
                            
                            // 获取特定产品的应用场景数据
                            const productScenarios = getApplicationScenarios(slug)
                            
                            // 如果有特定产品的场景数据，使用它
                            if (productScenarios) {
                              return productScenarios.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="space-y-6">
                                  <h4 className="text-xl md:text-2xl font-bold text-gray-800 border-b-2 border-primary pb-2">
                                    {category.category}
                                  </h4>
                                  <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* 左侧图片 */}
                                    <div className="w-full md:w-1/4 flex-shrink-0">
                                      <img
                                        src={category.scenarios[0]?.image || "/placeholder.svg?height=300&width=400"}
                                        alt={category.category}
                                        className="w-full h-auto rounded-lg object-cover max-w-[300px]"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement
                                          target.src = "/placeholder.svg?height=300&width=400"
                                        }}
                                      />
                                    </div>
                                    {/* 右侧三个小标题 */}
                                    <div className="w-full md:flex-1 space-y-4">
                                      {category.scenarios.map((scenario, scenarioIndex) => (
                                        <h5 key={scenarioIndex} className="text-base md:text-lg font-normal text-gray-700">
                                          {scenario.title}
                                        </h5>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                            
                            // 如果没有匹配的产品，返回空内容
                            return null;
                          })()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setShowModal(false)
            setStatus('idle')
            setFormData({ company: '', email: '', phone: '', message: '' })
          }}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  setStatus('idle')
                  setFormData({ company: '', email: '', phone: '', message: '' })
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              {/* 状态提示 */}
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg border border-green-200">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                  ✗ Failed to send message. Please try again or email us directly.
                </div>
              )}

              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="modal-company" className="block text-sm font-medium mb-2">
                    Company Name *
                  </label>
                  <Input 
                    id="modal-company" 
                    placeholder="Your company name" 
                    required 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input 
                    id="modal-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input 
                    id="modal-phone" 
                    type="tel" 
                    placeholder="+86 123 4567 8900" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="modal-message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea 
                    id="modal-message" 
                    placeholder="Tell us about your project or inquiry..." 
                    rows={6} 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    disabled={status === 'loading'}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
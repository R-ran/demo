"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, Printer, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

// 产品种类数据（保持原有静态分类导航）
// 注意：使用查询参数格式来过滤产品，而不是跳转到单个产品详情页
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

type ProductItem = {
  id: string | number
  name: string
  description: string
  image: string
  imageAlt: string
  slug: string
}

// 默认产品数据（移到组件外部，确保修改后能正确更新）
const getDefaultProducts = (): ProductItem[] => [
  {
    id: "self-drilling-1",
    name: "T-Thread Self Drilling Anchor Bolt",
    description: "Xinhong self-drilling anchor (SDA) system enables simultaneous drilling & grouting. Cost-saving hollow anchor bolt solution for tunnels, mining & slope stabilization. Cuttable & extendable.",
    image: "/product1.jpg",
    imageAlt: "XH Self-Drilling Anchor Bolt",
    slug: "T-self-drilling-bolt",
  },
  {
    id: "self-drilling-2",
    name: "R-Thread Self Drilling Anchor Bolt",
    description: "Xinhong self-drilling anchor (SDA) system enables simultaneous drilling & grouting. Cost-saving hollow anchor bolt solution for tunnels, mining & slope stabilization. Cuttable & extendable.",
    image: "/product1.jpg",
    imageAlt: "XH Self-Drilling Anchor Bolt",
    slug: "R-self-drilling-bolt",
  },
  {
    id: "common-anchor-1",
    name: "XH Common Anchor Bolt",
    description: "Advanced common anchor system with superior corrosion resistance and high load-bearing capacity.",
    image: "/product3.png",
    imageAlt: "XH Common Anchor Bolt",
    slug: "common-anchor-bolt",
  },
  {
    id: "combination-hollow-1",
    name: "Combination Hollow Anchor Bolt",
    description: "Advanced combination anchor system with superior corrosion resistance and high load-bearing capacity.",
    image: "/product4.jpg",
    imageAlt: "Combination Hollow Anchor Bolt",
    slug: "combination-hollow-bolt",
  },
  {
    id: "expansion-shell-1",
    name: "Expansion-Shell Hollow Anchor Bolt",
    description: "Reliable expansion-shell anchor system for immediate support in tunneling and mining applications.",
    image: "/product5.jpg",
    imageAlt: "Expansion-Shell Hollow Anchor Bolt",
    slug: "expansion-shell-bolt",
  },
  {
    id: "accessories-1",
    name: "Accessories",
    description: "Accessories for self-drilling anchor bolt",
    image: "/product6.jpg",
    imageAlt: "Accessories",
    slug: "accessories",
  },
]

// 根据分类过滤产品（移到组件外部）
const getFilteredProducts = (cat: string | null): ProductItem[] => {
  const allProducts = getDefaultProducts()
  
  if (!cat) {
    return allProducts
  }
  
  // 根据分类过滤产品
  const categoryLower = cat.toLowerCase().trim()
  return allProducts.filter((product) => {
    const productSlug = product.slug.toLowerCase()
    const productName = product.name.toLowerCase()
    
    // 匹配分类 - 精确匹配 slug，避免错误匹配
    if (categoryLower === 'self-drilling') {
      return productSlug.includes('self-drilling')
    } else if (categoryLower === 'common-anchor-bolt') {
      return productSlug === 'common-anchor-bolt'
    } else if (categoryLower === 'combination-hollow') {
      return productSlug === 'combination-hollow-bolt'
    } else if (categoryLower === 'expansion-shell') {
      return productSlug === 'expansion-shell-bolt'
    } else if (categoryLower === 'accessories') {
      return productSlug === 'accessories'
    } 
    return false
  })
}

export default function ProductsPage() {
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
      <ProductsPageContent />
    </Suspense>
  )
}

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [products, setProducts] = useState<ProductItem[]>(() => getFilteredProducts(category))
  const loading = false

  // 当分类变化时更新产品列表
  useEffect(() => {
    setProducts(getFilteredProducts(category))
  }, [category])

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 无产品状态
  if (!products.length) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              {category 
                ? `No products found in category "${productCategories.find(c => c.id === category)?.name || category}"`
                : 'No products available'}
            </p>
            {category && (
              <Link href="/products">
                <Button variant="outline">
                  View All Products
                </Button>
              </Link>
            )}
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
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt; Products
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Product Categories */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6">PRODUCT LIST</h2>
                <ul className="space-y-2">
                  {/* 添加"全部产品"选项 */}
                  <li>
                    <Link
                      href="/products"
                      className={`flex items-center gap-3 py-2 px-3 transition-colors group ${
                        !category
                          ? 'text-primary bg-primary/10 font-medium border-l-4 border-primary'
                          : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span className={`text-sm transition-all ${
                        !category ? 'font-medium' : 'group-hover:font-medium'
                      }`}>
                        All Products
                      </span>
                    </Link>
                  </li>
                  {productCategories.map((categoryItem) => {
                    // 检查当前分类是否被选中
                    const isActive = category === categoryItem.id
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

              {/* Contact Us Section */}
              <div className="bg-white p-6 shadow-sm mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">CONTACT US</h2>
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Phone</div>
                      <div className="text-sm text-gray-700">+86 18961838902</div>
                    </div>
                  </div>

                  {/* Fax */}
                  <div className="flex items-start gap-4">
                    <Printer className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Tel</div>
                      <div className="text-sm text-gray-700">+86-510-85161569</div>
                    </div>
                  </div>

                  {/* E-mail */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">E-mail</div>
                      <div className="text-sm text-gray-700">export@cnxhanchor.com</div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Address</div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                        Ronghu Village, Yuqi Supporting Area, Huishan Economic Development Zone, Wuxi City, Jiangsu Province, China
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Main Section - Product Cards */}
            <div className="flex-1">
              {/* Products Title Section */}
              <div className="mb-6">
                {category ? (
                  <>
                    {/* Category-specific title */}
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                      {productCategories.find(cat => cat.id === category)?.name || 'Products'}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      Products in this category
                    </p>
                  </>
                ) : (
                  <>
                    {/* General Products title */}
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                      <span className="text-foreground">PRO</span>
                      <span className="text-primary">DUCTS</span>
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      world's leading self drilling anchor bolt manufacturer.
                    </p>
                  </>
                )}
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.slug}`}
                    title={`View ${product.name} - ${product.slug}`}
                  >
                    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all bg-white h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Image Section */}
                        <div className="relative w-full h-48 overflow-hidden flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.imageAlt}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        {/* Text Section */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 overflow-hidden text-ellipsis min-h-[2.5rem]">
                            {product.description}
                          </p>
                          <Button
                            variant="outline"
                            className="w-full justify-between group-hover:border-primary group-hover:text-primary transition-colors mt-auto"
                          >
                            MORE
                            <ChevronRight className="w-4 h-4 text-primary" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

export function ProductsSection() {

  // 静态产品数据 - 对应四个产品类型
  const fallbackProducts = [
    {
      id: "1",
      title: "XH self-drilling hollow anchor bolt",
      featured_image: "/product1.jpg",
      imageAlt: "Close-up of XH self-drilling hollow anchor bolt components",
      slug: "self-drilling-bolt",
    },
    {
      id: "2",
      title: "XH common anchor bolt",
      featured_image: "/product3.png",
      imageAlt: "XH common anchor bolt ready for installation",
      slug: "common-anchor-bolt",
    },
    {
      id: "3",
      title: "Combination hollow anchor bolt",
      featured_image: "/product4.jpg",
      imageAlt: "Combination hollow anchor bolt ready for installation",
      slug: "combination-hollow-bolt",
    },
    {
      id: "4",
      title: "Expansion-shell hollow anchor bolt",
      featured_image: "/product5.jpg",
      imageAlt: "Expansion-shell hollow anchor bolt ready for installation",
      slug: "expansion-shell-bolt",
    },
  ]

  const displayProducts = fallbackProducts

  // 根据产品slug或分类确定链接
  const getProductCategoryLink = (product: any) => {
    const slug = product.slug || ''

    // 将产品映射到分类页面（使用查询参数）
    if (slug.includes('self-drilling') || slug.includes('self_drilling')) {
      return '/products?category=self-drilling'
    } else if (slug === 'common-anchor-bolt') {
      return '/products?category=common-anchor-bolt'
    } else if (slug === 'combination-hollow-bolt') {
      return '/products?category=combination-hollow'
    } else if (slug.includes('expansion-shell') || slug.includes('expansion_shell')) {
      return '/products?category=expansion-shell'
    }

    // 默认链接
    return '/products'
  }
  return (
    <section id="products" className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/products" className="inline-block group">
            <h2 className="text-5xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
              <span className="text-foreground">HOTSALES </span>
              <span className="text-primary"> PRODUCTS</span>
            </h2>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {displayProducts.map((product, index) => {
              const isImageTop = index % 2 === 0
              const productImage = product.featured_image || "/placeholder.svg"
              const productName = product.title || "Product"
              const productImageAlt = product.imageAlt || productName

              return (
                <Link key={product.id} href={getProductCategoryLink(product)} className="block h-full">
                  <Card className="group h-full cursor-pointer overflow-hidden hover:shadow-lg transition-all bg-muted/20 rounded-none border-r last:border-r-0 py-0 gap-0 min-h-[540px]">
                    <CardContent className="p-0 h-full">
                      <div className="grid h-full grid-rows-[1fr_auto_1fr]">
                        {isImageTop ? (
                          <>
                            {/* Image on top */}
                            <div className="relative h-full w-full overflow-hidden bg-white">
                              <img
                                src={productImage}
                                alt={productImageAlt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg"
                                }}
                              />
                            </div>
                            {/* Orange diamond icon */}
                            <div className="flex items-center justify-center py-6">
                              <div className="w-10 h-10 bg-primary rotate-45 flex items-center justify-center shadow-lg">
                                <ChevronDown className="w-4 h-4 text-white -rotate-45" />
                              </div>
                            </div>
                            {/* Text on bottom */}
                            <div className="flex h-full flex-col justify-center bg-muted/30 p-8 text-center space-y-6">
                              <h3 className="text-xl font-semibold leading-tight">
                                {productName}
                              </h3>
                              <div className="w-16 h-0.5 bg-foreground mx-auto" />
                              <p className="text-sm font-medium tracking-wide text-foreground/70 group-hover:text-primary transition-colors">
                                LEARN MORE
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Text on top */}
                            <div className="flex h-full flex-col justify-center bg-muted/30 p-8 text-center space-y-6">
                              <h3 className="text-xl font-semibold leading-tight">
                                {productName}
                              </h3>
                              <div className="w-16 h-0.5 bg-foreground mx-auto" />
                              <p className="text-sm font-medium tracking-wide text-foreground/70 group-hover:text-primary transition-colors">
                                LEARN MORE
                              </p>
                            </div>
                            {/* Orange diamond icon */}
                            <div className="flex items-center justify-center py-6">
                              <div className="w-10 h-10 bg-primary rotate-45 flex items-center justify-center shadow-lg">
                                <ChevronDown className="w-4 h-4 text-white -rotate-45" />
                              </div>
                            </div>
                            {/* Image on bottom */}
                            <div className="relative h-full w-full overflow-hidden bg-white">
                              <img
                                src={productImage}
                                alt={productImageAlt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg"
                                }}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

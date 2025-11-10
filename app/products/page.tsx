"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, Printer, Mail, MapPin } from "lucide-react"

// 产品种类数据
const productCategories = [
  {
    id: "self-drilling",
    name: "XH self-drilling anchor bolt",
    href: "/products/self-drilling-bolt",
  },
  {
    id: "hollow-grouted",
    name: "XH hollow grouted anchor bolt",
    href: "/products/hollow-grouted-bolt",
  },
  {
    id: "expansion-shell",
    name: "Expansion-shell hollow anchor bolt",
    href: "/products/expansion-shell-bolt",
  },
  {
    id: "fiberglass",
    name: "Fiberglass anchor bolt",
    href: "/products/fiberglass-bolt",
  },
  {
    id: "accessories",
    name: "Accessories",
    href: "/products/accessories",
  },
]

// 所有产品数据
const allProducts = [
  {
    id: 1,
    name: "R Thread Self Drilling Anchor Bolt System",
    description: "R thread self drilling anchor bolt system performs drilling, grouting and anchoring in one operation, providing efficient installation.",
    image: "/product1.jpg",
    imageAlt: "R thread self-drilling anchor bolt system components arranged on workbench",
    slug: "r-thread-self-drilling-anchor-bolt",
  },
  {
    id: 2,
    name: "T thread self drilling hollow rock bolt",
    description: "T thread self-drilling rock bolts, a wide range of diameter, length and thread options available for various applications.",
    image: "/product2.jpg",
    imageAlt: "T thread self-drilling hollow rock bolt set with drill bits",
    slug: "t-thread-self-drilling-anchor-bolt",
  },
  {
    id: 3,
    name: "Hot-dip Galvanizing Rock Bolts System",
    description: "Hot-dip galvanizing rock bolt is a sda rock bolt with good anti-corrosion performance and long service life.",
    image: "/product3.jpg",
    imageAlt: "Hot-dip galvanized rock bolts offering corrosion protection",
    slug: "hot-dip-galvanizing-rock-bolts",
  },
  {
    id: 4,
    name: "XH self-drilling anchor bolt",
    description: "High-quality self-drilling anchor bolt designed for demanding geotechnical applications with superior strength.",
    image: "/product1.jpg",
    imageAlt: "XH self-drilling anchor bolt showing thread profile",
    slug: "self-drilling-bolt",
  },
  {
    id: 5,
    name: "XH hollow grouted anchor bolt",
    description: "Hollow grouted anchor bolt system for reliable anchoring in various ground conditions.",
    image: "/product2.jpg",
    imageAlt: "XH hollow grouted anchor bolt with grout ports",
    slug: "hollow-grouted-bolt",
  },
  {
    id: 6,
    name: "Expansion-shell hollow anchor bolt",
    description: "Expansion-shell hollow anchor bolt provides excellent load-bearing capacity and installation flexibility.",
    image: "/product4.jpg",
    imageAlt: "Expansion-shell hollow anchor bolt highlighting expansion mechanism",
    slug: "expansion-shell-bolt",
  },
]

export default function ProductsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
                  {productCategories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={category.href}
                        className="flex items-center gap-3 py-2 px-3 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm group-hover:font-medium transition-all">
                          {category.name}
                        </span>
                      </Link>
                    </li>
                  ))}
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
                      <div className="text-sm text-gray-700">+86-510-85161569</div>
                    </div>
                  </div>

                  {/* Fax */}
                  <div className="flex items-start gap-4">
                    <Printer className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Fax</div>
                      <div className="text-sm text-gray-700">86-379-64386676</div>
                    </div>
                  </div>

                  {/* E-mail */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">E-mail</div>
                      <div className="text-sm text-gray-700">sinorock@sinorockco.com</div>
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
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  <span className="text-foreground">PRO</span>
                  <span className="text-primary">DUCTS</span>
                </h1>
                <p className="text-muted-foreground text-sm">
                  world's leading self drilling anchor bolt manufacturer.
                </p>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`}>
                    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all bg-white h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Image Section */}
                        <div className="relative w-full h-48 overflow-hidden bg-muted">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.imageAlt || product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

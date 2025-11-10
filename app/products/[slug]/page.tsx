"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { X, Download, Mail, Phone, Printer, MapPin, MessageSquare, Send } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

// 产品数据
const productData: Record<string, {
  title: string
  description: string
  image: string
  imageAlt: string
  introduction: string
  functions: string
  conditions: string[]
}> = {
  "r-thread-self-drilling-anchor-bolt": {
    title: "R Thread Self Drilling Anchor Bolt System",
    description: "R thread self drilling anchor bolt system performs drilling, grouting & anchoring in one step. Easy to process and no risks of drill have collagen. Suitable for unstable conditions.",
    image: "/product1.jpg",
    imageAlt: "R thread self-drilling anchor bolt system components laid out for installation",
    introduction: "R thread self drilling anchor bolt system is composed by hollow rock bolt, anchor nut, anchor plate, anchor coupler, drill bit, centralizer, and the hollow anchor bars can be cut and lengthened by coupling on request.",
    functions: "R thread self drilling anchor bolt system is an advanced system which can ensure the anchoring effect for complex ground conditions. It can be integrated with the functions of drilling, grouting and anchoring.",
    conditions: ["Tunneling", "Mining", "Slope Stabilization", "Foundation Support"],
  },
}

// 产品列表
const productCategories = [
  { name: "XH self-drilling anchor bolt", slug: "self-drilling-bolt" },
  { name: "XH hollow grouted anchor bolt", slug: "hollow-grouted-bolt" },
  { name: "Expansion-shell hollow anchor bolt", slug: "expansion-shell-bolt" },
  { name: "Fiberglass anchor bolt", slug: "fiberglass-bolt" },
  { name: "Accessories", slug: "accessories" },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug || ""
  // 根据slug映射到对应的图片
  const defaultProductImages: Record<string, { src: string; alt: string }> = {
    "self-drilling-bolt": {
      src: "/product1.jpg",
      alt: "XH self-drilling anchor bolt assembly on display",
    },
    "hollow-grouted-bolt": {
      src: "/product2.jpg",
      alt: "XH hollow grouted anchor bolt with couplers and plates",
    },
    "expansion-shell-bolt": {
      src: "/product4.jpg",
      alt: "Expansion-shell hollow anchor bolt demonstrating shell mechanism",
    },
    "fiberglass-bolt": {
      src: "/product3.jpg",
      alt: "Fiberglass anchor bolt solution for corrosion-sensitive environments",
    },
    accessories: {
      src: "/product1.jpg",
      alt: "Selection of SINOROCK self-drilling anchor bolt accessories",
    },
  }

  const getImageBySlug = (slug: string) => defaultProductImages[slug]?.src || "/product1.jpg"
  const getImageAltBySlug = (slug: string) => defaultProductImages[slug]?.alt || "SINOROCK anchor bolt system"

  const product = productData[slug] || {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description: "High-quality anchoring solution designed for demanding geotechnical applications.",
    image: getImageBySlug(slug),
    imageAlt: getImageAltBySlug(slug),
    introduction: "This product is designed for various geotechnical applications.",
    functions: "Provides reliable anchoring solutions for complex ground conditions.",
    conditions: ["Tunneling", "Mining", "Slope Stabilization"],
  }
  
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("introduction")

  // 处理表单提交
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("Message sent successfully!")
    setShowModal(false)
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
                world's leading self drilling anchor bolt manufacturer.
              </p>
            </div>
            <div className="text-muted-foreground text-sm">
              Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt;{" "}
              <Link href="/products" className="hover:text-primary">Products</Link> &gt; {product.title}
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
                  {productCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/products/${category.slug}`}
                        className={`flex items-center gap-2 py-2 px-3 text-sm transition-colors ${
                          slug === category.slug
                            ? "text-primary font-semibold bg-primary/5"
                            : "text-gray-700 hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${slug === category.slug ? "bg-primary" : "bg-gray-300"}`} />
                        <span>{category.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white mb-6" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>

              <div className="bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6">CONTACT US</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Phone</div>
                      <div className="text-sm text-gray-700">+00-370-00207220</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Printer className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Fax</div>
                      <div className="text-sm text-gray-700">+86-379-65267220</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">E-mail</div>
                      <div className="text-sm text-gray-700">sinorock@sinorock.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Address</div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                        No.1703, Building 3, No. 1 Ganghua Road, Luolong District, Luoyang, China (Henan Pilot Free Trade Zone), Henan Province, P.R. China
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Product Display Section */}
              <div className="bg-white p-6 shadow-sm mb-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="bg-muted rounded-lg overflow-hidden h-96 md:h-[500px] relative">
                    <img
                      src={product.image || "/product1.jpg"}
                      alt={product.imageAlt || product.title}
                      className="w-full h-full object-cover"
                      style={{ minHeight: "100%" }}
                      onError={(e) => {
                        // 如果图片加载失败，使用占位符
                        const target = e.target as HTMLImageElement
                        if (!target.src.includes("placeholder")) {
                          target.src = "/placeholder.svg?height=500&width=500"
                        }
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{product.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{product.description}</p>
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
                        onClick={() => setShowModal(true)}
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
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "introduction" && (
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">{product.introduction}</p>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Functions:</h3>
                        <p className="text-muted-foreground leading-relaxed">{product.functions}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Conditions:</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          {product.conditions.map((condition, index) => (
                            <li key={index}>• {condition}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4">Cases</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="aspect-video bg-muted rounded-lg overflow-hidden">
                              <img
                                src={`/placeholder.svg?height=200&width=300&query=case${i}`}
                                alt={`Illustrative case study ${i} featuring ${product.title}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "parameters" && (
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-700 text-white">
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Outer Dia. (mm)</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Application Range (Advice)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* EX Category */}
                            <tr className="bg-gray-200">
                              <td colSpan={3} className="border border-gray-300 px-4 py-2 font-semibold text-gray-800">EX</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">SSR25/42</td>
                              <td className="border border-gray-300 px-4 py-2">42</td>
                              <td rowSpan={2} className="border border-gray-300 px-4 py-2">Sand, fills, gravel</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">SSR25/51</td>
                              <td className="border border-gray-300 px-4 py-2">51</td>
                            </tr>
                            
                            {/* EXX Category */}
                            <tr className="bg-gray-200">
                              <td colSpan={3} className="border border-gray-300 px-4 py-2 font-semibold text-gray-800">EXX</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">SSR25/42</td>
                              <td className="border border-gray-300 px-4 py-2">42</td>
                              <td rowSpan={2} className="border border-gray-300 px-4 py-2">Softer sedimentary rocks such as marls, mudstones, siltstone</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">SSR25/51</td>
                              <td className="border border-gray-300 px-4 py-2">51</td>
                            </tr>
                            
                            {/* ES-F Category */}
                            <tr className="bg-gray-200">
                              <td colSpan={3} className="border border-gray-300 px-4 py-2 font-semibold text-gray-800">ES-F</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">SSR25/42</td>
                              <td className="border border-gray-300 px-4 py-2">42</td>
                              <td rowSpan={2} className="border border-gray-300 px-4 py-2">Gravel, soft rock</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">SSR25/51</td>
                              <td className="border border-gray-300 px-4 py-2">57.5</td>
                            </tr>
                            
                            {/* ESS-F Category */}
                            <tr className="bg-gray-200">
                              <td colSpan={3} className="border border-gray-300 px-4 py-2 font-semibold text-gray-800">ESS-F</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">SSR25/42</td>
                              <td className="border border-gray-300 px-4 py-2">42</td>
                              <td rowSpan={2} className="border border-gray-300 px-4 py-2">Weathered rock, stone walls, rubble</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">SSR25/51</td>
                              <td className="border border-gray-300 px-4 py-2">51</td>
                            </tr>
                            
                            {/* EY Category */}
                            <tr className="bg-gray-200">
                              <td colSpan={3} className="border border-gray-300 px-4 py-2 font-semibold text-gray-800">EY</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">SSR25/51</td>
                              <td className="border border-gray-300 px-4 py-2">51</td>
                              <td className="border border-gray-300 px-4 py-2">Competent ground, strong rock</td>
                            </tr>
                          </tbody>
                        </table>
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
    </div>
  )
}

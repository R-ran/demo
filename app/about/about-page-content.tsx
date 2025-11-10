"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Building2, Factory, Award, X } from "lucide-react"

// 关于我们分类数据
const aboutCategories = [
  {
    id: "why-choose-us",
    title: "Why choose us",
    subtitle: "Why choose us",
    href: "/about/why-choose-us",
  },
  {
    id: "factory",
    title: "Factory Overview",
    subtitle: "Factory Overview",
    href: "/about/factory",
  },
  {
    id: "history",
    title: "History",
    subtitle: "History",
    href: "/about/history",
  },
  {
    id: "certificate",
    title: "Certificate",
    subtitle: "Certificate",
    href: "/about/certificate",
  },
]

// 所有关于我们的详细数据
const aboutItems = [
  {
    id: "why-choose-us",
    title: "Why choose us",
    description:
      "Discover what sets us apart in the geotechnical anchoring industry with our commitment to quality and innovation.",
    detailedDescription:
      "SINOROCK stands out as a leading provider of geotechnical anchoring solutions through our unwavering commitment to quality, innovation, and customer satisfaction. With years of expertise in the industry, we have established ourselves as a trusted partner for projects worldwide. Our comprehensive product range, cutting-edge technology, and dedicated support team ensure that every project receives the highest level of service and attention to detail.",
    icon: Award,
    image: "/why.jpg",
    imageAlt: "Engineering team reviewing SINOROCK self-drilling anchor solutions",
    href: "/about/why-choose-us",
  },
  {
    id: "factory",
    title: "Factory Overview",
    description:
      "Explore our state-of-the-art manufacturing facilities equipped with advanced technology and quality control systems.",
    detailedDescription:
      "Our state-of-the-art manufacturing facilities represent the pinnacle of modern production capabilities. Spanning over extensive grounds, our factories are equipped with advanced machinery and cutting-edge technology that enable us to produce high-quality anchor bolts and geotechnical solutions at scale. We maintain strict quality control systems throughout the production process, ensuring that every product meets international standards. Our facilities feature automated production lines, precision testing equipment, and dedicated quality assurance teams that work together to deliver excellence in every product we manufacture.",
    icon: Factory,
    image: "/industrial-factory-production-floor.jpg",
    imageAlt: "Automated production lines inside SINOROCK anchor bolt factory",
    href: "/about/factory",
  },
  {
    id: "history",
    title: "History",
    description:
      "Learn about our journey from inception to becoming a leading provider of geotechnical anchoring solutions.",
    detailedDescription:
      "Since our founding, SINOROCK has been on a remarkable journey of growth and innovation. Starting as a small operation with a vision to revolutionize geotechnical anchoring, we have steadily expanded our capabilities and market presence. Over the years, we have invested heavily in research and development, manufacturing infrastructure, and talent acquisition. Today, we are proud to be recognized as a leading provider of geotechnical anchoring solutions, serving clients across multiple continents and industries. Our history is a testament to our commitment to excellence and our dedication to meeting the evolving needs of the construction and mining sectors.",
    icon: Building2,
    image: "/history.jpg",
    imageAlt: "Historical collage showcasing SINOROCK milestones and projects",
    href: "/about/history",
  },
  {
    id: "certificate",
    title: "Certificate",
    description:
      "View our certifications and quality standards that demonstrate our commitment to excellence and safety.",
    detailedDescription:
      "Quality and safety are at the core of everything we do at SINOROCK. We have obtained numerous international certifications and quality standards that validate our commitment to excellence. Our certifications include ISO 9001:2015 for quality management systems, demonstrating our systematic approach to maintaining the highest standards in all our operations. These certifications are not just badges of honor—they represent our ongoing dedication to continuous improvement, rigorous quality control, and adherence to international best practices. We regularly undergo audits and assessments to ensure we maintain these standards and continue to exceed industry expectations.",
    icon: Award,
    image: "/zhengshu.jpg",
    imageAlt: "Display case featuring SINOROCK ISO and safety certifications",
    href: "/about/certificate",
  },
]

export default function AboutPageClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AboutPageContent />
    </Suspense>
  )
}

function AboutPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const sectionParam = searchParams.get("section")
    if (sectionParam) {
      const normalized = sectionParam.toLowerCase()
      const matchingCategory = aboutCategories.find(
        (category) => category.id.toLowerCase() === normalized,
      )
      if (matchingCategory) {
        setSelectedCategory(matchingCategory.id)
        setTimeout(() => {
          const navElement = document.querySelector('[data-nav-section]')
          if (navElement) {
            navElement.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 100)
        router.replace("/about", { scroll: false })
      }
    }
  }, [searchParams, router])

  const selectedItem = selectedCategory
    ? aboutItems.find((item) => item.id === selectedCategory)
    : null

  const handleCardClick = (itemId: string) => {
    setSelectedCategory(itemId)
    setTimeout(() => {
      const navElement = document.querySelector('[data-nav-section]')
      if (navElement) {
        navElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleLearnMoreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted")
    alert("Message sent successfully!")
    setShowModal(false)
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

          <p className=" text-muted-foreground max-w-2xl mx-auto mb-12">
            Learn more about our company, team, and state-of-the-art manufacturing facilities.
          </p>
        </div>

        {/* About Categories Navigation */}
        <div className="container mx-auto px-4 mb-8" data-nav-section>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-700">
              {aboutCategories.map((category) => {
                const isSelected = selectedCategory === category.id
                return (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
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
                        {/* 你可以在这里放图标或图片 */}
                      </div>
                      <div className="text-center">
                        <h3 className="text-white text-2xl font-bold mb-1">{category.title}</h3>
                        <p className="text-white/80 text-sm">{category.subtitle}</p>
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
          <div className="container mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.imageAlt || selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <selectedItem.icon className="h-12 w-12 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold">{selectedItem.title}</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {selectedItem.detailedDescription}
                </p>
                <button
                  onClick={handleLearnMoreClick}
                  className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                  className="cursor-pointer"
                >
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all h-full">
                    <CardContent className="p-0">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.imageAlt || item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <item.icon className="h-12 w-12 text-primary mb-2" />
                          <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

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


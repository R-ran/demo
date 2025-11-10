import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Award, Factory, Building2 } from "lucide-react"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us",
}


const aboutItems: Record<string, {
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
    detailedDescription: "SINOROCK stands out as a leading provider of geotechnical anchoring solutions through our unwavering commitment to quality, innovation, and customer satisfaction. With years of expertise in the industry, we have established ourselves as a trusted partner for projects worldwide. Our comprehensive product range, cutting-edge technology, and dedicated support team ensure that every project receives the highest level of service and attention to detail.",
    image: "/why.jpg",
    imageAlt: "Engineers collaborating on SINOROCK self-drilling anchor bolt solutions",
    icon: Award,
  },
  "factory": {
    title: "Factory Overview",
    description: "Explore our state-of-the-art manufacturing facilities equipped with advanced technology and quality control systems.",
    detailedDescription: "Our state-of-the-art manufacturing facilities represent the pinnacle of modern production capabilities. Spanning over extensive grounds, our factories are equipped with advanced machinery and cutting-edge technology that enable us to produce high-quality anchor bolts and geotechnical solutions at scale. We maintain strict quality control systems throughout the production process, ensuring that every product meets international standards. Our facilities feature automated production lines, precision testing equipment, and dedicated quality assurance teams that work together to deliver excellence in every product we manufacture.",
    image: "/industrial-factory-production-floor.jpg",
    imageAlt: "Automated production lines operating inside SINOROCK's factory",
    icon: Factory,
  },
  "history": {
    title: "History",
    description: "Learn about our journey from inception to becoming a leading provider of geotechnical anchoring solutions.",
    detailedDescription: "Since our founding, SINOROCK has been on a remarkable journey of growth and innovation. Starting as a small operation with a vision to revolutionize geotechnical anchoring, we have steadily expanded our capabilities and market presence. Over the years, we have invested heavily in research and development, manufacturing infrastructure, and talent acquisition. Today, we are proud to be recognized as a leading provider of geotechnical anchoring solutions, serving clients across multiple continents and industries. Our history is a testament to our commitment to excellence and our dedication to meeting the evolving needs of the construction and mining sectors.",
    image: "/history.jpg",
    imageAlt: "Historical images tracing SINOROCK's development milestones",
    icon: Building2,
  },
  "certificate": {
    title: "Certificate",
    description: "View our certifications and quality standards that demonstrate our commitment to excellence and safety.",
    detailedDescription: "Quality and safety are at the core of everything we do at SINOROCK. We have obtained numerous international certifications and quality standards that validate our commitment to excellence. Our certifications include ISO 9001:2015 for quality management systems, demonstrating our systematic approach to maintaining the highest standards in all our operations. These certifications are not just badges of honor—they represent our ongoing dedication to continuous improvement, rigorous quality control, and adherence to international best practices. We regularly undergo audits and assessments to ensure we maintain these standards and continue to exceed industry expectations.",
    image: "/zhengshu.jpg",
    imageAlt: "Wall showcasing SINOROCK quality and safety certifications",
    icon: Award,
  },
}

export default function AboutPage({ params }: { params: { section: string } }) {
  const section = params?.section || ""
  const item = aboutItems[section]

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-4">Section Not Found</h1>
            <Link href="/about">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to About Us
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
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
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt; <Link href="/about" className="hover:text-primary">About Us</Link> &gt; {item.title}
          </div>
        </div>

        <div className="container mx-auto px-4 mb-16">
          <Link href="/about">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to About Us
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
              {/* Image Section */}
              <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg">
              <img
                src={item.image || "/placeholder.svg"}
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
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {item.detailedDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

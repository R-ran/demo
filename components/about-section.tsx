import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Factory, Award } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us",
}

const aboutItems = [
  {
    id: "why-choose-us",
    title: "Why choose us",
    description:
      "Discover what sets us apart in the geotechnical anchoring industry with our commitment to quality and innovation.",
    icon: Award,
    image: "/why.jpg",
    imageAlt: "Engineering team collaborating on SINOROCK geotechnical solutions",
    href: "/about/why-choose-us",
  },
  {
    id: "factory",
    title: "Factory Overview",
    description:
      "Explore our state-of-the-art manufacturing facilities equipped with advanced technology and quality control systems.",
    icon: Factory,
    image: "/industrial-factory-production-floor.jpg",
    imageAlt: "Interior of SINOROCK's advanced anchor bolt manufacturing facility",
    href: "/about/factory",
  },
  {
    id: "history",
    title: "History",
    description:
      "Learn about our journey from inception to becoming a leading provider of geotechnical anchoring solutions.",
    icon: Building2,
    image: "/history.jpg",
    imageAlt: "Historical display of SINOROCK project milestones",
    href: "/about/history",
  },
  {
    id: "certificate",
    title: "Certificate",
    description:
      "View our certifications and quality standards that demonstrate our commitment to excellence and safety.",
    icon: Award,
    image: "/zhengshu.jpg",
    imageAlt: "Certificates highlighting SINOROCK quality and safety achievements",
    href: "/about/certificate",
  },
]

export function AboutSection() {
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
          {aboutItems.map((item) => (
            <Link key={item.id} href="/about">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

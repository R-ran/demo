import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Testimonials",
}


const chinaProjects = [
  {
    id: 1,
    name: "Beijing Subway Line 16",
    location: "Beijing, China",
    description:
      "Successfully provided rock bolt solutions for the construction of Beijing Subway Line 16, ensuring structural stability in complex geological conditions.",
    image: "/beijing.jpg",
    imageAlt: "Beijing Subway Line 16 tunnel reinforced with SINOROCK anchor bolts",
    year: "2023",
    slug: "beijing-subway-line-16",
    category: "China Projects",
  },
  {
    id: 2,
    name: "Sichuan Hydropower Station",
    location: "Sichuan, China",
    description:
      "Delivered high-performance anchor systems for the underground powerhouse excavation of a major hydropower project in mountainous terrain.",
    image: "/sichuan.jpg",
    imageAlt: "Sichuan hydropower excavation supported by SINOROCK anchoring systems",
    year: "2022",
    slug: "sichuan-hydropower-foundation",
    category: "China Projects",
  },
]

const overseasProjects = [
  {
    id: 3,
    name: "Swiss Alpine Tunnel",
    location: "Switzerland",
    description:
      "Provided T Thread self-drilling anchor bolts for a major alpine tunnel project, meeting stringent European safety standards.",
    image: "/overseas1.jpg",
    imageAlt: "Swiss alpine tunnel construction featuring SINOROCK self-drilling anchors",
    year: "2023",
    slug: "high-rise-foundation",
    category: "Overseas Projects",
  },
  {
    id: 4,
    name: "Australian Mining Project",
    location: "Western Australia",
    description:
      "Supplied corrosion-resistant rock bolts for underground mining operations in harsh environmental conditions.",
    image: "/overseas2.jpg",
    imageAlt: "Australian mining operation reinforced with SINOROCK corrosion-resistant bolts",
    year: "2022",
    slug: "mountain-highway-slope",
    category: "Overseas Projects",
  },
]

export function TestimonialsSection() {
  const allProjects = [...chinaProjects, ...overseasProjects];

  return (
    <section id="testimonials" className="py-2 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/successful-projects" className="inline-block group">
            <h2 className="text-4xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
              <span className="text-foreground">SUCCESSFUL </span>
              <span className="text-primary">PROJECTS</span>
            </h2>
            <div className="w-20 h-1 bg-primary group-hover:w-24 transition-all" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allProjects.map((project) => (
            <Link 
              key={project.id} 
              href="/successful-projects"
            >
              <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all h-full">
                <CardContent className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.imageAlt || project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-primary font-semibold mb-2 text-sm">
                        {project.year}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground mb-2 text-sm">{project.location}</p>
                    <p className="text-muted-foreground">{project.description}</p>
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

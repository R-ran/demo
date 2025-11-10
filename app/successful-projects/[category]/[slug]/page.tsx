"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// 项目详情数据
const projectDetails: Record<string, Record<string, {
  title: string
  description: string
  fullDescription: string
  image: string
  imageAlt: string
  location: string
  year: string
  category: string
}>> = {
  "China Projects": {
    "tala-hydro-project": {
      title: "The Application of Self Drilling Anchor Bolt at the Tala Hydro Project for Tunneling in Poor Rock Mass Conditions",
      description: "The Tala hydroelectric project is located in Chukha Dzongkhag in western Bhutan.",
      fullDescription: "The Tala hydroelectric project is located in Chukha Dzongkhag in western Bhutan. The dam structure required extensive tunneling through challenging rock mass conditions. Our self-drilling anchor bolts provided reliable support during the excavation process, ensuring the safety and stability of the tunnel construction. The project successfully navigated through poor rock mass conditions, demonstrating the effectiveness of our anchoring solutions in challenging geological environments.",
      image: "/beijing.jpg",
      imageAlt: "Workers installing SINOROCK anchor bolts at the Tala Hydro Project tunnel entrance",
      location: "Chukha Dzongkhag, Bhutan",
      year: "2023",
      category: "underground",
    },
    "gaojiaping-tunnel": {
      title: "Pre-support with Pipe Umbrella System for Gaojiaping Tunnel",
      description: "The success of the Gaojiaping Tunnel's construction demonstrates the ingenuity of Sinorock's pipe umbrella system.",
      fullDescription: "The success of the Gaojiaping Tunnel's construction demonstrates the ingenuity of Sinorock's pipe umbrella system. This innovative approach ensured safe and efficient tunnel excavation through complex geological formations. The pipe umbrella pre-support system provided excellent ground stabilization, allowing for smooth tunnel advancement while maintaining structural integrity throughout the construction process.",
      image: "/sichuan.jpg",
      imageAlt: "Gaojiaping Tunnel heading reinforced by SINOROCK pipe umbrella pre-support",
      location: "China",
      year: "2022",
      category: "underground",
    },
    "beijing-subway-line-16": {
      title: "Beijing Subway Line 16 Underground Construction",
      description: "Successfully provided rock bolt solutions for the construction of Beijing Subway Line 16.",
      fullDescription: "Successfully provided rock bolt solutions for the construction of Beijing Subway Line 16, ensuring structural stability in complex geological conditions. The project required precise anchoring techniques to support the subway tunnel excavation in urban areas with varying soil conditions.",
      image: "/beijing.jpg",
      imageAlt: "Construction crew securing Beijing Subway Line 16 tunnel with SINOROCK bolts",
      location: "Beijing, China",
      year: "2023",
      category: "underground",
    },
  },
  "Overseas Projects": {
    "high-rise-foundation": {
      title: "Foundation Reinforcement Project for High-Rise Building",
      description: "Applied advanced anchor bolt systems for foundation reinforcement in challenging soil conditions.",
      fullDescription: "Applied advanced anchor bolt systems for foundation reinforcement in challenging soil conditions, ensuring the stability of a 50-story high-rise building in Shanghai. The project involved extensive foundation work to support the massive structure, utilizing our high-performance anchor bolts to provide reliable load-bearing capacity in soft soil conditions.",
      image: "/overseas1.jpg",
      imageAlt: "High-rise development site with SINOROCK hollow anchor bolts reinforcing the foundation",
      location: "Shanghai, China",
      year: "2023",
      category: "foundation",
    },
    "sichuan-hydropower-foundation": {
      title: "Sichuan Hydropower Station Foundation",
      description: "Delivered high-performance anchor systems for the underground powerhouse excavation.",
      fullDescription: "Delivered high-performance anchor systems for the underground powerhouse excavation of a major hydropower project in mountainous terrain. The foundation work required specialized anchoring solutions to support the massive power generation infrastructure in challenging geological conditions.",
      image: "/sichuan.jpg",
      imageAlt: "Hydropower powerhouse excavation stabilized by SINOROCK anchoring systems",
      location: "Sichuan, China",
      year: "2022",
      category: "foundation",
    },
  },
  "slope-stabilization": {
    "mountain-highway-slope": {
      title: "Slope Stabilization for Mountain Highway",
      description: "Successfully stabilized unstable slopes using self-drilling anchor bolts along critical highway sections.",
      fullDescription: "Successfully stabilized unstable slopes using self-drilling anchor bolts along critical highway sections, preventing landslides and ensuring road safety. The project involved extensive slope reinforcement work along a mountainous highway, where unstable rock formations posed significant risks to traffic safety. Our self-drilling anchor bolt system provided reliable slope stabilization, ensuring long-term road safety and preventing potential geological hazards.",
      image: "/overseas2.jpg",
      imageAlt: "Mountain highway cliff reinforced with SINOROCK self-drilling anchors",
      location: "Mountain Region, China",
      year: "2023",
      category: "slope-stabilization",
    },
    "mining-slope-stabilization": {
      title: "Rock Slope Stabilization in Mining Area",
      description: "Implemented comprehensive slope stabilization solutions using corrosion-resistant anchor bolts.",
      fullDescription: "Implemented comprehensive slope stabilization solutions using corrosion-resistant anchor bolts in a mining operation, ensuring long-term stability. The project addressed slope stability concerns in an active mining area, where rock formations required reinforcement to prevent potential collapses and ensure worker safety.",
      image: "/overseas1.jpg",
      imageAlt: "Mining pit slope secured with SINOROCK corrosion-resistant anchor bolts",
      location: "Mining Area, China",
      year: "2022",
      category: "slope-stabilization",
    },
  },
}

const categoryNames: Record<string, string> = {
  "China Projects": "China Projects",
  "Overseas Projects": "Overseas Projects",

}

export default function ProjectDetailPage({ params }: { params: { category: string; slug: string } }) {
  const category = params?.category || ""
  const slug = params?.slug || ""
  const project = projectDetails[category]?.[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <Link href="/successful-projects">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
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
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt;{" "}
            <Link href="/successful-projects" className="hover:text-primary">Project</Link> &gt;{" "}
            <Link href={`/successful-projects/${category}`} className="hover:text-primary">
              {categoryNames[category] || category}
            </Link>{" "}
            &gt; {project.title}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <Link href={`/successful-projects/${category}`}>
                <Button variant="ghost">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to {categoryNames[category] || category}
                </Button>
              </Link>
            </div>

            {/* Project Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.imageAlt || project.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Location:</span>
                    {project.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Year:</span>
                    {project.year}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Category:</span>
                    {categoryNames[category] || category}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Superior strength and durability</li>
                  <li>• Corrosion-resistant materials</li>
                  <li>• Easy installation process</li>
                  <li>• Compliant with industry standards</li>
                  <li>• Proven track record in similar projects</li>
                </ul>
              </div>

              <div className="pt-6">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Contact Us for Similar Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


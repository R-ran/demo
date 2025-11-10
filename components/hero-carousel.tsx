"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "SINOROCK SDA BOLT",
    subtitle: "GREAT REPUTATION IN THE INDUSTRY",
    description: "ESCORT YOUR PROJECT",
    image: "/industrial-construction-site-with-rock-bolts.jpg",
    imageAlt: "SINOROCK self-drilling anchor bolts reinforcing an industrial construction site",
  },
  {
    title: "INNOVATIVE SOLUTIONS",
    subtitle: "LEADING TECHNOLOGY",
    description: "SAFER SPACE, BETTER LIFE",
    image: "/modern-factory-production-line.png",
    imageAlt: "Modern SINOROCK factory production line manufacturing anchor bolts",
  },
  {
    title: "QUALITY ASSURANCE",
    subtitle: "TRUSTED WORLDWIDE",
    description: "EXCELLENCE IN EVERY DETAIL",
    image: "/quality-control-inspection-equipment.jpg",
    imageAlt: "Quality control inspection of SINOROCK anchor bolt components",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section id="hero" className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/50" />
          <img
            src={slide.image || "/placeholder.svg"}
            alt={slide.imageAlt || slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <div className="w-16 h-1 bg-primary mb-6" />
                <h1 className="text-5xl font-bold text-white mb-4 text-balance">{slide.title}</h1>
                <p className="text-2xl text-white/90 mb-2">{slide.subtitle}</p>
                <p className="text-xl text-white/80">{slide.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

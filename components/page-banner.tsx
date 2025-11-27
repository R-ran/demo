"use client"

interface PageBannerProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
}

export function PageBanner({ title, subtitle, backgroundImage = "/industrial-factory-production-floor.jpg" }: PageBannerProps) {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
    </div>
  )
}


"use client"

interface PageBannerProps {
  title: string
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
      >
        {/* 半透明深灰色覆盖层 */}
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>
      
      {/* 内容 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}


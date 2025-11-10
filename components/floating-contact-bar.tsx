"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail } from "lucide-react"

// 微信图标 SVG
const WechatIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="15" cy="12" r="1" />
  </svg>
)

export function FloatingContactBar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const email = "sinorock@sinorockco.com"
  const whatsapp = "+8618662678180"
  const wechatQRCode = "/wechat-qr.png" // 微信二维码图片路径

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`
  }

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`, "_blank")
  }

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999]">
      <div className="flex flex-col bg-[#1e3a5f] rounded-l-lg shadow-2xl overflow-visible">
        {/* Email */}
        <div
          className="relative"
          onMouseEnter={() => setHoveredItem("email")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button
            onClick={handleEmailClick}
            className={`p-4 text-white transition-all ${
              hoveredItem === "email" ? "bg-[#2a4a6f]" : "hover:bg-[#2a4a6f]"
            }`}
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </button>
          {hoveredItem === "email" && (
            <div className="absolute right-full top-0 mr-2 bg-[#1e3a5f] text-white px-4 py-3 rounded-lg whitespace-nowrap shadow-xl z-[10000]">
              <div className="text-sm font-medium">{email}</div>
              <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#1e3a5f]"></div>
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp */}
        <div
          className="relative"
          onMouseEnter={() => setHoveredItem("whatsapp")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button
            onClick={handleWhatsAppClick}
            className={`p-4 text-white transition-all ${
              hoveredItem === "whatsapp" ? "bg-[#2a4a6f]" : "hover:bg-[#2a4a6f]"
            }`}
            aria-label="WhatsApp"
          >
            <Image src="/WhatsApp.png" alt="WhatsApp icon for SINOROCK support" width={24} height={24} className="w-6 h-6" />
          </button>
          {hoveredItem === "whatsapp" && (
            <div className="absolute right-full top-0 mr-2 bg-[#1e3a5f] text-white px-4 py-3 rounded-lg whitespace-nowrap shadow-xl z-[10000]">
              <div className="text-sm font-medium">WhatsApp: {whatsapp}</div>
              <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#1e3a5f]"></div>
              </div>
            </div>
          )}
        </div>

        {/* WeChat */}
        <div
          className="relative"
          onMouseEnter={() => setHoveredItem("wechat")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button
            className={`p-4 text-white transition-all ${
              hoveredItem === "wechat" ? "bg-[#2a4a6f]" : "hover:bg-[#2a4a6f]"
            }`}
            aria-label="WeChat"
          >
            <Image src="/WeChat.png" alt="WeChat icon for SINOROCK service" width={24} height={24} className="w-6 h-6" />
          </button>
          {hoveredItem === "wechat" && (
            <div className="absolute right-full top-0 mr-2 bg-white p-4 rounded-lg shadow-xl z-[10000]">
              <div className="w-36 h-36 bg-gray-50 rounded border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={wechatQRCode}
                  alt="Scan to connect with SINOROCK support on WeChat"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // 如果图片加载失败，显示占位符
                    const target = e.target as HTMLImageElement
                    target.src = "/xinhong logo.png?height=144&width=144&text=WeChat+QR"
                  }}
                />
              </div>
              <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


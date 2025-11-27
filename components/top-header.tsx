"use client"

import { Facebook, Youtube, Linkedin, Search, Download, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

export function TopHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  // 模拟搜索数据（实际应该从API或内容管理系统获取）
  const searchableContent = [
    { title: "Self-Drilling Anchor Bolt", category: "Products", url: "/products/self-drilling-bolt" },
    { title: "Hollow Grouted Anchor Bolt", category: "Products", url: "/products/hollow-grouted-bolt" },
    { title: "China Projects", category: "Projects", url: "/successful-projects/china" },
    { title: "Overseas Projects", category: "Projects", url: "/successful-projects/overseas" },
    { title: "Why Choose Us", category: "About", url: "/about/why-choose-us" },
    { title: "Factory Overview", category: "About", url: "/about/factory" },
    { title: "News & Blogs", category: "News", url: "/news-blogs" },
    { title: "Contact Us", category: "Contact", url: "/contact" },
  ]

  // 执行搜索
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchableContent.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // 处理ESC键关闭搜索和点击外部关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isSearchOpen && !target.closest('.search-dropdown') && !target.closest('[aria-label="Search"]')) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    window.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handleClickOutside)
    
    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchOpen])

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <div className="bg-background border-b">
      {/* Top utility bar */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-10 sm:h-12 text-xs sm:text-sm">
            {/* Email - 移动端隐藏文字，只显示图标或简化 */}
            <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
              <span className="hidden sm:inline">Email:</span>
              <a href="mailto:sales@cnxhanchor.com" className="hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none">
                <span className="hidden sm:inline">export@cnxhanchor.com</span>
                <span className="sm:hidden text-[10px]">Email</span>
              </a>
            </div>
            <div className="flex items-center gap-1 sm:gap-4">
              
              
              {/* 语言选择 - 移动端简化 */}
              <select className="bg-transparent border-none text-muted-foreground hover:text-primary cursor-pointer text-xs sm:text-sm">
                <option>EN</option>
               
              </select>
              <div className="relative">
                                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo and tagline section */}
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between py-3 sm:py-6">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-shrink-0">
                <Image 
                  src="/xinhong logo.png" 
                  alt="XINHONG" 
                  width={256} 
                  height={128}
                  className="w-auto h-12 sm:h-16 md:h-20 object-contain"
                />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">XINHONG</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Hollow Anchor Bolts</p>
            </div>
          </div>

          {/* Tagline with handwriting font - 移动端隐藏 */}
          <div className="hidden md:block text-center">
            <p className="text-2xl md:text-3xl text-primary" style={{ fontFamily: "var(--font-handwriting)" }}>
            Authentic Quality
            </p>
            <p className="text-2xl md:text-3xl text-foreground" style={{ fontFamily: "var(--font-handwriting)" }}>
            Consistent Stability
            </p>
          </div>

          {/* Social media icons - 移动端简化 */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/wuxi-oriental-xinhong-hollow-anchor-bolt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

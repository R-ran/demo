"use client"

import { Facebook, Twitter, Youtube, Linkedin, Search, Download, X, Menu } from "lucide-react"
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
              <a href="mailto:sinorock@sinorockco.com" className="hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none">
                <span className="hidden sm:inline">sinorock@sinorockco.com</span>
                <span className="sm:hidden text-[10px]">Email</span>
              </a>
            </div>
            <div className="flex items-center gap-1 sm:gap-4">
              {/* Download按钮 - 移动端只显示图标 */}
              <Button variant="secondary" size="sm" className="gap-1 sm:gap-2 px-2 sm:px-3">
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              {/* Support链接 - 移动端隐藏 */}
              <Link href="/support" className="hidden sm:inline text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
              {/* 语言选择 - 移动端简化 */}
              <select className="bg-transparent border-none text-muted-foreground hover:text-primary cursor-pointer text-xs sm:text-sm">
                <option>EN</option>
                <option>中文</option>
              </select>
              <div className="relative">
                <button
                  onClick={handleSearchClick}
                  className="text-muted-foreground hover:text-primary transition-colors p-1"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Search Dropdown */}
                {isSearchOpen && (
                  <div className="search-dropdown absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                    <div className="p-3 sm:p-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
                          autoFocus
                        />
                        <button
                          onClick={handleCloseSearch}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Close search"
                        >
                          <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                    {searchQuery.trim() && (
                      <div className="max-h-96 overflow-y-auto">
                        {searchResults.length > 0 ? (
                          <div className="p-2">
                            {searchResults.map((result, index) => (
                              <Link
                                key={index}
                                href={result.url}
                                onClick={handleCloseSearch}
                                className="block px-3 sm:px-4 py-2 sm:py-3 hover:bg-muted/50 transition-colors rounded-md"
                              >
                                <div className="font-medium text-foreground text-sm sm:text-base">{result.title}</div>
                                <div className="text-xs sm:text-sm text-muted-foreground">{result.category}</div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 sm:p-8 text-center text-muted-foreground text-sm sm:text-base">
                            No results found for "{searchQuery}"
                          </div>
                        )}
                      </div>
                    )}
                    {!searchQuery.trim() && (
                      <div className="p-6 sm:p-8 text-center text-muted-foreground text-sm sm:text-base">
                        Type to search...
                      </div>
                    )}
                  </div>
                )}
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
            <div className="relative">
                <Image 
                  src="/xinhong logo.png" 
                  alt="XINHONG" 
                  width={128} 
                  height={128}
                  className="w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32"
                />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">XINHONG</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Engineering Excellence</p>
            </div>
          </div>

          {/* Tagline with handwriting font - 移动端隐藏 */}
          <div className="hidden md:block text-center">
            <p className="text-2xl md:text-3xl text-primary" style={{ fontFamily: "var(--font-handwriting)" }}>
              Safer space
            </p>
            <p className="text-2xl md:text-3xl text-foreground" style={{ fontFamily: "var(--font-handwriting)" }}>
              Better life
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
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
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
              href="https://linkedin.com"
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

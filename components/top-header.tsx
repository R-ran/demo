"use client"

import { Facebook, Twitter, Youtube, Linkedin, Search, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState, useEffect } from "react"

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
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Email:</span>
              <a href="mailto:sinorock@sinorockco.com" className="hover:text-primary transition-colors">
                sinorock@sinorockco.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
              <select className="bg-transparent border-none text-muted-foreground hover:text-primary cursor-pointer">
                <option>English</option>
                <option>中文</option>
              </select>
              <div className="relative">
                <button
                  onClick={handleSearchClick}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Search Dropdown */}
                {isSearchOpen && (
                  <div className="search-dropdown absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <Search className="w-5 h-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          autoFocus
                        />
                        <button
                          onClick={handleCloseSearch}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Close search"
                        >
                          <X className="w-5 h-5" />
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
                                className="block px-4 py-3 hover:bg-muted/50 transition-colors rounded-md"
                              >
                                <div className="font-medium text-foreground">{result.title}</div>
                                <div className="text-sm text-muted-foreground">{result.category}</div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center text-muted-foreground">
                            No results found for "{searchQuery}"
                          </div>
                        )}
                      </div>
                    )}
                    {!searchQuery.trim() && (
                      <div className="p-8 text-center text-muted-foreground">
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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">SINOROCK</h1>
              <p className="text-xs text-muted-foreground">Engineering Excellence</p>
            </div>
          </div>

          {/* Tagline with handwriting font */}
          <div className="text-center">
            <p className="text-3xl text-primary" style={{ fontFamily: "var(--font-handwriting)" }}>
              Safer space
            </p>
            <p className="text-3xl text-foreground" style={{ fontFamily: "var(--font-handwriting)" }}>
              Better life
            </p>
          </div>

          {/* Social media icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

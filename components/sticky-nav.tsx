"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"

const categories = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "products",
    label: "Products",
    href: "/products",
    dropdown: [
      { label: "XH self-drilling hollow anchor bolt", href: "/products?category=self-drilling" },
      { label: "XH common anchor bolt", href: "/products?category=common-anchor-bolt" },
      { label: "Combination hollow anchor bolt", href: "/products?category=combination-hollow" },
      { label: "Expansion-shell hollow anchor bolt", href: "/products?category=expansion-shell" },
      { label: "Accessories", href: "/products?category=accessories" },
    ],
  },
  {
    id: "successful-projects",
    label: "Successful Projects",
    href: "/successful-projects",
    dropdown: [
          { label: "China Projects", href: "/successful-projects?category=china" },
          { label: "Overseas Projects", href: "/successful-projects?category=overseas" },
    ],
  },
  {
    id: "about",
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "Why choose us", href: "/about?section=why-choose-us" },
      { label: "Factory Overview", href: "/about?section=factory-overview" },
      { label: "History", href: "/about?section=history" },
      { label: "Certificate", href: "/about?section=certificate" },
    ],
  },
  {
    id: "news-blogs",
    label: "News & Blogs",
    href: "/news-blogs",
    dropdown: [
      { label: "Xinghong News", href: "/news-blogs/news" },
      { label: "Blogs", href: "/news-blogs/blogs" },
    ],
  },
  {
    id: "contact",
    label: "Contact US",
    href: "/contact",
  },
]

export function StickyNav() {
  const [isSticky, setIsSticky] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 关闭移动端菜单当路由改变时
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        isSticky ? "bg-primary shadow-lg" : "bg-primary/95",
      )}
    >
      <div className="container mx-auto px-2 sm:px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-evenly h-14 lg:h-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => category.dropdown && setActiveDropdown(category.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {category.id === "news-blogs" ? (
                <a
                  href={category.href}
                  className={cn(
                    "px-3 lg:px-6 xl:px-8 py-3 lg:py-4 text-sm lg:text-base font-medium transition-colors flex items-center gap-1 lg:gap-2 cursor-pointer whitespace-nowrap",
                    pathname === category.href || pathname.startsWith(category.href + "/")
                      ? "bg-primary text-primary-foreground"
                      : "text-secondary-foreground hover:bg-primary/20",
                  )}
                >
                  {category.label}
                  {category.dropdown && <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />}
                </a>
              ) : (
                <Link href={category.href}>
                  <button
                    className={cn(
                      "px-3 lg:px-6 xl:px-8 py-3 lg:py-4 text-sm lg:text-base font-medium transition-colors flex items-center gap-1 lg:gap-2 cursor-pointer whitespace-nowrap",
                      pathname === category.href || pathname.startsWith(category.href + "/")
                        ? "bg-primary text-primary-foreground"
                        : "text-secondary-foreground hover:bg-primary/20",
                    )}
                  >
                    {category.label}
                    {category.dropdown && <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />}
                  </button>
                </Link>
              )}

              {category.dropdown && activeDropdown === category.id && (
                <div className="absolute top-full left-0 min-w-[200px] lg:min-w-[280px] bg-primary shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {category.dropdown.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 lg:px-6 py-2 lg:py-3 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-xs lg:text-sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between h-14">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-secondary-foreground hover:text-primary-foreground transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div className="text-sm font-medium text-secondary-foreground">
            Menu
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary border-t border-primary-foreground/10 animate-in slide-in-from-top duration-200">
            <div className="container mx-auto px-2 py-2">
              {categories.map((category) => (
                <div key={category.id} className="border-b border-primary-foreground/10 last:border-b-0">
                  {category.id === "news-blogs" ? (
                    <a
                      href={category.href}
                      className={cn(
                        "block px-4 py-3 text-sm font-medium transition-colors",
                        pathname === category.href || pathname.startsWith(category.href + "/")
                          ? "bg-primary-foreground/10 text-primary-foreground"
                          : "text-secondary-foreground",
                      )}
                    >
                      {category.label}
                    </a>
                  ) : (
                    <Link href={category.href}>
                      <div
                        className={cn(
                          "block px-4 py-3 text-sm font-medium transition-colors",
                          pathname === category.href || pathname.startsWith(category.href + "/")
                            ? "bg-primary-foreground/10 text-primary-foreground"
                            : "text-secondary-foreground",
                        )}
                      >
                        {category.label}
                      </div>
                    </Link>
                  )}

                  {/* Mobile Dropdown Items */}
                  {category.dropdown && (
                    <div className="bg-primary-foreground/5 pl-6">
                      {category.dropdown.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={cn(
                            "block px-4 py-2 text-xs text-secondary-foreground hover:bg-primary-foreground/10 transition-colors",
                            pathname === item.href ? "bg-primary-foreground/10 text-primary-foreground" : ""
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

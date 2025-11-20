"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

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
      { label: "Factory Overview", href: "/about?section=factory" },
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
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        isSticky ? "bg-primary shadow-lg" : "bg-primary/95",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-evenly h-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => category.dropdown && setActiveDropdown(category.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {category.id === "news-blogs" ? (
                // 对于News & Blogs，使用直接的a标签测试
                <a
                  href={category.href}
                  className={cn(
                    "px-8 py-4 text-base font-medium transition-colors flex items-center gap-2 cursor-pointer",
                    pathname === category.href || pathname.startsWith(category.href + "/")
                      ? "bg-primary text-primary-foreground"
                      : "text-secondary-foreground hover:bg-primary/20",
                  )}
                >
                  {category.label}
                  {category.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>
              ) : (
                <Link href={category.href}>
                  <button
                    className={cn(
                      "px-8 py-4 text-base font-medium transition-colors flex items-center gap-2 cursor-pointer",
                      pathname === category.href || pathname.startsWith(category.href + "/")
                        ? "bg-primary text-primary-foreground"
                        : "text-secondary-foreground hover:bg-primary/20",
                    )}
                  >
                    {category.label}
                    {category.dropdown && <ChevronDown className="w-4 h-4" />}
                  </button>
                </Link>
              )}

              {category.dropdown && activeDropdown === category.id && (
                <div className="absolute top-full left-0 min-w-[280px] bg-primary shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {category.dropdown.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-6 py-3 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-sm"
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
    </nav>
  )
}

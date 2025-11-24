"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Facebook, Twitter, Youtube, Linkedin } from "lucide-react"

const productLinks = [
  { name: "XH self-drilling hollow anchor bolt", href: "/products/self-drilling-bolt" },
  { name: "XH common anchor bolt", href: "/products/common-anchor-bolt" },
  { name: "Combination hollow anchor bolt", href: "/products/combination-hollow-bolt" },
  { name: "Expansion-shell hollow anchor bolt", href: "/products/expansion-shell-bolt" },
  { name: "Accessories", href: "/products/accessories" },
]

export function Footer() {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <footer id="contact" className="bg-primary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Products Column */}
          <div>
            <h3 className="text-4xl font-bold mb-8 text-write">PRODUCTS</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary-foreground/80 hover:text-black/80 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media Links */}
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/80 hover:text-black/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/80 hover:text-black/80 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/80 hover:text-black/80 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/80 hover:text-black/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Logo Column */}
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
              <Image src="/xinhong logo.png" 
              alt="XinHong company logo"
              width={512} 
              height={512} 
              className="mx-auto"
              />
            </div>
            <p className="text-3xl text-center font-bold">XinHong</p>
            <p className="text-1xl text-black/60 mt-4 text-center">Safer Space, Better Life</p>
          </div>

          {/* Inquiry Form Column */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-write">INQUIRY</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="company" className="text-secondary-foreground">
                  *Company:
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-secondary-foreground">
                  *Email:
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-secondary-foreground">
                  *Message:
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground min-h-24"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-write hover:bg-black transition-all">
                SEND NOW
              </Button>
            </form>
          </div>
        </div>



       
        <div className="mt-4 pt-2 border-t border-secondary-foreground/20 text-center text-sm text-black/60">
          <p>© 2025 XINHONG Technology Co., Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

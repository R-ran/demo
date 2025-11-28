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
    phone: "",
    message: "",
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // 将 company 映射为 API 期望的 name 字段
          name: formData.company,
          email: formData.email,
          phone: formData.phone,
          country: 'Not provided', // 表单没有这个字段，提供默认值
          message: formData.message
        })
      })

      if (res.ok) {
        setStatus('success')
        // 清空表单
        setFormData({ company: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer id="contact" className="bg-white text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Products Column */}
          <div>
            <h3 className="text-4xl font-bold mb-8 text-black">PRODUCTS</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-black/80 hover:text-black/80 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media Links */}
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.facebook.com/people/Xinhong-Hollow-Anchor-Bolt-China-Factory/61584574700620/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/80 hover:text-black/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
             
              <a
                href="https://www.linkedin.com/company/wuxi-oriental-xinhong-hollow-anchor-bolt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/80 hover:text-black/80 transition-colors"
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
            <p className="text-1xl text-black/60 mt-4 text-center">Authentic Quality, Consistent Stability</p>
          </div>

          {/* Inquiry Form Column */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-black">INQUIRY</h3>
            
            {/* 状态提示 */}
            {status === 'success' && (
              <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg border border-green-200 text-sm">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm">
                ✗ Failed to send message. Please try again or email us directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="footer-company" className="text-black">
                  *Company:
                </Label>
                <Input
                  id="footer-company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-black/10 border-black/20 text-black"
                  required
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <Label htmlFor="footer-email" className="text-black">
                  *Email:
                </Label>
                <Input
                  id="footer-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/10 border-black/20 text-black"
                  required
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <Label htmlFor="footer-phone" className="text-black">
                  Phone Number:
                </Label>
                <Input
                  id="footer-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-black/10 border-black/20 text-black"
                  placeholder="+86 123 4567 8900"
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <Label htmlFor="footer-message" className="text-black">
                  *Message:
                </Label>
                <Textarea
                  id="footer-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-black/10 border-black/20 text-black min-h-24"
                  required
                  disabled={status === 'loading'}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-black text-white hover:bg-black/80 transition-all"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'SEND NOW'}
              </Button>
            </form>
          </div>
        </div>



       
        <div className="mt-4 pt-2 border-t border-black/20 text-center text-sm text-black/60">
          <p>© 2025 XINHONG Technology Co., Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

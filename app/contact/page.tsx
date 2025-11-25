"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { useEffect } from "react"

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12 pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Get in touch with us for inquiries, support, or partnership opportunities.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We're here to help and answer any question you might have. We look forward to hearing from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">export@cnxhanchor.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+86 189 6183 8902</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Address</h3>
                    <p className="text-muted-foreground">
                    Room 2208, Fengshang Cultural and Creative Center, Minfeng Road, Liangxi District, Wuxi City, Jiangsu Province, China
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Factory Address</h3>
                    <p className="text-muted-foreground">
                    Ronghu Village, Yuqi Supporting Area, Huishan Economic Development Zone, Wuxi City, Jiangsu Province, China
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name *
                  </label>
                  <Input id="company" placeholder="Your company name" required />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="+86 123 4567 8900" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea id="message" placeholder="Tell us about your project or inquiry..." rows={6} required />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Map - 占满一整行 */}
          <div className="w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm mt-12">
            <iframe
              title="XinHong Location"
              src="https://www.google.com/maps?q=Room+2208,+Fengshang+Cultural+and+Creative+Center,+Minfeng+Road,+Liangxi+District,+Wuxi+City,+Jiangsu+Province,+China&output=embed&zoom=17"
              className="h-[600px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

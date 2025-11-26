import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FloatingContactBar } from "@/components/floating-contact-bar"
import { TawkToChat } from "@/components/tawk-to-chat"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "SINOROCK - Industrial Anchoring Solutions",
  description: "Leading provider of geotechnical anchoring solutions - Safer Space, Better Life",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <FloatingContactBar />
        <TawkToChat />
        <Analytics />
      </body>
    </html>
  )
}

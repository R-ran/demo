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
  title: {
    default: "XINHONG - Industrial Anchoring Solutions",
    template: "%s | XINHONG"
  },
  description: "Leading provider of geotechnical anchoring solutions - Safer Space, Better Life",
  generator: "Next.js",
  keywords: ["anchor bolt", "rock bolt", "geotechnical anchoring", "mining solutions", "tunnel support", "XINHONG", "self-drilling anchor"],
  authors: [{ name: "XINHONG" }],
  creator: "XINHONG",
  publisher: "XINHONG",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cnxhanchor.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "XINHONG",
    title: "XINHONG - Industrial Anchoring Solutions",
    description: "Leading provider of geotechnical anchoring solutions - Safer Space, Better Life",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "XINHONG - Industrial Anchoring Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XINHONG - Industrial Anchoring Solutions",
    description: "Leading provider of geotechnical anchoring solutions - Safer Space, Better Life",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" itemScope itemType="https://schema.org/Organization">
      <body className={`font-sans antialiased`}>
        {children}
        <FloatingContactBar />
        <TawkToChat />
        <Analytics />
      </body>
    </html>
  )
}

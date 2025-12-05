import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FloatingContactBar } from "@/components/floating-contact-bar"
import { TawkToChat } from "@/components/tawk-to-chat"
import "./globals.css"

import GoogleTranslate from '@/components/GoogleTranslate'




const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: {
    default: "Hollow Anchor bolt | China Manufacturer | Wuxi Xinghong SDA system",
    template: "%s | XINHONG"
  },
  description: "ISO-certified XINGHONG manufacturer is specializing in hollow anchor bolt, combination hollow core bolts, self-drilling rockbolts(SDA), expansion-shell rock bolt for global tunneling&mining projects.",
  generator: "Next.js",
  keywords: ["hollow anchor bolt", 
    "hollow core bolt",
     "self-drilling rock bolt", 
     "Expansion-shell rock bolt", 
      "self-drilling anchor bolt"],
  authors: [{ name: "XINHONG" }],
  creator: "XINHONG",
  publisher: "XINHONG",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cnxhanchor.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "XINHONG",
    title: "Hollow Anchor bolt | China Manufacturer | Wuxi Xinghong SDA system",
    description: "ISO-certified XINGHONG manufacturer is specializing in hollow anchor bolt, combination hollow core bolts, self-drilling rockbolts(SDA), expansion-shell rock bolt for global tunneling&mining projects.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hollow Anchor bolt | China Manufacturer | Wuxi Xinghong SDA system",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hollow Anchor bolt | China Manufacturer | Wuxi Xinghong SDA system",
    description: "ISO-certified XINGHONG manufacturer is specializing in hollow anchor bolt, combination hollow core bolts, self-drilling rockbolts(SDA), expansion-shell rock bolt for global tunneling&mining projects.",
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
  verification: {
    google: 'iBsibdLzPhJHJybdFN50_XZPJr5Y-QAKqmfstifTAUk',
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
      <GoogleTranslate />
        {children}
        <FloatingContactBar />
        <TawkToChat />
        <Analytics />
      </body>
    </html>
  )
}

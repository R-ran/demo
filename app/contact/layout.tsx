import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact XINHONG for inquiries about anchor bolt products, technical support, or partnership opportunities. Get in touch with our team for geotechnical anchoring solutions.",
  keywords: ["XINHONG", "contact", "inquiry", "anchor bolt", "geotechnical solutions", "technical support"],
  openGraph: {
    title: "Contact Us | XINHONG",
    description: "Contact XINHONG for inquiries about anchor bolt products, technical support, or partnership opportunities.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | XINHONG",
    description: "Contact XINHONG for inquiries about anchor bolt products, technical support, or partnership opportunities.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      
      {children}
      
    </div>
  )
}
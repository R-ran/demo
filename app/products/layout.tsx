import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products",
  description: "XINHONG offers a comprehensive range of high-quality anchor bolt products including self-drilling anchor bolts, common anchor bolts, combination hollow anchor bolts, expansion-shell anchor bolts, and accessories for geotechnical applications.",
  keywords: ["XINHONG", "anchor bolt", "self-drilling anchor", "rock bolt", "geotechnical products", "tunnel support", "mining equipment"],
  openGraph: {
    title: "Products | XINHONG",
    description: "XINHONG offers a comprehensive range of high-quality anchor bolt products for geotechnical applications.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | XINHONG",
    description: "XINHONG offers a comprehensive range of high-quality anchor bolt products for geotechnical applications.",
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
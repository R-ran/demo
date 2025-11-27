import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Details",
  description: "Detailed information about XINHONG anchor bolt products including specifications, applications, and technical details.",
  keywords: ["XINHONG", "anchor bolt", "product details", "specifications", "geotechnical products"],
  openGraph: {
    title: "Product Details | XINHONG",
    description: "Detailed information about XINHONG anchor bolt products including specifications and applications.",
    type: "website",
  },
}


export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
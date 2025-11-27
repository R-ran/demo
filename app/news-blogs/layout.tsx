import { Metadata } from "next"

export const metadata: Metadata = {
  title: "News & Blogs",
  description: "Stay updated with the latest news, product launches, industry insights, and success stories from XINHONG. Read about anchor bolt technology, tunnel construction, and geotechnical engineering.",
  keywords: ["XINHONG", "news", "blogs", "anchor bolt news", "geotechnical engineering", "industry insights", "tunnel construction"],
  openGraph: {
    title: "News & Blogs | XINHONG",
    description: "Stay updated with the latest news, product launches, industry insights, and success stories from XINHONG.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Blogs | XINHONG",
    description: "Stay updated with the latest news, product launches, industry insights, and success stories from XINHONG.",
  },
}

export default function NewsBlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
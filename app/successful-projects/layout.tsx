import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Successful Projects",
  description: "Explore XINHONG's successful projects worldwide. See how our anchor bolt solutions have been used in tunnel construction, mining operations, and infrastructure projects across different continents.",
  keywords: ["XINHONG", "successful projects", "case studies", "tunnel projects", "mining projects", "anchor bolt applications"],
  openGraph: {
    title: "Successful Projects | XINHONG",
    description: "Explore XINHONG's successful projects worldwide. See how our anchor bolt solutions have been used in tunnel construction and mining operations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Successful Projects | XINHONG",
    description: "Explore XINHONG's successful projects worldwide. See how our anchor bolt solutions have been used in tunnel construction and mining operations.",
  },
}

export default function SuccessfulProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
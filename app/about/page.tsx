import { Metadata } from "next"
import AboutPageClient from "./about-page-content"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company, team, and state-of-the-art manufacturing facilities.",
}

export default function AboutPage() {
  return <AboutPageClient />
}

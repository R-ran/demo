import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />
      <main className="pt-12">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              Sorry, the page you are looking for does not exist. It may have been deleted or the link is incorrect.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button>
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


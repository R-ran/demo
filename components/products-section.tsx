import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products",
  description: "Products",
}

const products = [
  {
    id: 1,
    name: "XH self-drilling anchor bolt",
    image: "/product1.jpg",
    imageAlt: "Close-up of XH self-drilling anchor bolt components",
    slug: "self-drilling-bolt",
  },
  {
    id: 2,
    name: "XH hollow grouted anchor bolt",
    image: "/product2.jpg",
    imageAlt: "XH hollow grouted anchor bolt with grout fittings",
    slug: "hollow-grouted-bolt",
  },
  {
    id: 3,
    name: "Expansion-shell hollow anchor bolt",
    image: "/product3.jpg",
    imageAlt: "Expansion-shell hollow anchor bolt ready for installation",
    slug: "expansion-shell-bolt",
  },
  {
    id: 4,
    name: "Fiberglass anchor bolt",
    image: "/product4.jpg",
    imageAlt: "Lightweight fiberglass anchor bolt for corrosion-sensitive projects",
    slug: "fiberglass-anchor-bolt",
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/products" className="inline-block group">
            <h2 className="text-5xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
              <span className="text-foreground">PRO</span>
              <span className="text-primary">DUCTS</span>
            </h2>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => {
              const isImageTop = index % 2 === 0

              return (
                <Link key={product.id} href={`/products/${product.slug}`} className="block h-full">
                  <Card className="group h-full cursor-pointer overflow-hidden hover:shadow-lg transition-all bg-muted/20 rounded-none border-r last:border-r-0 py-0 gap-0 min-h-[540px]">
                    <CardContent className="p-0 h-full">
                      <div className="grid h-full grid-rows-[1fr_auto_1fr]">
                        {isImageTop ? (
                          <>
                            {/* Image on top */}
                            <div className="relative h-full w-full overflow-hidden bg-white">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.imageAlt || product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {/* Orange diamond icon */}
                            <div className="flex items-center justify-center py-6">
                              <div className="w-10 h-10 bg-primary rotate-45 flex items-center justify-center shadow-lg">
                                <ChevronDown className="w-4 h-4 text-white -rotate-45" />
                              </div>
                            </div>
                            {/* Text on bottom */}
                            <div className="flex h-full flex-col justify-center bg-muted/30 p-8 text-center space-y-6">
                              <h3 className="text-xl font-semibold leading-tight">
                                {product.name}
                              </h3>
                              <div className="w-16 h-0.5 bg-foreground mx-auto" />
                              <p className="text-sm font-medium tracking-wide text-foreground/70 group-hover:text-primary transition-colors">
                                LEARN MORE
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Text on top */}
                            <div className="flex h-full flex-col justify-center bg-muted/30 p-8 text-center space-y-6">
                              <h3 className="text-xl font-semibold leading-tight">
                                {product.name}
                              </h3>
                              <div className="w-16 h-0.5 bg-foreground mx-auto" />
                              <p className="text-sm font-medium tracking-wide text-foreground/70 group-hover:text-primary transition-colors">
                                LEARN MORE
                              </p>
                            </div>
                            {/* Orange diamond icon */}
                            <div className="flex items-center justify-center py-6">
                              <div className="w-10 h-10 bg-primary rotate-45 flex items-center justify-center shadow-lg">
                                <ChevronDown className="w-4 h-4 text-white -rotate-45" />
                              </div>
                            </div>
                            {/* Image on bottom */}
                            <div className="relative h-full w-full overflow-hidden bg-white">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.imageAlt || product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

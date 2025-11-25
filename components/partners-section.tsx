import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partners",
  description: "Partners",
}

const partners = [
  {
    id: 1,
    name: "Partner Company 1",
    logo: "/partners1.jpg",
    imageAlt: "Partner Company 1 logo supporting XINHONG projects",
  },
  {
    id: 2,
    name: "Partner Company 2",
    logo: "/partners2.gif",
    imageAlt: "Partner Company 2 logo collaborating with XINHONG",
  },
  {
    id: 3,
    name: "Partner Company 3",
    logo: "/partners3.gif",
    imageAlt: "Partner Company 3 logo in XINHONG partner network",
  },
  {
    id: 4,
    name: "Partner Company 4",
    logo: "/partners4.jpg",
    imageAlt: "Partner Company 4 logo participating in XINHONG projects",
  },
  {
    id: 5,
    name: "Partner Company 5",
    logo: "/partners5.jpg",
    imageAlt: "Partner Company 5 logo supporting XINHONG anchor solutions",
  },
  {
    id: 6,
    name: "Partner Company 6",
    logo: "/partner6.jpg",
    imageAlt: "Partner Company 6 logo in XINHONG global network",
  },
  {
    id: 7,
    name: "Partner Company 7",
    logo: "/partner7.jpg",
    imageAlt: "Partner Company 7 logo in XINHONG global network",
  },
  {
    id: 8,
    name: "Partner Company 8",
    logo: "/partner8.jpg",
    imageAlt: "Partner Company 8 logo in XINHONG global network",
  }, 
  {
    id: 9,
    name: "Partner Company 9",
    logo: "/partner9.jpg",
    imageAlt: "Partner Company 9 logo in XINHONG global network",
  },
  {
    id: 10,
    name: "Partner Company 10",
    logo: "/partner10.jpg",
    imageAlt: "Partner Company 10 logo in XINHONG global network",
  }
]

export function PartnersSection() {
  return (
    <section id="partners" className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-foreground">OUR </span>
            <span className="text-primary">PARTNERS</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-6 bg-background rounded-lg hover:shadow-lg transition-shadow group"
            >
              <img
                src={partner.logo || `/placeholder.svg?height=80&width=120&query=${partner.name}`}
                alt={partner.imageAlt || partner.name}
                className="max-h-20 w-auto object-contain transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

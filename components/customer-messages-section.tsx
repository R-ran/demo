import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Star } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Messages",
  description: "Customer Messages",
}


const customerMessages = [
  {
    id: 1,
    name: "John Smith",
    company: "ABC Construction Ltd.",
    message:
      "Outstanding quality and reliability. The anchor bolts performed exceptionally well in our tunnel project. Highly recommended!",
    rating: 5,
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Maria Garcia",
    company: "Global Infrastructure Inc.",
    message:
      "Professional service and excellent technical support. The team helped us choose the right products for our specific needs.",
    rating: 5,
    date: "2024-01-10",
  },
  {
    id: 3,
    name: "David Chen",
    company: "Metro Engineering Group",
    message:
      "We've been using their products for years. Consistent quality and competitive pricing make them our preferred supplier.",
    rating: 5,
    date: "2024-01-05",
  },
]

export function CustomerMessagesSection() {
  return (
    <section id="customer-messages" className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-foreground">CUSTOMER </span>
            <span className="text-primary">MESSAGES</span>
          </h2>
          <div className="w-20 h-1 bg-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <img
              src="/customer.png"
              alt="Satisfied SINOROCK clients discussing anchor bolt performance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent" />
            <div className="absolute top-8 left-8">
              <MessageSquare className="h-16 w-16 text-primary" />
            </div>
          </div>

          {/* Right side - Message board */}
          <div className="space-y-6">
            {customerMessages.map((message) => (
              <Card key={message.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-2">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{message.name}</h3>
                      <p className="text-sm text-muted-foreground">{message.company}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: message.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{message.message}</p>
                  <p className="text-xs text-muted-foreground">{message.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

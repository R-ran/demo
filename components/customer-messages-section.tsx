import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Star } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Messages",
  description: "Customer Messages",
}



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

        <div className="grid grid-cols-4 gap-0 items-center">
  <div className="relative h-[500px] overflow-hidden">
    <img
      src="/customer1.jpg"
      alt="XINHONG client team reviewing anchor bolt specifications"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent" />
    <div className="absolute top-8 left-8">
      <MessageSquare className="h-16 w-16 text-primary" />
    </div>
  </div>

  <div className="relative h-[500px] overflow-hidden">
    <img
      src="/customer2.jpg"
      alt="Engineers discussing XINHONG anchor bolt installation"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent" />
    <div className="absolute top-8 left-8">
      <MessageSquare className="h-16 w-16 text-primary" />
    </div>
  </div>

  <div className="relative h-[500px] overflow-hidden">
    <img
      src="/customer3.jpg"
      alt="Construction project using XINHONG anchor bolts"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent" />
    <div className="absolute top-8 left-8">
      <MessageSquare className="h-16 w-16 text-primary" />
    </div>
  </div>

  <div className="relative h-[500px] overflow-hidden">
    <img
      src="/customer4.jpg"
      alt="Quality inspection of XINHONG anchor bolt products"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent" />
    <div className="absolute top-8 left-8">
      <MessageSquare className="h-16 w-16 text-primary" />
    </div>
  </div>
</div>
      </div>
    </section>
  )
}

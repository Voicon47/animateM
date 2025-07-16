"use client"

import { Button } from "@/components/ui/button"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container py-12 md:py-24 flex flex-col items-center justify-center text-center">
        <CheckCircle className="h-24 w-24 text-green-500 mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for your purchase. Your animations are now available for download.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/animations">Continue Browsing</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useCartStore } from "@/stores/cart-store"
import { useRouter } from "next/navigation"
import { Banknote, CreditCard, QrCode } from "lucide-react"
import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth-store"

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCartStore((state) => ({
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    clearCart: state.clearCart,
  }))
  const { user } = useAuthStore()
  const router = useRouter()

  const handlePayment = (method: string) => {
    // Implementation for handling payment
    console.log(`Payment with ${method}`)
  }

  useEffect(() => {
    if (user?.role === "guest") {
      router.push("/") // Redirect guests from checkout page
    }
  }, [user, router])

  if (user?.role === "guest") {
    return null // Or a loading spinner, or a message
  }

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container py-12 md:py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty!</h1>
          <p className="text-muted-foreground mb-8">Please add items to your cart before proceeding to checkout.</p>
          <Button onClick={() => router.push("/animations")}>Browse Animations</Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container py-12 md:py-24">
        <h1 className="text-4xl font-bold tracking-tighter mb-8 text-center">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your items before completing the purchase.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{item.price}</p>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg pt-4 border-t">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you'd like to pay.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full h-14 text-lg" variant="outline" onClick={() => handlePayment("Momo")}>
                <QrCode className="mr-3 h-6 w-6" />
                Pay with Momo
              </Button>
              <Button className="w-full h-14 text-lg" variant="outline" onClick={() => handlePayment("VNPay")}>
                <CreditCard className="mr-3 h-6 w-6" />
                Pay with VNPay
              </Button>
              <Button className="w-full h-14 text-lg" variant="outline" onClick={() => handlePayment("Bank Transfer")}>
                <Banknote className="mr-3 h-6 w-6" />
                Bank Transfer
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useCartStore } from "@/stores/cart-store"
import { Trash2, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, clearCart } = useCartStore((state) => ({
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    removeItem: state.removeItem,
    clearCart: state.clearCart,
  }))
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (user?.role === "guest") {
      router.push("/") // Redirect guests from cart page
    }
  }, [user, router])

  if (user?.role === "guest") {
    return null // Or a loading spinner, or a message
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container py-12 md:py-24">
        <h1 className="text-4xl font-bold tracking-tighter mb-8 text-center">Your Shopping Cart</h1>

        {totalItems === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg mb-4">Your cart is empty.</p>
            <Button asChild>
              <Link href="/animations">Start Browsing Animations</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="flex items-center p-4">
                  <div className="flex-1 grid gap-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium">{item.price}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </Card>
              ))}
              <div className="flex justify-end">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
            <Card className="md:col-span-1 h-fit">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Price</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

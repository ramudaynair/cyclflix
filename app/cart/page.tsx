"use client"

import { CheckCircle, ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-[#E50914] mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Item Added to Cart!</h1>
          <p className="text-white/60">Cyclflix bike has been added to your cart</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <ShoppingCart className="h-8 w-8 text-[#E50914]" />
            <div className="text-left">
              <h3 className="font-semibold">Cyclflix Entertainment Bike</h3>
              <p className="text-white/60 text-sm">With Smart Helmet & 5" Display</p>
              <p className="text-[#E50914] font-bold">$4,999</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button 
            className="bg-[#E50914] hover:bg-[#b8070f] text-white"
            onClick={() => alert('Checkout functionality coming soon!')}
          >
            Proceed to Checkout
          </Button>
          <Button 
            variant="outline" 
            className="border-white/30 text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}
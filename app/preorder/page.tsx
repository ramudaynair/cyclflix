"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function PreOrderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const handleBack = () => {
    sessionStorage.setItem('skipSplash', 'true')
    sessionStorage.setItem('scrollPosition', '0')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="text-center">
            <p className="text-[#E50914] text-xs uppercase tracking-[0.3em] mb-2 font-medium">Pre-Order</p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-none">
              <span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.8)]">C</span>YCLE<span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.8)]">FLIX</span> N1
            </h1>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#E50914]">$2,999</div>
            <div className="text-sm text-white/60">Starting Price</div>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-32 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <Check className="w-16 h-16 text-[#E50914] mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Pre-Order Coming Soon</h2>
          <p className="text-white/70 text-lg mb-8">
            The CYCLEFLIX N1 pre-order system is being finalized. 
            Join our waitlist to be notified when pre-orders open.
          </p>
          <Button
            onClick={handleBack}
            className="bg-[#E50914] hover:bg-[#b8070f] text-white px-8 py-3"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
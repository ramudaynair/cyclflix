"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Check, Palette, Settings, Zap, Battery, Headphones, Navigation, Heart, Shield, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const configSections = [
  {
    id: "frame",
    title: "Frame & Color",
    icon: Palette,
    options: [
      { id: "carbon-black", name: "Carbon Black", price: 0, description: "Premium matte black carbon fiber", image: "/images/matte-black-carbon-fiber-bicycle-side-profile-on-p.jpg" },
      { id: "carbon-red", name: "Netflix Red", price: 200, description: "Signature red with carbon accents", image: "/images/ni.jpeg" },
      { id: "carbon-white", name: "Pearl White", price: 150, description: "Elegant pearl white finish", image: "/images/bik3.png" },
    ]
  },
  {
    id: "helmet",
    title: "Smart Helmet",
    icon: Settings,
    options: [
      { id: "basic", name: "Basic Audio", price: 0, description: "Standard speakers, 8hr battery", image: "/images/helm1.png" },
      { id: "premium", name: "Premium Audio", price: 300, description: "Noise-canceling, 12hr battery", image: "/images/helm2.png" },
      { id: "pro", name: "Pro Audio", price: 500, description: "Bone conduction + NC, 16hr battery", image: "/images/helmet.png" },
    ]
  },
  {
    id: "display",
    title: "Display System",
    icon: Zap,
    options: [
      { id: "5inch", name: "5-inch OLED", price: 0, description: "1080p touchscreen, GPS ready", image: "/images/sleek-bicycle-handlebars-with-modern-digital-displ.jpg" },
      { id: "7inch", name: "7-inch OLED", price: 400, description: "1440p touchscreen, enhanced GPS", image: "/images/dis1.png" },
      { id: "dual", name: "Dual Display", price: 800, description: "Main + secondary display setup", image: "/images/dis2.png" },
    ]
  }
]

const addOns = [
  { id: "wireless-charging", name: "Wireless Charging Pad", price: 199, icon: Battery, description: "Qi-compatible wireless charging" },
  { id: "premium-speakers", name: "Premium Sound System", price: 399, icon: Headphones, description: "360° surround sound" },
  { id: "gps-tracker", name: "Advanced GPS Tracker", price: 149, icon: Navigation, description: "Real-time location tracking" },
  { id: "health-monitor", name: "Health Monitoring Suite", price: 299, icon: Heart, description: "Heart rate and performance metrics" },
  { id: "security-system", name: "Smart Security System", price: 249, icon: Shield, description: "Anti-theft with motion sensors" },
  { id: "connectivity-hub", name: "5G Connectivity Hub", price: 179, icon: Wifi, description: "Built-in 5G hotspot" }
]

export default function PreOrderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isFooterVisible, setIsFooterVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)
  
  const [selectedOptions, setSelectedOptions] = useState({
    frame: "carbon-black",
    helmet: "basic", 
    display: "5inch"
  })
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  })
  
  const [orderNumber] = useState(`CYC-${Date.now().toString().slice(-6)}`)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const basePrice = 2999
  const configPrice = configSections.reduce((total, section) => {
    const selected = section.options.find(opt => opt.id === selectedOptions[section.id as keyof typeof selectedOptions])
    return total + (selected?.price || 0)
  }, 0)
  const addOnsPrice = selectedAddOns.reduce((total, addonId) => {
    const addon = addOns.find(a => a.id === addonId)
    return total + (addon?.price || 0)
  }, 0)
  const totalPrice = basePrice + configPrice + addOnsPrice
  const depositAmount = 500

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      sessionStorage.setItem('skipSplash', 'true')
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
      sessionStorage.setItem('scrollToPreorder', 'true')
      router.push('/')
    }
  }

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="text-center">
            <p className="text-[#E50914] text-xs uppercase tracking-[0.3em] mb-1 font-medium">Pre-Order</p>
            <h1 className="text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight leading-none">
              <span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.8)]">C</span>YCLE<span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.8)]">FLIX</span> N1
            </h1>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-[#E50914]">${totalPrice.toLocaleString()}</div>
            <div className="text-xs text-white/60">Total Price</div>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-24">
        {/* Step Indicator */}
        <div className="max-w-3xl mx-auto px-6 mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= stepNum ? 'bg-[#E50914] text-white' : 'bg-white/10 text-white/50'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && <div className={`w-12 h-0.5 mx-2 ${
                  step > stepNum ? 'bg-[#E50914]' : 'bg-white/10'
                }`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Configuration */}
            {step === 1 && (
              <motion.div
                key="config"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold mb-8">Configure Your CYCLEFLIX N1</h2>
                {configSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <div key={section.id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Icon className="w-6 h-6 text-[#E50914]" />
                        <h3 className="text-xl font-semibold">{section.title}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {section.options.map((option) => {
                          const isSelected = selectedOptions[section.id as keyof typeof selectedOptions] === option.id
                          return (
                            <button
                              key={option.id}
                              onClick={() => setSelectedOptions(prev => ({ ...prev, [section.id]: option.id }))}
                              className={`group relative p-4 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] ${
                                isSelected
                                  ? 'bg-[#E50914]/20 border-[#E50914] border-2 shadow-lg shadow-[#E50914]/20'
                                  : 'bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.05]'
                              }`}
                            >
                              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
                                <img 
                                  src={option.image} 
                                  alt={option.name}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                    const next = e.currentTarget.nextElementSibling as HTMLElement
                                    if (next) next.style.display = 'flex'
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center" style={{display: 'none'}}>
                                  <div className="text-white/60 text-sm font-medium">{option.name}</div>
                                </div>
                                {isSelected && (
                                  <div className="absolute top-2 right-2 bg-[#E50914] rounded-full p-1">
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-semibold text-white group-hover:text-[#E50914] transition-colors">{option.name}</h4>
                                <p className="text-white/70 text-sm leading-relaxed">{option.description}</p>
                                <div className={`font-bold text-sm ${
                                  option.price === 0 ? 'text-green-400' : 'text-[#E50914]'
                                }`}>
                                  {option.price === 0 ? 'Included' : `+$${option.price}`}
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            )}

            {/* Step 2: Add-ons */}
            {step === 2 && (
              <motion.div
                key="addons"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold mb-8">Choose Your Add-ons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addOns.map((addon) => {
                    const Icon = addon.icon
                    const isSelected = selectedAddOns.includes(addon.id)
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`group relative p-6 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] ${
                          isSelected
                            ? 'bg-[#E50914]/20 border-[#E50914] border-2 shadow-lg shadow-[#E50914]/20'
                            : 'bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-colors ${
                              isSelected ? 'bg-[#E50914]/20' : 'bg-white/10 group-hover:bg-[#E50914]/10'
                            }`}>
                              <Icon className="w-6 h-6 text-[#E50914]" />
                            </div>
                            <h3 className="font-semibold text-white group-hover:text-[#E50914] transition-colors">{addon.name}</h3>
                          </div>
                          {isSelected && (
                            <div className="bg-[#E50914] rounded-full p-1">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-white/70 text-sm mb-4 leading-relaxed">{addon.description}</p>
                        <div className="text-[#E50914] font-bold text-lg">+${addon.price}</div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Customer Info */}
            {step === 3 && (
              <motion.div
                key="customer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold mb-8">Customer Information</h2>
                
                {/* Price Summary */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-white/70">Base CYCLEFLIX N1</span>
                      <span>${basePrice.toLocaleString()}</span>
                    </div>
                    {configSections.map(section => {
                      const selected = section.options.find(opt => opt.id === selectedOptions[section.id as keyof typeof selectedOptions])
                      if (!selected || selected.price === 0) return null
                      return (
                        <div key={section.id} className="flex justify-between">
                          <span className="text-white/70">{selected.name}</span>
                          <span className="text-[#E50914]">+${selected.price}</span>
                        </div>
                      )
                    })}
                    {selectedAddOns.map(addonId => {
                      const addon = addOns.find(a => a.id === addonId)
                      if (!addon) return null
                      return (
                        <div key={addonId} className="flex justify-between">
                          <span className="text-white/70">{addon.name}</span>
                          <span className="text-[#E50914]">+${addon.price}</span>
                        </div>
                      )
                    })}
                    <div className="border-t border-white/10 pt-2 mt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-[#E50914]">${totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="bg-[#E50914]/10 p-3 rounded-lg mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Pre-order Deposit</span>
                        <span className="text-[#E50914] font-bold">${depositAmount}</span>
                      </div>
                      <p className="text-xs text-white/50 mt-1">Remaining balance due before delivery</p>
                    </div>
                  </div>
                </div>

                {/* Customer Form */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      className="bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#E50914] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      className="bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#E50914] focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#E50914] focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#E50914] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-[#E50914]/10 border border-[#E50914]/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Delivery Timeline</h4>
                  <p className="text-white/70 text-sm">Expected delivery: {new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} (6-8 months from order)</p>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center space-y-8"
              >
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8">
                  <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Pre-Order Confirmed!</h2>
                  <p className="text-white/70 mb-6">Thank you for your pre-order. You'll receive updates on production progress.</p>
                  
                  <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 text-left max-w-md mx-auto">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70">Order Number:</span>
                        <span className="font-mono text-[#E50914]">{orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Total Amount:</span>
                        <span className="font-bold">${totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Expected Delivery:</span>
                        <span>{new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    sessionStorage.setItem('skipSplash', 'true')
                    sessionStorage.setItem('scrollToPreorder', 'true')
                    router.push('/')
                  }}
                  className="bg-[#E50914] hover:bg-[#b8070f] text-white px-8 py-3"
                >
                  Back to Home
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation - Slides up on scroll down */}
      {step < 4 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: isFooterVisible ? 0 : 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-4 z-40"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div>
              <div className="text-xs text-white/60">Step {step} of 3</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xl font-bold text-[#E50914]">${totalPrice.toLocaleString()}</div>
                <div className="text-xs text-white/60">Total Price</div>
              </div>
              <Button 
                onClick={() => step === 3 ? setStep(4) : setStep(step + 1)}
                className="bg-[#E50914] hover:bg-[#b8070f] text-white px-6 py-2"
                disabled={step === 3 && (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email)}
              >
                {step === 3 ? 'Complete Pre-Order' : 'Continue'}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
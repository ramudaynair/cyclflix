"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Headphones, Monitor, MapPin, Clock, Volume2, Smartphone, Wifi, Battery } from "lucide-react"

const productFeatures = [
  {
    category: "Cyclflix Smart Helmet",
    icon: Headphones,
    features: [
      "Built-in noise-canceling headphones with premium drivers",
      "Bone conduction technology for safety awareness",
      "Wireless connectivity to 5-inch display",
      "Voice control for hands-free operation",
      "Lightweight design with premium ventilation",
      "Safety-certified with LED indicators"
    ]
  },
  {
    category: "5-inch Entertainment Display",
    icon: Monitor,
    features: [
      "High-resolution OLED touchscreen (1920x1080)",
      "Shows current Netflix podcast/documentary",
      "Real-time playback controls and volume adjustment",
      "GPS navigation with turn-by-turn directions",
      "Ride metrics: time, distance, speed, calories",
      "Weather-resistant and sunlight-readable"
    ]
  },
  {
    category: "Smart Connectivity",
    icon: Smartphone,
    features: [
      "Seamless smartphone integration via Bluetooth 5.0",
      "WiFi hotspot capability for streaming",
      "Netflix account synchronization",
      "Phone call handling through helmet speakers",
      "Message notifications and voice responses",
      "Automatic content pause during calls"
    ]
  },
  {
    category: "Advanced Features",
    icon: Wifi,
    features: [
      "GPS tracking with location sharing",
      "Route planning and navigation",
      "Show length estimation vs ride duration",
      "Adaptive volume based on speed and environment",
      "Emergency contact alerts with location",
      "Ride history and entertainment analytics"
    ]
  }
]

export function ProductDetails() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="specs" className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#E50914] text-sm uppercase tracking-widest mb-4 font-medium"
          >
            Product Details
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4"
          >
            Complete System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-lg max-w-3xl mx-auto"
          >
            The Cyclflix is not an electric bicycle - it's a premium traditional bike enhanced with cutting-edge entertainment technology. Stream Netflix content safely while cycling with our integrated helmet and display system.
          </motion.p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {productFeatures.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: categoryIndex * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="bg-white/[0.02] border border-white/10 rounded-xl p-8 hover:border-[#E50914]/30 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#E50914]/10 flex items-center justify-center">
                  <category.icon className="h-6 w-6 text-[#E50914]" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.category}</h3>
              </div>
              
              <ul className="space-y-3">
                {category.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: categoryIndex * 0.15 + featureIndex * 0.05,
                    }}
                    className="flex items-start gap-3 text-white/70"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E50914] mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Key Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-[#E50914]/10 via-transparent to-[#E50914]/10 border border-[#E50914]/20 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Key Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Monitor className="h-8 w-8 text-[#E50914] mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Display</h4>
              <p className="text-white/60 text-sm">5-inch OLED touchscreen<br />1920x1080 resolution<br />Sunlight readable</p>
            </div>
            <div className="text-center">
              <Headphones className="h-8 w-8 text-[#E50914] mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Audio</h4>
              <p className="text-white/60 text-sm">Noise-canceling headphones<br />Bone conduction safety<br />Premium drivers</p>
            </div>
            <div className="text-center">
              <Battery className="h-8 w-8 text-[#E50914] mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Battery</h4>
              <p className="text-white/60 text-sm">12-hour entertainment<br />GPS tracking all day<br />Fast charging (2 hours)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
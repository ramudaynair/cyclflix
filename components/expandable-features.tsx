"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const features = [
  {
    category: "Cyclflix Smart Helmet",
    shortDesc: "Premium safety with entertainment",
    details: [
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
    shortDesc: "Your Netflix screen on wheels",
    details: [
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
    shortDesc: "Seamless integration everywhere",
    details: [
      "Seamless smartphone integration via Bluetooth 5.0",
      "WiFi hotspot capability for streaming",
      "Netflix account synchronization",
      "Phone call handling through helmet speakers",
      "Message notifications and voice responses",
      "Automatic content pause during calls"
    ]
  }
]

export function ExpandableFeatures() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-white mb-8"
        >
          System Components
        </motion.h2>
        
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden hover:border-[#E50914]/30 transition-all duration-300"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.category}</h3>
                  <p className="text-white/60">{feature.shortDesc}</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-6 w-6 text-[#E50914]" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: expandedIndex === index ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={expandedIndex === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: detailIndex * 0.05 }}
                        className="flex items-start gap-3 text-white/70"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E50914] mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
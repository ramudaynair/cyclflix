"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Headphones, Monitor, MapPin, Wifi, Clock, Volume2, ChevronDown } from "lucide-react"

const features = [
  {
    icon: Headphones,
    title: "Cyclflix Smart Helmet",
    description: "Premium helmet with built-in noise-canceling headphones. Crystal-clear audio for podcasts and documentaries while maintaining safety awareness.",
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
    icon: Monitor,
    title: "5-inch Smart Display",
    description: "High-resolution touchscreen showing current podcast/documentary, playback controls, volume adjustment, and ride statistics in real-time.",
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
    icon: MapPin,
    title: "GPS Navigation",
    description: "Integrated GPS with phone connectivity. Track your location, plan routes, and never lose your way during long rides.",
    details: [
      "Real-time GPS tracking with location sharing",
      "Route planning and navigation assistance",
      "Show length estimation vs ride duration",
      "Points of interest and cycling-friendly paths",
      "Emergency contact alerts with location",
      "Ride history and route analytics"
    ]
  },
  {
    icon: Wifi,
    title: "Phone Integration",
    description: "Seamless smartphone connection via Bluetooth and WiFi. Sync your Netflix account, playlists, and riding preferences.",
    details: [
      "Seamless smartphone integration via Bluetooth 5.0",
      "WiFi hotspot capability for streaming",
      "Netflix account synchronization",
      "Phone call handling through helmet speakers",
      "Message notifications and voice responses",
      "Automatic content pause during calls"
    ]
  },
  {
    icon: Clock,
    title: "Ride Analytics",
    description: "Real-time tracking of ride time, distance covered, average speed, and remaining show duration. Perfect for planning your entertainment.",
    details: [
      "Real-time ride metrics and performance tracking",
      "Entertainment consumption analytics",
      "Route optimization based on content length",
      "Health and fitness integration",
      "Weekly and monthly progress reports",
      "Social sharing and achievements"
    ]
  },
  {
    icon: Volume2,
    title: "Adaptive Audio",
    description: "Smart volume control that adjusts based on ambient noise and speed. Safety-first audio that lets you hear traffic while enjoying content.",
    details: [
      "Adaptive volume based on speed and environment",
      "Noise-canceling with safety awareness mode",
      "Premium audio drivers for crystal-clear sound",
      "Wind noise reduction technology",
      "Emergency sound detection and alerts",
      "Customizable audio profiles for different rides"
    ]
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4"
          >
            Smart Entertainment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Revolutionary cycling experience with integrated entertainment and navigation.
          </motion.p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:border-[#E50914]/50 hover:bg-white/[0.04]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-br from-[#E50914]/10 via-transparent to-transparent pointer-events-none"
              />

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#E50914] to-transparent origin-left"
              />

              <div className="relative z-10 p-8">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-6"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="h-7 w-7 text-[#E50914]" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed mb-4">{feature.description}</p>
                
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="flex items-center gap-2 text-[#E50914] hover:text-[#E50914]/80 transition-colors"
                >
                  <span className="text-sm font-medium">Learn More</span>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
              </div>
              
              <motion.div
                initial={false}
                animate={{ height: expandedIndex === index ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden border-t border-white/5"
              >
                <div className="p-6">
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
                        <span className="leading-relaxed text-sm">{detail}</span>
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

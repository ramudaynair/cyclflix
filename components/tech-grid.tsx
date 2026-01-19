"use client"

import { Headphones, Monitor, Smartphone } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const specs = [
  {
    icon: Headphones,
    title: "Premium Audio System",
    description:
      "Cyclflix helmet features high-fidelity drivers with active noise cancellation. Bone conduction technology ensures safety while delivering immersive audio for your favorite shows.",
  },
  {
    icon: Monitor,
    title: "5-inch Entertainment Hub",
    description:
      "Crystal-clear OLED display shows current Netflix content, playback controls, GPS navigation, ride metrics (time, distance, speed), and volume controls. Weather-resistant and sunlight-readable.",
  },
  {
    icon: Smartphone,
    title: "Smart Connectivity",
    description:
      "Seamless integration with your smartphone via Bluetooth 5.0 and WiFi. Access Netflix library, sync viewing progress, receive calls, and get notifications without stopping your ride.",
  },
]

export function TechGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20px", amount: 0.3 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="specs" className="bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4">
            Entertainment Tech
          </motion.h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Revolutionary cycling experience with integrated Netflix streaming and smart features.</p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative bg-black border border-white/10 rounded-lg p-8 transition-all duration-500 hover:border-[#E50914]/50 hover:bg-white/[0.02] overflow-hidden"
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

              <div className="relative z-10">
                <motion.div
                  className="mb-6"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <spec.icon className="h-10 w-10 text-[#E50914] transition-all duration-300" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{spec.title}</h3>
                <p className="text-white/50 leading-relaxed">{spec.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

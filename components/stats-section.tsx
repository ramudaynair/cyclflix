"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { value: 6.8, unit: "kg", label: "Total Weight", decimals: 1 },
  { value: 12, unit: "hrs", label: "Entertainment Battery", decimals: 0 },
  { value: 5, unit: "inch", label: "Display Size", decimals: 0 },
  { value: 1080, unit: "p", label: "HD Resolution", decimals: 0 },
]

function AnimatedNumber({ value, decimals, isInView }: { value: number; decimals: number; isInView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(value * easeOut)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [isInView, value])

  return <>{displayValue.toFixed(decimals)}</>
}

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="bg-black py-20 border-t border-b border-white/5 relative overflow-hidden">
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E50914]/30 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="text-center relative group cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0.8,
                }}
                className="absolute inset-0 bg-[#E50914]/10 rounded-2xl blur-xl -z-10"
              />

              <motion.div
                className="flex items-baseline justify-center gap-1"
                animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-5xl md:text-6xl font-black text-white tabular-nums">
                  <AnimatedNumber value={stat.value} decimals={stat.decimals} isInView={isInView} />
                </span>
                <motion.span
                  className="text-2xl font-bold text-[#E50914]"
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.unit}
                </motion.span>
              </motion.div>
              <p className="text-white/50 text-sm uppercase tracking-wider mt-2 transition-colors group-hover:text-white/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

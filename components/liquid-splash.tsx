"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

let globalAudio: HTMLAudioElement | null = null

export function LiquidSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"black" | "liquid" | "netflix" | "complete">("black")
  
  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/netflix-tudum-sfx-n-c-zAKXEHBYl3ICOeHH6eA6pqwzZFt9sF.mp3')
      globalAudio.volume = 0.6
      globalAudio.onended = () => { globalAudio = null }
    }
    
    const logoTimer = setTimeout(() => {
      setPhase("liquid")
      globalAudio?.play().catch(() => {})
    }, 200)
    
    const netflixTimer = setTimeout(() => setPhase("netflix"), 2500)
    const completeTimer = setTimeout(() => onComplete(), 4500)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(netflixTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Liquid morphing background */}
      {phase === "liquid" && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg className="w-full h-full">
            <defs>
              <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey" />
                <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
              </filter>
            </defs>
            
            {/* Animated liquid blobs */}
            {[...Array(5)].map((_, i) => {
              const baseRadius = 30 + i * 8
              const centerX = 50
              const centerY = 50
              
              return (
                <motion.circle
                  key={i}
                  cx={`${centerX}%`}
                  cy={`${centerY}%`}
                  r={baseRadius}
                  fill="#E50914"
                  opacity={0.3 - i * 0.05}
                  filter="url(#gooey)"
                  animate={{
                    r: [baseRadius, baseRadius + 15, baseRadius],
                    cx: [`${centerX}%`, `${centerX + (i * 2)}%`, `${centerX}%`],
                    cy: [`${centerY}%`, `${centerY + (i * 1)}%`, `${centerY}%`]
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )
            })}
          </svg>
        </motion.div>
      )}

      {/* Logo with liquid effect */}
      {phase === "liquid" && (
        <motion.div
          className="text-9xl font-black relative z-10"
          initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            filter: "blur(0px)"
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut"
          }}
        >
          <motion.span 
            className="text-[#E50914]"
            animate={{
              textShadow: [
                "0 0 20px #E50914",
                "0 0 40px #E50914, 0 0 60px #E50914",
                "0 0 20px #E50914"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            C
          </motion.span>
        </motion.div>
      )}

      {/* Netflix text */}
      {phase === "netflix" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute text-xl text-white/90 font-light tracking-[0.3em]"
        >
          A NETFLIX CONCEPTUAL PRODUCT
        </motion.div>
      )}
    </div>
  )
}
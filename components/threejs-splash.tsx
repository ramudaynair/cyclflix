"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

let globalAudio: HTMLAudioElement | null = null

export function ThreeDSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"black" | "logo" | "netflix" | "complete">("black")
  
  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/netflix-tudum-sfx-n-c-zAKXEHBYl3ICOeHH6eA6pqwzZFt9sF.mp3')
      globalAudio.volume = 0.6
      globalAudio.onended = () => { globalAudio = null }
    }
    
    const logoTimer = setTimeout(() => {
      setPhase("logo")
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
      {/* 3D-style Logo with CSS transforms */}
      {phase === "logo" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: -180, rotateX: -90 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateY: [0, 15, -15, 0], 
            rotateX: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            ease: "easeOut",
            rotateY: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="text-9xl font-black"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          <span 
            className="text-[#E50914] inline-block"
            style={{
              textShadow: `
                0 0 20px #E50914,
                5px 5px 0 #B20710,
                10px 10px 0 #8B0000,
                15px 15px 20px rgba(0,0,0,0.5)
              `,
              filter: 'drop-shadow(0 0 30px #E50914)'
            }}
          >
            C
          </span>
        </motion.div>
      )}

      {/* Netflix text */}
      {phase === "netflix" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute text-xl text-white/90 font-light tracking-[0.3em]"
        >
          A NETFLIX CONCEPTUAL PRODUCT
        </motion.div>
      )}
    </div>
  )
}
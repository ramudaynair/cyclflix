"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

let globalAudio: HTMLAudioElement | null = null

export function TudumSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"black" | "logo" | "glow" | "disassemble">("black")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
    setIsMobile(mobile)
    
    // Preload audio
    if (!globalAudio) {
      globalAudio = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/netflix-tudum-sfx-n-c-zAKXEHBYl3ICOeHH6eA6pqwzZFt9sF.mp3')
      globalAudio.volume = 0.6
      globalAudio.crossOrigin = 'anonymous'
      globalAudio.onended = () => { globalAudio = null }
    }
    
    // Timing based on device
    const timing = mobile ? 
      { logo: 100, glow: 400, disassemble: 800, complete: 1100 } : 
      { logo: 200, glow: 600, disassemble: 1200, complete: 1600 }
    
    const logoTimer = setTimeout(() => {
      setPhase("logo")
      playSound()
    }, timing.logo)
    
    const glowTimer = setTimeout(() => setPhase("glow"), timing.glow)
    const disassembleTimer = setTimeout(() => setPhase("disassemble"), timing.disassemble)
    const completeTimer = setTimeout(() => {
      onComplete()
    }, timing.complete)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(glowTimer)
      clearTimeout(disassembleTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  const playSound = async () => {
    if (globalAudio && globalAudio.currentTime === 0) {
      try {
        await globalAudio.play()
      } catch (e) {
        // Silent fail
      }
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center" onClick={playSound}>
      <div className="relative">
        {phase !== "black" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: phase === "disassemble" ? 0 : 1,
              scale: 1
            }}
            transition={{ duration: isMobile ? 0.2 : 0.3 }}
          >
            <svg 
              viewBox="0 0 100 100" 
              className={isMobile ? 'w-20 h-20' : 'w-32 h-32 md:w-48 md:h-48'}
            >
              <defs>
                <linearGradient id="netflix-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E50914" />
                  <stop offset="50%" stopColor="#B20710" />
                  <stop offset="100%" stopColor="#E50914" />
                </linearGradient>
              </defs>
              <polygon points="15,5 35,5 35,95 15,95" fill="url(#netflix-gradient)" />
              <polygon points="15,5 35,5 85,95 65,95" fill="#E50914" />
              <polygon points="65,5 85,5 85,95 65,95" fill="url(#netflix-gradient)" />
            </svg>
          </motion.div>
        )}

        {phase === "glow" && !isMobile && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2] }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-32 h-32 md:w-48 md:h-48 bg-[#FF2A2A] opacity-10 blur-lg" />
          </motion.div>
        )}

        {phase === "disassemble" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className={isMobile ? 'absolute w-2 h-16' : 'absolute w-3 h-24 md:w-4 md:h-32'}
              style={{ left: "calc(50% - 10px)" }}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: isMobile ? -20 : -30, opacity: 0 }}
              transition={{ duration: isMobile ? 0.15 : 0.2 }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E50914] to-transparent blur-sm" />
            </motion.div>
            <motion.div
              className={isMobile ? 'absolute w-2 h-16' : 'absolute w-3 h-24 md:w-4 md:h-32'}
              style={{ left: "calc(50% + 6px)" }}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: isMobile ? 20 : 30, opacity: 0 }}
              transition={{ duration: isMobile ? 0.15 : 0.2 }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E50914] to-transparent blur-sm" />
            </motion.div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-8 text-white/40 text-xs animate-pulse">
        {isMobile ? 'Tap' : 'Click'} for sound
      </div>
    </div>
  )
}
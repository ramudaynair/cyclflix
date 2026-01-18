"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

let globalAudio: HTMLAudioElement | null = null

export function TudumSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"black" | "logo" | "glow" | "disassemble">("black")
  const [audioPlayed, setAudioPlayed] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playTudumSound = async () => {
    if (globalAudio) return // Already playing or played
    
    try {
      globalAudio = new Audio()
      globalAudio.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/netflix-tudum-sfx-n-c-zAKXEHBYl3ICOeHH6eA6pqwzZFt9sF.mp3'
      globalAudio.volume = 0.6
      globalAudio.crossOrigin = 'anonymous'
      
      globalAudio.onended = () => {
        globalAudio = null
      }
      
      await globalAudio.play()
      setAudioPlayed(true)
    } catch (error) {
      globalAudio = null
    }
  }

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setPhase("logo")
      playTudumSound()
    }, 200)
    
    const glowTimer = setTimeout(() => setPhase("glow"), 600)
    const disassembleTimer = setTimeout(() => setPhase("disassemble"), 1400)
    const completeTimer = setTimeout(() => onComplete(), 1800)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(glowTimer)
      clearTimeout(disassembleTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  const NetflixN = () => (
    <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48">
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
  )

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden cursor-pointer" onClick={playTudumSound}>
      <div className="relative">
        {/* Netflix N Logo */}
        {phase !== "black" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: phase === "disassemble" ? 0 : 1,
              scale: 1
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <NetflixN />
          </motion.div>
        )}

        {/* Glow effect */}
        {phase === "glow" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.4] }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-[#FF2A2A] opacity-20 blur-lg" />
          </motion.div>
        )}

        {/* Simplified disassembly */}
        {phase === "disassemble" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="absolute w-3 h-32 sm:w-4 sm:h-40 md:w-5 md:h-56"
              style={{ left: "calc(50% - 18px)" }}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E50914] to-transparent blur-sm" />
            </motion.div>
            <motion.div
              className="absolute w-3 h-32 sm:w-4 sm:h-40 md:w-5 md:h-56"
              style={{ left: "calc(50% + 14px)" }}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E50914] to-transparent blur-sm" />
            </motion.div>
          </div>
        )}
      </div>
      
      {!globalAudio && (
        <div className="absolute bottom-8 text-white/50 text-xs sm:text-sm animate-pulse">
          Tap for sound
        </div>
      )}
    </div>
  )
}
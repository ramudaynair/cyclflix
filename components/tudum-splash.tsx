"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

let globalAudio: HTMLAudioElement | null = null

export function TudumSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'SILENCE' | 'SHOW' | 'GLOW' | 'NETFLIX' | 'WHEEL' | 'FINAL'>('SILENCE')
  const [audioPlayed, setAudioPlayed] = useState(false)

  const playAudio = async () => {
    if (!audioPlayed && globalAudio) {
      try {
        await globalAudio.play()
        setAudioPlayed(true)
      } catch (e) {
        console.log('Audio play failed:', e)
      }
    }
  }

  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/netflix-tudum-sfx-n-c-zAKXEHBYl3ICOeHH6eA6pqwzZFt9sF.mp3')
      globalAudio.volume = 0.6
      globalAudio.crossOrigin = 'anonymous'
      globalAudio.onended = () => { globalAudio = null }
    }

    const sequence = [
      { p: 'SHOW', d: 500 },
      { p: 'GLOW', d: 1500 },
      { p: 'NETFLIX', d: 2800 },
      { p: 'WHEEL', d: 5500 },
      { p: 'FINAL', d: 8500 }
    ]

    globalAudio?.play().catch(() => {})
    
    // Also try to play on first user interaction
    const handleFirstClick = () => {
      playAudio()
      document.removeEventListener('click', handleFirstClick)
    }
    document.addEventListener('click', handleFirstClick)

    const timers = sequence.map(s => setTimeout(() => {
      setPhase(s.p as any)
      if (s.p === 'FINAL' && onComplete) onComplete()
    }, s.d))

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden select-none cursor-pointer"
      onClick={playAudio}
    >
      <AnimatePresence mode="wait">
        {phase !== 'FINAL' && phase !== 'NETFLIX' && phase !== 'WHEEL' && (
          <motion.div
            key="logo"
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-[-150px] pointer-events-none"
              animate={{
                opacity: phase === 'GLOW' ? 0.7 : 0,
              }}
              style={{
                background: `radial-gradient(circle, rgba(229, 9, 20, 0.4) 0%, rgba(0, 0, 0, 0) 70%)`,
                filter: 'blur(80px)',
              }}
              transition={{ duration: 2.0, ease: "easeInOut" }}
            />

            {/* C Logo */}
            <motion.div
              className="text-[160px] font-bold text-[#E50914] select-none"
              style={{
                fontFamily: 'Netflix Sans, system-ui, sans-serif',
                fontWeight: 900
              }}
              initial={{ 
                scale: 0.8,
                textShadow: '0 0 0px rgba(229, 9, 20, 0)'
              }}
              animate={{
                scale: phase === 'GLOW' ? 1.0 : 0.8,
                textShadow: phase === 'GLOW' 
                  ? '0 0 50px rgba(229, 9, 20, 0.8), 0 0 100px rgba(229, 9, 20, 0.4)' 
                  : '0 0 20px rgba(229, 9, 20, 0.3)'
              }}
              transition={{ 
                duration: 1.8,
                ease: "easeInOut"
              }}
            >
              C
            </motion.div>
          </motion.div>
        )}

        {/* Netflix Product Text */}
        {phase === 'NETFLIX' && (
          <motion.div
            key="netflix"
            className="text-center"
          >
            <motion.p 
              className="text-white font-light text-xl tracking-[0.3em]"
              style={{ fontFamily: 'Netflix Sans, system-ui, sans-serif' }}
              initial={{ 
                opacity: 0,
                y: 20
              }}
              animate={{ 
                opacity: 1,
                y: 0
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              A NETFLIX CONCEPTUAL PRODUCT
            </motion.p>
          </motion.div>
        )}

        {/* Wheel Loading - Separate Phase */}
        {phase === 'WHEEL' && (
          <motion.div
            key="wheel"
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className="w-32 h-32 md:w-40 md:h-40"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E50914" strokeWidth="2" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#333" strokeWidth="4" />
                  <circle cx="50" cy="50" r="8" fill="#1c1c1c" stroke="#E50914" strokeWidth="1" />
                  {[...Array(12)].map((_, i) => (
                    <motion.line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 34 * Math.cos((i * 30 * Math.PI) / 180)}
                      y2={50 + 34 * Math.sin((i * 30 * Math.PI) / 180)}
                      stroke="#666"
                      strokeWidth="0.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    />
                  ))}
                </svg>
              </motion.div>

              <motion.div
                className="absolute inset-0 -z-10 rounded-full bg-[#E50914]/20 blur-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.4 }}
                transition={{ duration: 1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!audioPlayed && (
        <div className="absolute bottom-8 text-white/40 text-xs animate-pulse">
          Click anywhere for sound
        </div>
      )}
    </div>
  )
}
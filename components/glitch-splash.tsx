"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

let globalAudio: HTMLAudioElement | null = null

export function GlitchSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"black" | "glitch" | "netflix" | "complete">("black")
  const logoRef = useRef<HTMLDivElement>(null)
  const glitchRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/netflix-tudum-sfx-n-c-zAKXEHBYl3ICOeHH6eA6pqwzZFt9sF.mp3')
      globalAudio.volume = 0.6
      globalAudio.onended = () => { globalAudio = null }
    }
    
    const logoTimer = setTimeout(() => {
      setPhase("glitch")
      globalAudio?.play().catch(() => {})
      
      // GSAP glitch animation
      if (logoRef.current) {
        gsap.fromTo(logoRef.current, 
          { opacity: 0, scale: 0.5, rotationX: -90 },
          { 
            opacity: 1, 
            scale: 1, 
            rotationX: 0,
            duration: 1,
            ease: "back.out(1.7)"
          }
        )
        
        // Glitch effect
        gsap.to(logoRef.current, {
          x: () => Math.random() * 10 - 5,
          y: () => Math.random() * 10 - 5,
          duration: 0.1,
          repeat: 15,
          yoyo: true,
          ease: "none"
        })
      }
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
      {/* Glitch background */}
      {phase === "glitch" && (
        <div 
          ref={glitchRef}
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(229, 9, 20, 0.1) 2px,
                rgba(229, 9, 20, 0.1) 4px
              )
            `
          }}
        />
      )}

      {/* Logo */}
      {phase === "glitch" && (
        <div
          ref={logoRef}
          className="text-9xl font-black relative"
        >
          <span 
            className="text-[#E50914] drop-shadow-[0_0_40px_rgba(229,9,20,1)]"
            style={{
              textShadow: `
                2px 0 0 #ff0000,
                -2px 0 0 #00ffff,
                0 0 20px #E50914
              `
            }}
          >
            C
          </span>
          
          {/* Glitch layers */}
          <span 
            className="absolute top-0 left-0 text-[#ff0000] opacity-70"
            style={{ transform: 'translate(2px, 0)' }}
          >
            C
          </span>
          <span 
            className="absolute top-0 left-0 text-[#00ffff] opacity-70"
            style={{ transform: 'translate(-2px, 0)' }}
          >
            C
          </span>
        </div>
      )}

      {/* Netflix text */}
      {phase === "netflix" && (
        <div className="absolute text-xl text-white/90 font-light tracking-[0.3em] animate-pulse">
          A NETFLIX CONCEPTUAL PRODUCT
        </div>
      )}
    </div>
  )
}
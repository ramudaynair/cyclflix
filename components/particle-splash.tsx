"use client"

import { useState, useEffect } from "react"
import { useSpring, animated, useTrail } from "@react-spring/web"

let globalAudio: HTMLAudioElement | null = null

export function ParticleSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"black" | "logo" | "particles" | "netflix" | "complete">("black")
  
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
    
    const particlesTimer = setTimeout(() => setPhase("particles"), 1200)
    const netflixTimer = setTimeout(() => setPhase("netflix"), 2000)
    const completeTimer = setTimeout(() => onComplete(), 4000)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(particlesTimer)
      clearTimeout(netflixTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  const logoSpring = useSpring({
    opacity: phase === "logo" || phase === "particles" ? 1 : 0,
    scale: phase === "logo" ? 1 : phase === "particles" ? 1.2 : 0.8,
    config: { tension: 200, friction: 20 }
  })

  const wheelSpring = useSpring({
    opacity: phase === "logo" || phase === "particles" ? 1 : 0,
    rotate: phase === "particles" ? 360 : 0,
    scale: phase === "particles" ? 1.1 : 1,
    config: { tension: 150, friction: 15 }
  })

  const particles = Array.from({ length: 12 }, (_, i) => i)
  const trail = useTrail(particles.length, {
    opacity: phase === "particles" ? 1 : 0,
    transform: phase === "particles" ? 'scale(1) rotate(360deg)' : 'scale(0) rotate(0deg)',
    config: { tension: 300, friction: 10 }
  })

  const netflixSpring = useSpring({
    opacity: phase === "netflix" ? 1 : 0,
    y: phase === "netflix" ? 0 : 20,
    config: { tension: 200, friction: 25 }
  })

  const CycleWheel = () => (
    <svg width="200" height="200" viewBox="0 0 200 200" className="absolute">
      {/* Tire */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#333"
        strokeWidth="20"
        opacity="0.8"
      />
      
      {/* Rim */}
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke="#888"
        strokeWidth="4"
      />
      
      {/* Spokes */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45) * Math.PI / 180
        const x1 = 100 + Math.cos(angle) * 25
        const y1 = 100 + Math.sin(angle) * 25
        const x2 = 100 + Math.cos(angle) * 65
        const y2 = 100 + Math.sin(angle) * 65
        
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#666"
            strokeWidth="2"
          />
        )
      })}
      
      {/* Hub */}
      <circle
        cx="100"
        cy="100"
        r="15"
        fill="#444"
        stroke="#666"
        strokeWidth="2"
      />
    </svg>
  )

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Cycle Wheel */}
      <animated.div
        style={{
          ...wheelSpring,
          transform: wheelSpring.rotate.to(r => `rotate(${r}deg) scale(${wheelSpring.scale.get()})`)
        }}
        className="absolute"
      >
        <CycleWheel />
      </animated.div>

      {/* Logo */}
      <animated.div
        style={logoSpring}
        className="absolute text-9xl font-black z-10"
      >
        <span className="text-[#E50914] drop-shadow-[0_0_40px_rgba(229,9,20,1)]">C</span>
      </animated.div>

      {/* Particle explosion */}
      {trail.map((style, index) => {
        const angle = (index * 360) / particles.length
        const distance = 150
        const x = Math.cos((angle * Math.PI) / 180) * distance
        const y = Math.sin((angle * Math.PI) / 180) * distance
        
        return (
          <animated.div
            key={index}
            style={{
              ...style,
              position: 'absolute',
              width: '6px',
              height: '6px',
              background: '#E50914',
              borderRadius: '50%',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              boxShadow: '0 0 15px #E50914'
            }}
          />
        )
      })}

      {/* Netflix text */}
      <animated.div
        style={{
          opacity: netflixSpring.opacity,
          transform: netflixSpring.y.to(y => `translateY(${y}px)`)
        }}
        className="absolute text-xl text-white/90 font-light tracking-[0.3em]"
      >
        A NETFLIX CONCEPTUAL PRODUCT
      </animated.div>
    </div>
  )
}
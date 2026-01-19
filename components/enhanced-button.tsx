"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface EnhancedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  className?: string
}

export function EnhancedButton({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md",
  disabled = false,
  className = ""
}: EnhancedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = { id: Date.now(), x, y }
    setRipples(prev => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  const variants = {
    primary: "bg-[#E50914] hover:bg-[#b8070f] text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    ghost: "bg-transparent hover:bg-white/10 text-white"
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base", 
    lg: "px-8 py-4 text-lg"
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        relative overflow-hidden rounded-lg font-medium transition-all duration-200
        ${variants[variant]} ${sizes[size]} ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
      
      {/* Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: disabled ? 0 : 0.2 }}
        className="absolute inset-0 bg-white rounded-lg pointer-events-none"
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
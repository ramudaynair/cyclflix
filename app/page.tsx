"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TudumSplash } from "@/components/tudum-splash"
import { HomeContent } from "@/components/home-content"

export default function Home() {
  const [showSplash, setShowSplash] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  useEffect(() => {
    const savedScrollY = sessionStorage.getItem('scrollPosition')
    const scrollPosition = savedScrollY ? parseInt(savedScrollY) : 0
    
    // Show splash if at top or first visit
    if (!savedScrollY || scrollPosition < 100) {
      setShowSplash(true)
    } else {
      setContentReady(true)
    }
    
    // Restore scroll position
    if (savedScrollY && scrollPosition >= 100) {
      setTimeout(() => {
        window.scrollTo(0, scrollPosition)
        sessionStorage.removeItem('scrollPosition')
      }, 100)
    }
  }, [])

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
    setContentReady(true)
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <TudumSplash onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {contentReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HomeContent />
        </motion.div>
      )}
      
      {!showSplash && !contentReady && (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )}
    </>
  )
}

"use client"

import { motion } from "framer-motion"

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-6 w-32 bg-white/10 rounded"
          />
          <div className="hidden md:flex gap-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="h-4 w-20 bg-white/10 rounded"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto py-24">
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-16 w-96 bg-white/10 rounded mb-6 mx-auto"
          />
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            className="h-6 w-64 bg-white/10 rounded mb-8 mx-auto"
          />
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            className="h-12 w-40 bg-[#E50914]/20 rounded mx-auto"
          />
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0.3, 0.7, 0.3], y: 0 }}
                transition={{ 
                  opacity: { duration: 1.5, repeat: Infinity, delay: i * 0.1 },
                  y: { duration: 0.5, delay: i * 0.1 }
                }}
                className="bg-white/[0.02] border border-white/10 rounded-xl p-8"
              >
                <div className="h-12 w-12 bg-[#E50914]/20 rounded-xl mb-6" />
                <div className="h-6 w-32 bg-white/10 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} border-2 border-[#E50914] border-t-transparent rounded-full`}
    />
  )
}
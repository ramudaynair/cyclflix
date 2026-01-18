"use client"

import { useState } from "react"
import { TudumSplash } from "@/components/tudum-splash"
import { ParticleSplash } from "@/components/particle-splash"
import { ThreeDSplash } from "@/components/threejs-splash"
import { GlitchSplash } from "@/components/glitch-splash"
import { LiquidSplash } from "@/components/liquid-splash"

type AnimationType = "original" | "particle" | "threejs" | "glitch" | "liquid" | null

export default function AnimationDemo() {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationType>(null)

  const animations = [
    { id: "original", name: "Original Netflix Style", component: TudumSplash },
    { id: "particle", name: "Particle Explosion", component: ParticleSplash },
    { id: "threejs", name: "3D Rotating Logo", component: ThreeDSplash },
    { id: "glitch", name: "Glitch Matrix Effect", component: GlitchSplash },
    { id: "liquid", name: "Liquid Morphing", component: LiquidSplash },
  ]

  const handleComplete = () => {
    setCurrentAnimation(null)
  }

  const CurrentComponent = animations.find(a => a.id === currentAnimation)?.component

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="text-[#E50914]">CYCLEFLIX</span> Animation Options
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {animations.map((animation) => (
            <button
              key={animation.id}
              onClick={() => setCurrentAnimation(animation.id as AnimationType)}
              className="bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-[#E50914] p-6 rounded-lg transition-all duration-300 text-left"
            >
              <h3 className="text-xl font-semibold mb-2 text-[#E50914]">
                {animation.name}
              </h3>
              <p className="text-gray-400 text-sm">
                Click to preview this animation style
              </p>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Choose an animation style above to see it in action
          </p>
          {currentAnimation && (
            <button
              onClick={() => setCurrentAnimation(null)}
              className="bg-[#E50914] hover:bg-red-700 px-6 py-2 rounded-lg transition-colors"
            >
              Stop Animation
            </button>
          )}
        </div>
      </div>

      {/* Render current animation */}
      {CurrentComponent && (
        <CurrentComponent onComplete={handleComplete} />
      )}
    </div>
  )
}
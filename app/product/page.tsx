"use client"

import { motion } from "framer-motion"
import { Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

const openNetflix = () => {
  window.location.href = "https://www.netflix.com";
};

const products = [
  {
    id: 1,
    title: "CYCLFLIX Smart Helmet",
    description: "Premium helmet with built-in noise-canceling headphones and bone conduction technology for safe cycling entertainment.",
    image: "/images/helmet.png",
    category: "Safety & Audio",
    duration: "12hr battery",
    rating: "4.9"
  },
  {
    id: 2,
    title: "CYCLFLIX N1 Bicycle", 
    description: "Lightweight carbon fiber bicycle designed for entertainment integration. Stream while you ride with premium comfort.",
    image: "/images/ni.jpeg",
    category: "Premium Cycling",
    duration: "6.8kg weight",
    rating: "4.8"
  },
  {
    id: 3,
    title: "5-inch Entertainment Display",
    description: "High-resolution OLED touchscreen showing Netflix content, GPS navigation, and real-time ride metrics.",
    image: "/images/cockpit-display.png", 
    category: "Smart Display",
    duration: "1080p HD",
    rating: "4.9"
  }
]

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/netflixvideo.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-black mb-6"
          >
            <span className="text-[#E50914]">CYCLE</span>FLIX
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl mb-8 text-white/80"
          >
            Stream Netflix while you cycle. The complete entertainment system.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-3" onClick={openNetflix}>
              <Play className="mr-2 h-5 w-5" />
              Open Netflix
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-3">
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            Complete System
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-zinc-900 rounded-lg overflow-hidden cursor-pointer group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#E50914] text-white text-xs px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                      <span className="bg-white/20 px-2 py-1 rounded text-xs">
                        ★ {product.rating}
                      </span>
                      <span>{product.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#E50914] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Watching Style Section */}
      <section className="py-16 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            Features
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Netflix Integration", desc: "Stream directly" },
              { title: "GPS Navigation", desc: "Turn-by-turn" },
              { title: "Safety Audio", desc: "Bone conduction" },
              { title: "12hr Battery", desc: "All-day power" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-black/50 p-4 rounded-lg text-center hover:bg-[#E50914]/10 transition-colors"
              >
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
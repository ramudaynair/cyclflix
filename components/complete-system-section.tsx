"use client"

import { motion } from "framer-motion"

export function CompleteSystemSection() {
  return (
    <section id="complete-system" className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#E50914] text-sm uppercase tracking-widest mb-4 font-medium"
          >
            Engineering
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4"
          >
            Revolutionary Integration
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-lg max-w-3xl mx-auto"
          >
            Experience the world's first Netflix-integrated cycling system that transforms how you ride, exercise, and stay entertained.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
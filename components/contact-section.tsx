"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ContactSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <section id="contact" className="py-24 md:py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-lg max-w-3xl mx-auto"
          >
            Ready to revolutionize your cycling experience? Contact us to learn more about CYCLFLIX.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Mail, title: "Email", info: "info@cyclflix.com" },
            { icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
            { icon: MapPin, title: "Location", info: "San Francisco, CA" }
          ].map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative text-center p-6 bg-white/[0.02] border border-white/10 rounded-xl transition-all duration-500 hover:border-[#E50914]/50 hover:bg-white/[0.02] overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-br from-[#E50914]/10 via-transparent to-transparent pointer-events-none"
              />

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#E50914] to-transparent origin-left"
              />

              <div className="relative z-10">
                <motion.div
                  className="mb-4"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <contact.icon className="h-8 w-8 text-[#E50914] mx-auto transition-all duration-300" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{contact.title}</h3>
                <p className="text-white/60">{contact.info}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="bg-[#E50914] hover:bg-[#b8070f] text-white px-12 py-6 text-lg"
            onClick={() => window.open('mailto:info@cyclflix.com', '_blank')}
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
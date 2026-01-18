"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center p-6 bg-white/[0.02] border border-white/10 rounded-xl"
          >
            <Mail className="h-8 w-8 text-[#E50914] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <p className="text-white/60">info@cyclflix.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center p-6 bg-white/[0.02] border border-white/10 rounded-xl"
          >
            <Phone className="h-8 w-8 text-[#E50914] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
            <p className="text-white/60">+1 (555) 123-4567</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-6 bg-white/[0.02] border border-white/10 rounded-xl"
          >
            <MapPin className="h-8 w-8 text-[#E50914] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Location</h3>
            <p className="text-white/60">San Francisco, CA</p>
          </motion.div>
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
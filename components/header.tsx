"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#complete-system", label: "Engineering" },
    { href: "#the-n1", label: "The Bike" },
    { href: "#specs", label: "Specs" },
  ]

  return (
    <motion.header
      initial={false}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-sm border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <motion.a 
          href="/" 
          className="flex items-center" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="text-xl sm:text-2xl font-black tracking-tight flex items-baseline"
            animate={{
              textShadow: scrolled ? "0 0 15px rgba(229,9,20,0.4)" : "0 0 0px rgba(229,9,20,0)",
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-[#E50914]">C</span>
            <span className="text-white">YCLE</span>
            <span className="text-[#E50914]">FLIX</span>
          </motion.span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-sm text-white/70 hover:text-white transition-colors duration-200 py-2"
              initial={false}
              whileHover="hover"
              onClick={(e) => {
                e.preventDefault()
                if (window.location.pathname !== '/') {
                  router.push('/' + link.href)
                } else {
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {link.label}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E50914] origin-left"
                initial={{ scaleX: 0 }}
                variants={{ hover: { scaleX: 1 } }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/5">
          <div className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  if (window.location.pathname !== '/') {
                    router.push('/' + link.href)
                  } else {
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  )
}

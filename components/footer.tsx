"use client"

import { useRouter } from "next/navigation"

export function Footer() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    // Save the current scroll position from the main page
    sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    console.log('Footer navigation - saving main page scroll:', window.scrollY)
    router.push(path)
  }

  return (
    <footer className="bg-black border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div 
                className="text-2xl font-bold text-[#E50914] select-none"
                style={{
                  fontFamily: 'Netflix Sans, system-ui, sans-serif',
                  fontWeight: 900,
                  textShadow: '0 0 10px rgba(229, 9, 20, 0.3)'
                }}
              >
                C
              </div>
            </div>
            <span className="text-white/50 text-sm">© 2026 CYCLEFLIX. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => handleNavigation('/privacy')}
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => handleNavigation('/terms')}
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Terms
            </button>
            <a 
              href="mailto:info@cyclflix.com" 
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

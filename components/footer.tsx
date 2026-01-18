export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src="/pngwing.com (1).png" 
                alt="Netflix Logo" 
                className="h-8 w-auto"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(229,9,20,0.6)) drop-shadow(0 0 20px rgba(229,9,20,0.3))"
                }}
              />
            </div>
            <span className="text-white/50 text-sm">© 2026 Netflix N1. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-white/50 hover:text-white text-sm transition-colors">
              Terms
            </a>
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

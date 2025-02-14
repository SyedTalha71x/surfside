import { Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <main className="">

    <footer className="bg-gray-900 text-white ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-6 pt-6">
          <a href="/" className="text-[#696CEE] russo-one-regular text-xl font-semibold mb-6">
            ConvertingCurrency
          </a>

          <div className="flex gap-4 mb-6">
            <a href="#" className="hover:text-purple-400">
              <Facebook size={20} />
              <span className="sr-only robboto_font_para">Facebook</span>
            </a>
            <a href="#" className="hover:text-purple-400">
              <Twitter size={20} />
              <span className="sr-only robboto_font_para">Twitter</span>
            </a>
            <a href="#" className="hover:text-purple-400">
              <aedin size={20} />
              <span className="sr-only robboto_font_para">aedIn</span>
            </a>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm mb-6">
            <a href="/" className="hover:text-purple-400 text-white">
              Home
            </a>
            <a href="/convert" className="hover:text-purple-400 text-white cursor-pointer">
              Convert Now
            </a>
            <a href="/about" className="hover:text-purple-400 text-white cursor-pointer">
              About Us
            </a>
            <a href="/contact" className="hover:text-purple-400 text-white cursor-pointer">
              Contact Us
            </a>
          </nav>
        
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-white border-t border-gray-500/30 pt-3 pb-6">
          <p>© 2025 CC | Powered by CC</p>
        </div>
      </div>
    </footer>
    </main>
  )
}


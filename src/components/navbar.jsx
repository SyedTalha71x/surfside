import { useState, useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sidebarRef = useRef(null);

  // Handle scroll event
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50); // Change when scrolled past 50px
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 p-7 transition-colors duration-300 ${
        isScrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="/"
          className="text-[#696CEE] russo-one-regular text-xl font-bold"
        >
          ConvertingCurrency
        </a>

        <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <div className="flex space-x-1 bg-gradient-to-r from-[#8788FE] to-[#696CEE] rounded-xl px-24 backdrop-blur-3xl py-2">
            <a href="/" className="text-white text-sm px-4 py-1 rounded-full transition-colors">
              Home
            </a>
            <a href="/convert" className="text-white text-sm px-4 py-1 rounded-full transition-colors">
              Convert Now
            </a>
            <a href="/about" className="text-white text-sm px-4 py-1 rounded-full transition-colors">
              About Us
            </a>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <button className="flex items-center space-x-2 text-sm rounded-xl bg-gradient-to-r from-[#8788FE] to-[#696CEE] text-white px-5 py-2 cursor-pointer transition-colors hover:opacity-90">
            <span>Contact Us</span>
          </button>
          <div className="flex items-center justify-center w-8 h-8 border-3 border-[#696CEE] rounded-xl">
            <MdArrowOutward className="text-[#696CEE] w-6 h-6" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#696CEE] p-2 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div
          ref={sidebarRef}
          className={`${
            isOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-[#8788FE] to-[#696CEE] transform transition-transform ease-in-out duration-500 md:hidden`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <IoMdClose className="w-6 h-6" />
          </button>

          <div className="flex flex-col pt-20 px-4">
            <a href="/" className="text-white py-3 hover:bg-white/10 rounded-lg transition-colors px-3" onClick={() => setIsOpen(false)}>
              Home
            </a>
            <a href="/convert" className="text-white py-3 hover:bg-white/10 rounded-lg transition-colors px-3" onClick={() => setIsOpen(false)}>
              Convert Now
            </a>
            <a href="/about" className="text-white py-3 hover:bg-white/10 rounded-lg transition-colors px-3" onClick={() => setIsOpen(false)}>
              About Us
            </a>
            <div className="flex items-center mt-4">
              <button className="flex items-center space-x-2 rounded-xl bg-white/10 text-white px-4 py-2 hover:bg-white/20 transition-colors">
                <span>Contact Us</span>
              </button>
              <div className="flex items-center justify-center w-8 h-8 border border-white rounded-xl">
                <MdArrowOutward className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

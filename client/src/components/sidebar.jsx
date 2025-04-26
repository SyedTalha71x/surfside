import { useState, useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('resetEmail')
    navigate('/login')
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed top-4 left-4 z-50 p-2 rounded-lg backdrop-blur-md shadow-lg md:hidden transition-colors duration-300 ${
            scrolled ? "bg-[#2D1D4787]" : "bg-transparent"
          }`}
        >
          <HiMenu className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:sticky top-0 left-0 z-50
          w-56 h-screen
          bg-[#2D1D47] bg-opacity-10 backdrop-blur-md
          rounded-3xl shadow-[0_22.84px_22.84px_1.09px_rgba(45,29,71,0.53)]
          transform transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col p-4 relative">
          {/* Close Button inside Sidebar */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg bg-[#2D1D4787] backdrop-blur-md shadow-md md:hidden"
          >
            <HiX className="w-5 h-5 text-white" />
          </button>

          {/* Sidebar Title */}
          <div className="mt-14 mb-10 ml-5 font-russo">
            <h2 className="text-2xl text-white leading-tight">Converting</h2>
            <h3 className="text-xl text-white">Currency</h3>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-4">
            <Link
              to="/dashboard/home"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#696CEE] hover:bg-[#696CEE]/90 relative"
            >
              <div className="w-3 h-full bg-white rounded-r-xl absolute left-0" />
              <GoHomeFill className="w-5 h-5 text-white ml-3" />
              <span className="text-sm font-medium text-white">Home</span>
            </Link>
          </nav>

          <div className="mb-[20%] cursor-pointer ">
            <button onClick={logout} className="flex items-center  justify-center gap-3 p-3 text-md text-gray-200 hover:text-gray-300 transition-colors">
              <FiLogOut className="w-5 h-5 cursor-pointer" />
              <span className="cursor-pointer">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

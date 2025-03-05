/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import Art from "../../public/images/about-1.png"

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const redirect = () => {
    window.location.href = "/dashboard/home"
  }

  return (
    <div className="h-screen bg-[#0B0D11] flex justify-center items-center p-2">
      <div className="flex w-full max-w-6xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl gap-4">
        {/* Left Section - Full width on small screens */}
        <div className="flex-1 bg-[#181A20] flex flex-col justify-center items-center px-8 py-10 rounded-3xl">
          <h1 className="text-xl font-roboto text-white mb-6">Converting Currency</h1>
          <h2 className="text-3xl font-bold text-left text-white mb-2">Welcome</h2>
          <p className="text-gray-400 mb-6">
            Today is a new day. It's your day. You shape it.
            <br />
            Sign in to start managing your projects.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl text-sm bg-[#1C1C1C] px-4 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#696CEE]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-xl text-sm bg-[#1C1C1C] px-4 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#696CEE]"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Forgot Password?
              </a>
            </div>
            <button
              onClick={redirect}
              type="submit"
              className="w-full rounded-xl bg-[#696CEE] py-2 text-white hover:bg-blue-700 transition-all duration-500 ease-in-out"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Right Section - Hidden on small screens, visible on medium screens and up */}
        <div className="hidden md:flex flex-1 rounded-2xl justify-center items-center">
          <div className="h-full w-full rounded-2xl overflow-hidden">
            <img src={Art || "/placeholder.svg"} alt="Crypto Art" className="object-cover w-full h-full rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}


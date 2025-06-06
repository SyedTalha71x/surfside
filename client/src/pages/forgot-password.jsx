/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import Art from "../../public/images/about-1.png"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { BASE_URL } from "../utils/api"

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.email) {
            toast.error("Please enter your email address")
            return
        }

        setLoading(true)
        
        try {
            const response = await fetch(`${BASE_URL}/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                toast.success(data.message || "OTP sent to your email")
                localStorage.setItem('resetEmail', formData.email)
                setTimeout(() => {
                    navigate('/verify-otp')
                }, 2000)
            } else {
                toast.error(data.message || "Failed to send OTP, Make sure your email is registered")
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
            console.error('Forgot password error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen bg-[#0B0D11] flex justify-center items-center p-2">
            <Toaster 
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#696CEE',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 4000,
                    },
                }}
            />
            
            <div className="flex w-full max-w-6xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl gap-4">
                <div className="flex-1 bg-[#181A20] flex flex-col justify-center items-center px-8 py-10 rounded-3xl">
                    <h1 className="text-xl font-roboto text-white mb-6">Converting Currency</h1>
                    <h2 className="text-3xl font-bold text-left text-white mb-2">Forgot Password</h2>
                    <p className="text-gray-400 mb-6">
                        Enter your email address and we'll send you an OTP to reset your password.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full rounded-xl text-sm bg-[#1C1C1C] px-4 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#696CEE]"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#696CEE] py-2 text-white hover:bg-blue-700 transition-all duration-500 ease-in-out disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending OTP...
                                </span>
                            ) : "Send OTP"}
                        </button>

                        <div className="flex justify-center items-center text-white mt-3">
                            Back to Login? <Link to={"/login"} className="text-[#696CEE] ml-2 hover:text-blue-700 transition-all duration-300">Login</Link>
                        </div>
                    </form>
                </div>

                <div className="hidden md:flex flex-1 rounded-2xl justify-center items-center">
                    <div className="h-full w-full rounded-2xl overflow-hidden">
                        <img src={Art || "/placeholder.svg"} alt="Crypto Art" className="object-cover w-full h-full rounded-3xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}
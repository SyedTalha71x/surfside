/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import Art from "../../public/images/about-1.png"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { BASE_URL } from "../utils/api"

export default function ResetPassword() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    })
    
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    })
    
    const [passwordError, setPasswordError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        if (passwordError) setPasswordError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (formData.newPassword !== formData.confirmPassword) {
            setPasswordError("Passwords do not match")
            toast.error("Passwords do not match")
            return
        }
        
        if (formData.newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters long")
            toast.error("Password must be at least 6 characters long")
            return
        }
        
        const otp = localStorage.getItem("otpVerified")
        if (!otp) {
            toast.error("OTP is missing. Please request a new password reset")
            return
        }
        
        try {
            setIsLoading(true)
            
            const response = await fetch(`${BASE_URL}/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newPassword: formData.newPassword,
                    confirmPassword: formData.confirmPassword,
                    otp: otp 
                })
            })
            
            const data = await response.json()
            
            if (data.status) {
                toast.success(data.message || "Password reset successfully")
                localStorage.removeItem("otpVerified")
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            } else {
                toast.error(data.message || "Failed to reset password")
            }
        } catch (error) {
            console.error("Reset password error:", error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
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
                    <h2 className="text-3xl font-bold text-left text-white mb-2">Reset Password</h2>
                    <p className="text-gray-400 mb-6">
                        Create a new strong password for your account.
                        <br />
                        Make sure it's at least 6 characters.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
                        <div className="relative">
                            <input
                                type={showPassword.newPassword ? "text" : "password"}
                                name="newPassword"
                                placeholder="New Password"
                                className="w-full rounded-xl text-sm bg-[#1C1C1C] px-4 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#696CEE]"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            <button 
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                onClick={() => togglePasswordVisibility("newPassword")}
                            >
                                {showPassword.newPassword ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg> : 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                }
                            </button>
                        </div>
                        
                        <div className="relative">
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="w-full rounded-xl text-sm bg-[#1C1C1C] px-4 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#696CEE]"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button 
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                onClick={() => togglePasswordVisibility("confirmPassword")}
                            >
                                {showPassword.confirmPassword ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg> : 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                }
                            </button>
                        </div>
                        
                        {passwordError && (
                            <div className="text-red-500 text-sm">{passwordError}</div>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#696CEE] py-2 text-white hover:bg-blue-700 transition-all duration-500 ease-in-out mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Reset Password"}
                        </button>

                        <div className="flex justify-center items-center text-white mt-3">
                            Remember your password? <Link to="/login" className="text-[#696CEE] ml-2">Login</Link>
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
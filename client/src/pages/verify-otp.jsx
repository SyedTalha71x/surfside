/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, useEffect } from "react"
import Art from "../../public/images/about-1.png"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { BASE_URL } from "../utils/api"

export default function VerifyOTP() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleChange = (index, value) => {
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== "" && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        
        if (!/^\d+$/.test(pastedData)) {
            toast.error("Only numbers are allowed in OTP");
            return;
        }
        
        const newOtp = [...otp];
        
        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newOtp[i] = pastedData[i];
        }
        
        setOtp(newOtp);
        
        const focusIndex = Math.min(pastedData.length, 5);
        if (inputRefs.current[focusIndex]) {
            inputRefs.current[focusIndex].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const completeOtp = otp.join("");
        
        if (completeOtp.length !== 6) {
            toast.error("Please enter a 6-digit OTP");
            return;
        }

        if (timeLeft <= 0) {
            toast.error("OTP has expired. Please request a new one.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    otp: completeOtp
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "OTP verified successfully");
                localStorage.setItem('otpVerified', completeOtp);
                setTimeout(() => {
                    navigate('/reset-password');
                }, 1500);
            } else {
                toast.error(data.message || "Invalid OTP. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error('OTP verification error:', error);
        } finally {
            setLoading(false);
        }
    };
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
                    <h2 className="text-3xl font-bold text-left text-white mb-2">Verify OTP</h2>
                    <p className="text-gray-400 mb-6">
                        Enter the 6-digit code sent to your email
                        <br />
                        to complete the password reset process.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
                        <div className="flex justify-between gap-2 mb-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    className="w-12 h-12 rounded-lg text-center bg-[#1C1C1C] text-white text-xl font-semibold placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#696CEE]"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : null}
                                    disabled={timeLeft <= 0}
                                />
                            ))}
                        </div>

                        <div className="text-center mb-4">
                            {timeLeft > 0 ? (
                                <p className="text-gray-400">OTP expires in {formatTime(timeLeft)}</p>
                            ) : (
                                <p className="text-red-400">OTP has expired</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#696CEE] py-2 text-white hover:bg-blue-700 transition-all duration-500 ease-in-out disabled:opacity-50"
                            disabled={loading || timeLeft <= 0}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : "Verify OTP"}
                        </button>

                        <div className="flex flex-col justify-center items-center text-white mt-3 space-y-2">
                            <Link to="/forgot-password" className="text-gray-400 hover:text-[#696CEE]">
                                Back to Forgot Password
                            </Link>
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
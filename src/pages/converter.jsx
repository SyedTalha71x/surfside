import { useState } from "react"

export default function CurrencyConverter() {
  const [activeTab, setActiveTab] = useState("fiat")
  const [fromAmount, setFromAmount] = useState("1000.00")
  const [toAmount, setToAmount] = useState("1000000.00")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("GBP")

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  return (
    <div className=" bg-black p-4 flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl robotto_font  text-white mb-2">Convertor</h1>
        <p className="text-gray-400 text-lg">Covert currency</p>
      </div>

<div className="rounded-3xl w-full max-w-5xl p-4 bg-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.1)]">


      <div className=" bg-white rounded-3xl p-6 md:p-8 ">
        {/* Currency Type Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("fiat")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
              ${activeTab === "fiat" ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            Fiat currency
          </button>
          <button
            onClick={() => setActiveTab("crypto")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
              ${activeTab === "crypto" ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            Cryptocurrency
          </button>
        </div>

        {/* Converter Form */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* From Currency */}
            <div className="w-full space-y-2">
              <label className="text-sm text-gray-600">From</label>
              <div className="relative">
                <input
                  type="text"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="w-full p-3 border rounded-lg pr-20"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-2 py-1 border rounded-md">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-02-14_00-25-HgeycqEGvXEnDeUsCkM3bmbSAhg7X9.png"
                    alt="USD flag"
                    className="w-5 h-5 rounded-sm object-cover"
                  />
                  <span className="text-sm font-medium">{fromCurrency}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            {/* To Currency */}
            <div className="w-full space-y-2">
              <label className="text-sm text-gray-600">Convert to</label>
              <div className="relative">
                <input
                  type="text"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  className="w-full p-3 border rounded-lg pr-20"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-2 py-1 border rounded-md">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-02-14_00-25-HgeycqEGvXEnDeUsCkM3bmbSAhg7X9.png"
                    alt="GBP flag"
                    className="w-5 h-5 rounded-sm object-cover"
                  />
                  <span className="text-sm font-medium">{toCurrency}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="text-center text-sm text-gray-600">
            $1.000 USD = <span className="text-indigo-500">£0.8211</span> GBP
          </div>

          <div className="flex justify-center">
            <button className="px-8 py-3  text-white rounded-xl text-sm bg-gradient-to-b from-[#8788FE] to-[#696CEE] transition-colors font-medium shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_20px_rgba(99,102,241,0.7)]">
              Convert Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}


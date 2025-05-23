
import { useState, useEffect } from "react"
import { BiTransferAlt } from "react-icons/bi"
import axios from "axios"
import { BASE_URL } from "../utils/api"

const Converter = () => {
  const [currencyFrom, setCurrencyFrom] = useState("")
  const [currencyTo, setCurrencyTo] = useState("")
  const [amount, setAmount] = useState("1")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [rate, setRate] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [supportedCurrencies, setSupportedCurrencies] = useState({
    cryptos: [],
    fiats: [],
  })
  const [isSwapping, setIsSwapping] = useState(false)

  useEffect(() => {
    const fetchSupportedCurrencies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/currencies`)
        setSupportedCurrencies(response.data.data)
      } catch (err) {
        setError("Failed to load supported currencies")
        console.error(err)
      }
    }

    fetchSupportedCurrencies()
  }, [])

  const handleConvert = async () => {
    if (!currencyFrom || !currencyTo) {
      setError("Please select both currencies")
      return
    }

    if (currencyFrom && currencyTo && amount && !isNaN(amount) && amount > 0) {
      try {
        setLoading(true)
        const response = await axios.get(`${BASE_URL}/convert?from=${currencyFrom}&to=${currencyTo}&amount=${amount}`)
        setConvertedAmount(response.data.data.convertedAmount)
        setRate(response.data.data.rate)
        setError(null)
      } catch (err) {
        setError(err.response?.data?.message || "Failed to convert currency")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSwapCurrencies = () => {
    setIsSwapping(true)

    // Add a slight delay before actually swapping the values
    setTimeout(() => {
      setCurrencyFrom(currencyTo)
      setCurrencyTo(currencyFrom)
      setIsSwapping(false)
    }, 300) // Match this with the animation duration
  }

  return (
    <div className="w-full min-h-80 h-auto bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/50">
      <div className="w-full min-h-80 h-auto bg-white rounded-2xl relative top-2 left-2 shadow-2xl shadow-green-300/40 flex justify-center items-center">
        <div className="w-full h-full flex flex-col items-center px-3 py-6 sm:px-5 sm:py-8 lg:px-10 justify-center gap-3">
          <h2 className="gradient-title font-bold text-3xl md:text-4xl">Currency Converter</h2>

          <div className="w-full max-w-md mt-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-xl focus:outline-none focus:border-[#696CEE] text-black"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3">
            <div className="flex-1 md:max-w-xs w-full">
              <label className="block text-[#747474] text-sm mb-1">From</label>
              <div
                className={`relative flex items-center transition-all duration-300 ${
                  isSwapping ? "transform translate-x-4 opacity-50" : ""
                }`}
              >
                {currencyFrom && (
                  <img src={`/images/${currencyFrom}.png`} alt={currencyFrom} className="absolute left-3 w-6 h-6" />
                )}
                <select
                  value={currencyFrom}
                  onChange={(e) => setCurrencyFrom(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#696CEE] uppercase text-black appearance-none transition-colors duration-300"
                  disabled={loading || isSwapping}
                >
                  <option value="">Select Currency</option>
                  {/* Fiat Currency Group */}
                  <optgroup label="Fiat Currencies">
                    {supportedCurrencies.fiats.map((fiat) => (
                      <option key={fiat.toLowerCase()} value={fiat.toLowerCase()}>
                        {fiat.toUpperCase()} ({fiat.toUpperCase()})
                      </option>
                    ))}
                  </optgroup>

                  {/* Crypto Currency Group */}
                  <optgroup label="Cryptocurrencies">
                    {supportedCurrencies.cryptos.map((crypto) => (
                      <option key={crypto.toLowerCase()} value={crypto.toLowerCase()}>
                        {crypto.toUpperCase()} ({crypto.toUpperCase()})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <button
              onClick={handleSwapCurrencies}
              className={`mt-6 p-2 rounded-full hover:bg-gray-100 transition-colors ${
                isSwapping ? "animate-spin" : ""
              }`}
              disabled={loading || !currencyFrom || !currencyTo}
            >
              <BiTransferAlt color="#000" className="size-6 md:size-8" />
            </button>

            <div className="flex-1 md:max-w-xs w-full">
              <label className="block text-[#747474] text-sm mb-1">To</label>
              <div
                className={`relative flex items-center transition-all duration-300 ${
                  isSwapping ? "transform -translate-x-4 opacity-50" : ""
                }`}
              >
                {currencyTo && (
                  <img src={`/images/${currencyTo}.png`} alt={currencyTo} className="absolute left-3 w-6 h-6" />
                )}
                <select
                  value={currencyTo}
                  onChange={(e) => setCurrencyTo(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#696CEE] uppercase text-black appearance-none transition-colors duration-300"
                  disabled={loading || isSwapping}
                >
                  <option value="">Select Currency</option>
                  {/* Fiat Currency Group */}
                  <optgroup label="Fiat Currencies">
                    {supportedCurrencies.fiats.map((fiat) => (
                      <option key={fiat.toLowerCase()} value={fiat.toLowerCase()}>
                        {fiat.toUpperCase()} ({fiat.toUpperCase()})
                      </option>
                    ))}
                  </optgroup>

                  {/* Crypto Currency Group */}
                  <optgroup label="Cryptocurrencies">
                    {supportedCurrencies.cryptos.map((crypto) => (
                      <option key={crypto.toLowerCase()} value={crypto.toLowerCase()}>
                        {crypto.toUpperCase()} ({crypto.toUpperCase()})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
          </div>

          <div className="text-center mt-4 min-h-12">
            {loading ? (
              <p className="text-black">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : convertedAmount > 0 ? (
              <p className="text-black text-lg">
                {amount} {currencyFrom.toUpperCase()} ={" "}
                <span className="font-bold text-[#696CEE]">
                  {convertedAmount.toFixed(8)} {currencyTo.toUpperCase()}
                </span>
                <br />
                <span className="text-sm text-gray-500">
                  Rate: 1 {currencyFrom.toUpperCase()} = {rate.toFixed(8)} {currencyTo.toUpperCase()}
                </span>
              </p>
            ) : null}
          </div>

          <button
            onClick={handleConvert}
            className={`text-sm md:text-base cursor-pointer max-md:py-1.5 py-2 max-md:rounded-xl rounded-2xl w-full md:w-1/2 bg-[#696CEE] text-white transition-all duration-500 ${
              loading || !currencyFrom || !currencyTo
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white hover:text-[#696CEE] border-[0.1px] border-[#696CEE]"
            }`}
            disabled={loading || !currencyFrom || !currencyTo}
          >
            {loading ? "Converting..." : "Convert Now"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Converter

import { useState, useEffect } from "react";
import { BiTransferAlt } from "react-icons/bi";
import axios from "axios";
import { BASE_URL } from "../utils/api";

const Converter = () => {
  const [currencyFrom, setCurrencyFrom] = useState("usd");
  const [currencyTo, setCurrencyTo] = useState("gbp");
  const [amount, setAmount] = useState("1");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [supportedCurrencies, setSupportedCurrencies] = useState({
    cryptos: [],
    fiats: [],
  });

  useEffect(() => {
    const fetchSupportedCurrencies = async () => {
      try {
        const response = await axios.get(
        `${BASE_URL}/api/currencies`
        );
        setSupportedCurrencies(response.data.data);
        if (response.data.data.fiats.length > 0) {
          setCurrencyFrom(response.data.data.fiats[0].toLowerCase());
        }
        if (response.data.data.fiats.length > 1) {
          setCurrencyTo(response.data.data.fiats[1].toLowerCase());
        }
      } catch (err) {
        setError("Failed to load supported currencies");
        console.error(err);
      }
    };

    fetchSupportedCurrencies();
  }, []);

  const handleConvert = async () => {
    if (currencyFrom && currencyTo && amount && !isNaN(amount) && amount > 0) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/convert?from=${currencyFrom}&to=${currencyTo}&amount=${amount}`
        );
        setConvertedAmount(response.data.data.convertedAmount);
        setRate(response.data.data.rate);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to convert currency");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSwapCurrencies = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  const allCurrencies = [
    ...supportedCurrencies.fiats.map((fiat) => ({
      name: `${fiat} (${fiat.toUpperCase()})`,
      icon: fiat.toLowerCase(),
    })),
    ...supportedCurrencies.cryptos.map((crypto) => ({
      name: `${crypto} (${crypto.toUpperCase()})`,
      icon: crypto.toLowerCase(),
    })),
  ];

  return (
    <div className="w-full min-h-80 h-auto bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/50">
      <div className="w-full min-h-80 h-auto bg-white rounded-2xl relative top-2 left-2 shadow-2xl shadow-green-300/40 flex justify-center items-center">
        <div className="w-full h-full flex flex-col items-center px-3 py-6 sm:px-5 sm:py-8 lg:px-10 justify-center gap-3">
          <h2 className="gradient-title font-bold text-3xl md:text-4xl">
            Currency Converter
          </h2>

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
              <div className="relative flex items-center">
                <img
                  src={`/images/${currencyFrom}.png`}
                  alt={currencyFrom}
                  className="absolute left-3 w-6 h-6"
                />
                <select
                  value={currencyFrom}
                  onChange={(e) => setCurrencyFrom(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#696CEE] uppercase text-black appearance-none"
                  disabled={loading}
                >
                  {allCurrencies.map((currency) => (
                    <option key={currency.icon} value={currency.icon}>
                      {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSwapCurrencies}
              className="mt-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              <BiTransferAlt color="#000" className="size-6 md:size-8" />
            </button>

            <div className="flex-1 md:max-w-xs w-full">
              <label className="block text-[#747474] text-sm mb-1">To</label>
              <div className="relative flex items-center">
                <img
                  src={`/images/${currencyTo}.png`}
                  alt={currencyTo}
                  className="absolute left-3 w-6 h-6"
                />
                <select
                  value={currencyTo}
                  onChange={(e) => setCurrencyTo(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#696CEE] uppercase text-black appearance-none"
                  disabled={loading}
                >
                  {allCurrencies.map((currency) => (
                    <option key={currency.icon} value={currency.icon}>
                      {currency.name}
                    </option>
                  ))}
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
                  Rate: 1 {currencyFrom.toUpperCase()} = {rate.toFixed(8)}{" "}
                  {currencyTo.toUpperCase()}
                </span>
              </p>
            ) : null}
          </div>

          <button
            onClick={handleConvert}
            className={`text-sm md:text-base cursor-pointer max-md:py-1.5 py-2 max-md:rounded-xl rounded-2xl w-full md:w-1/2 bg-[#696CEE] text-white transition-all duration-500 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white hover:text-[#696CEE] border-[0.1px] border-[#696CEE]"
            }`}
            disabled={loading}
          >
            {loading ? "Converting..." : "Convert Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Converter;

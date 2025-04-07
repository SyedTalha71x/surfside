import { useState } from "react";
import { BiTransferAlt } from "react-icons/bi";

const allCurrencies = [
    {
        name: 'US Dollars (USD)',
        icon: 'usd'
    },
    {
        name: 'GB Pounds (GBP)',
        icon: 'gbp'
    },
    {
        name: 'Canadian Dollars (CAD)',
        icon: 'cad'
    },
    {
        name: 'Indian Rupees (INR)',
        icon: 'inr'
    },
    {
        name: 'Euros (EUR)',
        icon: 'eur'
    },
    {
        name: 'Emirates Dirhams (aed)',
        icon: 'aed'
    },
    {
        name: 'Bitcoin (BTC)',
        icon: 'btc',
    },
    {
        name: 'Ethereum (ETH)',
        icon: 'eth'
    }
    ,
    {
        name: 'USD Thereum (USDT)',
        icon: 'usdt'
    }
]

const Converter = () => {
    // const [selectedConverter, setSelectedConverter] = useState('currency');
    const [currencyFrom, setCurrencyFrom] = useState('usd');
    const [currencyTo, setCurrencyTo] = useState('gbp');
    const [amount, setAmount] = useState('1');

    // const converterHandler = (converter) => {
    //     setSelectedConverter(converter);
    //     if (converter === 'currency') {
    //         setCurrencyFrom('usd');
    //         setCurrencyTo('gbp');
    //     } else if (converter === 'crypto') {
    //         setCurrencyFrom('btc');
    //         setCurrencyTo('eth');
    //     } else if (converter === 'flatToCrypto') {
    //         setCurrencyFrom('usd');
    //         setCurrencyTo('btc');
    //     }
    // };


    return (
        <div className="w-full min-h-80 h-auto bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/50">
            <div className="w-full min-h-80 h-auto bg-white rounded-2xl relative top-2 left-2 shadow-2xl shadow-green-300/40 flex justify-center items-center">
                <div className="w-full h-full flex flex-col items-center px-3 py-6 sm:px-5 sm:py-8 lg:px-10 justify-center gap-3">
                    {/* Toggle Container */}
                    <h2 className=' gradient-title font-bold text-3xl md:text-4xl'>Currency Converter</h2>
                    {/* <div className="bg-[#454633] rounded-2xl relative border-2 border-[#454633] flex w-full max-w-2xl">
                        <span className={`absolute h-full w-1/3  bg-[#696CEE] flex items-center justify-center z-20 rounded-2xl transition-transform duration-500 ease-in-out
                            ${selectedConverter === 'currency' ? 'translate-x-0' :
                                selectedConverter === 'crypto' ? 'translate-x-full' :
                                    'translate-x-[200%]'}`}
                        >
                            {selectedConverter === 'currency' ? 'Flat Currency' :
                                selectedConverter === 'crypto' ? 'Cryptocurrency' :
                                    'Flat to Crypto'}
                        </span>
                        <button
                            onClick={() => converterHandler('currency')}
                            className="relative z-10 w-1/3 py-2 text-center text-xs md:text-sm xl:text-base font-medium transition-colors duration-200
                                     text-[#696CEE]  whitespace-nowrap px-1"
                        >
                            Flat Currency
                        </button>
                        <button
                            onClick={() => converterHandler('crypto')}
                            className="relative z-10 w-1/3 py-2 text-center text-xs md:text-sm xl:text-base font-medium transition-colors duration-200
                                     text-[#696CEE]  whitespace-nowrap px-1"
                        >
                            Cryptocurrency
                        </button>
                        <button
                            onClick={() => converterHandler('flatToCrypto')}
                            className="relative z-10 w-1/3 py-2 text-center text-xs md:text-sm xl:text-base font-medium transition-colors duration-200
                                     text-[#696CEE]  whitespace-nowrap px-1"
                        >
                            Flat to Crypto
                        </button>
                    </div> */}

                    {/* Amount Input */}
                    <div className="w-full max-w-md mt-3">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 text-sm md:text-base   border border-gray-300 rounded-xl focus:outline-none focus:border-[#696CEE] text-black"
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Currency Selectors */}
                    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3">
                        {/* From Currency */}
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
                                >
                                    {allCurrencies?.map((currency) => (
                                        <option key={currency.icon} value={currency?.icon}>
                                            {currency?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <BiTransferAlt color="#000" strokeWidth={0} className="size-6 md:size-8 mt-6" />

                        {/* To Currency */}
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
                                >
                                    {allCurrencies?.map((currency) => (
                                        <option key={currency.icon} value={currency.icon}>
                                            {currency?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Conversion Result */}
                    <div className="text-center mt-4">
                        <p className="text-black text-lg">
                            {amount} {currencyFrom.toUpperCase()} = <span className="font-bold text-[#696CEE]">{(amount * 32.58).toFixed(2)} {currencyTo.toUpperCase()}</span>
                        </p>
                    </div>

                    <button className="text-sm hover:bg-white hover:text-[#696CEE] border-[0.1px] border-[#696CEE] transition-all duration-500 md:text-base cursor-pointer max-md:py-1.5 py-2 max-md:rounded-xl rounded-2xl w-full md:w-1/2 bg-[#696CEE] text-white">
                        Convert Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Converter;
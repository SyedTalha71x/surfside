/* eslint-disable no-unused-vars */
import React from 'react';
import Globe from '../../public/_Compound Path_.png'

const CurrencyDashboard = () => {
  const currencies = [
    { code: "GBP", flag: "🇬🇧", price: "50,934.00", change: "+0.05%" },
    { code: "EUR", flag: "🇪🇺", price: "50,934.00", change: "-0.05%" },
    { code: "INR", flag: "🇮🇳", price: "50,934.00", change: "+0.05%" },
    { code: "CAD", flag: "🇨🇦", price: "50,934.00", change: "+0.05%" },
    { code: "AED", flag: "🇦🇪", price: "50,934.00", change: "-0.05%" }
  ];

  return (
    <div className="w-full  bg-black  p-4 pb-26">
      <div className="relative z-10 w-[90%] mx-auto pt-24 ">
        <h1 className="text-5xl text-white robotto_font text-center mb-8">Top Conversions Today</h1>
        
        <div className="relative mt-52 ">
          <img 
            src={Globe}
            alt="Globe visualization"
            className="absolute left-1/2 -top-38 -translate-x-1/2 h-full w-full opacity-20 pointer-events-none"
          />
          
          <div className="bg-[#FBFFF6E5] rounded-2xl overflow-hidden shadow-2xl p-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-4 px-6 p-4 text-left text-gray-800 font-normal">Currency</th>
                  <th className="py-4 px-6 p-4 text-left text-gray-800 font-normal">Price</th>
                  <th className="py-4 px-6 p-4 text-left text-gray-800 font-normal">7Days</th>
                  <th className="py-4 px-6 p-4 text-left text-gray-800 font-normal">Graph</th>
                </tr>
              </thead>
              <tbody>
                {currencies.map((currency, index) => (
                  <tr 
                    key={currency.code} 
                    className=""
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-4">
                          {currency.flag}
                        </span>
                        <span className="text-gray-800 font-medium">{currency.code}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-800">${currency.price}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`${
                        currency.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {currency.change}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <svg className="w-24 h-6" viewBox="0 0 96 24">
                        <path
                          d={
                            currency.change.startsWith('+')
                              ? "M0 18 Q24 15 48 12 T96 6"
                              : "M0 6 Q24 9 48 12 T96 18"
                          }
                          fill="none"
                          stroke={currency.change.startsWith('+') ? "#22c55e" : "#ef4444"}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDashboard;
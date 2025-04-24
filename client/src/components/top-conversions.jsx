import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../utils/api";

const TopConversions = () => {
    const [conversionData, setConversionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/get-exchange-rates`);
                const dataWithIds = response.data.map((item, index) => ({
                    ...item,
                    id: index + 1
                }));
                setConversionData(dataWithIds);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching currency data:', err);
            }
        };

        fetchCurrencyData();
    }, []);

    return (
        <div className="w-full px-4 sm:px-8 md:px-16">
            <div className="text-center">
                <motion.h2
                    initial={{
                        y: -50,
                        opacity: 0
                    }}
                    whileInView={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.1
                    }}
                    className="font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-20 xl:text-5xl"
                >
                    Top Conversions Today
                </motion.h2>
            </div>
            <div className="w-full flex flex-col items-center relative">
                <div className="max-w-5xl -mt-10">
                    <img src="/images/globe2.png" alt="Globe" />
                </div>
                <div className="w-full h-full">
                    {loading ? (
                        <div className="w-full bg-white rounded-3xl md:rounded-4xl px-6 sm:px-8 md:px-20 py-10 flex justify-center items-center">
                            <div className="w-full max-w-md">
                                <div className="text-center mb-4">Loading currency data...</div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <motion.div 
                                        className="bg-blue-600 h-2.5 rounded-full" 
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ 
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="w-full bg-white rounded-3xl md:rounded-4xl px-6 sm:px-8 md:px-20 py-10 text-center text-red-500">
                            Error: {error}
                        </div>
                    ) : (
                        <div className="w-full overflow-x-auto h-auto bg-white rounded-3xl md:rounded-4xl px-6 sm:px-8 md:px-20 py-5">
                            <table className="w-full text-black">
                                <thead>
                                    <tr className="border-b border-black/60">
                                        <th className="text-left py-2 px-5 text-base md:text-xl w-1/4">Currency</th>
                                        <th className="text-left py-2 px-5 text-base md:text-xl w-1/4">Price</th>
                                        <th className="text-left py-2 px-5 text-base md:text-xl w-1/4">7Days</th>
                                        <th className="text-left py-2 px-5 text-base md:text-xl w-1/4">Graph</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {conversionData?.map((cnv, i) => (
                                        <tr
                                            key={cnv?.id}
                                            className={`${conversionData.length - 1 === i ? '' : 'border-b border-black/40'}`}
                                        >
                                            <td className="py-2 px-5 w-1/4">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={`/images/${cnv.currency}.png`}
                                                        className="size-6 md:size-8"
                                                        alt={`${cnv.currency} flag`}
                                                    />
                                                    <p className="uppercase text-sm md:text-base">{cnv.currency}</p>
                                                </div>
                                            </td>
                                            <td className="py-2 px-5 text-sm md:text-base w-1/4">
                                                ${cnv.price}
                                            </td>
                                            <td className={`py-2 px-5 text-sm md:text-base w-1/4 ${cnv.Days7.charAt(0) === '+' ? 'text-green-600' : 'text-red-600'}`}>
                                                {cnv.Days7}
                                            </td>
                                            <td className="py-2 px-5 w-1/4">
                                                {cnv.Days7.charAt(0) === '+' ? (
                                                    <FaArrowTrendUp className="text-green-600" />
                                                ) : (
                                                    <FaArrowTrendDown className="text-red-600" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopConversions;
import Converter from "../components/converter"
import TopConversions from "../components/top-conversions"
import { IoMdArrowRoundUp } from "react-icons/io";
import { motion } from 'motion/react'
import { Element } from "react-scroll";

const Convert = () => {
    return (
        <Element name="convert">

            <section className="w-full z-50">
                <div className="min-h-screen max-w-7xl mx-auto  z-50">
                    <div className='min-h-screen flex flex-col gap-10  mb-14 z-50  px-4  sm:px-8 md:px-16 '>
                        <motion.div
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
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center">
                                <span className="gradient-title">Converting </span>Currency
                            </h1>
                        </motion.div>
                        <motion.p
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
                                delay: 0.2
                            }}
                            className="text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold ">Welcome to the Currency Converter</motion.p>
                        <Converter rate={true} />
                        <div className="flex-col h-full  sm:flex-row flex items-center w-full gap-10">
                            <div className="w-full sm:w-1/2 h-full">
                                <img src="/images/chart.png" className="aspect-auto" alt="" />
                            </div>
                            <div className="w-full sm:w-1/2 h-full relative">
                                <div className="absolute inset-0 w-full h-full">
                                    <div className="w-full h-full py-3 md:py-4 lg:py-8  px-4 md:px-8  lg:px-10">
                                        <div className="flex flex-col h-full">
                                            <div className="flex items-center gap-2">
                                                <img src="/images/bitcoin.png" className="size-10" alt="" />
                                                <div className="flex flex-col">
                                                    <p className="font-medium md:text-lg">BTC</p>
                                                    <p className="max-md:text-sm text-base">Bitcoin</p>
                                                </div>
                                            </div>
                                            <div className="w-full h-full flex items-center px-10">
                                                <div>
                                                    <p className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl">£82,920.65</p>
                                                    <span className="text-xs md:text-sm flex items-center text-green-600 ">
                                                        <IoMdArrowRoundUp />
                                                        <p>+0.03</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <img src="/images/convert-1.png" className="aspect-auto" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <TopConversions />
            </section>
        </Element>
    )
}

export default Convert

/* eslint-disable no-unused-vars */
import Imageleft from '../../public/Visitor Insights.svg'
import ImageRight from '../../public/Frame 19.svg'
import { MdArrowOutward } from "react-icons/md";
import { FiArrowDownRight } from "react-icons/fi";


const Home = () => {
  return (
    <main className="min-h-screen bg-black text-white pt-26">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-5xl mx-auto mb-8">
          <h1 className="text-6xl md:text-8xl robotto_font  mb-10 tracking-tight">
            <span className="bg-gradient-to-r from-[#8788FE] to-[#696CEE] text-transparent bg-clip-text [text-shadow:0_0_20px_rgba(135,136,254,0.5),0_0_40px_rgba(105,108,238,0.3)]">Fast</span>
            {" "}and{" "}
            <span className="bg-gradient-to-r from-[#8788FE] to-[#696CEE] text-transparent bg-clip-text [text-shadow:0_0_20px_rgba(135,136,254,0.5),0_0_40px_rgba(105,108,238,0.3)]">Easy</span>
            <br />
            <span className="text-white">Currency Conversions</span>
          </h1>
          <p className="text-gray-200 robboto_font_para text-3xl mb-8">
            Get real-time rates for fiat and cryptocurrencies.
            <br />
            Compare and convert in seconds
          </p>
          <div className="flex justify-center items-center">
            <button className="flex items-center space-x-2 text-sm rounded-xl bg-gradient-to-r from-[#8788FE] to-[#696CEE] text-white px-5 py-2 cursor-pointer transition-colors hover:opacity-90">
              <span>Convert Now</span>
            </button>
            <div className="flex items-center justify-center w-8 h-8 border border-[#696CEE] rounded-xl">
              <FiArrowDownRight className="text-[#696CEE] w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
import { FiInfo } from "react-icons/fi";
import { PiTarget } from "react-icons/pi";
import { motion } from 'motion/react'
import BentoTilt from "../components/bento-tilt";


const AboutData = [
  {
    icon: FiInfo,
    image: "/images/about-1.png",
    title: 'About',
    text: "   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    icon: PiTarget,
    image: "/images/about-2.png",
    title: 'Our Mission',
    text: "   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
]



const About = () => {
  return (
    <div className="w-full relative min-h-screen py-10">
      <div className="min-h-screen max-w-7xl mx-auto  ">
        <div className='flex flex-col gap-10  mb-20 '>
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-center">
              <span className="gradient-title">About </span>
              Us
            </h1>
          </motion.div>
          <div className='grid gap-10 sm:gap-14 md:gap-24 px-5'>
            {
              AboutData?.map((about, idx) =>
                <div
                  key={idx}
                  className={`flex max-sm:flex-col justify-center w-full gap-10  sm:gap-14 md:gap-24 ${idx === 1 && 'max-sm:flex-col-reverse flex-row-reverse'}`}>



                  <BentoTilt className="w-full md:w-[50%] z-50 h-[330px] sm:h-[400px] md:h-[500px] lg:h-[550px]  rounded-2xl md:rounded-4xl overflow-hidden ">
                    <div className=''>
                      <img src={about.image} className='w-full h-full object-cover' alt="About Image" />
                    </div>
                  </BentoTilt>



                  <div className='w-full md:w-[50%] h-[330px] sm:h-[400px] md:h-[500px] lg:h-[550px] bg-white/10 backdrop-blur-md border border-white/20   rounded-2xl md:rounded-4xl overflow-hidden  '>
                    <div className="w-full h-full flex flex-col justify-center gap-2 sm:gap-5 md:gap-8 p-4 sm:p-8 md:p-12 lg:p-16">
                      <div className="bg-gradient-to-b from-[#8788FE] to-[#696CEE] w-12 sm:w-16 md:w-20 lg:w-24  h-12 sm:h-16 md:h-20 lg:h-24  rounded-2xl text-2xl sm:text-5xl md:text-6xl font-thin flex items-center justify-center   ">
                        <about.icon color="#000" strokeWidth={1} />
                      </div>
                      <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">{about?.title}</h3>
                      <p className="text-xs sm:text-base md:text-base xl:text-lg">
                        {about?.text}
                      </p>
                    </div>
                  </div>



                </div>)
            }


          </div>
        </div>
      </div>
    </div>
  )
}

export default About

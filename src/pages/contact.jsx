import ArrowBtn from "../components/arrow-btn"
import { TbMailFilled } from "react-icons/tb";
import { motion } from 'motion/react'
import BentoTilt from "../components/bento-tilt";
import { Element } from "react-scroll";
const Contact = () => {
  return (
    <Element name="contact">

      <section className="w-full relative min-h-screen py-10">
        <div className="min-h-screen max-w-7xl mx-auto  ">
          <div className='flex flex-col gap-10 px-4 sm:px-10 '>
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
                <span className="gradient-title">Contact </span>Us
              </h1>
            </motion.div>
            <div className="w-full  bg-[#8788FE1A] rounded-3xl">
              <div className="w-full h-full flex  gap-10 lg:gap-20 p-5 sm:p-12 md:p-16">
                <BentoTilt className="max-sm:hidden w-1/2 h-full py-2">
                  <div >
                    <img src="/images/contact-1.png" alt="" />
                  </div>
                </BentoTilt>
                <div className="max-sm:w-full w-1/2  h-full flex flex-col gap-4 justify-normal">
                  <p className="font-medium text-2xl sm:text-3xl md:text-4xl">Drop a message</p>
                  <div>
                    <form action="" className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1 ">
                        <label htmlFor="_name">Name</label>
                        <input type="text" placeholder="Name" className="z-50 bg-[#CBCBCB] text-sm sm:text-base px-8 py-3 md:py-4 text-gray-950 rounded-xl sm:rounded-2xl w-full" />
                      </div>
                      <div className="flex flex-col gap-1 ">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Email" className="z-50 bg-[#CBCBCB] text-sm sm:text-base px-8 py-3 md:py-4 text-gray-950 rounded-xl sm:rounded-2xl w-full" />
                      </div>
                      <div className="flex flex-col gap-1 ">
                        <label htmlFor="message">Message</label>
                        <textarea placeholder="Message" rows={7} className="z-50 bg-[#CBCBCB] text-sm sm:text-base px-8 py-3 md:py-4 text-gray-950 rounded-xl sm:rounded-2xl w-full" />
                      </div>
                      <div className="z-50">
                        <ArrowBtn arrow={'up'} text={'Send'} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-6" >
              <div className="max-w-4xl p-5 sm:p-12 md:p-16 mx-auto bg-[#8788FE1A] rounded-3xl flex max-sm:flex-col items-center justify-between gap-5 md:gap-10">
                <div className="max-sm:w-full w-1/2  flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <TbMailFilled className="size-16 sm:size-20 md:size-24" color="#696CEE" />
                    <div className="max-sm:text-center">
                      <p className="text-2xl sm:text-3xl md:text-4xl" >Our support email</p>
                      <p className="text-[#696CEE]  text-lg sm:text-xl">support@convertingcurrency.com</p>
                    </div>
                  </div>
                </div>
                <BentoTilt className="max-sm:w-full w-1/2 max-sm:p-5 z-50">
                  <div >
                    <img src="/images/contact-2.png" alt="" />
                  </div>
                </BentoTilt>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Element>
  )
}

export default Contact

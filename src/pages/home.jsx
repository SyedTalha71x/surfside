import { motion } from "motion/react";
import { Element, Link } from "react-scroll";
const Home = () => {
  return (
    <Element name="home">
      <section className="w-full relative h-screen">
        <div className="absolute h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 bg-[#696CEE]/10 backdrop-blur-lg rounded-3xl top-52 -left-5 sm:top-48 md:top-52">
          <img src="/images/insights.png" className="h-full" alt="" />
        </div>
        <div className="absolute h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 bottom-44  md:bottom-52  right-0">
          <img src="/images/usdt-1.png" className="h-full" alt="" />
        </div>
        <div className="min-h-screen max-w-7xl mx-auto ">
          <div className="w-full  flex flex-col gap-3 items-center mt-10 sm:mt-14 md:mt-18 lg:mt-24 space-y-10 sm:space-y-14 md:space-y-18 lg:space-y-24">
            <motion.div
              initial={{
                y: -50,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.1,
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-center">
                <span className="gradient-title [text-shadow:0_0_20px_rgba(135,136,254,0.5),0_0_40px_rgba(105,108,238,0.3)]">
                  Fast{" "}
                </span>
                and
                <span className="gradient-title [text-shadow:0_0_20px_rgba(135,136,254,0.5),0_0_40px_rgba(105,108,238,0.3)]">
                  {" "}
                  Easy
                </span>
                <br />
                Currency Conversion
              </h1>
            </motion.div>
            <div className="flex flex-col gap-5 items-center z-50 ">
              <motion.p
                initial={{
                  y: -50,
                  opacity: 0,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                }}
                className="font-bold text-lg sm:text-2xl md:text-3xl xl:text-4xl text-center"
              >
                Get real-time rates for fiat and cryptocurrencies. <br />{" "}
                Compare and convert in seconds
              </motion.p>
              <Link
                to="convert"
                offset={-120}
                smooth
                duration={500}
                className="text-lg md:text-lg relative overflow-hidden border-2 border-[#696CEE] transition-all duration-500 ease cursor-pointer max-md:py-1.5 py-2 max-md:rounded-xl rounded-2xl w-4/5 md:w-xl text-center bg-[#696CEE] hover:text-[#696CEE] hover:bg-transparent  text-white hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(105,108,238,0.6)] group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Convert Now
                  <svg
                    className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Home;

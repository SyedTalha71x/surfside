import { useEffect, useState } from 'react'
import ArrowBtn from './arrow-btn';
import { motion } from 'motion/react'
import { Link } from 'react-scroll';


export const navigationLinks = [
    {
        id: 'home',
        label: 'Home',
    },
    {
        id: 'convert',
        label: 'Convert Now',
    },
    {
        id: 'contact',
        label: 'Contact Us',
    }
];

const Navbar = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 32);
        }
        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    });


    return (
        <nav className='sticky z-[99999] top-0'>
            <div className={` relative w-full flex items-center justify-between h-24 px-5 ${hasScrolled && 'bg-black'} `}>
                <img src="/images/nav-blur.png" className='absolute  pointer-events-none top-0 left-[50%] -translate-x-[50%]' alt="blur" />
                <motion.div
                    initial={{
                        y: -20,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 1
                    }}
                >
                    <Link
                        offset={-120}
                        to={'home'} smooth duration={500} className='hidden md:block z-50'>
                        <p className='text-2xl cursor-pointer font-russo gradient-title'>ConvertingCurrency</p>
                    </Link>

                </motion.div>
                <div className="border border-white/50 px-10 py-3 w-full  md:w-[600px] font-roboto bg-white/5 rounded-2xl backdrop-blur-md">
                    <div className="flex items-center justify-between gap-6 md:gap-20 text-white">
                        {navigationLinks.map(({ id, label }) => (
                            <Link
                                key={id}
                                offset={-120}
                                to={id}
                                spy={true}
                                smooth={true}
                                duration={500}
                                onSetActive={() => setActiveLink(id)}
                                className={`${activeLink === id ? 'text-[#797bee]' : 'text-white'
                                    } nav-hover-btn font-bold cursor-pointer max-sm:text-sm`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='hidden md:block z-10 cursor-pointer'>
  <ArrowBtn text={'Contact'} arrow='up' path="contact" />
</div>



            </div>

        </nav>
    )
}

export default Navbar

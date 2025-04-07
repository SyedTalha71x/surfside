import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { navigationLinks } from "./navbar";
import { Link } from "react-scroll";


const socialLinks = [
  {
    icon: FaFacebookF,
    url: "https://www.facebook.com/",
  },
  {
    icon: FaTwitter,
    url: "https://www.x.com/",
  },
  {
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/",
  },
]

const Footer = () => {

  return (
    <footer>
      <div className="w-full relative bg-[#00000080]">
        <img src="/images/footer-blur.png" className='absolute z-40 bottom-0 left-[50%] -translate-x-[50%]' alt="blur" />
        <div className="flex flex-col items-center gap-4 md:gap-5 py-10 px-8 md:px-16 h-full w-full">
          <div>
            <p className='text-2xl font-russo gradient-title'>ConvertingCurrency</p>
          </div>
          <div className="flex space-x-10 text-xl md:text-2xl z-50  ">
            {
              socialLinks?.map((sl) => (
                <a
                  key={sl.url}
                  className="cursor-pointer"
                  href={sl.url}
                  target="_blank"
                >

                  <sl.icon />
                </a>
              ))
            }

          </div>
          <div className="flex gap-5 md:gap-10 flex-wrap justify-center items-center z-50">
            {navigationLinks.map(({ id, label }) => (
              <Link
                key={id}
                to={id}
                offset={-160}
                spy={true}
                smooth={true}
                duration={500}
                className={`text-white nav-hover-btn font-bold cursor-pointer max-sm:text-sm`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="w-full border-white/40 border" />
          <div className="flex items-center justify-center">
            <p> &copy; 2025 CC | Powered by CC</p>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer

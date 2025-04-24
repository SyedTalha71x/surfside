/* eslint-disable react/prop-types */
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go"
import { Link } from "react-scroll"

const ArrowBtn = ({ text, arrow, path , onClick }) => {
    return (
        <Link
            onClick={onClick}
            to={path}
            smooth
            duration={500}
            offset={-120}
            className='flex cursor-pointer group overflow-hidden'>
            <span className='text-white text-sm sm:text-base px-4  sm:px-5 md:px-6 py-2 bg-[#696CEE] rounded-[14px] group-hover:bg-white group-hover:text-[#696CEE] transition-color duration-300'>{text}</span>
            <span className='p-2 flex items-center justify-center  border-4 bg-[#1B1916] border-[#696CEE] rounded-[14px] overflow-hidden '>
                {
                    arrow === 'up' ? (
                        <GoArrowUpRight color='#696CEE' className="group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:scale-z-110 transition-all duration-500" />
                    ) : (

                        <GoArrowDownRight color='#696CEE' className="group-hover:translate-x-5 group-hover:translate-y-5 group-hover:scale-z-110 transition-all duration-500" />
                    )
                }
            </span>
        </Link>
    )
}

export default ArrowBtn

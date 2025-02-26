import React from "react";
import { MdLocationOn } from "react-icons/md";

const VisitorCard = () => {
  return (
    <div className="bg-white rounded-2xl p-5 h-full flex flex-col justify-between">
      <div className="flex justify-center gap-5 items-center">
        {/* Centered Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <MdLocationOn size={35} className="text-green-600" />
        </div>

        {/* Centered Text Content */}
        <div className="flex flex-col font-roboto ">
          <h2 className="text-gray-900 text-3xl font-roboto font-bold">60K</h2>
          <p className="text-purple-600 text-sm font-medium  font-roboto">Visitor</p>
          
          {/* Centered Date Box */}
          <div className="flex items-center justify-center border mt-2 border-amber-400 p-3 rounded-md text-gray-500 text-xs">
            <span>Jul 2022</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCard;

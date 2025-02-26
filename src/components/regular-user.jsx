import React from "react";

const RegularUserCard = () => {
  return (
    <div className="bg-white rounded-2xl p-5 h-full flex flex-col justify-center items-center">
      <div className="flex justify-center gap-5 items-center">
        {/* Centered Icon */}
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-purple-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </div>

        {/* Centered Text Content */}
        <div className="flex flex-col ">
          <h2 className="text-gray-900 text-3xl font-bold">300</h2>
          <p className="text-purple-600 text-sm font-medium">Regular users</p>
          
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

export default RegularUserCard

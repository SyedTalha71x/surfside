import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import LineChart from "../components/line-chart";
import DonutChart from "../components/donut-chart";
import BarChart from "../components/bar-chart";
import ReportCard from "../components/report-card";
import RegularUserCard from "../components/regular-user";
import ActiveUserCard from "../components/visitor-card";

const dateOptions = ["This week", "Last month", "6 months", "Last year"];

function Dashboard() {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("6 months");

  const [showDonutDropdown, setShowDonutDropdown] = useState(false);
  const [selectedDonutOption, setSelectedDonutOption] = useState("This month");

  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
  const [selectedCryptoOption, setSelectedCryptoOption] = useState("This week");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const handleDonutOptionClick = (option) => {
    setSelectedDonutOption(option);
    setShowDonutDropdown(false);
  };

  const handleCryptoOptionClick = (option) => {
    setSelectedCryptoOption(option);
    setShowCryptoDropdown(false);
  };

  return (
    <div className="md:p-6 p-0">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl text-white font-bold !font-roboto">Welcome Elijah!</h1>
          <p className="text-white text-sm mt-1 !font-roboto">Here is your cc dashboard</p>
        </div>
        <div className="w-full md:w-auto">
          <div className="flex items-center bg-gray-800/50 text-white rounded-lg px-7 py-3">
            <FaSearch className="mr-2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your query"
              className="bg-transparent outline-none w-full placeholder-white text-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Line Chart Section */}
        <div className="md:col-span-8 bg-white rounded-2xl p-5">
          <div className="flex justify-between items-center mb-6 p-2 relative">
            <div>
              <h2 className="text-black font-roboto text-xl font-bold">Daily Visitors</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#696CEE]"></div>
                  <span className="text-xs">User</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#4ADE80]"></div>
                  <span className="text-xs">Visitor</span>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="bg-[#F5F5F5] text-gray-700 text-xs rounded-lg px-3 py-1.5 border border-gray-200"
                >
                  {selectedOption}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-8 bg-[#0B0D11] backdrop-blur-3xl text-white text-xs rounded-lg shadow-lg py-2 w-32 z-10">
                    {dateOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer border-b last:border-b-0"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <LineChart />
        </div>

        {/* Right Side Cards */}
        <div className="md:col-span-4 grid grid-cols-1 gap-4">
          <RegularUserCard />
          <ActiveUserCard />
        </div>

        {/* Donut Chart Section */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 flex flex-col h-64">
          <div className="flex justify-between items-center mb-2 relative">
            <h2 className="text-black font-semibold">Comp2</h2>
            <div className="relative">
              <button
                onClick={() => setShowDonutDropdown((prev) => !prev)}
                className="bg-[#F5F5F5] text-gray-700 text-xs rounded-lg px-3 py-1.5 border border-gray-200"
              >
                {selectedDonutOption}
              </button>
              {showDonutDropdown && (
                <div className="absolute right-0 top-8 bg-[#0B0D11] backdrop-blur-3xl text-white text-xs rounded-lg shadow-lg py-2 w-32 z-10">
                  {dateOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleDonutOptionClick(option)}
                      className="px-4 py-2 hover:bg-gray-600 cursor-pointer border-b last:border-b-0"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex-grow">
            <DonutChart />
          </div>
        </div>

        {/* Crypto Conversion Section */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 flex flex-col h-64">
          <div className="flex justify-between items-center mb-2 relative">
            <h2 className="text-black font-semibold">Crypto conversion</h2>
            <div className="relative">
              <button
                onClick={() => setShowCryptoDropdown((prev) => !prev)}
                className="bg-[#F5F5F5] text-gray-700 text-xs rounded-lg px-3 py-1.5 border border-gray-200"
              >
                {selectedCryptoOption}
              </button>
              {showCryptoDropdown && (
                <div className="absolute right-0 top-8 bg-[#0B0D11] backdrop-blur-3xl text-white text-xs rounded-lg shadow-lg py-2 w-32 z-10">
                  {dateOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleCryptoOptionClick(option)}
                      className="px-4 py-2 hover:bg-gray-600 cursor-pointer border-b last:border-b-0"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex-grow">
            <BarChart />
          </div>
        </div>

        {/* Report Card */}
        <div className="md:col-span-4 h-64">
          <ReportCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

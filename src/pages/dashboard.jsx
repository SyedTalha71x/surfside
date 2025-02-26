import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import LineChart from "../components/line-chart";
import DonutChart from "../components/donut-chart";
import BarChart from "../components/bar-chart";
import ReportCard from "../components/report-card";
import RegularUserCard from "../components/regular-user";
import ActiveUserCard from "../components/visitor-card";

function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="md:p-6 p-0">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl text-white font-bold !font-roboto">Welcome Jess!</h1>
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

      {/* Dashboard content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* First row */}
        <div className="md:col-span-8 bg-white rounded-2xl p-5">
          <div className="flex justify-between items-center mb-6 p-2">
            <div>
              <h2 className="text-black font-roboto text-xl font-bold">User</h2>
              <p className="text-md font-roboto font-semibold text-[#5321CA]">Total Revenue</p>
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
              <select className="bg-[#F5F5F5] text-gray-700 text-xs rounded-lg px-3 py-1.5 border border-gray-200">
                <option>6 months</option>
              </select>
            </div>
          </div>
          <LineChart />
        </div>

        {/* Right side cards */}
        <div className="md:col-span-4 grid grid-cols-1 gap-4">
          <RegularUserCard />
          <ActiveUserCard />
        </div>

        {/* Second row */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 flex flex-col h-64">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-black font-semibold">Comp2</h2>
            <select className="bg-[#F5F5F5] text-gray-700 text-xs rounded-lg px-3 py-1.5 border border-gray-200">
              <option>This month</option>
            </select>
          </div>
          <div className="flex-grow">
            <DonutChart />
          </div>
        </div>

        <div className="md:col-span-4 bg-white rounded-2xl p-5 flex flex-col h-64">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-black font-semibold">Crypto conversion</h2>
            <select className="bg-[#F5F5F5] text-gray-700 text-xs rounded-lg px-3 py-1.5 border border-gray-200">
              <option>This week</option>
            </select>
          </div>
          <div className="flex-grow">
            <BarChart />
          </div>
        </div>

        <div className="md:col-span-4 h-64">
          <ReportCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import LineChart from "../components/line-chart"
import DonutChart from "../components/donut-chart"
import BarChart from "../components/bar-chart"
import ReportCard from "../components/report-card"
import RegularUserCard from "../components/regular-user"
import ActiveUserCard from "../components/visitor-card"
import DateRangePicker from "../components/date-range-picker"

function Dashboard() {
  const [search, setSearch] = useState("")

  // Initialize date ranges with default values (last 30 days)
  const today = new Date()
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(today.getDate() - 30)

  // Date range state for each chart
  const [lineChartDateRange, setLineChartDateRange] = useState({
    startDate: thirtyDaysAgo,
    endDate: today,
    key: "selection",
  })

  const [donutChartDateRange, setDonutChartDateRange] = useState({
    startDate: thirtyDaysAgo,
    endDate: today,
    key: "selection",
  })

  const [barChartDateRange, setBarChartDateRange] = useState({
    startDate: thirtyDaysAgo,
    endDate: today,
    key: "selection",
  })

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
          <div className="flex justify-between md:flex-row flex-col gap-4 items-center mb-6 p-2">
            <div>
              <h2 className="text-black font-roboto text-xl font-bold">Daily Visitors</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center md:flex-row flex-col gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#696CEE]"></div>
                  <span className="text-xs">User</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#4ADE80]"></div>
                  <span className="text-xs">Visitor</span>
                </div>
              </div>
              <DateRangePicker dateRange={lineChartDateRange} onDateRangeChange={setLineChartDateRange} />
            </div>
          </div>
          <LineChart dateRange={lineChartDateRange} />
        </div>

        {/* Right Side Cards */}
        <div className="md:col-span-4 grid grid-cols-1 gap-4">
          <RegularUserCard />
          <ActiveUserCard />
        </div>

        {/* Donut Chart Section */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 flex flex-col h-64">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-black font-semibold">Comp2</h2>
            <DateRangePicker dateRange={donutChartDateRange} onDateRangeChange={setDonutChartDateRange} />
          </div>
          <div className="flex-grow">
            <DonutChart dateRange={donutChartDateRange} />
          </div>
        </div>

        {/* Crypto Conversion Section */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 flex flex-col h-64">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-black font-semibold">Crypto conversion</h2>
            <DateRangePicker dateRange={barChartDateRange} onDateRangeChange={setBarChartDateRange} />
          </div>
          <div className="flex-grow">
            <BarChart dateRange={barChartDateRange} />
          </div>
        </div>

        {/* Report Card */}
        <div className="md:col-span-4 h-64">
          <ReportCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard


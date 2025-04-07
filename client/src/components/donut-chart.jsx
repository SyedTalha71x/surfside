/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const DonutChart = ({ dateRange }) => {
  // This data would typically be filtered based on the date range
  const data = [
    { name: "comp1", value: 10, color: "#696CEE" },
    { name: "comp2", value: 4, color: "#4ADE80" },
    { name: "remaining", value: 6, color: "#E5E7EB" },
  ]

  // In a real implementation, you would filter data based on dateRange
  // const filteredData = data.filter(item => {
  //   const itemDate = new Date(item.date);
  //   return itemDate >= dateRange.startDate && itemDate <= dateRange.endDate;
  // });

  return (
    <div className="h-48 flex flex-col justify-between">
      <div className="flex h-full">
        {/* Chart container - take up left side */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats and legend on right side */}
        <div className="w-1/2 flex flex-col justify-center items-start space-y-2 pl-4">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#696CEE] mr-2"></div>
            <span className="text-xs text-gray-500">comp1</span>
          </div>
          <div className="text-xl font-bold">10K</div>
          <div className="flex items-center mt-2">
            <div className="w-2 h-2 rounded-full bg-[#4ADE80] mr-2"></div>
            <span className="text-xs text-gray-500">comp2</span>
          </div>
          <div className="text-xl font-bold">4K</div>
        </div>
      </div>
    </div>
  )
}

export default DonutChart


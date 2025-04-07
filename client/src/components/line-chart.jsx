/* eslint-disable react/prop-types */
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// eslint-disable-next-line no-unused-vars
function LineChart({ dateRange }) {
  // This data would typically be filtered based on the date range
  const data = [
    { name: "FEB", Visitors: 30000, Conversions: 2100 },
    { name: "MAR", Visitors: 80000, Conversions: 6400 },
    { name: "APR", Visitors: 45000, Conversions: 4050 },
    { name: "MAY", Visitors: 60000, Conversions: 5400 },
    { name: "JUN", Visitors: 30000, Conversions: 3300 },
    { name: "JUL", Visitors: 50000, Conversions: 6000 },
  ]

  // In a real implementation, you would filter data based on dateRange
  // const filteredData = data.filter(item => {
  //   const itemDate = new Date(item.fullDate);
  //   return itemDate >= dateRange.startDate && itemDate <= dateRange.endDate;
  // });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B0D11] p-3 rounded-lg shadow-md border border-gray-700 text-white">
          <p className="text-xs font-medium mb-1">{label} 2023</p>
          <div className="space-y-1">
            <p className="text-sm flex justify-between">
              <span className="font-medium text-[#696CEE] mr-3">Visitors:</span>
              <span>{payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-sm flex justify-between">
              <span className="font-medium text-[#4ADE80] mr-3">Conversions:</span>
              <span>{payload[1].value.toLocaleString()}</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] p-3">
        <ResponsiveContainer width="100%" height={250}>
          <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#4B5563", fontSize: 12, fontWeight: 500 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fill: "#4B5563", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
              domain={[0, "dataMax + 20000"]}
            />
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="Visitors"
              name="Daily Visitors"
              stroke="#696CEE"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "white", stroke: "#696CEE" }}
              activeDot={{ r: 6, fill: "#696CEE" }}
            />
            <Line
              type="monotone"
              dataKey="Conversions"
              name="Conversions"
              stroke="#4ADE80"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "white", stroke: "#4ADE80" }}
              activeDot={{ r: 6, fill: "#4ADE80" }}
            />

            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => <span className="text-gray-700">{value}</span>}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default LineChart
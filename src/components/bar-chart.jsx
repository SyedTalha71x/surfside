/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const BarChart = ({ dateRange }) => {
  // This data would typically be filtered based on the date range
  const data = [
    { name: "Tue", value: 180 },
    { name: "Wed", value: 280 },
    { name: "Thu", value: 150 },
    { name: "Fri", value: 220 },
    { name: "Sat", value: 250 },
    { name: "Sun", value: 180 },
    { name: "Mon", value: 200 },
    { name: "Tue", value: 180 },
  ]

  // In a real implementation, you would filter data based on dateRange
  // const filteredData = data.filter(item => {
  //   const itemDate = new Date(item.fullDate);
  //   return itemDate >= dateRange.startDate && itemDate <= dateRange.endDate;
  // });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B0D11] p-2 rounded-lg shadow-md border border-gray-700">
          <p className="text-white text-xs">{`${label}: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  // Calculate the maximum value for the domain
  const maxValue = Math.max(...data.map((item) => item.value))
  const yAxisMax = Math.ceil(maxValue / 100) * 100 // Round up to nearest hundred

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={180}>
        <RechartsBarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }} barSize={20}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} dy={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            domain={[0, yAxisMax]}
            ticks={[0, yAxisMax / 2, yAxisMax]}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Bar dataKey="value" fill="#696CEE" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChart


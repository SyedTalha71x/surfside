/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { FaSync } from "react-icons/fa"

const BarChart = ({ dateRange, data, loading, error, onRefresh }) => {
  // Format data based on the period (day, month, or year)
  const formattedData = data?.map(item => {
    const date = new Date(item._id)
    let name
    
    // If period is 24h, show hours
    if (dateRange.period === '24h') {
      name = date.getHours().toString()
    } 
    // If period is 7d, show day names
    else if (dateRange.period === '7d') {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      name = days[date.getDay()]
    }
    // For 30d or custom ranges, show day of month
    else {
      name = date.getDate().toString()
    }
    
    return {
      name,
      value: item.totalAmount,
      count: item.count
    }
  }) || []

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B0D11] p-2 rounded-lg shadow-md border border-gray-700">
          <p className="text-white text-xs">{`${dateRange.period === '24h' ? 'Hour' : 'Day'} ${label}: ${payload[0].value.toFixed(2)}`}</p>
          <p className="text-white text-xs">{`Transactions: ${payload[0].payload.count}`}</p>
        </div>
      )
    }
    return null
  }

  // Calculate the maximum value for the domain
  const maxValue = formattedData.length > 0 
    ? Math.max(...formattedData.map((item) => item.value))
    : 300
  const yAxisMax = Math.ceil(maxValue / 100) * 100 // Round up to nearest hundred

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spin">
          <FaSync className="text-gray-400" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <p className="text-red-500 text-sm mb-2">Failed to load data</p>
        <button 
          onClick={onRefresh}
          className="px-3 py-1 bg-gray-200 rounded-md text-xs hover:bg-gray-300"
        >
          Retry
        </button>
      </div>
    )
  }

  if (formattedData.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-gray-500 text-sm">No data available for selected period</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={180}>
        <RechartsBarChart data={formattedData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }} barSize={20}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#9CA3AF", fontSize: 12 }} 
            dy={10} 
          />
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
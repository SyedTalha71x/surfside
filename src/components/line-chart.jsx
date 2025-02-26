/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Line } from 'recharts';
import {
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function LineChart() {
  const data = [
    { name: "FEB", User: 30, Visitor: 20 },
    { name: "MAR", User: 80, Visitor: 50 },
    { name: "APR", User: 45, Visitor: 75 },
    { name: "MAY", User: 60, Visitor: 40 },
    { name: "JUN", User: 30, Visitor: 70 },
    { name: "JUL", User: 50, Visitor: 20 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-lg shadow-md text-center">
          <p className="text-xs text-gray-500 mb-1">{label} 14</p>
          <p className="text-lg font-semibold">{payload[0].value}M</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* Set a min-width to ensure horizontal scroll on small screens */}
      <div className="min-w-[600px]">
        <ResponsiveContainer width="100%" height={200}>
          <RechartsLineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              dy={5}
            />
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}M`}
              domain={[0, 100]}
              ticks={[10, 50, 100]}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="User"
              stroke="#696CEE"
              strokeWidth={3}
              dot={{ r: 3, strokeWidth: 2, fill: "white", stroke: "#696CEE" }}
              activeDot={{ r: 5, fill: "#696CEE" }}
            />
            <Line
              type="monotone"
              dataKey="Visitor"
              stroke="#4ADE80"
              strokeWidth={3}
              dot={{ r: 3, strokeWidth: 2, fill: "white", stroke: "#4ADE80" }}
              activeDot={{ r: 5, fill: "#4ADE80" }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChart;

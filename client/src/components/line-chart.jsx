/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import axios from 'axios';
import { BASE_URL } from '../utils/api';

function LineChart({ dateRange }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {
          startDate: dateRange.startDate.toISOString(),
          endDate: dateRange.endDate.toISOString()
        };

        const response = await axios.get(`${BASE_URL}/combined-visitors-and-conversions`, { params });
        
        if (response.data.success) {
          setData(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = payload[0].payload.fullDate ? 
        new Date(payload[0].payload.fullDate).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }) : 
        `${label} 2023`;
      
      return (
        <div className="bg-[#0B0D11] p-3 rounded-lg shadow-md border border-gray-700 text-white">
          <p className="text-xs font-medium mb-1">{date}</p>
          <div className="space-y-1">
            <p className="text-sm flex justify-between">
              <span className="font-medium text-[#696CEE] mr-3">Visitors:</span>
              <span>{payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-sm flex justify-between">
              <span className="font-medium text-[#4ADE80] mr-3">Conversions:</span>
              <span>{payload[1].value.toLocaleString()}</span>
            </p>
            <p className="text-sm flex justify-between">
              <span className="font-medium text-gray-300 mr-3">Conversion Rate:</span>
              <span>{((payload[1].value / payload[0].value) * 100 || 0).toFixed(2)}%</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
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
              dataKey="visitors"
              name="Visitors"
              stroke="#696CEE"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "white", stroke: "#696CEE" }}
              activeDot={{ r: 6, fill: "#696CEE" }}
            />
            <Line
              type="monotone"
              dataKey="conversions"
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
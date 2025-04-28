/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";
import { BASE_URL } from "../utils/api"; 

const DonutChart = ({ dateRange }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComparisonData = async () => {
      if (!dateRange?.startDate || !dateRange?.endDate) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/comparison-metrics`, {
          params: {
            startDate: dateRange.startDate.toISOString(),
            endDate: dateRange.endDate.toISOString(),
            metric1: "desktop", 
            metric2: "mobile"  
          }
        });

        if (response.data.success) {
          const { metric1, metric2 } = response.data.data;
          
          // Calculate remaining portion for the gray segment if needed
          // Adjust this logic based on what "remaining" means in your context
          const total = metric1.value + metric2.value;
          const remaining = Math.max(0, total * 0.3); // Just an example - 30% of total
          
          setChartData([
            { name: metric1.name, value: metric1.value, color: "#696CEE" },
            { name: metric2.name, value: metric2.value, color: "#4ADE80" },
            { name: "remaining", value: remaining, color: "#E5E7EB" },
          ]);
        } else {
          setError(response.data.message || "Failed to fetch comparison data");
        }
      } catch (err) {
        console.error("Error fetching comparison data:", err);
        setError("Failed to load chart data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, [dateRange]);

  // Format large numbers for display (e.g., "10K" instead of "10000")
  const formatValue = (value) => {
    if (!value && value !== 0) return "-";
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  // Show placeholder data while loading
  const displayData = loading || chartData.length === 0 ? [
    { name: "Loading", value: 10, color: "#696CEE" },
    { name: "Loading", value: 4, color: "#4ADE80" },
    { name: "remaining", value: 6, color: "#E5E7EB" },
  ] : chartData;

  return (
    <div className="h-48 flex flex-col justify-between">
      <div className="flex h-full">
        {/* Chart container - take up left side */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats and legend on right side */}
        <div className="w-1/2 flex flex-col justify-center items-start space-y-2 pl-4">
          {loading ? (
            <>
              <div className="animate-pulse h-4 w-16 bg-gray-200 rounded mb-1"></div>
              <div className="animate-pulse h-6 w-12 bg-gray-300 rounded mb-3"></div>
              <div className="animate-pulse h-4 w-16 bg-gray-200 rounded mb-1"></div>
              <div className="animate-pulse h-6 w-12 bg-gray-300 rounded"></div>
            </>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : (
            <>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#696CEE] mr-2"></div>
                <span className="text-xs text-gray-500">{displayData[0]?.name || "comp1"}</span>
              </div>
              <div className="text-xl font-bold">{formatValue(displayData[0]?.value)}</div>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 rounded-full bg-[#4ADE80] mr-2"></div>
                <span className="text-xs text-gray-500">{displayData[1]?.name || "comp2"}</span>
              </div>
              <div className="text-xl font-bold">{formatValue(displayData[1]?.value)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
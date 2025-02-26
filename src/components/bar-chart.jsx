import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const BarChart = () => {
  const data = [
    { name: 'M', value: 180 },
    { name: 'T', value: 280 },
    { name: 'W', value: 150 },
    { name: 'Th', value: 220 },
    { name: 'F', value: 250 },
    { name: 'S', value: 80 },
  ];
  
  return (
    <div className="h-48 flex items-center justify-center">
      <ResponsiveContainer width="100%" height={150}>
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          barSize={25}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            domain={[0, 300]}
            ticks={[0, 100, 200, 300]}
          />
          <Bar
            dataKey="value"
            fill="#696CEE"
            radius={[5, 5, 0, 0]}
            background={{ fill: '#f5f5f5', radius: [5, 5, 0, 0] }}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
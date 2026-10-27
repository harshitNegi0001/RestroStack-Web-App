import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useSelector } from 'react-redux';


// const dummyData = [
//   { time: '10 AM', revenue: 0 },
//   { time: '11 AM', revenue: 1200 },
//   { time: '12 PM', revenue: 3500 },
//   { time: '1 PM',  revenue: 6800 }, // Lunch Peak
//   { time: '2 PM',  revenue: 5200 },
//   { time: '3 PM',  revenue: 2000 },
//   { time: '4 PM',  revenue: 1500 }, // Low period
//   { time: '5 PM',  revenue: 2800 },
//   { time: '6 PM',  revenue: 4500 },
//   { time: '7 PM',  revenue: 7500 },
//   { time: '8 PM',  revenue: 10500 }, // Dinner Peak
//   { time: '9 PM',  revenue: 9200 },
//   { time: '10 PM', revenue: 4000 },
//   { time: '11 PM', revenue: 1500 },
// ];

const CustomTooltip = ({ active, payload, label,currency }) => {
  if (active && payload && payload.length) {
    return (
      // bg-toast-bg, border-divider, text-main-text sab tumhari custom theme classes hain
      <div className="bg-toast-bg border-1 border-divider/60 p-3 rounded-xl shadow-lg shadow-black/10 backdrop-blur-md">
        <p className="text-low-text text-[12px] sm:text-[13px] mb-1 font-medium">{label}</p>
        <p className="text-green-500 font-[600] text-[15px] sm:text-[17px]">
          {currency}{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};
const DailyRevenueChart = ({currency}) => {
  const {revenue_chart_data} = useSelector(state=>state.dashboard);

  return (
      <div className="w-full h-[250px] sm:h-[320px] text-low-text">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenue_chart_data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            
            {/* The Glow Gradient - Green is usually safe for both modes, but can be changed */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid Lines: using a very light gray that blends well in both modes */}
            <CartesianGrid 
              strokeDasharray="4 4" 
              vertical={false} 
              stroke="#8792a2" 
              strokeOpacity={0.15} 
            />

            {/* X-Axis: Hourly Time */}
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              // Passing currentColor tricks Recharts into inheriting the parent's text color
              tick={{ fill: 'currentColor', fontSize: 11, opacity: 0.6 }} 
              dy={10}
              className="text-low-text" // Tailwind class for axis labels
            />

            {/* Y-Axis: Formatted in 'k' */}
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'currentColor', fontSize: 11, opacity: 0.6 }} 
              tickFormatter={(value) => value === 0 ? '0' : `${currency}${value / 1000}k`} 
              className="text-low-text" // Tailwind class for axis labels
            />

            {/* The Custom Tooltip */}
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#8792a2', strokeWidth: 1, strokeDasharray: '3 3', opacity: 0.3 }} 
            />

            {/* The Area Curve */}
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
  );
}


export default DailyRevenueChart

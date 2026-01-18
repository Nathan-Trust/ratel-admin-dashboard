"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 50000, profit: 35000 },
  { month: "Feb", revenue: 45000, profit: 42000 },
  { month: "Mar", revenue: 60000, profit: 48000 },
  { month: "Apr", revenue: 48000, profit: 38000 },
  { month: "May", revenue: 42000, profit: 30000 },
  { month: "Jun", revenue: 52000, profit: 45000 },
  { month: "Jul", revenue: 38000, profit: 25000 },
  { month: "Aug", revenue: 55000, profit: 48000 },
  { month: "Sep", revenue: 47000, profit: 40000 },
  { month: "Oct", revenue: 62000, profit: 52000 },
  { month: "Nov", revenue: 58000, profit: 50000 },
  { month: "Dec", revenue: 65000, profit: 48000 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#8C8C8C" }}
          axisLine={{ stroke: "#F0F0F0" }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#8C8C8C" }}
          axisLine={{ stroke: "#F0F0F0" }}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #F0F0F0",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value: any) => `₦${value.toLocaleString()}`}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", fontFamily: "Montserrat" }}
          iconType="circle"
        />
        <Bar dataKey="revenue" fill="#008080" radius={[4, 4, 0, 0]} />
        <Bar dataKey="profit" fill="#5DB996" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Amazon", value: 30, color: "#6366F1" },
  { name: "Apple", value: 25, color: "#10B981" },
  { name: "Steam", value: 20, color: "#F59E0B" },
  { name: "Sephora", value: 15, color: "#06B6D4" },
  { name: "Others", value: 10, color: "#8B5CF6" },
];

const COLORS = data.map((item) => item.color);

export function RevenuePieChart() {
  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-medium font-montserrat text-[#8C8C8C]">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

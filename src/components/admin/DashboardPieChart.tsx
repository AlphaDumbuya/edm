"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardPieChartProps {
  data: Array<{ name: string; value: number }>;
  label: string;
}

const COLORS = ["#38bdf8", "#fbbf24", "#34d399", "#818cf8", "#f472b6", "#f87171"];

const DashboardPieChart: React.FC<DashboardPieChartProps> = ({ data, label }) => (
  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 rounded-xl shadow-lg p-6 border border-gray-700">
    <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default DashboardPieChart;

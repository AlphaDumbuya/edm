"use client";
import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardLineChartProps {
  data: Array<{ name: string; value: number }>;
  label: string;
}

const DashboardLineChart: React.FC<DashboardLineChartProps> = ({ data, label }) => (
  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 rounded-xl shadow-lg p-6 border border-gray-700">
    <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="name" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#fbbf24" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default DashboardLineChart;

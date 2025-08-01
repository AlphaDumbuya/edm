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
        <YAxis stroke="#ccc" domain={[0, 'auto']} allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{ stroke: '#3B82F6', strokeWidth: 2, fill: '#1e293b' }} />
      </LineChart>
    </ResponsiveContainer>
    {/* Progress bar below chart */}
    {data && data.length > 0 && (
      (() => {
        const max = Math.max(...data.map(d => d.value));
        const current = data[data.length - 1].value;
        const percent = max > 0 ? Math.round((current / max) * 100) : 0;
        return (
          <div className="mt-4 w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        );
      })()
    )}
  </div>
);

export default DashboardLineChart;

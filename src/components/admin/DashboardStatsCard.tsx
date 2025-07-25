import React from "react";

interface DashboardStatsCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

// ...existing code...
const DashboardStatsCard: React.FC<DashboardStatsCardProps> = ({ value, label, icon, color, className }) => (
  <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 rounded-xl shadow-lg p-4 sm:p-6 h-full border border-gray-700 text-center ${color ? color : ''} ${typeof className === 'string' ? className : ''}`}>
    {icon && <div className="mb-2 w-full flex justify-center">{icon}</div>}
    <span className="text-3xl font-extrabold text-white mb-1 w-full block">{value}</span>
    <span className="text-sm font-medium text-gray-300 w-full block">{label}</span>
  </div>
);

export default DashboardStatsCard;

import React from "react";

interface AlertItem {
  id: string;
  message: string;
  createdAt: string;
}

interface DashboardSystemAlertsProps {
  items: AlertItem[];
  label?: string;
}

const DashboardSystemAlerts: React.FC<DashboardSystemAlertsProps> = ({ items, label = "System Alerts" }) => (
  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 rounded-xl shadow-lg p-6 border border-gray-700 min-h-[200px]">
    <h3 className="text-lg font-semibold text-white mb-4">{label}</h3>
    <ul className="space-y-3">
      {items.length === 0 ? (
        <li className="text-gray-400">No system alerts.</li>
      ) : (
        items.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
            <span className="text-gray-200 font-medium">{item.message}</span>
            <span className="ml-auto text-xs text-gray-400">{new Date(item.createdAt).toLocaleTimeString()}</span>
          </li>
        ))
      )}
    </ul>
  </div>
);

export default DashboardSystemAlerts;

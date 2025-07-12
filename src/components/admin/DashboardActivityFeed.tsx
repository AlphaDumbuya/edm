import React from "react";

interface ActivityItem {
  id: string;
  message: string;
  createdAt: string;
}

interface DashboardActivityFeedProps {
  items: ActivityItem[];
  label?: string;
}

const DashboardActivityFeed: React.FC<DashboardActivityFeedProps> = ({ items, label = "Activity Feed" }) => (
  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 rounded-xl shadow-lg p-6 border border-gray-700 min-h-[300px]">
    <h3 className="text-lg font-semibold text-white mb-4">{label}</h3>
    <ul className="space-y-3">
      {items.length === 0 ? (
        <li className="text-gray-400">No recent activity.</li>
      ) : (
        items.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
            <span className="text-gray-200 font-medium">{item.message}</span>
            <span className="ml-auto text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
            </span>
          </li>
        ))
      )}
    </ul>
  </div>
);

export default DashboardActivityFeed;

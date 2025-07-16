import React from "react";

export default function AdminFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-gray-900 text-gray-200 border-t border-gray-800 py-4 px-2 sm:px-6 flex flex-col md:flex-row items-center justify-between mt-auto">
      <div className="text-xs md:text-sm">
        <span className="font-semibold text-primary">EDM Admin Panel</span> &mdash; &copy; {year} Evangelism, Discipleship, Missions
      </div>
      <div className="flex gap-4 mt-2 md:mt-0 text-xs md:text-sm">
        <a href="/admin" className="hover:text-primary transition-colors">Dashboard</a>
        <a href="/admin/users" className="hover:text-primary transition-colors">Users</a>
        <a href="/admin/content/news" className="hover:text-primary transition-colors">News</a>
        <a href="/admin/content/blog" className="hover:text-primary transition-colors">Blog</a>
        <a href="/admin/events" className="hover:text-primary transition-colors">Events</a>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import React from 'react';




// The main dashboard layout component
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-1/5 bg-white shadow">
        {/* Sidebar content */}
        <nav className="p-6">
          <Link href="/dashboard">
            <span className="block p-2 hover:bg-gray-200">Dashboard</span>
          </Link>
          <Link href="/dashboard/user-management">
            <span className="block p-2 hover:bg-gray-200">User Management</span>
          </Link>
          <Link href="/dashboard/course-management">
            <span className="block p-2 hover:bg-gray-200">Course Management</span>
          </Link>
          <Link href="/dashboard/content-management">
            <span className="block p-2 hover:bg-gray-200">Content Management</span>
          </Link>       
          <Link href="/dashboard/Orders">
            <span className="block p-2 hover:bg-gray-200">Orders</span>
          </Link>       
          </nav>
      </aside>
       {children}
    </div>
  );
};

export default DashboardLayout;

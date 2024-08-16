"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react"; // Assuming you are using Heroicons
import { BiSolidBookContent } from "react-icons/bi";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { MdDashboard, MdMenu } from "react-icons/md";
import { PiXCircleDuotone } from "react-icons/pi";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex overflow-hidden bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className={`w-1/5 bg-white shadow hideNav`}>
        <nav className="p-6">
          <Link href="/dashboard">
            <span className="block p-2 hover:bg-gray-200">Dashboard</span>
          </Link>
          <Link href="/dashboard/user-management">
            <span className="block p-2 hover:bg-gray-200">User Management</span>
          </Link>
          <Link href="/dashboard/course-management">
            <span className="block p-2 hover:bg-gray-200">
              Course Management
            </span>
          </Link>
          <Link href="/dashboard/content-management">
            <span className="block p-2 hover:bg-gray-200">
              Content Management
            </span>
          </Link>
          <Link href="/dashboard/Orders">
            <span className="block p-2 hover:bg-gray-200">Orders</span>
          </Link>
        </nav>
      </aside>

      <div className="hideIcon mt-3">
        <ul className="flex-col" id="menu">
          <li>
            <Link href="/dashboard" className="block px-4 py-2">
              <MdDashboard className="w-6 h-6" title="Dashboard" />
            </Link>
          </li>
          <li>
            <Link href="/dashboard/user-management" className="block px-4 py-2">
              <FaUser className="w-6 h-6" title="user management" />
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/course-management"
              className="block px-4 py-2"
            >
              <IoBookSharp className="w-6 h-6" title="course management" />
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/content-management"
              className="block px-4 py-2"
            >
              <BiSolidBookContent
                className="w-6 h-6"
                title="content management"
              />
            </Link>
          </li>
          <li>
            <Link href="/dashboard/Orders" className="block px-4 py-2">
              <FaShoppingCart title="orders" className="w-6 h-6" />
            </Link>
          </li>
        </ul>
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-hidden w-[400px] lg:w-full">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

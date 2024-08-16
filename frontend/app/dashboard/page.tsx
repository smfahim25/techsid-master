import Link from "next/link";
import React from "react";

// Define types for your data
type DashboardWidgetProps = {
  title: string;
  value: string;
  delta?: number;
};

// Sample data for widgets
const dashboardData = {
  visitorsToday: {
    title: "Today's Visitors",
    value: "4,423",
    delta: 20,
    percentage: true,
  },
  userGrowth: {
    title: "User Growth",
    value: "2,153",
    delta: -5,
    percentage: true,
  },
  courseEnrollment: {
    title: "Course Enrollment",
    value: "$14,243",
    delta: 28,
    percentage: true,
  },
  contentUsage: {
    title: "Content Usage",
    value: "$322k",
    delta: 4.5,
    percentage: true,
  },
  membersOnline: {
    title: "Members Online",
    value: "248",
    delta: 3.7,
    percentage: true,
  },
  courseSales: {
    title: "Course Sales",
    value: "11,340",
    delta: 5,
    percentage: true,
  },
  totalIncome: {
    title: "Total Income",
    value: "120K",
    delta: 15,
    percentage: true,
  },
  // Add more widgets as required
};
// Individual widget component
const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  value,
  delta,
}) => {
  const deltaClass = delta && delta > 0 ? "text-green-500" : "text-red-500";
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-semibold text-md">{title}</h3>
      <p className="text-2xl">{value}</p>
      {delta !== undefined && <span className={deltaClass}>{delta}%</span>}
    </div>
  );
};

// The main dashboard layout component
const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 py-4 px-2">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.values(dashboardData).map((widget, idx) => (
            <DashboardWidget key={idx} {...widget} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

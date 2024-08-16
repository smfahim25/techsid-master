import React from "react";

type ContentItem = {
  id: number;
  title: string;
  subTopic: string;
  category: string;
  status: string;
  publishedDate: string;
};

const contentItems: ContentItem[] = [
  {
    id: 1,
    title: "Getting Started with React",
    subTopic: "React Router",
    category: "Web Development",
    status: "Published",
    publishedDate: "2021-01-20",
  },
  {
    id: 2,
    title: "Advanced Node.js Techniques",
    subTopic: "Streams and Performance",
    category: "Backend Development",
    status: "In Review",
    publishedDate: "2021-02-15",
  },
  {
    id: 3,
    title: "Understanding Asynchronous JavaScript",
    subTopic: "Promises and Async/Await",
    category: "JavaScript",
    status: "Published",
    publishedDate: "2021-03-05",
  },
  {
    id: 4,
    title: "Introduction to TypeScript",
    subTopic: "Types and Interfaces",
    category: "Web Development",
    status: "Published",
    publishedDate: "2021-04-12",
  },
  {
    id: 5,
    title: "Building Applications with Vue.js",
    subTopic: "Vue CLI and Lifecycle Hooks",
    category: "Frontend Development",
    status: "Draft",
    publishedDate: "2021-05-21",
  },
  {
    id: 6,
    title: "Responsive Web Design Fundamentals",
    subTopic: "Media Queries and Flexbox",
    category: "Design",
    status: "Published",
    publishedDate: "2021-06-30",
  },
  {
    id: 7,
    title: "Python for Data Science",
    subTopic: "Data Manipulation with Pandas",
    category: "Data Science",
    status: "In Review",
    publishedDate: "2021-07-18",
  },
  {
    id: 8,
    title: "Machine Learning with TensorFlow",
    subTopic: "Neural Networks Basics",
    category: "AI/ML",
    status: "Published",
    publishedDate: "2021-08-05",
  },
  {
    id: 9,
    title: "DevOps Essentials",
    subTopic: "CI/CD with Jenkins",
    category: "DevOps",
    status: "Published",
    publishedDate: "2021-09-10",
  },
  {
    id: 10,
    title: "Database Management with SQL",
    subTopic: "Advanced Queries",
    category: "Database",
    status: "Published",
    publishedDate: "2021-10-15",
  },
];

const ContentTable: React.FC = () => {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Title
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Sub Topic
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Category
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Published Date
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {contentItems.map((item) => (
          <tr key={item.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.title}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.subTopic}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.category}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.status}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.publishedDate}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              <button className="text-primary hover:text-secondary">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-900 ml-3">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ContentManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-3xl overflow-y-auto">
      <div className="py-8">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 className="text-2xl leading-tight">Content Management</h2>
        </div>
        <div className="py-4 overflow-x-auto">
          <ContentTable />
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;

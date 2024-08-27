"use client";
import { API_BASE_URI } from "@/data/apiservice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type category = {
  name: string;
};
type ContentItem = {
  id: number;
  title: string;
  category: category;
  status: string;
  createAt: string;
};

const ContentTable: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URI}/tutorials`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result?.data); // Adjust this according to your API response
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading)
    return (
      <div className="mt-20 inset-0 flex items-center justify-center">
        <div
          className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-primary"
          style={{ width: "4em" }}
        ></div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Title
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
        {data.map((item: ContentItem) => (
          <tr key={item.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.title}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.category?.name}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.status}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.createAt}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              <Link href={`/tutorials/edit?id=${item?.id}`}>
                <button className="text-primary hover:text-secondary">
                  Edit
                </button>
              </Link>
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
    <div className="container mx-auto max-w-3xl overflow-y-auto min-h-screen">
      <div className="py-8">
        <div className="flex flex-col lg:flex-row mb-1 sm:mb-0 justify-between">
          <div className="">
            <h2 className="text-2xl leading-tight mb-5 md:mb-0">
              Content Management
            </h2>
          </div>
          <div className="text-end">
            <form className="flex w-full max-w-sm space-x-3">
              <div className="">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className="md:px-4 py-2 rounded-md"
                  placeholder="Search Course"
                />
              </div>
              <Link href="/tutorials/createTu">
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Add Content
                </button>
              </Link>
            </form>
          </div>
        </div>
        <div className="py-4 overflow-x-auto">
          <ContentTable />
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;

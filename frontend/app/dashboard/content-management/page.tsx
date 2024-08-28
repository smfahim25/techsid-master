"use client";
import { API_BASE_URI } from "@/data/apiservice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type category = {
  name: string;
};
type ContentItem = {
  id: string;
  title: string;
  category: category;
  status: string;
  createAt: string;
  catId: string;
};
interface RootState {
  auth: {
    user: {
      data: {
        accessToken: string;
      };
    };
  };
}

const ContentTable: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [fetchs, setFetchs] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URI}/tutorials`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result?.data); // Adjust this according to your API response
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
        setFetchs(false);
      }
    };
    if (fetchs) {
      fetchData();
    }
    fetchData();
  }, [fetchs]);

  const hanldeDelete = async (id: string) => {
    setShowModal(false);
    setLoading(true);
    const payload = {
      delete: true,
    };
    const mainForm = new FormData();
    mainForm.append("data", JSON.stringify(payload));

    try {
      const response = await fetch(
        `${API_BASE_URI}/tutorials/edit-tutorial/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `${user?.data?.accessToken}`,
          },
          body: mainForm,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update tutorial");
      }

      const data = await response.json();
      toast.success("Tutorial Deleted successfully");
      setLoading(false);
      setShowModal(false);
      setFetchs(true);
      // window.location.reload();
    } catch (error) {
      toast.error("Error updating tutorial");
    }
  };

  // Filter the data by title or category name based on the search query
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="mt-20 inset-0 flex items-center justify-center absolute z-50 opacity-75">
        <div
          className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-primary"
          style={{ width: "4em" }}
        ></div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (showModal)
    return (
      <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white-900 text-black">
        <p className="flex-1 text-black">
          Are you sure, you want to delete content?
        </p>
        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
          <button
            className="px-6 py-2 rounded-sm"
            onClick={() => setShowModal(false)}
          >
            No
          </button>
          <button
            className="px-6 py-2 rounded-sm shadow-sm bg-red-600 text-white"
            onClick={() => hanldeDelete(deleteId)}
          >
            Yes
          </button>
        </div>
      </div>
    );

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
        {filteredData.map((item: ContentItem) => (
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
              <Link href={`/tutorials/edit?id=${item?.catId}`}>
                <button className="text-primary hover:text-secondary">
                  Edit
                </button>
              </Link>
              <button
                className="text-red-600 hover:text-red-900 ml-3"
                onClick={() => {
                  setShowModal(true);
                  setDeleteId(item?.id);
                }}
              >
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
  const [searchQuery, setSearchQuery] = useState("");

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
            <form
              className="flex w-full max-w-sm space-x-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className="md:px-4 py-2 rounded-md"
                  placeholder="Search Course"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
          <ContentTable searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;

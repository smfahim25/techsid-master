"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserTable = () => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://techsiid-master.onrender.com/api/v1//orders",
          {
            method: "GET", // or 'POST', 'PUT', etc.
            headers: {
              "Content-Type": "application/json", // Ensure the content type is JSON
              Authorization: `${user?.data.accessToken}`, // Add this if your API requires an authentication token
              // Add any other headers your API might require
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]); // Empty dependency array to run only once on mount

  const handleStatusChange = async (orderId, newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://techsiid-master.onrender.com/api/v1/orders/change-order-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user?.data.accessToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to update status");
      }

      // Update the status in the local state
      setData((prevData) =>
        prevData.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Succesfully updated status");
      setLoading(false);
    } catch (error) {
      toast.error("Error updating status");
      setError(error.message);
      setLoading(false);
    }
  };

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
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return date.toLocaleString("en-US", options);
  };
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            User
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Course
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Order Created
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr key={order.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <Image
                    className="w-full h-full rounded-full"
                    src="/aims/1.jpg"
                    alt={order?.user.name}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {order?.user.name}
                  </p>
                  <p className="text-gray-600 whitespace-no-wrap">
                    {order?.user.email}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">
                {order?.course.title}
              </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">
                {formatDate(order?.course.createAt)}
              </p>
            </td>
            <td
              className={`px-5 py-5 border-b border-gray-200 bg-white text-sm `}
            >
              <p
                className={`text-gray-900 text-center px-2 py-1 rounded-lg whitespace-no-wrap ${
                  order?.status === "PAID" ? "bg-green-400" : "bg-red-400"
                }`}
              >
                {order?.status}
              </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="PAID">Paid</option>
                <option value="UNPAID">Unpaid</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Page = () => {
  return (
    <div className="container mx-auto max-w-3xl overflow-y-auto min-h-screen">
      <div className="py-8">
        <div className="flex flex-col md:flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 className="text-2xl leading-tight mb-5">Order Management</h2>
          <div className="text-end">
            <form className="flex w-full max-w-sm space-x-3">
              <div className="">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className="md:px-4 py-2 rounded-md"
                  placeholder="Search user"
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
        <div className="py-4 overflow-x-auto">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Page;

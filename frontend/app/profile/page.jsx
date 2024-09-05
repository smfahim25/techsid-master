"use client";
import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { API_BASE_URI } from "@/data/apiservice";

const UserTable = () => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URI}/orders/${user?.data?.user?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${user?.data.accessToken}`,
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
  }, [user]);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
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

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Course
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Order Created
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr key={order.id}>
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
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p
                className={`text-gray-900 text-center px-2 py-1 rounded-lg whitespace-no-wrap ${
                  order?.status === "PAID" ? "bg-green-400" : "bg-red-400"
                }`}
              >
                {order?.status}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Page() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <div>
      <Header />
      <main className="min-h-[70vh] flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg mt-5">
          <div className="flex justify-center md:block">
            <Image
              src="/avatar.jpg"
              alt="User Avatar"
              width={250}
              height={200}
              className="rounded-full"
            />
          </div>
          <div className="ml-6 md:mt-12">
            <h2 className="text-2xl font-semibold mb-2">
              {user?.data?.user?.name || "User Name"}
            </h2>
            <p className="text-gray-600 mb-2 text-xl">
              <span className="font-bold"> Email:</span>{" "}
              {user?.data?.user?.email || "user@example.com"}
            </p>
            <p className="text-gray-600  text-xl">
              <span className="font-bold"> Profile Created: </span>
              {user?.data?.user?.createAt
                ? new Date(user.data.user.createAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="w-full max-w-3xl mt-10 mb-10">
          <UserTable />
        </div>
      </main>
      <Footer />
    </div>
  );
}

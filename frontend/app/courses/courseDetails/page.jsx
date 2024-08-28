"use client";
// components/CourseDetail.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LearningOutcomes from "@/component/LearningOutcomes";
import ContentTable from "@/component/ContentTable";
import Header from "@/layout/Header/Header";
import Footer from "@/layout/Footer/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URI } from "@/data/apiservice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const user = useSelector((state) => state.auth.user);
  const params = useSearchParams();
  const courseId = params?.get("id");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fetchs, setFetchs] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URI}/courses?id=${courseId}`, {
          method: "GET",
          headers: {
            // Authorization: `${user?.data?.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const course = result.data[0]; // Adjust as needed based on your API response

        setDetails(course);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (courseId) {
      fetchCourseDetails();
    }
    if (courseId && fetchs) {
      fetchCourseDetails();
    }
  }, [courseId, fetchs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URI}/orders/${user?.data?.user?.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `${user?.data?.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        // console.log(result.data);
        const checkStatus = result?.data.filter(
          (course) => course.courseId === courseId
        );
        // console.log(checkStatus);
        setStatus(checkStatus[0]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, courseId]);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    return date.toLocaleDateString("en-US", {
      month: "numeric",
      year: "numeric",
    });
  };
  const handleBuy = async () => {
    const payload = {
      userId: user?.data?.user?.id,
      courseId: courseId,
    };
    if (!user) {
      router.push("/login");
    } else {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URI}/orders/create-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user?.data?.accessToken}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json(); // Parse the response as JSON
        console.log("Response data:", result);
        toast.success("Success order placed");
        setLoading(false);
        setShowModal(false);
        setFetchs(false);
        // window.location.reload();
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        {loading ? (
          <div className="mt-20 inset-0 flex items-center justify-center absolute z-50 opacity-75">
            <div
              className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-primary"
              style={{ width: "4em" }}
            ></div>
          </div>
        ) : (
          <div className="container mx-auto p-6">
            <div className="flex flex-wrap md:flex-nowrap">
              {/* Course Information Section */}
              <div className="w-full  md:pr-6">
                <h1 className="text-4xl font-bold mb-2">{details?.title}</h1>
                <div className="text-lg text-gray-700 mb-4">
                  {details?.titleDescription}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <span className="bg-primary text-white text-center text-sm font-semibold px-2 py-2 rounded-full">
                    Bestseller
                  </span>
                  <div className="text-primary">
                    <span className="text-xl font-semibold ml-3">
                      {details?.rating}
                    </span>
                    <span className="ml-1">☆☆☆☆☆</span>
                  </div>
                  <span className="secondary ml-3">(273,418 ratings)</span>
                  <span className="secondary ml-3">1,176,665 students</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <span className="secondary">
                    Created by {details?.instructor}
                  </span>
                  <span className="secondary ml-4">
                    Last updated {formatDate(details?.createAt)}
                  </span>
                  <span className="secondary ml-4 flex flex-col">
                    {details?.language}
                  </span>
                  <span className="secondary ml-4 flex flex-col">
                    {details?.level}
                  </span>
                </div>
              </div>

              {/* Preview Video Section */}
              <div className="w-full md:w-96 bg-gray-200 rounded overflow-hidden relative cursor-pointer mt-4 md:mt-0">
                <iframe
                  src="https://www.youtube.com/embed/bjxTIcuzB6k?si=r6zwSGMxZlbg7dhc" // Replace with the actual video URL
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="flex items-center mt-5">
              {status.status !== "PAID" ? (
                <button
                  className="bg-primary px-10 py-2 text-white rounded-lg"
                  onClick={() => setShowModal(true)}
                >
                  Buy course
                </button>
              ) : (
                <span className="bg-green-400 px-10 py-2 rounded-lg text-white">
                  PAID
                </span>
              )}
            </div>
            <div className="relative flex justify-center items-center">
              {showModal && (
                <div className="absolute z-50 flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white text-black h-[350px] w-[500px]">
                  <h2 className="text-xl text-center font-semibold leading-tight tracking-wide">
                    Order confirmation
                  </h2>
                  <div className="mt-10">
                    <p className=" text-black text-lg">
                      Customer name:{" "}
                      <span className="text-lg font-bold">
                        {user?.data?.user?.name}
                      </span>
                    </p>
                    <p className=" text-black text-lg">
                      Customer email:{" "}
                      <span className="text-lg font-bold">
                        {user?.data?.user?.email}
                      </span>
                    </p>
                    <p className=" text-black text-lg">
                      Course name:{" "}
                      <span className="text-lg font-bold">
                        {details?.title}
                      </span>
                    </p>
                    <p className=" text-black text-lg">
                      Course price:{" "}
                      <span className="text-lg font-bold">
                        ${details?.fees}
                      </span>
                    </p>
                    <p className=" text-black text-lg">
                      Course duration:{" "}
                      <span className="text-lg font-bold">
                        {details?.duration}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
                    <button
                      className="px-6 py-2 rounded-sm"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2 rounded-md shadow-sm bg-primary text-white"
                      onClick={handleBuy}
                    >
                      Pay
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-10">
              <div className=" text-primary p-6 shadow-md">
                <div className="grid md:grid-cols-2 gap-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: details?.description }}
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: details?.description }}
                  />
                </div>
              </div>
            </div>
            <div className=" p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Course content</h2>
              <div className="text-sm">
                <div>
                  <div dangerouslySetInnerHTML={{ __html: details?.content }} />
                </div>
                <div></div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;

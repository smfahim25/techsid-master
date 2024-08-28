"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API_BASE_URI } from "@/data/apiservice";

type Course = {
  id: string;
  title: string;
  instructor: string;
  fees: number;
  status: string;
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

const CourseTable: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [fetchs, setFetchs] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://techsiid-master.onrender.com/api/v1/courses"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result?.data);
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
        `${API_BASE_URI}/courses/edit-course/${id}`,
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
      toast.success("Course Deleted successfully");
      setLoading(false);
      setShowModal(false);
      // window.location.reload();
      setFetchs(true);
    } catch (error) {
      toast.error("Error updating course");
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
    <table className=" leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Course Title
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Instructor
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Enrollment
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((course: Course) => (
          <tr key={course.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {course.title}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">
                {course.instructor}
              </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{course.fees}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span
                className={`flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full ${
                  course.status === "ACTIVE" ? "" : "bg-red-100 text-red-800"
                }`}
              >
                {course.status}
              </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              <Link href={`/courses/edit?id=${course?.id}`}>
                <button className="text-primary hover:text-secondary">
                  Edit
                </button>
              </Link>
              <button
                className="text-red-600 hover:text-red-900 ml-3"
                onClick={() => {
                  setDeleteId(course?.id);
                  setShowModal(true);
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

const CourseManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-3xl min-h-screen">
      <div className="py-8">
        <div className="flex flex-col lg:flex-row mb-1 sm:mb-0 justify-between">
          <div className="">
            <h2 className="text-2xl leading-tight mb-5 md:mb-0">
              Course Management
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
              <Link href="/courses/create">
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Add Course
                </button>
              </Link>
            </form>
          </div>
        </div>
        <div className="py-4 overflow-x-auto">
          <CourseTable />
        </div>
      </div>
    </div>
  );
};

export default CourseManagementPage;

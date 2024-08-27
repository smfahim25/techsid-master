"use client";

import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";
import { API_BASE_URI } from "@/data/apiservice";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const EditCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "",
    instructor: "",
    img: null, // Initialize as null
    rating: 0,
    fees: 0,
    language: "",
    status: "",
  });
  const params = useSearchParams();
  const courseId = params?.get("id");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [customCat, setCustomCat] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  // Effect to fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URI}/courses?id=${courseId}`, {
          method: "GET",
          headers: {
            Authorization: `${user?.data?.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const course = result.data[0]; // Adjust as needed based on your API response

        setFormData({
          title: course.title,
          description: course.description,
          category: course.catId,
          duration: course.duration,
          level: course.level,
          instructor: course.instructor,
          img: null,
          rating: course.rating,
          fees: course.fees,
          language: course.language,
          status: course.status,
        });
        setDescription(course.description);
        setContent(course.content);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId, user?.data?.accessToken]);

  // Effect to fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URI}/courses/get-all-categories`,
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
        setCategories(result?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [user?.data?.accessToken]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleAdd = async () => {
    if (!customCat.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    const payload = {
      name: customCat,
    };

    try {
      const response = await fetch(`${API_BASE_URI}/courses/create-category`, {
        method: "POST",
        headers: {
          Authorization: `${user?.data?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const data = await response.json();
      setCategories((prevCategories) => [...prevCategories, data.data]);
      toast.success(data?.message);
      setCustomCat("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      title: formData?.title,
      description: description,
      content: content,
      catId: formData?.category,
      fees: parseInt(formData?.fees),
      instructor: formData?.instructor,
      rating: parseInt(formData?.rating),
      level: formData?.level,
      language: formData?.language,
      duration: formData?.duration,
      status: formData?.status,
    };
    const mainForm = new FormData();
    mainForm.append("data", JSON.stringify(payload));
    mainForm.append("file", formData?.img);
    try {
      const response = await fetch(
        `${API_BASE_URI}/courses/edit-course/${courseId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `${user?.data?.accessToken}`,
          },
          body: mainForm,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create article");
      }

      const data = await response.json();
      toast.success("Course updated successfully:");
      setLoading(false);
    } catch (error) {
      toast.error("Error creating article:");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="min-h-screen">
        {loading ? (
          <div className="mt-20 inset-0 flex items-center justify-center absolute z-50 opacity-75">
            <div
              className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-primary"
              style={{ width: "4em" }}
            ></div>
          </div>
        ) : (
          <main className="py-5 px-5 md:px-10">
            <h1 className="text-xl font-semibold">Edit Course</h1>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="add category"
                    value={customCat}
                    onChange={(e) => setCustomCat(e.target.value)}
                    className="w-[150px] border-2 px-4 py-1 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="bg-primary text-white px-2 rounded-md py-1 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                />
              </div>
              <div>
                <label
                  htmlFor="level"
                  className="block text-sm font-medium text-gray-700"
                >
                  Level
                </label>
                <select
                  name="level"
                  id="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                >
                  <option value="">Select difficulty level</option>
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="instructor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Instructor
                </label>
                <input
                  type="text"
                  name="instructor"
                  id="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                />
              </div>
              <div>
                <label
                  htmlFor="img"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course Image
                </label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                />
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                />
              </div>
              <div>
                <label
                  htmlFor="fees"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fees
                </label>
                <input
                  type="number"
                  name="fees"
                  id="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                />
              </div>
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Language
                </label>
                <input
                  type="text"
                  name="language"
                  id="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                >
                  <option value="">Select status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={handleEditorChange}
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={handleContentChange}
                />
              </div>
              <button
                type="submit"
                className="mt-6 bg-primary text-white px-4 py-2 rounded-md"
              >
                Update Course
              </button>
            </form>
          </main>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditCourse;

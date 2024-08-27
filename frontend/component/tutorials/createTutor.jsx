"use client";

import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";
import { API_BASE_URI } from "@/data/apiservice";
import { toast } from "react-toastify";

const CreateTutorial = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    img: [],
    video: "",
    code: "",
    status: "",
  });

  const user = useSelector((state) => state.auth.user);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [customCat, setCustomCat] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URI}/tutorials/get-all-categories`,
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
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.data?.accessToken]);

  const handleAdd = async () => {
    if (!customCat.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    const payload = {
      name: customCat,
    };

    try {
      const response = await fetch(
        `${API_BASE_URI}/tutorials/create-category`,
        {
          method: "POST",
          headers: {
            Authorization: `${user?.data?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const data = await response.json();
      setCategories([...categories, data]);
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
      catId: formData?.category,
      code: formData?.code,
      videoLink: formData?.video,
      status: formData?.status,
    };
    const mainForm = new FormData();
    mainForm.append("data", JSON.stringify(payload));
    mainForm.append("file", formData?.img);
    try {
      const response = await fetch(
        `${API_BASE_URI}/tutorials/create-tutorial`,
        {
          method: "POST",
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
      toast.success("Tutorials created successfully:");
      setLoading(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        img: [],
        video: "",
        code: "",
        status: "",
      });
    } catch (error) {
      toast.error("Error creating article:");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="px-10 py-3 min-h-screen">
        {loading ? (
          <div className="mt-20 inset-0 flex items-center justify-center absolute z-50 opacity-75">
            <div
              className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-primary"
              style={{ width: "4em" }}
            ></div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
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
                htmlFor="img"
                className="block text-sm font-medium text-gray-700"
              >
                Thumbnail
              </label>
              <input
                type="file"
                name="img"
                id="img"
                onChange={handleChange}
                required
                className="mt-1 block w-full border bg-white border-gray-300 rounded-md shadow-sm py-2 px-2"
              />
            </div>
            <div>
              <label
                htmlFor="video"
                className="block text-sm font-medium text-gray-700"
              >
                Video Link
              </label>
              <input
                type="text"
                name="video"
                id="video"
                value={formData.video}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
              />
            </div>

            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Code
              </label>
              <textarea
                type="text"
                name="code"
                id="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2 resize-none"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={handleEditorChange}
                />
              </div>
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
                <option value="">Select a category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
                {/* Add more categories as needed */}
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
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
                value={formData?.status}
                onChange={handleChange}
              >
                <option>Select Status</option>
                <option value="INACTIVE">In Active</option>
                <option value="ACTIVE">Active</option>
              </select>
            </div>

            <div className="flex items-center">
              <button
                type="submit"
                className="md:mt-5 bg-primary text-white px-4 py-2 rounded-md"
              >
                Create Tutorials
              </button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CreateTutorial;

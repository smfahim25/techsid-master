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

const UpdateTutorial = () => {
  const params = useSearchParams();
  const tutorialId = params?.get("id");

  // Separate states for each property
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  const user = useSelector((state) => state.auth.user);
  const [categories, setCategories] = useState([]);
  const [customCat, setCustomCat] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [user?.data?.accessToken]);

  // Fetch existing tutorial details whenever tutorialId changes
  useEffect(() => {
    if (tutorialId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URI}/tutorials?id=${tutorialId}`,
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
          const data = result.data[0];

          if (data) {
            setTitle(data.title || "");
            setDescription(data.description || "");
            setCategory(data.catId || "");
            setVideo(data.videoLink || "");
            setCode(data.code || "");
            setStatus(data.status || "");
            // Handle img separately if needed
          } else {
            console.log("No data found in response");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [tutorialId, user?.data?.accessToken]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
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
    e.preventDefault();
    const payload = {
      title: title,
      description: description,
      catId: category,
      code: code,
      videoLink: video,
      status: status,
    };
    const mainForm = new FormData();
    mainForm.append("data", JSON.stringify(payload));
    mainForm.append("file", img);

    try {
      const response = await fetch(
        `${API_BASE_URI}/tutorials/edit-tutorial/${tutorialId}`,
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
      toast.success("Tutorial updated successfully");
      router.push("/tutorials");
    } catch (error) {
      toast.error("Error updating tutorial");
    }
  };

  return (
    <div>
      <Header />

      <main className="px-10 py-3 min-h-screen">
        {loading ? (
          <div className="mt-20 inset-0 flex items-center justify-center">
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={handleImgChange}
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
                value={video}
                onChange={(e) => setVideo(e.target.value)}
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
                value={code}
                onChange={(e) => setCode(e.target.value)}
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
              >
                <option value="">Select a category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Add category"
                  value={customCat}
                  onChange={(e) => setCustomCat(e.target.value)}
                  className="w-[150px] border-2 px-4 py-2 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAdd}
                  className="bg-primary text-white px-4 py-2 rounded-md"
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
              >
                <option value="">Select a status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <div className="mt-5 col-span-2">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md"
              >
                Update Tutorial
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default UpdateTutorial;

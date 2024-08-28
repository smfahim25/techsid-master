"use client";
import TutorialsContent from "@/component/TutorialsContent";
import { API_BASE_URI } from "@/data/apiservice";
import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import React, { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  code: string; // Assuming this is a code or language indicator, adjust if needed
  createAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  img: string; // URL of the image
  status: "ACTIVE" | "INACTIVE"; // Enum-like string literals for status
  catId: string; // Category ID
  videoLink: string; // URL or identifier for a video link
}

const Page: React.FC = () => {
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
        const activeTutorials = result?.data.filter(
          (tutorial: Course) => tutorial.status === "ACTIVE"
        );
        setData(activeTutorials); // Adjust this according to your API response
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        {loading && (
          <div className="mt-20 inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-primary"
              style={{ width: "4em" }}
            ></div>
          </div>
        )}
        {error && <p>Error: {error}</p>}
        {!loading && (
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Discover Our Tutorials
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.map((tutorial: Course) => (
                  <TutorialsContent
                    key={tutorial.id}
                    id={tutorial.catId}
                    title={tutorial.title}
                    description={tutorial.description}
                    imageSrc={tutorial.img}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Page;

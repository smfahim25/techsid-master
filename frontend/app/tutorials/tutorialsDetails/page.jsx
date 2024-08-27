// pages/tutorials.tsx
"use client";

import { API_BASE_URI } from "@/data/apiservice";
import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const tutorials = [
  {
    title: "Introduction",
    introduction: "This is something we still need to work on for a while.",
    content: "Introduction content...",
    subtopics: ["What is JavaScript?", "History of JavaScript", "Examples"],
    example: 'console.log("Hello, JavaScript!");',
    videoSrc: "https://www.youtube.com/embed/your-video-id", // Replace with your video URL
    exerciseLink: "https://example.com/exercise-introduction", // Replace with your exercise URL
  },
  {
    title: "Getting Started",
    introduction: "Let's get started with JavaScript basics.",
    content: "Getting started content...",
    subtopics: [
      "Installing Node.js",
      "Setting up the environment",
      "Your first script",
    ],
    example: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
    videoSrc: "https://www.youtube.com/embed/your-video-id", // Replace with your video URL
    exerciseLink: "https://example.com/exercise-getting-started", // Replace with your exercise URL
  },
  {
    title: "Installation steps",
    introduction: "Let's get started with JavaScript basics.",
    content: "Getting started content...",
    subtopics: [
      "Installing Node.js",
      "Setting up the environment",
      "Your first script",
    ],
    example: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
    videoSrc: "https://www.youtube.com/embed/your-video-id", // Replace with your video URL
    exerciseLink: "https://example.com/exercise-getting-started", // Replace with your exercise URL
  },
  // Add more tutorial sections as needed
];

const TutorialsPage = () => {
  const params = useSearchParams();
  const tutorialId = params?.get("id");
  const [selectedTutorialIndex, setSelectedTutorialIndex] = useState(0);
  const selectedTutorial = tutorials[selectedTutorialIndex];
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [details, setDetails] = useState("");
  const menuRef = useRef();

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();
          const data = result.data[0];
          setDetails(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [tutorialId]);

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
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className=" bg-gray-100 p-6 hideNav">
              <h2 className="text-xl font-bold mb-4">Tutorial</h2>
              <ul>
                <li className="mb-2">
                  <button
                    onClick={() => setSelectedTutorialIndex(title)}
                    className={`text-primary hover:underline`}
                  >
                    {details?.title}
                  </button>
                </li>
              </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-5">
              <div className="relative hideIcon w-10" ref={menuRef}>
                <button
                  className="cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    viewBox="0 0 24 24"
                    stroke="black"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
                {showMenu && (
                  <ul
                    className="absolute left-0 right-0 bg-white shadow-md rounded-lg w-48 flex-col p-3"
                    id="menu"
                  >
                    {tutorials.map((tutorial, index) => (
                      <li key={index} className="mb-2">
                        <button
                          onClick={() => setSelectedTutorialIndex(index)}
                          className={`text-primary hover:underline ${
                            selectedTutorialIndex === index ? "font-bold" : ""
                          }`}
                        >
                          {tutorial.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedTutorial.title}
                </h2>
                <p className="mb-4">{selectedTutorial.introduction}</p>

                {/* Example Code Snippet */}
                <div className="bg-white shadow-md p-5 my-4">
                  <h3 className="font-bold mb-2">Example:</h3>
                  <pre className="bg-gray-100 p-3 rounded">
                    <code>{selectedTutorial.example}</code>
                  </pre>
                  <button className="mt-3 bg-primary text-white py-2 px-4 rounded hover:bg-secondary">
                    Try it Yourself
                  </button>
                </div>

                {/* Video Tutorial */}
                <div className="my-4">
                  <h3 className="font-bold mb-2">Video Tutorial:</h3>
                  <div className="w-full aspect-video bg-gray-300 flex justify-center items-center">
                    <iframe
                      className="w-full h-full"
                      src={selectedTutorial.videoSrc}
                      title="Video Tutorial"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                {/* Exercise */}
                <div className="my-4">
                  <h3 className="font-bold mb-2">
                    Test Yourself With Exercises:
                  </h3>
                  <Link
                    href="/lab"
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start the Exercise
                  </Link>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {selectedTutorialIndex > 0 && (
                    <button
                      onClick={() =>
                        setSelectedTutorialIndex(selectedTutorialIndex - 1)
                      }
                      className="text-primary hover:underline"
                    >
                      &lt; Previous:{" "}
                      {tutorials[selectedTutorialIndex - 1].title}
                    </button>
                  )}
                  {selectedTutorialIndex < tutorials.length - 1 && (
                    <button
                      onClick={() =>
                        setSelectedTutorialIndex(selectedTutorialIndex + 1)
                      }
                      className="text-primary hover:underline ml-auto"
                    >
                      Next: {tutorials[selectedTutorialIndex + 1].title} &gt;
                    </button>
                  )}
                </div>
              </div>
            </main>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TutorialsPage;

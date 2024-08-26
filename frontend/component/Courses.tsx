// components/CoursesSection.tsx
"use client";
import React, { useEffect, useState } from "react";
import ContentCard from "./ContentCard";

// Updated course data with specific courses
const courses = [
  {
    id: 1,
    title: "Solidity",
    description:
      "Dive deep into smart contract development for Ethereum blockchain.",
    rating: 4.8,
    reviewCount: 5000,
    imageSrc: "/courses/solidity.png", // Placeholder image path
  },
  {
    id: 2,
    title: "JavaScript",
    description: "Master JavaScript to enhance your web development skills.",
    rating: 4.7,
    reviewCount: 8000,
    imageSrc: "/courses/solidity.png",
  },
  {
    id: 3,
    title: "ReactJS",
    description:
      "Learn ReactJS to build dynamic and interactive web applications.",
    rating: 4.9,
    reviewCount: 7000,
    imageSrc: "/courses/solidity.png",
  },
  {
    id: 4,
    title: "NextJS",
    description: "Develop highly performant web applications with NextJS.",
    rating: 4.8,
    reviewCount: 4500,
    imageSrc: "/courses/solidity.png",
  },
  {
    id: 5,
    title: "NodeJS",
    description:
      "Understand backend development with NodeJS, the JavaScript runtime.",
    rating: 4.6,
    reviewCount: 6200,
    imageSrc: "/courses/solidity.png",
  },
  {
    id: 6,
    title: "AWS",
    description: "Get to grips with cloud services and deployment with AWS.",
    rating: 4.7,
    reviewCount: 3500,
    imageSrc: "/courses/solidity.png",
  },
  {
    id: 7,
    title: "Expert Design",
    description:
      "Unlock your creative potential and learn expert design techniques.",
    rating: 4.9,
    reviewCount: 4800,
    imageSrc: "/courses/solidity.png",
  },
  {
    id: 8,
    title: "Data Structures & Algorithms",
    description:
      "Enhance your problem-solving skills with DSA for optimal solutions.",
    rating: 4.9,
    reviewCount: 5300,
    imageSrc: "/courses/solidity.png",
  },
];
interface Course {
  id: string;
  title: string;
  description: string;
  duration: string; // Assuming duration is a string representing time, e.g., "8 hours"
  fees: number;
  img: string; // URL of the image
  instructor: string;
  language: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; // Enum-like string literals for levels
  rating: number; // Assuming rating is a number, possibly out of 5
  status: "ACTIVE" | "INACTIVE"; // Enum-like string literals for status
  createAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

const CoursesSection: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Discover the Variety of Courses Here
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10">
          {data?.map((course: Course) => (
            <ContentCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              rating={course.rating}
              reviewCount={course.rating}
              imageSrc={course.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;

"use client"
// components/CourseDetail.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LearningOutcomes from '@/component/LearningOutcomes';
import ContentTable from '@/component/ContentTable';

const CourseDetail: React.FC = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const handleVideoPlay = () => {
    setVideoPlaying(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Course Information Section */}
        <div className="w-full md:flex-1 md:pr-6">
          <h1 className="text-4xl font-bold mb-2">Blockchain Solidity Bootcamp</h1>
          <p className="text-lg text-gray-700 mb-4">
            Master Python by building 100 projects in 100 days. Learn data science,
            automation, build websites, games, and apps!
          </p>
          <div className="flex items-center mb-4">
            <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full mr-3">
              Bestseller
            </span>
            <div className="text-primary">
              <span className="text-xl font-semibold">4.7</span>
              <span className="ml-1">☆☆☆☆☆</span>
            </div>
            <span className="secondary ml-3">(273,418 ratings)</span>
            <span className="secondary ml-3">1,176,665 students</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="secondary">Created by Dr. Angela Yu</span>
            <span className="secondary ml-4">Last updated 1/2024</span>
            <span className="secondary ml-4">English, Arabic [Auto], 13 more</span>
          </div>
        </div>

        {/* Preview Video Section */}
        <div className="w-full md:w-96 bg-gray-200 rounded overflow-hidden relative cursor-pointer mt-4 md:mt-0">
          {!videoPlaying && (
            <>
              <Image
                src="/video-thumbnail.jpg" // Replace with your thumbnail image
                alt="Course Preview"
                layout="responsive"
                width={320}
                height={180}
                objectFit="cover"
                className="duration-300 ease-in-out"
              />
              <button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-full"
                onClick={handleVideoPlay}
              >
                {/* Replace with an actual play icon */}
                Play
              </button>
            </>
          )}
          {videoPlaying && (
            <iframe
              src="your-video-url" // Replace with the actual video URL
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          )}
        </div>
      </div>
      <LearningOutcomes />
      <ContentTable />
    </div>
  );
};

export default CourseDetail;

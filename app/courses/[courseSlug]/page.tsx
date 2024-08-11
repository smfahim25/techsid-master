"use client";
// components/CourseDetail.tsx
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LearningOutcomes from "@/component/LearningOutcomes";
import ContentTable from "@/component/ContentTable";

const CourseDetail: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Course Information Section */}
        <div className="w-full  md:pr-6">
          <h1 className="text-4xl font-bold mb-2">
            Blockchain Solidity Bootcamp
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Master Python by building 100 projects in 100 days. Learn data
            science, automation, build websites, games, and apps!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <span className="bg-primary text-white text-center text-sm font-semibold px-2 py-2 rounded-full">
              Bestseller
            </span>
            <div className="text-primary">
              <span className="text-xl font-semibold ml-3">4.7</span>
              <span className="ml-1">☆☆☆☆☆</span>
            </div>
            <span className="secondary ml-3">(273,418 ratings)</span>
            <span className="secondary ml-3">1,176,665 students</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <span className="secondary">Created by Dr. Angela Yu</span>
            <span className="secondary ml-4">Last updated 1/2024</span>
            <span className="secondary ml-4 flex flex-col">
              English, Arabic [Auto],
              <span className="secondary text-primary"> 13 more</span>
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
      <LearningOutcomes />
      <ContentTable />
    </div>
  );
};

export default CourseDetail;

// components/CourseContent.tsx
"use client"
import React, { useState } from 'react';

const ContentTable: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const courseSections = [
    {
      id: 1,
      title: "Program Information 2023/2024 Edition",
      lectures: [
        { title: "About The Course", duration: "02:43" },
        { title: "About Our Certifications", duration: "03:20" },
        { title: "Getting your Questions Answered", duration: "02:29" },
      ],
    },
  ];

  const toggleSection = (sectionId: number) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className=" p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Course content</h2>
      <div className="text-sm">
        {courseSections.map((section) => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="font-semibold">{section.title}</span>
              <span>{section.lectures.length} lectures • 9min</span>
            </button>
            <div className={`mt-2 ${expandedSection === section.id ? 'block' : 'hidden'}`}>
              {section.lectures.map((lecture, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{lecture.title}</span>
                  <div>
                    <button className="text-primary hover:underline mr-2">Preview</button>
                    <span className="text-gray-500">{lecture.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTable;

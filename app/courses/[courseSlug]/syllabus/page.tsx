// components/ProgressBar.tsx
"use client"
import React, { useState } from 'react';

interface ProgressBarProps {
  progress: number; // Progress in percentage (0 to 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressBarStyle = {
    width: `${progress}%`,
  };

  return (
    <div className="w-full bg-gray-300 rounded-full h-2">
      <div
        className="bg-primary h-2 rounded-full"
        style={progressBarStyle}
      ></div>
    </div>
  );
};

interface TopicProps {
    number: string;
    title: string;
    isCompleted: boolean;
    onToggle: () => void; // Function to toggle visibility of subtopics
    isExpanded: boolean; // State to control if the topic is expanded
  }
  
  const Topic: React.FC<TopicProps> = ({ number, title, isCompleted, onToggle, isExpanded }) => {
    const iconClass = isCompleted ? "text-green-500" : "text-gray-400";
    
    return (
      <div>
        <div className="flex items-center justify-between cursor-pointer" onClick={onToggle}>
          <div className="flex items-center">
            <span className="font-bold text-lg mr-2">{number}</span>
            <span className={isCompleted ? "text-gray-500" : "text-gray-700"}>{title}</span>
          </div>
        </div>
        
      </div>
    );
  };
  
  
  interface ModuleProps {
    title: string;
    progress: number;
    topics: Array<TopicProps>;
  }
  
  const Module: React.FC<ModuleProps> = ({ title, progress, topics }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className="my-6">
        <div className="flex justify-between mb-2 cursor-pointer" onClick={toggleExpand}>
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="material-icons">{isExpanded ? "expand_less" : "expand_more"}</span>
        </div>
        <ProgressBar progress={progress} />
        {isExpanded && (
          <div className="space-y-2 mt-2">
            {topics.map((topic, index) => (
              <Topic key={index} {...topic} isExpanded={isExpanded} onToggle={toggleExpand} />
            ))}
          </div>
        )}
      </div>
    );
  };
// Sample data for syllabus
const syllabusData: ModuleProps[] = [
  {
    title: 'Introduction to Solidity',
    progress: 50,
    topics: [
      {
        number: '01',
        title: 'Solidity Basics',
        isCompleted: true,
        onToggle: () => {}, 
        isExpanded: false, 
      },
      {
        number: '02',
        title: 'Variables and Data Types',
        isCompleted: false,
        onToggle: () => {}, 
        isExpanded: false, 
      },
      {
        number: '03',
        title: 'Control Structures',
        isCompleted: false,
        onToggle: () => {}, 
        isExpanded: false, 
      },
    ],
  },
  {
    title: 'Solidity Contracts',
    progress: 30,
    topics: [
      {
        number: '04',
        title: 'Creating Contracts',
        isCompleted: false,
        onToggle: () => {}, 
        isExpanded: false, 
      },
      {
        number: '05',
        title: 'Functions and Modifiers',
        isCompleted: false,
        onToggle: () => {}, 
        isExpanded: false, 
      },
      {
        number: '06',
        title: 'Events and Logging',
        isCompleted: false,
        onToggle: () => {}, 
        isExpanded: false, 
      },
    ],
  },
  {
    title: 'Advanced Solidity Concepts',
    progress: 20,
    topics: [
      {
        number: '07',
        title: 'Inheritance and Interfaces',
        isCompleted: false,
        onToggle: () => {}, 
        isExpanded: false, 
      },
      {
        number: '08',
        title: 'Error Handling',
        isCompleted: false,
        onToggle: () => {}, 
        isExpanded: false, 
      },
    ],
  },
];

// pages/courseSyllabus.tsx
const CourseSyllabusPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Course Syllabus</h1>
      {syllabusData.map((module, index) => (
        <Module key={index} {...module} />
      ))}
    </div>
  );
};

export default CourseSyllabusPage;

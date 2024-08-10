// pages/training.tsx
import React from 'react';
import Link from 'next/link';

const subjects = [
  { name: 'Tutorials', progress: 14, solved: 16, total: 112, link: '/training/tutorials' },
  { name: 'Interview Preparation Kit', progress: 16, solved: 11, total: 69, link: '/training/interview-prep' },
  { name: 'Problem Solving', progress: 64, points: 135, link: '/training/problem-solving' },
  // Add more subjects as needed
];

const Training: React.FC = () => {
  return (
    <div className="container mx-auto p-6 min-h-screen text-primary">
      <h1 className="text-4xl font-bold mb-6">Choose a Subject to train</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <div key={index} className="p-6 border rounded-lg  shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{subject.name}</h2>
            <div className="h-1 bg-gray-600 rounded mb-2">
              <div className={`h-full bg-primary rounded`} style={{ width: `${subject.progress}%` }}></div>
            </div>
            <p className="text-gray-400 mb-4">{subject.progress}% ({subject.solved}/{subject.total} challenges solved)</p>
            <Link href={subject.link}
              className={`inline-block px-4 py-2 rounded bg-primary text-white hover:bg-opacity-80 transition duration-300`}>
                Continue Preparation
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Training;

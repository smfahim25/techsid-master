// components/WhatYoullLearn.tsx
import React from 'react';

const LearningOutcomes: React.FC = () => {
  const learningOutcomes = [
    { id: 1, text: 'Prepare for Industry Certification Exam' },
    { id: 2, text: 'Hours and Hours of Video Instruction' },
    { id: 3, text: 'Over 25 Engaging Lab Exercises' },
    { id: 4, text: 'Instructor Available by Email or on the Forums' },
    { id: 5, text: 'Comprehensive Coverage of HTML and CSS' },
    { id: 6, text: 'Server Side Development with PHP' },
    { id: 7, text: 'Earn Certification that is Proof of your Competence' },
    { id: 8, text: 'Dozens of Code Examples to Download and Study' },
    { id: 9, text: 'All Lab Solutions' },
    { id: 10, text: 'All Free Tools' },
    { id: 11, text: 'Client Side Programming with Javascript' },
    { id: 12, text: 'Learn Database Development with mySQL' },
  ];

  return (
    <div className=" text-primary p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">What you will learn</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {learningOutcomes.map((outcome) => (
          <div key={outcome.id} className="flex items-center">
            <span className="text-secondary mr-2">✔</span>
            <span className="text-lg">{outcome.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningOutcomes;

"use client"
import React, { useState } from 'react';

// Define TypeScript types for the state
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

interface QuizSectionProps {
  questions: QuizQuestion[];
}

// Sidebar Topic Component
const SidebarTopic: React.FC<{ title: string }> = ({ title }) => (
  <li className="mb-2 cursor-pointer hover:text-blue-600">{title}</li>
);

// Quiz Option Component
const QuizOption: React.FC<{ label: string; name: string; onChange: () => void }> = ({
  label,
  name,
  onChange,
}) => (
  <label className="block mb-2">
    <input
      type="radio"
      name={name}
      value={label}
      onChange={onChange}
      className="mr-2"
    />
    {label}
  </label>
);

// Quiz Section Component
const QuizSection: React.FC<QuizSectionProps> = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});

  const handleOptionChange = (questionId: string, selectedOption: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: selectedOption });
  };

  return (
    <>
      {questions.map((question) => (
        <div key={question.id} className="mb-8">
          <h3 className="mb-2 font-semibold">{question.question}</h3>
          <div>
            {question.options.map((option) => (
              <QuizOption
                key={option}
                label={option}
                name={question.id}
                onChange={() => handleOptionChange(question.id, option)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

// Main Page Component
const QuizAndAssessmentPage: React.FC = () => {
  const quizQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'Who is making the Web standards?',
      options: ['The World Wide Web Consortium', 'Microsoft', 'Google', 'Mozilla'],
      answer: 'The World Wide Web Consortium',
    },
    // ... other questions ...
  ];

  return (
    <div className="container mx-auto flex">
      <aside className="w-1/4 bg-gray-200 p-4">
        <ul>
          <SidebarTopic title="JS Tutorial" />
          <SidebarTopic title="HTML Examples" />
          {/* ... other topics ... */}
        </ul>
      </aside>
      <main className="w-3/4 p-4">
        <h1 className="text-xl font-bold mb-4">Quiz/Assessment Content</h1>
        <QuizSection questions={quizQuestions} />
        {/* ... Exercise and Assessment Sections ... */}
        <button onClick={()=>{}} className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary">
            Submit Answer
          </button>
      </main>
    </div>
  );
};

export default QuizAndAssessmentPage;

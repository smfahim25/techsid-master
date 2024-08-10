// components/ContentSections.tsx
import Image from 'next/image';
import React from 'react';

const sections = [
  {
    title: 'Tutorials',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laor tincidunt ac lacus.',
    icon: '/icons/tutorial-icon.svg', // Replace with your icon path
  },
  {
    title: 'Quizzes',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laor tincidunt ac lacus.',
    icon: '/icons/quiz-icon.svg', // Replace with your icon path
  },
  {
    title: 'Contests',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laor tincidunt ac lacus.',
    icon: '/icons/contest-icon.svg', // Replace with your icon path
  },
  {
    title: 'Lab section',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laor tincidunt ac lacus.',
    icon: '/icons/lab-icon.svg', // Replace with your icon path
  }
];

const ContentSections: React.FC = () => {
  return (
    <section className="bg-gray-100 text-center py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Content Sections</h2>
        <p className="text-gray-600 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laor tincidunt ac lacus, mollis vel, in eget consectetur adipiscing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-6">
              <Image src={section.icon} alt={section.title} width={64} height={64} />
              <h3 className="font-semibold text-lg mt-4 mb-2">{section.title}</h3>
              <p className="text-gray-600 text-sm">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSections;

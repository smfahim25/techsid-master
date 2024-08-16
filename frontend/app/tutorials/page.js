// pages/tutorials.tsx
import ContentCard from '@/component/ContentCard';
import React from 'react';

// Updated tutorial data with specific tutorials
const tutorials = [
  {
    id: 1,
    title: 'HTML',
    description: 'Learn the basics of HTML, the backbone of web development.',
    rating: 4.8,
    reviewCount: 1500,
    imageSrc: '/images/html.jpg', // Replace with your image path
  },
  {
    id: 2,
    title: 'JavaScript',
    description: 'Master JavaScript to enhance your web development skills.',
    rating: 4.7,
    reviewCount: 1200,
    imageSrc: '/images/javascript.jpg', // Replace with your image path
  },
  {
    id: 3,
    title: 'CSS',
    description: 'Understand the fundamentals of CSS for styling web pages.',
    rating: 4.9,
    reviewCount: 1700,
    imageSrc: '/images/css.jpg', // Replace with your image path
  },
  {
    id: 4,
    title: 'ReactJS',
    description: 'Learn ReactJS to build dynamic and interactive web applications.',
    rating: 4.9,
    reviewCount: 1300,
    imageSrc: '/images/reactjs.jpg', // Replace with your image path
  },
  // Add more tutorial sections as needed
];

const TutorialsPage= () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Discover Our Tutorials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorials.map((tutorial) => (
            <ContentCard
              key={tutorial.id}
              title={tutorial.title}
              description={tutorial.description}
              rating={tutorial.rating}
              reviewCount={tutorial.reviewCount}
              imageSrc={tutorial.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorialsPage;

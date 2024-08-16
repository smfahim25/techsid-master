// components/TestimonialSection.tsx
import Image from 'next/image';
import React from 'react';

const TestimonialSection: React.FC = () => {
  // Add your carousel logic here

  return (
    <section className="relative bg-gray-100 text-gray-800 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Student Saying</h2>
        
        {/* Carousel Navigation */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <button className="p-4 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-200">
            left
          </button>
        </div>

        <div className="flex justify-center items-center">
          <div className="max-w-lg bg-white rounded-xl shadow p-8 m-4">
            <div className="flex flex-col items-center">
              {/* Replace with your image */}
              <Image src="/path-to-avatar.jpg" alt="Avatar" width={80} height={80} className="rounded-full" />
              <blockquote className="italic mt-4 text-lg">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laor tincidunt ac lacus, mollis vel, in eget."</blockquote>
              <p className="font-bold mt-4">Robard Hoddi</p>
              <p className="text-sm text-gray-600">Product Manager</p>
            </div>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <button className="p-4 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-200">
            right
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

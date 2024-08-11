// components/Pagination.tsx
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination: React.FC = () => {
  // Define your primary color

  return (
    <div className="flex items-center justify-center space-x-2 my-8 p-3">
      <button
        className={`p-3 bg-primary text-white rounded-full hover:bg-blue-700 
         flex items-center justify-center mr-3`}
        aria-label="Previous"
      >
        <FaChevronLeft />
      </button>
      {/* Dynamically generate page numbers */}
      {[1, 2, 3, "...", 10].map((item, index) => (
        <button
          key={index}
          className={`px-4 py-2 ml-3 ${
            item === 1 ? `bg-primary text-white` : "text-primary"
          } rounded-full hover:bg-blue-200 hover:text-white`}
          aria-current={item === 1 ? "page" : undefined}
        >
          {item}
        </button>
      ))}
      <button
        className={`p-3 bg-primary text-white rounded-full hover:bg-blue-700 flex items-center justify-center`}
        aria-label="Next"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;

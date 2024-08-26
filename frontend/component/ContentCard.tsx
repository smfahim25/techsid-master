import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const ContentCard: React.FC<{
  id: string;
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  imageSrc: string;
}> = ({ title, description, rating, reviewCount, imageSrc, id }) => {
  return (
    <div className="bg-white shadow-lg rounded overflow-hidden group p-3">
      <div className="flex justify-center items-center">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={180}
          className=" object-cover group-hover:opacity-75"
          style={{ height: "300px" }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-700 text-sm mb-4">{description.slice(0, 50)}</p>
        <div className="flex justify-between items-center">
          <span className="text-yellow-500 text-sm">
            <span className="flex justify-center items-center gap-2">
              {rating}
              <span className="flex justify-center items-center">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </span>
            </span>
            ({reviewCount.toLocaleString()})
          </span>
          <Link href={`courses/courseDetails?id=${id}`}>
            <button className="text-white bg-primary px-5 py-2 text-xs rounded hover:bg-purple-700 transition duration-300">
              Enroll
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;

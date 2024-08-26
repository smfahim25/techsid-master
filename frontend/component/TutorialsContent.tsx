import Image from "next/image";
import Link from "next/link";
import React from "react";

const TutorialsContent: React.FC<{
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}> = ({ title, description, imageSrc, id }) => {
  return (
    <div className="bg-white shadow-lg rounded overflow-hidden group p-3">
      <div className="flex justify-center items-center">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={180}
          className="w-auto h-auto object-cover group-hover:opacity-75"
          style={{ height: "300px" }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-700 text-sm mb-4">{description.slice(0, 50)}</p>
        <div className="flex justify-between items-center">
          <Link href={`tutorials/tutorialsDetails?id=${id}`}>
            <button className="text-white bg-primary px-5 py-2 text-xs rounded hover:bg-purple-700 transition duration-300">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialsContent;

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ContentCard: React.FC<{ title: string; description: string; rating: number; reviewCount: number; imageSrc: string }> = ({ title, description, rating, reviewCount, imageSrc }) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <Image src={imageSrc} alt={title} width={320} height={180} className="w-auto h-auto object-cover group-hover:opacity-75" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-700 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-yellow-500 text-sm">{rating} ({reviewCount.toLocaleString()})</span>
          <Link href={`courses/${title}`}>
          <button className="text-white bg-primary px-3 py-1 text-xs rounded hover:bg-purple-700 transition duration-300">Enroll</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

interface UserCardProps {
  name: string;
  role: string;
  description: string;
  location: string;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  role,
  description,
  location,
}) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="bg-cover bg-center h-56 p-4"
          style={{ backgroundImage: "url('https://placehold.co/600x600')" }}
        >
          <div className="font-bold text-white text-lg">{name}</div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div className="flex p-4 border-t border-gray-300 text-gray-700">
          <div className="flex-1 inline-flex items-center">
            <i className="fas fa-anchor"></i>
            <span className="ml-2">
              {role} | {location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Community: NextPage = () => {
  // You would fetch or define your user data here
  const users = [
    {
      name: "John Doe",
      role: "Chief Executive",
      description: "Lorem ipsum dolor...",
      location: "Google | New York",
    },
    // ... other users
  ];

  return (
    <div>
      <Header />
      <main>
        <div className="bg-gray-100">
          <Head>
            <title>Community</title>
          </Head>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Community</h1>
            <p className="mb-6">Lorem ipsum dolor sit amet...</p>
            {/* Search input and other content here */}
            <div className="flex flex-wrap -mx-4">
              {users.map((user, index) => (
                <UserCard
                  key={index}
                  name={user.name}
                  role={user.role}
                  description={user.description}
                  location={user.location}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegClock, FaRegUser } from "react-icons/fa";

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "How to Learn JavaScript",
      author: "Jane Doe",
      date: "June 21, 2024",
      content:
        "JavaScript is a versatile language. Here are some tips on how to learn it effectively...",
    },
    {
      id: "2",
      title: "My Journey into Web Development",
      author: "John Smith",
      date: "June 20, 2024",
      content:
        "Web development has been a fulfilling career for me. Let me share my story...",
    },
  ]);

  const router = useRouter();

  const createPost = () => {
    router.push("blogs/create");
  };

  const viewPost = (id: string) => {
    router.push(`blogs/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <button
          onClick={createPost}
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary"
        >
          Create Post
        </button>
      </div>

      <div id="postList" className="px-10">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center"
          >
            <Image
              src="/aims/1.jpg"
              alt="aims"
              className="rounded-lg"
              width={180}
              height={100}
            />
            <div className="ml-5">
              <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <FaRegClock />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <FaRegUser /> {post.author}
                </span>
              </p>
              <h2
                className="text-2xl font-bold mb-2 cursor-pointer hover:text-[#2784fe]"
                onClick={() => viewPost(post.id)}
              >
                {post.title}
              </h2>

              <p>{post.content.substring(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

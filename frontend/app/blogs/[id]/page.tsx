"use client";

import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

const postsData: Post[] = [
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
];

const PostDetail = () => {
  const router = useRouter();
  const params = useParams();
  console.log(params);
  const postId = params.id;

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postId) {
      const foundPost = postsData.find((p) => p.id === postId);
      setPost(foundPost || null);
    }
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <div className="mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-600 text-sm mb-4">
              By {post.author} on {post.date}
            </p>
            <p>{post.content}</p>
            <button
              onClick={() => router.push("/blogs")}
              className="mt-6 text-primary hover:underline"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;

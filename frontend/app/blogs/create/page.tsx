"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ContentBlock {
  type: string;
  content: string;
}

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const router = useRouter();

  const addContentBlock = (type: string) => {
    setContentBlocks([...contentBlocks, { type, content: '' }]);
  };

  const handleContentChange = (index: number, newContent: string) => {
    const updatedBlocks = contentBlocks.map((block, i) =>
      i === index ? { ...block, content: newContent } : block
    );
    setContentBlocks(updatedBlocks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle saving the post data
    console.log({ title, contentBlocks });
    router.push("/blogs");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-3 py-2 border-b-2 border-gray-300 text-4xl font-bold focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex space-x-2">
          <button
            type="button"
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary"
            onClick={() => addContentBlock('text')}
          >
            Add Text
          </button>
          <button
            type="button"
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary"
            onClick={() => addContentBlock('photo')}
          >
            Add Photo
          </button>
          <button
            type="button"
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary"
            onClick={() => addContentBlock('video')}
          >
            Add Video
          </button>
          <button
            type="button"
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary"
            onClick={() => addContentBlock('code')}
          >
            Add Code
          </button>
        </div>

        <div className="space-y-4">
          {contentBlocks.map((block, index) => (
            <div key={index} className="relative group">
              {block.type === 'text' && (
                <textarea
                  placeholder="Enter text..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  value={block.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  required
                />
              )}
              {block.type === 'photo' && (
                <input
                  type="text"
                  placeholder="Enter image URL..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  value={block.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  required
                />
              )}
              {block.type === 'video' && (
                <input
                  type="text"
                  placeholder="Enter video URL..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  value={block.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  required
                />
              )}
              {block.type === 'code' && (
                <textarea
                  placeholder="Enter code..."
                  className="w-full px-3 py-2 border rounded-lg font-mono focus:outline-none"
                  value={block.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  required
                />
              )}
              <button
                type="button"
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-red-500"
                onClick={() => {
                  const updatedBlocks = contentBlocks.filter((_, i) => i !== index);
                  setContentBlocks(updatedBlocks);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary mt-6"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

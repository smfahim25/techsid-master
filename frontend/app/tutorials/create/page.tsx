"use client";
import React, { useState } from 'react';

interface Content {
  type: 'text' | 'photo' | 'video' | 'code';
  value: string;
}

interface Section {
  heading: string;
  content: Content[];
}

interface Tutorial {
  title: string;
  sections: Section[];
}

const AdminTutorialForm: React.FC = () => {
  const [tutorial, setTutorial] = useState<Tutorial>({
    title: '',
    sections: [
      {
        heading: '',
        content: [
          { type: 'text', value: '' },
          { type: 'photo', value: '' },
          { type: 'video', value: '' },
          { type: 'code', value: '' },
        ]
      }
    ]
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    sectionIndex?: number,
    contentIndex?: number
  ) => {
    const { value } = e.target;
    const name = e.target.name as Content['type'];
    setTutorial((prevTutorial) => {
      if (sectionIndex !== undefined && contentIndex !== undefined) {
        const newSections = [...prevTutorial.sections];
        newSections[sectionIndex].content[contentIndex] = { ...newSections[sectionIndex].content[contentIndex], value, type: name };
        return { ...prevTutorial, sections: newSections };
      } else {
        return { ...prevTutorial, [name]: value };
      }
    });
  };

  const handleContentTypeChange = (type: Content['type'], sectionIndex: number) => {
    setTutorial((prevTutorial) => {
      const newSections = [...prevTutorial.sections];
      newSections[sectionIndex].content.push({ type, value: '' });
      return { ...prevTutorial, sections: newSections };
    });
  };

  const handleAddSection = () => {
    setTutorial((prevTutorial) => ({
      ...prevTutorial,
      sections: [
        ...prevTutorial.sections,
        {
          heading: '',
          content: [
            { type: 'text', value: '' },
            { type: 'photo', value: '' },
            { type: 'video', value: '' },
            { type: 'code', value: '' },
          ]
        }
      ]
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Tutorial Submitted:', tutorial);
    // Handle submission logic here (e.g., send to an API)
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6">Create a New Tutorial</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={tutorial.title}
            onChange={(e) => handleInputChange(e)}
            placeholder="Tutorial Title"
            className="mt-1 p-3 border w-full text-2xl font-bold"
            required
          />
        </div>
        {tutorial.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6 border p-4 rounded-lg bg-gray-50">
            <div className="mb-4">
              <input
                type="text"
                name="heading"
                value={section.heading}
                onChange={(e) => handleInputChange(e, sectionIndex)}
                placeholder="Section Heading"
                className="mt-1 p-3 border w-full"
                required
              />
            </div>
            {section.content.map((content, contentIndex) => (
              <div key={contentIndex} className="mb-4 relative">
                {content.type === 'text' && (
                  <textarea
                    name="text"
                    value={content.value}
                    onChange={(e) => handleInputChange(e, sectionIndex, contentIndex)}
                    placeholder="Enter text..."
                    className="mt-1 p-3 border w-full"
                    rows={3}
                  />
                )}
                {content.type === 'photo' && (
                  <input
                    type="text"
                    name="photo"
                    value={content.value}
                    onChange={(e) => handleInputChange(e, sectionIndex, contentIndex)}
                    placeholder="Enter image URL..."
                    className="mt-1 p-3 border w-full"
                  />
                )}
                {content.type === 'video' && (
                  <input
                    type="text"
                    name="video"
                    value={content.value}
                    onChange={(e) => handleInputChange(e, sectionIndex, contentIndex)}
                    placeholder="Enter video URL..."
                    className="mt-1 p-3 border w-full"
                  />
                )}
                {content.type === 'code' && (
                  <textarea
                    name="code"
                    value={content.value}
                    onChange={(e) => handleInputChange(e, sectionIndex, contentIndex)}
                    placeholder="Enter code..."
                    className="mt-1 p-3 border w-full"
                    rows={3}
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setTutorial((prevTutorial) => {
                      const newSections = [...prevTutorial.sections];
                      newSections[sectionIndex].content.splice(contentIndex, 1);
                      return { ...prevTutorial, sections: newSections };
                    });
                  }}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleContentTypeChange('text', sectionIndex)}
                className="bg-primary text-white py-2 px-4 rounded"
              >
                Add Text
              </button>
              <button
                type="button"
                onClick={() => handleContentTypeChange('photo', sectionIndex)}
                className="bg-primary text-white py-2 px-4 rounded"
              >
                Add Photo
              </button>
              <button
                type="button"
                onClick={() => handleContentTypeChange('video', sectionIndex)}
                className="bg-primary text-white py-2 px-4 rounded"
              >
                Add Video
              </button>
              <button
                type="button"
                onClick={() => handleContentTypeChange('code', sectionIndex)}
                className="bg-primary text-white py-2 px-4 rounded"
              >
                Add Code
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSection}
          className="bg-primary text-white py-2 px-4 mr-4 rounded mb-4"
        >
          Add Section
        </button>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded"
        >
          Post Tutorial
        </button>
      </form>
    </div>
  );
};

export default AdminTutorialForm;

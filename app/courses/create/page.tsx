// types/CreateCourseForm.ts
"use client"

import { useState } from "react";

type CreateCourseFormProps = {
    onSubmit: (data: CourseFormData) => void;
  };
  
  export type CourseFormData = {
    title: string;
    description: string;
    category: string;
    duration: string;
    level: string;
  };
  

  
  const CreateCourseForm: React.FC<CreateCourseFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<CourseFormData>({
      title: '',
      description: '',
      category: '',
      duration: '',
      level: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select a category</option>
            <option value="web-development">Web Development</option>
            <option value="data-science">Data Science</option>
            <option value="business">Business</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
          <select
            name="level"
            id="level"
            value={formData.level}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select difficulty level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary">Create Course</button>
      </form>
    );
  };

  const CreateCoursePage: React.FC = () => {
    const handleCreateCourse = (data: CourseFormData) => {
      console.log('Course Data:', data);
      // Here you would handle the submission of the course data,
      // typically sending it to a backend server or storing it in your state management.
    };
  
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl text-primary font-semibold mb-6">Create a New Course</h1>
        <CreateCourseForm onSubmit={handleCreateCourse} />
      </div>
    );
  };
  
  export default CreateCoursePage;
  
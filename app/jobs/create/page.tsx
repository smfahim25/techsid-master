"use client"
import React, { useState } from "react";

interface Job {
  title: string;
  description: string;
  company: string;
  location: string;
  rating: number;
  applicants: number;
}


interface AddJobFormProps {
  onSubmit: (job: Job) => void;
}

const AddJobForm: React.FC<AddJobFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [applicants, setApplicants] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, company, location, applicants });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-primary6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Job</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Job Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Company</label>
        <input type="text" className="w-full px-3 py-2 border rounded-lg" value={company}
         onChange={(e) => setCompany(e.target.value)} required />
      </div>
     <div className="mb-4">
      <label className="block text-gray-700">Location</label>
      <input type="text" className="w-full px-3 py-2 border rounded-lg" value={location}
      onChange={(e) => setLocation(e.target.value)} required />
     </div>

    <div className="mb-4">
      <label className="block text-gray-700">Applicants</label>
      <input type="number" className="w-full px-3 py-2 border rounded-lg" value={applicants}
        onChange={(e) => setApplicants(Number(e.target.value))} required min="0" />
    </div>
    <button type="submit" className="w-full bg-primary text-white py-2 px-4 mb-6 
    rounded-lg hover:bg-primary">Add Job</button>
   </form>
);
};

export default AddJobForm;

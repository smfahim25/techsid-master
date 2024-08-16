import { Job } from "@/data/jobs";
import React from "react";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">{job.title}</h3>
      <p className="text-gray-700">{job.description}</p>
      <p className="text-gray-500">{job.company} - {job.location}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="text-yellow-500">
          {job.rating} ({job.applicants})
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg">
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;

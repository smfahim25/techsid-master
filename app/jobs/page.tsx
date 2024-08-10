"use client"
import React from "react";
import JobCard from "./JobCard";
import { jobs } from "@/data/jobs";
import { useRouter } from "next/navigation";

const Jobs: React.FC = () => {
  const isAdmin = true; 
  const router = useRouter();

  const handleCreateJob = ()=>{
    router.push("/jobs/create")
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Discover the Variety of Jobs Here</h1>
        {isAdmin && (
            <button className="bg-primary text-white px-4 py-2 rounded-lg mb-6"
            onClick={handleCreateJob}>
              Add New Job
            </button>
          )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

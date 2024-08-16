import { useState } from "react";
import Link from 'next/link';

type Course = {
  id: number;
  title: string;
  instructor: string;
  enrollment: number;
  status: string;
};

const courses: Course[] = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      instructor: 'Jane Doe',
      enrollment: 150,
      status: 'Active',
    },
    {
      id: 2,
      title: 'Advanced CSS Techniques',
      instructor: 'John Smith',
      enrollment: 87,
      status: 'Active',
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms in Python',
      instructor: 'Alice Johnson',
      enrollment: 200,
      status: 'Active',
    },
    {
      id: 4,
      title: 'React from Scratch',
      instructor: 'Michael Brown',
      enrollment: 300,
      status: 'Active',
    },
    {
      id: 5,
      title: 'Fullstack Web Development',
      instructor: 'Sarah Davis',
      enrollment: 120,
      status: 'Active',
    },
    {
      id: 6,
      title: 'Mobile App Development with Flutter',
      instructor: 'Patrick Miller',
      enrollment: 95,
      status: 'Active',
    },
    {
      id: 7,
      title: 'Cloud Computing with AWS',
      instructor: 'Nancy Wilson',
      enrollment: 78,
      status: 'Active',
    },
    {
      id: 8,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Jessica Garcia',
      enrollment: 66,
      status: 'Active',
    },
    {
      id: 9,
      title: 'Introduction to Machine Learning',
      instructor: 'Daniel Martinez',
      enrollment: 182,
      status: 'Active',
    },
    {
      id: 10,
      title: 'Project Management for IT Professionals',
      instructor: 'Laura Hernandez',
      enrollment: 45,
      status: 'Active',
    }
  ];
  

const CourseTable: React.FC = () => {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Course Title
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Instructor
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Enrollment
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <tr key={course.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-gray-900 whitespace-no-wrap">{course.title}</p>
                </div>
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{course.instructor}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{course.enrollment}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span className={`flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full ${course.status === 'Active' ? '' : 'bg-red-100 text-red-800'}`}>
                {course.status}
              </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button className="text-primary hover:text-secondary">Edit</button>
              <button className="text-red-600 hover:text-red-900 ml-3">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CourseManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl overflow-y-auto">
    <div className="py-8">
      <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
        <h2 className="text-2xl leading-tight">Course Management</h2>
        <div className="text-end">
          <form className="flex w-full max-w-sm space-x-3">
            <div className=" relative ">
              <input type="text" id="&quot;form-subscribe-Filter" className="rounded-lg border-transparent flex-1 
              appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700
               placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2
                focus:ring-purple-600 focus:border-transparent" placeholder="Search Course"/>
            </div>
            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
              Add Course
            </button>
          </form>
        </div>
      </div>
      <div className="py-4">
        <CourseTable />
      </div>
    </div>
  </div>
  );
};

export default CourseManagementPage;

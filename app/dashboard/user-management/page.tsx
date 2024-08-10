"use client"
import { useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    avatarUrl: string;
  };
  
  const users: User[] = [
    {
      id: 1,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'Admin',
      status: 'Active',
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Editor',
      status: 'Inactive',
      avatarUrl: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'Subscriber',
      status: 'Active',
      avatarUrl: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'Contributor',
      status: 'Pending',
      avatarUrl: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: 5,
      name: 'Sarah Davis',
      email: 'sarah.davis@example.com',
      role: 'Subscriber',
      status: 'Active',
      avatarUrl: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 6,
      name: 'Patrick Miller',
      email: 'patrick.miller@example.com',
      role: 'Admin',
      status: 'Inactive',
      avatarUrl: 'https://i.pravatar.cc/150?img=6'
    },
    {
      id: 7,
      name: 'Nancy Wilson',
      email: 'nancy.wilson@example.com',
      role: 'Editor',
      status: 'Active',
      avatarUrl: 'https://i.pravatar.cc/150?img=7'
    },
    {
      id: 8,
      name: 'Jessica Garcia',
      email: 'jessica.garcia@example.com',
      role: 'Contributor',
      status: 'Pending',
      avatarUrl: 'https://i.pravatar.cc/150?img=8'
    },
    {
      id: 9,
      name: 'Daniel Martinez',
      email: 'daniel.martinez@example.com',
      role: 'Subscriber',
      status: 'Active',
      avatarUrl: 'https://i.pravatar.cc/150?img=9'
    },
    {
      id: 10,
      name: 'Laura Hernandez',
      email: 'laura.hernandez@example.com',
      role: 'Admin',
      status: 'Inactive',
      avatarUrl: 'https://i.pravatar.cc/150?img=10'
    },
    {
      id: 11,
      name: 'Tony Stark',
      email: 'tony.stark@example.com',
      role: 'Manager',
      status: 'Active',
      avatarUrl: 'https://i.pravatar.cc/150?img=11'
    },
    {
      id: 12,
      name: 'Steve Rogers',
      email: 'steve.rogers@example.com',
      role: 'Contributor',
      status: 'Active',
      avatarUrl: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 13,
      name: 'Natasha Romanoff',
      email: 'natasha.romanoff@example.com',
      role: 'Editor',
      status: 'Inactive',
      avatarUrl: 'https://i.pravatar.cc/150?img=13'
    },
    {
      id: 14,
      name: 'Bruce Banner',
      email: 'bruce.banner@example.com',
      role: 'Subscriber',
      status: 'Pending',
      avatarUrl: 'https://i.pravatar.cc/150?img=14'
    },
    {
      id: 15,
      name: 'Clint Barton',
      email: 'clint.barton@example.com',
      role: 'Manager',
      status: 'Active',
      avatarUrl: 'https://i.pravatar.cc/150?img=15'
    },
  ];
  
  const UserTable: React.FC = () => {
    return (
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              User
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Role
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img className="w-full h-full rounded-full" src={user.avatarUrl} alt={user.name} />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                    <p className="text-gray-600 whitespace-no-wrap">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
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
  

  

  
  const UserManagementPage: React.FC = () => {
  
    return (
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl overflow-y-auto">
        <div className="py-8">
          <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 className="text-2xl leading-tight">User Management</h2>
            <div className="text-end">
              <form className="flex w-full max-w-sm space-x-3">
                <div className=" relative ">
                  <input type="text" id="&quot;form-subscribe-Filter" className="rounded-lg border-transparent flex-1 
                  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search user"/>
                </div>
                <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                  Add User
                </button>
              </form>
            </div>
          </div>
          <div className="py-4">
            <UserTable />
          </div>
        </div>
      </div>
    );
  };
  
  export default UserManagementPage;
  
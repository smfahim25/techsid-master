"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface userData {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface User {
  data: {
    id: string;
    name: string;
    role: string;
    email: string;
    accessToken: string; // Assuming the access token is part of the user data
    // Add other user properties here
  };
}

// Define the RootState interface
interface RootState {
  auth: {
    user: User | null;
  };
}

const UserTable: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [data, setData] = useState<userData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://techsiid-master.onrender.com/api/v1/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${user?.data.accessToken}`, // Assuming a Bearer token
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result?.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://techsiid-master.onrender.com/api/v1/users/edit-user/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user?.data.accessToken}`, // Assuming a Bearer token
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update role");
        setLoading(false);
      }

      // Optionally update the state to reflect the new role without refetching all data
      // Assuming the API returns the updated user data
      const updatedUser = await response.json();

      // Update the state with the new role
      setData((prevData) => {
        if (!prevData) return null; // or [] if you want to return an empty array
        return prevData.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        );
      });
      toast.success("user role updated successfully");
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="mt-20 inset-0 flex items-center justify-center absolute z-50 opacity-75">
        <div
          className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-primary"
          style={{ width: "4em" }}
        ></div>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

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
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((user) => (
          <tr key={user.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <Image
                    className="w-full h-full rounded-full"
                    src="/aims/1.jpg"
                    alt={user.name}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {user.name}
                  </p>
                  <p className="text-gray-600 whitespace-no-wrap">
                    {user.email}
                  </p>
                </div>
              </div>
            </td>
            <td
              className={`px-5 py-5 border-b border-gray-200 bg-white text-sm `}
            >
              <p className={`text-gray-900 whitespace-no-wrap`}>{user?.role}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <select
                className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const UserManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-3xl overflow-y-auto min-h-screen">
      <div className="py-8">
        <div className="flex flex-col md:flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 className="text-2xl leading-tight mb-5">User Management</h2>
          <div className="text-end">
            <form className="flex w-full max-w-sm space-x-3">
              <div className="">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className="md:px-4 py-2 rounded-md"
                  placeholder="Search user"
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
        <div className="py-4 overflow-x-auto">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;

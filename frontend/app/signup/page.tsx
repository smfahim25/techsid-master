// types/SignupFormData.ts
"use client";
export type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  offers: boolean;
};

import React, { useState } from "react";
import SocialSignupButtons from "./SocialSignupButtons";
import Header from "@/layout/Header/Header";
import Footer from "@/layout/Footer/Footer";
import { API_BASE_URI } from "@/data/apiservice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    offers: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    // Here you can handle the submission to your backend service
    const userData = {
      name: formData?.fullName,
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await fetch(`${API_BASE_URI}/auth/signup`, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Indicates the body format is JSON
        },
        body: JSON.stringify(userData), // Convert the user data to JSON string
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        toast.error(`Signup failed: ${errorData.message}`);
        setLoading(false);
        return;
      }

      const result = await response.json(); // Parse the JSON response
      toast.success("Signup successful!");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        offers: false,
      });
      setLoading(false);
      router.push("/login");
      // You can redirect the user or perform other actions after successful signup
    } catch (error) {
      toast.error("Error during signup:");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main>
        {loading && (
          <div className="mt-20 inset-0 flex items-center justify-center absolute z-50 bg-white opacity-75">
            <div
              className="w-16 h-16 border-4 border-dashed rounded-full animate-spin bg-primary"
              style={{ width: "4em" }}
            ></div>
          </div>
        )}
        <div className="max-w-md mx-auto mt-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="block text-gray-700 text-xl font-bold mb-6">
              Sign up and start learning
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="offers"
                  checked={formData.offers}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                />
                <span className="text-sm">
                  Send me special offers, personalized recommendations, and
                  learning tips.
                </span>
              </label>
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4
               rounded focus:outline-none focus:shadow-outline"
              >
                Sign up
              </button>
            </div>
            <p className="text-xs mt-4">
              By signing up, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline">
                Log in
              </a>
            </p>
            <div className="mt-6">
              <SocialSignupButtons />
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupForm;

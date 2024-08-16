// types/LoginFormData.ts
"use client"
export type LoginFormData = {
    email: string;
    password: string;
  };
  
  import React, { useState } from 'react';
import SocialSignupButtons from '../signup/SocialSignupButtons';
  
  const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
      email: '',
      password: ''
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, checked, type } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Here you can handle the submission to your backend service
      console.log(formData);
    };
  
    return (
      <div className="max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="block text-gray-700 text-xl font-bold mb-6">Welcome back</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
          <div style={{"textAlign":"center"}}>
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4
               rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
          <p className="text-center text-sm mt-4">
            New to Siid Tech? <a href="/signup" className="text-primary hover:underline">Sign Up</a>
          </p>
          <div className="mt-6">
          <SocialSignupButtons />
        </div>
        </form>
      </div>
    );
  };
  
  export default LoginForm;
  
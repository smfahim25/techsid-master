"use client";

import { login } from "@/store/auth/slice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { handleGithub, handleGoogleSignup } from "./utils"; // Assuming AppDispatch is exported from your store configuration

type Provider = "Google" | "GitHub"; // Define the type for provider

const SocialSignupButtons: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleProvider = async (provider: Provider) => {
    console.log(`Signup with ${provider}`);
    try {
      const res = await handleGoogleSignup();
      // console.log(res);

      // Updating the auth state
      // dispatch(login(res));

      // Route the user
      router.push("/");
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleGithubSignup = async (provider: Provider) => {
    console.log(`Signup with ${provider}`);
    try {
      const res = await handleGithub();
      // console.log(res);

      // Updating the auth state
      // dispatch(login(res));

      // Route the user
      router.push("/");
    } catch (error) {
      console.log(error, "error");
    }
    // Here you would integrate with the respective provider's sign-in API.
  };

  return (
    <div className="space-y-4">
      <div className="my-4 flex items-center justify-between">
        <hr className="w-full" />
        <p className="text-center px-2">or</p>
        <hr className="w-full" />
      </div>
      <button
        onClick={() => handleGoogleProvider("Google")}
        className="w-full flex items-center justify-center border border-gray-300 p-2 rounded-md shadow-sm"
      >
        <Image
          src="/google.webp"
          alt="Google"
          width={24}
          height={24}
          className="mr-2"
        />
        Continue with Google
      </button>
      <button
        onClick={() => handleGithubSignup("GitHub")}
        className="w-full flex items-center justify-center border border-gray-300 p-2 rounded-md shadow-sm"
      >
        <Image
          src="/github.webp"
          alt="GitHub"
          width={24}
          height={24}
          className="mr-2"
        />
        Continue with GitHub
      </button>
    </div>
  );
};

export default SocialSignupButtons;

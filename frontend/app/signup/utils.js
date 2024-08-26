// authUtils.js

import {
  auth,
  githubAuthProvider,
  googleAuthProvider,
} from "../../config/firebase";
import apiServicesInstance from "../../data/apiservice";
import { signInWithPopup } from "firebase/auth"; // Ensure you import this from the correct module

export const handleGoogleSignup = async () => {
  try {
    const data = await signInWithPopup(auth, googleAuthProvider);
    if (!data) {
      console.error("An unexpected error occurred during signup.");
      throw new Error("An unexpected error occurred during signup.");
    }
    console.log(data);

    const reqBody = {
      email: data?._tokenResponse?.email,
      // isEmailVerified: data?._tokenResponse?.emailVerified,
      // source: "google",
      // profileImg: data?._tokenResponse?.photoUrl,
      name: data?._tokenResponse?.firstName,
      // lastName: data?._tokenResponse?.lastName,
    };

    const res = await apiServicesInstance.signup(reqBody);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const handleGithub = async () => {
  try {
    const data = await signInWithPopup(auth, githubAuthProvider);
    if (!data) {
      console.error("An unexpected error occurred during signup.");
      throw new Error("An unexpected error occurred during signup.");
    }
    console.log(data);

    const reqBody = {
      email: data?._tokenResponse?.email,
      // isEmailVerified: data?._tokenResponse?.emailVerified,
      // source: "google",
      // profileImg: data?._tokenResponse?.photoUrl,
      name: data?._tokenResponse?.firstName,
      // lastName: data?._tokenResponse?.lastName,
    };

    const res = await apiServicesInstance.signup(reqBody);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

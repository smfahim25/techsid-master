// components/SocialSignupButtons.tsx
import Image from 'next/image';
import React from 'react';

const SocialSignupButtons: React.FC = () => {
  const handleSocialSignup = (provider: string) => {
    console.log(`Signup with ${provider}`);
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
        onClick={() => handleSocialSignup('Google')}
        className="w-full flex items-center justify-center border border-gray-300 p-2 rounded-md shadow-sm"
      >
        <Image src="/google.webp" alt="Google" width={24} height={24} className="mr-2" />
        Continue with Google
      </button>
      <button
        onClick={() => handleSocialSignup('Facebook')}
        className="w-full flex items-center justify-center border border-gray-300 p-2 rounded-md shadow-sm"
      >
        <Image src="/facebook.webp" alt="Facebook" width={24} height={24} className="mr-2" />
        Continue with Facebook
      </button>
      <button
        onClick={() => handleSocialSignup('GitHub')}
        className="w-full flex items-center justify-center border border-gray-300 p-2 rounded-md shadow-sm"
      >
        <Image src="/github.webp" alt="GitHub" width={24} height={24} className="mr-2" />
        Continue with GitHub
      </button>
      <button
        onClick={() => handleSocialSignup('LinkedIn')}
        className="w-full flex items-center justify-center border border-gray-300 p-2 rounded-md shadow-sm"
      >
        <Image src="/linkedin.webp" alt="LinkedIn" width={24} height={24} className="mr-2" />
        Continue with LinkedIn
      </button>
    </div>
  );
};

export default SocialSignupButtons;

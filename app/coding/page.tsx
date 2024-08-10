// components/CodingChallenge.tsx
"use client"
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodingChallenge: React.FC = () => {
  const [code, setCode] = useState<string>('// Write your code here');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput('Error running code');
    } finally {
      setLoading(false);
    }
  };

  const shareOnSocialMedia = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('I just completed a coding challenge!');
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Coding Challenge</h1>
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
        onChange={(value) => setCode(value || '')}
      />
      <button
        onClick={runCode}
        className="bg-primary text-white py-2 px-4 rounded mt-4"
        disabled={loading}
      >
        {loading ? 'Running...' : 'Run Code'}
      </button>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Output:</h2>
        <pre className="bg-gray-100 p-4 rounded">{output}</pre>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => shareOnSocialMedia('twitter')}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Share on Twitter
        </button>
        <button
          onClick={() => shareOnSocialMedia('facebook')}
          className="bg-blue-800 text-white py-2 px-4 rounded"
        >
          Share on Facebook
        </button>
      </div>
    </div>
  );
};

export default CodingChallenge;

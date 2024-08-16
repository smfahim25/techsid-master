"use client";
import React, { useState } from "react";

const CodeLabPage: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const executeCode = async (code: String) => code;
  const handleRunCode = async () => {
    try {
      const result = await executeCode(code);
    } catch (error) {
      setOutput("Error running the code");
    }
  };

  return (
    <div className="container mx-auto p-4 h-[300px]">
      <div className="flex flex-col md:flex-row">
        <textarea
          className="border rounded p-2 flex-1 mr-2"
          value={code}
          onChange={handleCodeChange}
          placeholder="Write your code here..."
        />
        <div className="border rounded p-2 flex-1 ml-2">
          <pre>{output}</pre>
        </div>
      </div>
      <button
        onClick={handleRunCode}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Run
      </button>
    </div>
  );
};

export default CodeLabPage;

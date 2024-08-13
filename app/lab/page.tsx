"use client";
import { Editor } from "@monaco-editor/react";
import hljs from "highlight.js";
import React, { useState } from "react";

const CodeLabPage: React.FC = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [output, setOutput] = useState<string>("");

  const detectLanguage = (value: any) => {
    const detectedLanguage = hljs.highlightAuto(value).language;
    return detectedLanguage || "plaintext"; // Fallback to plaintext
  };

  const handleEditorChange = (value: any) => {
    setCode(value);
    const detectedLanguage = detectLanguage(value);
    setLanguage(detectedLanguage);
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
    <div className="container mx-auto h-screen">
      <div className="flex flex-col md:flex-row mt-5">
        <div className="h-[40vh] md:w-1/2">
          <span>Code Editor:</span>
          <Editor
            language={language} // Dynamically set language
            value={code}
            onChange={handleEditorChange}
            options={{ automaticLayout: true }}
            defaultValue="// Start coding here..."
          />
          <button
            onClick={handleRunCode}
            className="mt-2 px-4 py-2 mb-5 bg-blue-500 text-white rounded"
          >
            Run code
          </button>
        </div>
        <div className=" rounded p-2 flex-1 ml-2 h-[40vh] md:w-1/2 mt-20 md:mt-0">
          <span>Output:</span>
          <div className="border-2 bg-white">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeLabPage;

"use client";
import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import { Editor } from "@monaco-editor/react";
import hljs from "highlight.js";
import React, { useState } from "react";

const CodeLabPage: React.FC = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [output, setOutput] = useState<string>("");

  const detectLanguage = (value: string) => {
    const detectedLanguage = hljs.highlightAuto(value).language;
    return detectedLanguage || "plaintext"; // Fallback to plaintext
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      const detectedLanguage = detectLanguage(value);
      setLanguage(detectedLanguage);
    }
  };

  const executeCode = (code: string) => {
    let result = "";
    const originalConsoleLog = console.log;

    try {
      // Override console.log to capture output
      console.log = (...args: any[]) => {
        result +=
          args
            .map((arg) =>
              typeof arg === "object"
                ? JSON.stringify(arg, null, 2) // Pretty print JSON objects
                : String(arg)
            )
            .join(" ") + "\n";
      };

      // Wrapping the code in an IIFE to provide a local scope
      const wrappedCode = `
        (function() {
          try {
            ${code}
          } catch (error) {
            console.log("Error executing code:", error.message);
          }
        })();
      `;

      // Execute the code
      eval(wrappedCode);
    } catch (error) {
      result = `Error executing code: ${error}`;
    } finally {
      // Restore the original console.log
      console.log = originalConsoleLog;
    }

    return result;
  };

  const handleRunCode = () => {
    const result = executeCode(code);
    setOutput(result || "Execution completed without output.");
  };

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto h-screen">
          <div className="flex flex-col md:flex-row mt-5">
            <div className="h-[40vh] md:w-1/2">
              <span>Code Editor:</span>
              <Editor
                language={language}
                value={code}
                onChange={handleEditorChange}
                options={{ automaticLayout: true }}
                defaultValue="// Start coding here..."
              />
              <button
                onClick={handleRunCode}
                className="mt-2 px-4 py-2 mb-5 bg-primary text-white rounded"
              >
                Run code
              </button>
            </div>
            <div className="rounded flex-1 ml-2 h-[40vh] md:w-1/2 mt-20 md:mt-0">
              <span>Output:</span>
              <div className="border-2 bg-white  h-[40vh] p-4 overflow-x-auto">
                <div dangerouslySetInnerHTML={{ __html: output }} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CodeLabPage;

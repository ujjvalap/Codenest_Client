/* eslint-disable react/prop-types */
import { Editor } from "@monaco-editor/react";
import React from "react";

function CodeEditor({ language, defalutValue, value, onChange, onMount }) {
  return (
    <div className="flex-grow h-full bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-700">
      <Editor
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          padding: { top: 20, left: 10 },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          lineNumbers: "on",
          smoothScrolling: true,
        }}
        height="100%"  // Ensure the editor uses the full available height
        theme="vs-dark"
        language={language}
        value={value}
        onChange={(newValue) => onChange(newValue)}
        onMount={onMount}
        className="rounded-lg"
      />
    </div>
  );
}

export default CodeEditor;

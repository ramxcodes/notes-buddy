"use client";

import Editor from "@monaco-editor/react";
import { type FC, useEffect, useRef } from "react";

interface CodeEditorProps {
  language: string;
  code: string;
  onChange: (value: string) => void;
  theme?: string;
}

const CodeEditor: FC<CodeEditorProps> = ({
  language,
  code,
  onChange,
  theme,
}) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    monaco.editor.defineTheme("monokai", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "", foreground: "#F8F8F2", background: "#272822" },
        { token: "comment", foreground: "#75715E" },
        { token: "string", foreground: "#E6DB74" },
        { token: "number", foreground: "#AE81FF" },
        { token: "keyword", foreground: "#F92672" },
        { token: "identifier", foreground: "#66D9EF" },
        { token: "type", foreground: "#A6E22E" },
      ],
      colors: {
        "editor.background": "#050d24",
        "editor.foreground": "#F8F8F2",
      },
    });
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current && theme) {
      const themeName = theme === "dark" ? "monokai" : "vs-light";
      monacoRef.current.editor.setTheme(themeName);
    }
  }, [theme]);

  return (
    <Editor
      height="100%"
      language={language}
      value={code}
      onChange={(value) => onChange(value || "")}
      theme="monokai"
      onMount={handleEditorMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        contextmenu: false,
      }}
    />
  );
};

export default CodeEditor;

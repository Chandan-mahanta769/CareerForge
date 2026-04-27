
import { Play, Copy, RotateCcw } from "lucide-react";
import React, { useState, useRef } from "react";


const LANGUAGES = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
];

function CompilerPanel() {
    const [lang, setLang] = useState("html");
    const [code, setCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f0f1a; color: white; padding: 20px; }
  </style>
</head>
<body>
  <h1>Hello CareerForge!</h1>
  <p>Edit this code and click Run ▶</p>
  <script>
    console.log('Hello from JS!');
  </script>
</body>
</html>`);
    const [output, setOutput] = useState("");
    const [iframeContent, setIframeContent] = useState("");
    const [activeOutput, setActiveOutput] = useState("preview"); // "preview" or "console"
    const consoleLogsRef = useRef([]);

    const TEMPLATES = {
        html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f0f1a; color: white; padding: 20px; }
  </style>
</head>
<body>
  <h1>Hello CareerForge!</h1>
  <script>
    console.log('Hello from JS!');
  </script>
</body>
</html>`,
        javascript: `// JavaScript — runs in console output below
function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('CareerForge'));

// Try arrays
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);
console.log('Doubled:', doubled);`,
        css: `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0f0f1a; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
  .box {
    width: 120px; height: 120px;
    background: linear-gradient(135deg, #6C3EF4, #3B8BFF);
    border-radius: 16px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
</head>
<body><div class="box"></div></body>
</html>`,
        python: `# Python — output shown below
# Note: Python runs as pseudocode simulation
# For real Python, paste into an online compiler

def greet(name):
    return f"Hello, {name}!"

print(greet("CareerForge"))

nums = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in nums]
print("Doubled:", doubled)`,
        java: `// Java — paste into compiler.java online
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, CareerForge!");
        
        int[] nums = {1, 2, 3, 4, 5};
        for (int n : nums) {
            System.out.print(n * 2 + " ");
        }
    }
}`,
        cpp: `// C++ — paste into cpp compiler online
#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "Hello, CareerForge!" << endl;
    
    vector<int> nums = {1, 2, 3, 4, 5};
    for (int n : nums) {
        cout << n * 2 << " ";
    }
    return 0;
}`,
    };

    const runCode = () => {
        consoleLogsRef.current = [];
        setOutput("");

        if (lang === "html" || lang === "css") {
            // inject into iframe directly
            setIframeContent(code);
            setActiveOutput("preview");
        } else if (lang === "javascript") {
            // run JS, capture console.log
            const logs = [];
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;

            console.log = (...args) => logs.push("→ " + args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "));
            console.error = (...args) => logs.push("❌ " + args.join(" "));
            console.warn = (...args) => logs.push("⚠ " + args.join(" "));

            try {
                new Function(code)();
            } catch (e) {
                logs.push("❌ Error: " + e.message);
            }

            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;

            setOutput(logs.join("\n") || "(no output — add console.log to see results)");
            setActiveOutput("console");
        } else {
            // Python, Java, C++ — show code in iframe as readable text with note
            const pseudoHtml = `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0a0a14; color: #a0a0b0; font-family: monospace; padding: 20px; margin: 0; }
  pre { background: #111122; padding: 16px; border-radius: 8px; border: 1px solid rgba(108,62,244,0.3); overflow: auto; color: #10B981; line-height: 1.6; }
  .note { color: #F59E0B; font-size: 12px; margin-bottom: 12px; padding: 8px 12px; background: rgba(245,158,11,0.1); border-radius: 8px; border: 1px solid rgba(245,158,11,0.2); }
  h3 { color: #6C3EF4; margin-bottom: 8px; font-size: 14px; }
</style>
</head>
<body>
  <div class="note">⚠ ${lang.toUpperCase()} cannot run in browser. Copy your code and paste it into an online compiler like replit.com or onecompiler.com</div>
  <h3>Your ${lang.toUpperCase()} Code:</h3>
  <pre>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
</body>
</html>`;
            setIframeContent(pseudoHtml);
            setActiveOutput("preview");
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
    };

    const loadTemplate = (selectedLang) => {
        setLang(selectedLang);
        setCode(TEMPLATES[selectedLang] || "");
        setOutput("");
        setIframeContent("");
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Toolbar */}
            <div className="flex items-center gap-3 flex-wrap">
                <select
                    value={lang}
                    onChange={(e) => loadTemplate(e.target.value)}
                    className="text-sm px-3 py-2 rounded-[8px] dark:bg-white/5 bg-gray-100 dark:text-white text-gray-800 border border-white/10 outline-none cursor-pointer"
                >
                    {LANGUAGES.map(l => (
                        <option key={l.id} value={l.id}>{l.label}</option>
                    ))}
                </select>

                <button
                    onClick={runCode}
                    className="flex items-center gap-2 px-5 py-2 rounded-[8px] text-white text-sm font-semibold hover:opacity-90 transition"
                    style={{ backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)" }}
                >
                    <Play size={16} />
                    Run
                </button>

                <button
                    onClick={copyCode}
                    className="flex items-center gap-2 px-3 py-2 rounded-[8px] text-xs border border-white/10 dark:text-white/50 text-gray-500 hover:dark:text-white transition"
                >
                    <Copy size={14} />
                    Copy
                </button>

                <button
                    onClick={() => loadTemplate(lang)}
                    className="flex items-center gap-2 px-3 py-2 rounded-[8px] text-xs border border-white/10 dark:text-white/50 text-gray-500 hover:dark:text-white transition"
                >
                    <RotateCcw size={14} />
                    Reset
                </button>

                <span className="text-xs dark:text-white/20 text-gray-400 ml-auto">
                    {lang === "javascript" || lang === "html" || lang === "css"
                        ? "✅ Runs in browser"
                        : "📋 Copy & paste to replit.com"}
                </span>
            </div>

            {/* Editor + Output side by side on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Code Editor */}
                <div className="rounded-[12px] overflow-hidden border border-white/10">
                    {/* Editor header */}
                    <div
                        className="flex items-center justify-between px-4 py-2.5 border-b border-white/10"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
                            </div>
                            <span className="text-xs text-white/30 font-mono ml-2">
                                {lang === "javascript" ? "main.js"
                                    : lang === "python" ? "main.py"
                                        : lang === "java" ? "Main.java"
                                            : lang === "cpp" ? "main.cpp"
                                                : lang === "css" ? "style.html"
                                                    : "index.html"}
                            </span>
                        </div>
                        <span className="text-xs text-white/20 font-mono">{code.split("\n").length} lines</span>
                    </div>

                    {/* Textarea */}
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                        className="w-full p-4 font-mono text-sm outline-none resize-none"
                        style={{
                            background: "#0a0a14",
                            color: "#10B981",
                            minHeight: "400px",
                            tabSize: 2,
                            lineHeight: "1.6",
                        }}
                        onKeyDown={(e) => {
                            // Tab key = 2 spaces
                            if (e.key === "Tab") {
                                e.preventDefault();
                                const start = e.target.selectionStart;
                                const end = e.target.selectionEnd;
                                const newCode = code.substring(0, start) + "  " + code.substring(end);
                                setCode(newCode);
                                setTimeout(() => {
                                    e.target.selectionStart = e.target.selectionEnd = start + 2;
                                }, 0);
                            }
                            // Ctrl+Enter = Run
                            if (e.key === "Enter" && e.ctrlKey) {
                                runCode();
                            }
                        }}
                        placeholder="Write your code here... (Ctrl+V to paste, Ctrl+Enter to run)"
                    />
                </div>

                {/* Output Panel */}
                <div className="rounded-[12px] overflow-hidden border border-white/10 flex flex-col">
                    {/* Output header */}
                    <div
                        className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                        <span className="text-xs font-semibold dark:text-white/50 text-gray-500">Output</span>
                        {(lang === "html" || lang === "css") && (
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>
                                Live Preview
                            </span>
                        )}
                        {lang === "javascript" && (
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>
                                Console
                            </span>
                        )}
                    </div>

                    {/* iframe for HTML/CSS preview and language notes */}
                    {(activeOutput === "preview" || (lang !== "javascript" && iframeContent)) ? (
                        <iframe
                            srcDoc={iframeContent || `<html><body style="background:#0a0a14;color:#444;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-size:14px;">Click ▶ Run to see output</body></html>`}
                            className="flex-1 w-full"
                            style={{ minHeight: "400px", border: "none", background: "#fff" }}
                            title="Output Preview"
                            sandbox="allow-scripts"
                        />
                    ) : (
                        /* Console output for JS */
                        <pre
                            className="flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap"
                            style={{
                                background: "#0a0a14",
                                color: output ? "#10B981" : "#444",
                                minHeight: "400px",
                                lineHeight: "1.7",
                            }}
                        >
                            {output || "Click ▶ Run to see output\n\nTip: Use console.log() to print values"}
                        </pre>
                    )}
                </div>
            </div>

            <p className="text-xs dark:text-white/20 text-gray-400 text-center">
                Ctrl+Enter to run · Tab for indent · Ctrl+V to paste · HTML & JS run in browser · Python/Java/C++ → copy & use replit.com
            </p>
        </div>
    );
}
export default CompilerPanel;
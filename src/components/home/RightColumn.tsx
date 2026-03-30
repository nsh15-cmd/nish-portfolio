import React, { useState, useEffect } from "react";
import CodeSnippet from "./CodeSnippet";
import SnakeGame from "./SnakeGame";

export default function RightColumn() {
  // State to track if the game should be visible
  // We default to false, and only set it to true if the screen is large enough
  const [showGame, setShowGame] = useState(false);

  // This hook checks the screen size when the component loads
  useEffect(() => {
    const checkScreenSize = () => {
      // 1024px is standard for large tablets/desktops (Tailwind's 'lg' breakpoint)
      if (window.innerWidth >= 1024) {
        setShowGame(true);
      } else {
        setShowGame(false);
      }
    };

    // Check immediately
    checkScreenSize();

    // Listen for window resizes just in case the user shrinks their browser
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const snippetData = `function initializeModelChunk&lt;T&gt;(chunk: ResolvedModelChunk): T {
  const value: T = parseModel(chunk._response, chunk._value);
  const initializedChunk: InitializedChunk&lt;T&gt; = (chunk: any);
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}`;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative min-h-[400px]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent-green/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Corrected Ternary Operator: Only one ? and one : */}
      {showGame ? (
        <div className="z-10 relative">
          <SnakeGame />
        </div>
      ) : (
        <div className="z-10 flex flex-col gap-6 w-full opacity-90 animate-fade-in">
          {/* We render multiple snippets to create that cascading look */}
          <CodeSnippet code={snippetData} />
          <div className="ml-8 md:ml-12 opacity-70">
            <CodeSnippet code={snippetData} />
          </div>
          <div className="ml-16 md:ml-24 opacity-40">
            <CodeSnippet code={snippetData} />
          </div>
        </div>
      )}
    </div>
  );
}

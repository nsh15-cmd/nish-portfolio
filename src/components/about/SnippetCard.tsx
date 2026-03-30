import React from "react";

// Defining the specific data each card needs to render
interface SnippetCardProps {
  username: string;
  date: string;
  stars: number;
  code: string;
}

export default function SnippetCard({
  username,
  date,
  stars,
  code,
}: SnippetCardProps) {
  return (
    <div className="w-full flex flex-col gap-3 mb-10">
      {/* Header Area (Avatar, Name, Details) */}
      <div className="flex justify-between items-start font-fira">
        {/* Left Side: Avatar & Info */}
        <div className="flex gap-4 items-center">
          {/* Generated Avatar Circle */}
          <div className="w-10 h-10 rounded-full bg-accent-purple/20 border border-accent-purple/50 flex items-center justify-center text-accent-purple font-bold shadow-md">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-accent-purple text-sm font-bold">
              @{username}
            </span>
            <span className="text-text-comment text-xs">Created {date}</span>
          </div>
        </div>

        {/* Right Side: Stats */}
        <div className="flex gap-4 text-text-comment text-xs items-center pt-2">
          <span className="cursor-pointer hover:text-text-main flex items-center gap-2 transition-colors">
            {/* Simple comment bubble SVG */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
            details
          </span>
          <span className="flex items-center gap-1 cursor-default">
            ★ {stars} stars
          </span>
        </div>
      </div>

      {/* Code Block Area */}
      <div className="w-full bg-[#020618] border border-border-line rounded-xl p-6 text-sm font-fira shadow-lg overflow-x-auto custom-scrollbar group hover:border-text-comment/50 transition-colors">
        <pre className="text-text-comment leading-relaxed">
          <code>
            {/* Syntax Highlighting Engine (Regex to colorize keywords) */}
            {code.split("\n").map((line, i) => {
              const highlightedLine = line
                .replace(
                  /export /g,
                  '<span class="text-accent-purple">export </span>',
                )
                .replace(
                  /function /g,
                  '<span class="text-accent-purple">function </span>',
                )
                .replace(
                  /const /g,
                  '<span class="text-accent-purple">const </span>',
                )
                .replace(
                  /return /g,
                  '<span class="text-accent-purple">return </span>',
                )
                .replace(/any/g, '<span class="text-accent-purple">any</span>')
                .replace(/=/g, '<span class="text-text-main">=</span>')
                .replace(
                  /InitializedChunk/g,
                  '<span class="text-[#E99287]">InitializedChunk</span>',
                )
                .replace(
                  /Response/g,
                  '<span class="text-[#E99287]">Response</span>',
                )
                .replace(
                  /JSONValue/g,
                  '<span class="text-[#E99287]">JSONValue</span>',
                )
                .replace(
                  /ReadOnlyArray/g,
                  '<span class="text-accent-green">ReadOnlyArray</span>',
                );

              return (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: highlightedLine || " " }}
                />
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}

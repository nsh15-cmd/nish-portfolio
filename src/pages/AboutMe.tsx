import React, { useState } from "react";
import SnippetCard from "../components/about/SnippetCard";

// NEW: A dictionary holding the text content for each of your files!
const fileContents: Record<string, string[]> = {
  "about-me.txt": [
    "/**",
    " * About me",
    " * I am an IT student at STI College Caloocan,",
    " * based in Malabon. I specialize in web",
    " * designing and front-end development.",
    " * I also have basic skills in C# and MAUI.",
    " * React is my go-to framework for building interactive UIs.",
    " *",
    " * _______________________",
    " * |  ___________________  |",
    " * | |                   | |",
    " * | |  > _hello world   | |",
    " * | |  > crafting UI    | |",
    " * | |  > front-end dev  | |",
    " * | |___________________| |",
    " * |_______________________|",
    " * \\___________/",
    " * ______|_______|______",
    " * /_____________________\\",
    " *     [=============]     ☕",
    " *",
    " */",
  ],
  "hobbies.txt": [
    "/**",
    " * My Interests",
    " * When I'm not coding or designing UI,",
    " * I enjoy exploring new web design trends,",
    " * playing video games, and I really love cooking.",
    " *",
    " * ( )  ( )  )",
    " * ) (  ) (",
    " * _______________",
    " * /               \\",
    " * /   ◯       ◯     \\",
    " * |         __        |======[]",
    " * \\   🐣        🥓  /",
    " * \\_______________/",
    " *",
    " * ~ sizzling ~",
    " */",
  ],
  "high-school.txt": [
    "/**",
    " * Education: High School",
    " * Graduated from Longos National High School in 2020,",
    " *",
    " *          🔥🔥🔥🔥🔥",
    " *        🔥        🔥",
    " *       🔥  ______  🔥",
    " *      🔥  |  __  | 🔥",
    " *         | |  | | |",
    " *        /  ____   \\ \\",
    " *       /__/____\\___\\ \\",
    " *         | | || || |",
    " *         | | || || |",
    " *",
    " *      school days were 🔥",
    " */",
  ],
  "university.txt": [
    "/**",
    " * Education: University",
    " * Currently pursuing a BS in Information Technology",
    " * at STI College Caloocan.",
    " * Focused on frontend architecture.",
    " */",
  ],
};

export default function AboutMe() {
  const [openFolders, setOpenFolders] = useState({
    personalInfo: true,
    contacts: false,
    bio: true,
    interests: true,
    education: true,
  });

  // NEW TAB STATE LOGIC
  // 1. Tracks all files currently open in the tab bar
  const [openTabs, setOpenTabs] = useState<string[]>(["about-me.txt"]);
  // 2. Tracks which tab is currently visible
  const [activeTab, setActiveTab] = useState<string | null>("about-me.txt");

  const toggleFolder = (folder: keyof typeof openFolders) => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  // Helper to open a file into a new tab
  const openFile = (fileName: string) => {
    if (!openTabs.includes(fileName)) {
      setOpenTabs((prev) => [...prev, fileName]);
    }
    setActiveTab(fileName);
  };

  // Helper to close a tab
  const closeTab = (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation(); // Prevents the tab from clicking "active" when you hit the X
    const newTabs = openTabs.filter((tab) => tab !== fileName);
    setOpenTabs(newTabs);

    // If we closed the active tab, fall back to the last open tab
    if (activeTab === fileName) {
      setActiveTab(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  };

  const snippet1 = `function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {
  const value: T = parseModel(chunk._response, chunk._value);
  const initializedChunk: InitializedChunk<T> = (chunk: any);
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}`;

  const snippet2 = `export function parseModelTuple(
  response: Response,
  value: {+[key: string]: JSONValue} | $ReadOnlyArray<JSONValue>,
): any {
  const tuple: [mixed, mixed, mixed, mixed] = (value: any);
}`;

  return (
    <main className="flex flex-1 w-full h-full overflow-hidden text-text-comment font-fira bg-[#0F172B]">
      {/* COLUMN 1: Activity Bar */}
      <div className="w-14 flex-shrink-0 border-r border-border-line flex flex-col items-center py-6 gap-8">
        <svg
          className="w-6 h-6 text-text-comment cursor-pointer hover:text-text-main transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        <svg
          className="w-6 h-6 text-text-comment opacity-40 cursor-pointer hover:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <svg
          className="w-6 h-6 text-text-comment opacity-40 cursor-pointer hover:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
          />
        </svg>
      </div>
      {/* COLUMN 2: File Explorer Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-border-line flex flex-col hidden md:flex">
        <div className="border-b border-border-line">
          <button
            onClick={() => toggleFolder("personalInfo")}
            className="w-full flex items-center gap-2 px-4 py-2 text-text-main hover:bg-[#011221] transition-colors"
          >
            <span
              className={`transform transition-transform ${openFolders.personalInfo ? "rotate-90" : ""}`}
            >
              ▸
            </span>
            personal-info
          </button>

          {openFolders.personalInfo && (
            <div className="flex flex-col py-2">
              {/* Bio */}
              <div
                onClick={() => toggleFolder("bio")}
                className="flex items-center gap-2 px-8 py-1 hover:text-text-main cursor-pointer transition-colors"
              >
                <span
                  className={`text-[#E99287] transform transition-transform ${openFolders.bio ? "rotate-90" : ""}`}
                >
                  ▶
                </span>{" "}
                bio
              </div>
              {openFolders.bio && (
                <div
                  onClick={() => openFile("about-me.txt")}
                  className={`flex items-center gap-2 px-12 py-1 cursor-pointer transition-colors ${activeTab === "about-me.txt" ? "text-text-main" : "hover:text-text-main"}`}
                >
                  <span className="text-text-comment text-xs">📄</span>{" "}
                  about-me.txt
                </div>
              )}

              {/* Interests */}
              <div
                onClick={() => toggleFolder("interests")}
                className="flex items-center gap-2 px-8 py-1 hover:text-text-main cursor-pointer transition-colors"
              >
                <span
                  className={`text-accent-green transform transition-transform ${openFolders.interests ? "rotate-90" : ""}`}
                >
                  ▶
                </span>{" "}
                interests
              </div>
              {openFolders.interests && (
                <div
                  onClick={() => openFile("hobbies.txt")}
                  className={`flex items-center gap-2 px-12 py-1 cursor-pointer transition-colors ${activeTab === "hobbies.txt" ? "text-text-main" : "hover:text-text-main"}`}
                >
                  <span className="text-text-comment text-xs">📄</span>{" "}
                  hobbies.txt
                </div>
              )}

              {/* Education */}
              <div
                onClick={() => toggleFolder("education")}
                className={`flex items-center gap-2 px-8 py-1 cursor-pointer transition-colors ${openFolders.education ? "text-text-main" : "hover:text-text-main"}`}
              >
                <span
                  className={`text-accent-purple transform transition-transform ${openFolders.education ? "rotate-90" : ""}`}
                >
                  ▶
                </span>{" "}
                education
              </div>
              {openFolders.education && (
                <div className="flex flex-col">
                  <div
                    onClick={() => openFile("high-school.txt")}
                    className={`flex items-center gap-2 px-12 py-1 cursor-pointer transition-colors ${activeTab === "high-school.txt" ? "text-text-main" : "hover:text-text-main"}`}
                  >
                    <span className="text-text-comment text-xs">📄</span>{" "}
                    high-school.txt
                  </div>
                  <div
                    onClick={() => openFile("university.txt")}
                    className={`flex items-center gap-2 px-12 py-1 cursor-pointer transition-colors ${activeTab === "university.txt" ? "text-text-main" : "hover:text-text-main"}`}
                  >
                    <span className="text-text-comment text-xs">📄</span>{" "}
                    university.txt
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Contacts Folder */}
        <div className="border-b border-border-line">
          <button
            onClick={() => toggleFolder("contacts")}
            className="w-full flex items-center gap-2 px-4 py-2 hover:text-text-main hover:bg-[#020618] transition-colors"
          >
            <span
              className={`transform transition-transform ${openFolders.contacts ? "rotate-90" : ""}`}
            >
              ▸
            </span>
            contacts
          </button>
          {openFolders.contacts && (
            <div className="flex flex-col py-2 px-8 gap-2">
              <div className="flex items-center gap-2 hover:text-text-main cursor-pointer transition-colors">
                ✉️ <span className="truncate">pinlacnishia@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 hover:text-text-main cursor-pointer transition-colors">
                📞 +63 912 345 6789
              </div>
            </div>
          )}
        </div>
      </div>
      {/* COLUMN 3: Main Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-[#0F172B]">
        {/* Dynamic Editor Tabs Bar */}
        <div className="flex border-b border-border-line h-10 w-full overflow-x-auto custom-scrollbar flex-shrink-0">
          {openTabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border-r border-border-line flex items-center gap-6 cursor-pointer transition-colors ${activeTab === tab ? "text-text-main bg-[#020618]" : "text-text-comment hover:text-text-main"}`}
            >
              {tab}
              <span
                onClick={(e) => closeTab(e, tab)}
                className="hover:text-accent-orange text-lg leading-none"
              >
                ×
              </span>
            </div>
          ))}
        </div>
        {/* Conditional Editor State */}
        {activeTab && fileContents[activeTab] ? (
          <div className="flex-1 flex overflow-hidden animate-fade-in">
            {/* Left Text Pane (Dynamic Content!) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex gap-8 border-r border-border-line">
              <div className="flex flex-col text-right opacity-50 select-none">
                {fileContents[activeTab].map((_, idx) => (
                  <span key={idx}>{idx + 1}</span>
                ))}
              </div>
              <div className="flex flex-col text-text-comment">
                {fileContents[activeTab].map((line, idx) => (
                  <p key={idx} className="whitespace-pre-wrap">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Snippets Pane */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 hidden lg:flex flex-col">
              <h3 className="text-text-main mb-6">// Code snippet showcase:</h3>
              <SnippetCard
                username="username"
                date="5 months ago"
                stars={3}
                code={snippet1}
              />
              <SnippetCard
                username="username"
                date="9 months ago"
                stars={0}
                code={snippet2}
              />
            </div>
          </div>
        ) : (
          /* Empty Workspace State */
          <div className="flex-1 flex items-center justify-center opacity-20 select-none animate-fade-in">
            <svg
              className="w-48 h-48"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
        )}
      </div>
    </main>
  );
}

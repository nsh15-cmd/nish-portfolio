import React, { useState } from "react";

// 1. Defining the shape of our project data
interface Project {
  id: number;
  name: string;
  tech: string;
  description: string;
  longDescription: string;
  image: string;
  iconColor: string;
  github: string;
  demo: string;
}

const TECH_LIST = ["React", "C#", "Maui", "HTML", "CSS", "PHP", "Flutter"];

// 2. Expanded Project Data (Added long descriptions and links for the modal!)
const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    name: "_iain-capstone",
    tech: "React",
    description:
      "A comprehensive frontend interface built with React, focusing on interactive UI components.",
    longDescription:
      "This capstone project showcases a complex, state-driven React frontend. It features dynamic routing, custom hooks for state management, and a highly responsive CSS Grid layout designed from scratch. It was built to solve real-world data visualization problems.",
    image: "bg-gradient-to-br from-[#175553] to-[#43D9AD]",
    iconColor: "text-[#86E1F9]",
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    name: "_library-system",
    tech: "PHP",
    description:
      "A library management system interface developed for the Commission on Appointments.",
    longDescription:
      "Developed during my OJT for the Commission on Appointments. This system manages thousands of book records, featuring a custom search algorithm, user authentication, and an administrative dashboard for librarians to track borrows and returns.",
    image: "bg-gradient-to-br from-[#4D5BCE] to-[#011221]",
    iconColor: "text-[#4D5BCE]",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    name: "_website-redesign",
    tech: "CSS",
    description:
      "A complete modern UI redesign focusing on pure CSS styling, layouts, and animations.",
    longDescription:
      "A passion project where I took an outdated website and completely modernized it without relying on heavy JavaScript frameworks. Heavily utilizes CSS variables, Flexbox, CSS Grid, and keyframe animations for a buttery-smooth user experience.",
    image: "bg-gradient-to-br from-[#E99287] to-[#011627]",
    iconColor: "text-[#E99287]",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    name: "_mobile-layout",
    tech: "Maui",
    description:
      "A cross-platform mobile application interface utilizing basic C# and MAUI capabilities.",
    longDescription:
      "Exploring the mobile ecosystem! This project uses .NET MAUI and C# to build a single codebase that deploys a beautiful, native-feeling application to both Android and Windows environments. Focuses on mobile-first touch targets and navigation paradigms.",
    image: "bg-gradient-to-br from-[#C98BDF] to-[#011221]",
    iconColor: "text-[#C98BDF]",
    github: "#",
    demo: "#",
  },
];

export default function Projects() {
  const [isFolderOpen, setIsFolderOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["React"]);

  // NEW STATE: Tracks which project is currently open in the Modal. Null means closed.
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Toggle filter logic
  const handleFilterClick = (tech: string) => {
    setSelectedFilters((prev) => {
      if (prev.includes(tech)) {
        return prev.filter((t) => t !== tech);
      } else {
        return [...prev, tech];
      }
    });
  };

  // Filter projects based on checkboxes
  const filteredProjects =
    selectedFilters.length > 0
      ? PROJECTS_DATA.filter((project) =>
          selectedFilters.includes(project.tech),
        )
      : PROJECTS_DATA;

  const tabText =
    selectedFilters.length > 0 ? selectedFilters.join("; ") : "all-projects";

  return (
    <main className="flex flex-1 w-full h-full overflow-hidden text-text-comment font-fira bg-[#0F172B] relative">
      {/* COLUMN 1: Sidebar Filters */}
      <div className="w-64 flex-shrink-0 border-r border-border-line flex flex-col hidden md:flex z-10">
        <div className="border-b border-border-line">
          <button
            onClick={() => setIsFolderOpen(!isFolderOpen)}
            className="w-full flex items-center gap-2 px-4 py-2 text-text-main hover:bg-[#020618] transition-colors"
          >
            <span
              className={`transform transition-transform ${isFolderOpen ? "rotate-90" : ""}`}
            >
              ▸
            </span>
            projects
          </button>

          {isFolderOpen && (
            <div className="flex flex-col py-4 gap-3">
              {TECH_LIST.map((tech) => {
                const isSelected = selectedFilters.includes(tech);
                return (
                  // The <label> wraps both the box and text, making the whole row clickable!
                  <label
                    key={tech}
                    className="flex items-center gap-4 px-6 cursor-pointer group hover:text-text-main transition-colors select-none"
                  >
                    {/* Hidden actual checkbox to keep it accessible */}
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => handleFilterClick(tech)}
                    />
                    {/* Custom UI Checkbox */}
                    <div
                      className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? "bg-text-comment border-text-comment" : "border-text-comment group-hover:border-text-main"}`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-[#0F172B]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`flex items-center gap-2 ${isSelected ? "text-text-main" : ""}`}
                    >
                      {tech}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* COLUMN 2: Main Grid Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Dynamic Tab Bar */}
        <div className="flex border-b border-border-line h-10 w-full overflow-x-auto custom-scrollbar flex-shrink-0">
          <div className="px-4 py-2 border-r border-border-line text-text-main flex items-center gap-8 bg-[#020618]">
            {tabText}
            {selectedFilters.length > 0 && (
              <span
                onClick={() => setSelectedFilters([])}
                className="cursor-pointer hover:text-accent-orange text-lg leading-none"
              >
                ×
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Project Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
          {filteredProjects.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center opacity-50">
              <span className="text-4xl mb-4">📭</span>
              <p>No projects found for selected filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="flex flex-col animate-fade-in">
                  <h3 className="text-text-main mb-4 flex gap-2 text-sm font-bold">
                    <span className="text-accent-purple">
                      Project {index + 1}
                    </span>
                    <span className="text-text-comment font-normal">
                      // {project.name}
                    </span>
                  </h3>

                  <div className="border border-border-line rounded-xl overflow-hidden bg-[#020618] hover:border-text-comment transition-colors group flex flex-col h-full shadow-lg">
                    <div
                      className={`h-36 w-full ${project.image} relative overflow-hidden flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}
                    >
                      <div className="absolute top-3 right-3 bg-[#020618] p-1.5 rounded flex items-center justify-center shadow-md">
                        <span
                          className={`text-lg leading-none font-bold ${project.iconColor}`}
                        >
                          {project.tech.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1 justify-between gap-6 border-t border-border-line">
                      <p className="text-text-comment text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* NEW: Clicking this sets the activeProject state, opening the modal! */}
                      <button
                        onClick={() => setActiveProject(project)}
                        className="bg-[#1C2B3A] text-text-main py-2 px-4 rounded-lg w-fit text-xs hover:bg-[#263B50] transition-colors border border-transparent hover:border-text-comment"
                      >
                        view-project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- NEW: PROJECT MODAL OVERLAY --- */}
      {/* This only renders if activeProject is NOT null */}
      {activeProject && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          {/* Dark blurred background backdrop. Clicking it closes the modal! */}
          <div
            className="absolute inset-0 bg-[#010C15]/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setActiveProject(null)}
          ></div>

          {/* Modal Content Box */}
          <div className="w-full max-w-2xl bg-[#020618] border border-border-line rounded-xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden transform transition-all">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-border-line bg-primary-bg">
              <h2 className="text-text-main font-bold text-lg">
                {activeProject.name}
              </h2>
              <button
                onClick={() => setActiveProject(null)}
                className="text-text-comment hover:text-accent-orange text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto custom-scrollbar">
              {/* Big Header Image */}
              <div
                className={`w-full h-48 sm:h-64 ${activeProject.image} flex items-center justify-center`}
              >
                <span
                  className={`text-6xl font-bold opacity-50 ${activeProject.iconColor}`}
                >
                  {activeProject.tech}
                </span>
              </div>

              {/* Text Content */}
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                {/* Tech Tags */}
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary-bg border border-border-line rounded-full text-xs text-text-main">
                    {activeProject.tech}
                  </span>
                  <span className="px-3 py-1 bg-primary-bg border border-border-line rounded-full text-xs text-text-main">
                    UI/UX Design
                  </span>
                </div>

                {/* Long Description */}
                <div>
                  <h3 className="text-text-main mb-2">// project-overview</h3>
                  <p className="text-text-comment leading-relaxed text-sm">
                    {activeProject.longDescription}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-border-line mt-2">
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-[#1C2B3A] text-text-main py-3 rounded-lg text-sm text-center hover:bg-[#263B50] transition-colors"
                  >
                    view-code
                  </a>
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-accent-orange text-primary-bg py-3 rounded-lg text-sm text-center font-bold hover:bg-opacity-90 transition-colors"
                  >
                    live-demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

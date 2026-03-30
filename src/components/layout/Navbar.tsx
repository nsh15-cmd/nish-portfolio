import React from "react";

// Define the interface for our new props
interface NavbarProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  // Reusable tab structure data to make the HTML cleaner
  const tabs = ["_hello", "_about-me", "_projects"];

  return (
    <nav className="w-full flex justify-between border-b border-border-line text-text-comment text-sm font-fira z-20 bg-[#0F172B]">
      {/* Left Side: Name and Main Tabs */}
      <div className="flex overflow-x-auto custom-scrollbar">
        {/* Logo / Name */}
        <div className="w-64 py-4 px-6 border-r border-border-line flex items-center flex-shrink-0">
          nishia-pinlac
        </div>

        {/* DYNAMIC TABS: Map through our tab data to generate the HTML */}
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)} // <-- Click calls the state setter in App.tsx!
            className={`py-4 px-6 border-r border-border-line flex items-center flex-shrink-0 transition-colors border-b-2 
              ${
                activeTab === tab
                  ? "text-text-main border-accent-orange bg-[#020618]" // Active style
                  : "border-transparent hover:text-text-main hover:bg-[#020618]" // Inactive style
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right Side: Contact Tab - Also made clickable! */}
      <button
        onClick={() => setActiveTab("_contact-me")}
        className={`py-4 px-6 border-l border-border-line flex items-center transition-colors hidden md:flex border-b-2 
          ${
            activeTab === "_contact-me"
              ? "text-text-main border-accent-orange bg-[#020618]"
              : "border-transparent hover:text-text-main hover:bg-[#020618]"
          }`}
      >
        _contact-me
      </button>
    </nav>
  );
}

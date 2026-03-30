import React from "react";
import HeroText from "../components/home/HeroText";
import RightColumn from "../components/home/RightColumn";

export default function Home() {
  return (
    <main className="flex-1 w-full flex items-center justify-center p-6 md:p-12 lg:px-32 lg:py-0 overflow-y-auto lg:overflow-hidden relative custom-scrollbar">
      {/* Changed max-w-7xl to max-w-[1536px] to utilize the new wide window */}
      <div className="w-full max-w-[1536px] h-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mt-12 lg:mt-0">
        {/* Left Column: Typography */}
        <HeroText />

        {/* Right Column: Game OR Snippets */}
        <RightColumn />
      </div>
    </main>
  );
}

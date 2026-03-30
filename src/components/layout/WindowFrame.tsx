import { type ReactNode } from "react";
interface WindowFrameProps {
  children: ReactNode;
}

export default function WindowFrame({ children }: WindowFrameProps) {
  return (
    <div className="min-h-screen bg-[#020618] p-2 md:p-6 lg:p-8 font-fira flex items-center justify-center">
      {/* ADDED text-[14px] or text-[13px] right here to shrink everything! */}
      <div className="w-full max-w-[1800px] h-[93vh] bg-[#0F172B] rounded-xl border border-border-line flex flex-col overflow-hidden shadow-2xl relative text-[14px]">
        {children}
      </div>
    </div>
  );
}

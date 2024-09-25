// import React from "react";
import { FlipWords } from "../Components/ui/AutoLayoutWord";
// import { clients, products } from "@/lib/constants";


export function FlipWordsDemo() {
  const words = ["efficient", "powerful", "intuitive", "reliable"]


  return (
    <div className="">
<button className="bg-slate-800 mb-8 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </span>
  <div className="relative flex space-x-2 tracking-wide items-center z-10 rounded-full bg-white dark:text-white text-black dark:bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
    <span>
    Let&#39;s automate your social platforms
    </span>
    <svg
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 8.75L14.25 12L10.75 15.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
</button>
      <div className="text-4xl  md:text-7xl text-left font-black md:font-extrabold mb-6 relative  dark:text-white text-black max-w-4xl">
        Automate your <br />
        workflow with <br />
        <FlipWords words={words} />software
      </div>
  
    </div>
  );
}

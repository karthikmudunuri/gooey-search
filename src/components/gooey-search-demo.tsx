"use client";

import GooeySearch from "./ui/gooey-search";

const demoData = [
  "React",
  "Vue.js", 
  "Svelte",
  "Next.js",
  "Nuxt.js",
  "Gatsby",
  "Angular",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Framer Motion",
  "Eldora UI",
  "Vite",
  "Webpack",
  "Rollup",
  "ESBuild",
  "Turbo",
  "Remix",
  "Astro",
  "SvelteKit"
];

export default function GooeySearchDemo() {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleSelect = (item: string) => {
    console.log("Selected:", item);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Gooey Search
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            A fluid search component with smooth gooey animations and interactive results
          </p>
        </div>
        
        <div className="flex justify-center">
          <GooeySearch
            data={demoData}
            placeholder="Search frameworks..."
            onSearch={handleSearch}
            onSelect={handleSelect}
            className="mx-auto"
          />
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              Click the search button to start typing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
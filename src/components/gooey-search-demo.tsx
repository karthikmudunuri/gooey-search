"use client";

import GooeySearch from "./gooey-search";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Gooey Search
          </h1>
          <p className="text-gray-600">
            A fluid search component with smooth gooey animations
          </p>
        </div>
        
        <GooeySearch
          data={demoData}
          placeholder="Search frameworks..."
          onSearch={handleSearch}
          onSelect={handleSelect}
          className="mx-auto"
        />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          Click the search button to start typing
        </div>
      </div>
    </div>
  );
}
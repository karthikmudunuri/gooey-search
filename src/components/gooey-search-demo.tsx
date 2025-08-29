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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200/50 mb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Eldora UI Component</span>
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Gooey Search
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
            A fluid search component with smooth gooey animations, real-time filtering, and beautiful micro-interactions
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <GooeySearch
            data={demoData}
            placeholder="Search frameworks..."
            onSearch={handleSearch}
            onSelect={handleSelect}
            className="mx-auto"
          />
        </div>
        
        <div className="mt-12 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Click the search button to start typing
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {["React", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200/50"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Try searching for any of the frameworks above to see the gooey animation in action
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
# Gooey Search Component for Eldora UI

A beautifully designed gooey search component built with React, TypeScript, Framer Motion, and Tailwind CSS. Features smooth animations and a fluid gooey effect for an exceptional user experience.

## Features

- 🎨 Smooth gooey animations using SVG filters
- 🔍 Real-time search with debouncing
- 📱 Responsive design with mobile optimizations
- ♿ Accessible with proper ARIA labels
- 🎯 TypeScript support with full type safety
- 🎭 Framer Motion animations
- 🎨 Tailwind CSS styling
- 🌐 Browser compatibility detection

## Usage

```tsx
import GooeySearch from "./components/gooey-search";

const searchData = ["React", "Vue", "Angular", "Svelte"];

export default function MyComponent() {
  const handleSearch = (query: string) => {
    console.log("Searching:", query);
  };

  const handleSelect = (item: string) => {
    console.log("Selected:", item);
  };

  return (
    <GooeySearch
      data={searchData}
      placeholder="Search frameworks..."
      onSearch={handleSearch}
      onSelect={handleSelect}
    />
  );
}
```

## Props

- `data`: Array of strings to search through
- `placeholder`: Input placeholder text
- `onSearch`: Callback fired when search query changes
- `onSelect`: Callback fired when a result is selected
- `className`: Additional CSS classes
- `disabled`: Disable the search functionality
- `searchDelay`: Debounce delay in milliseconds (default: 500)

## Credits

- Original concept by [Oguzhan Tufenk](https://github.com/oguzhantufenk)
- Gooey effect by [Lucas Bebber](https://css-tricks.com/gooey-effect/)
- Adapted for Eldora UI component library


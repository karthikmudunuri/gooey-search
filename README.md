# Gooey Search Component for Eldora UI

> A beautifully designed gooey search component built with React, TypeScript, Framer Motion, and Tailwind CSS.

A fluid search component with smooth gooey animations that provides an exceptional user experience. Perfect for modern web applications that need an interactive and visually appealing search interface.

## Features

- 🎨 **Smooth Gooey Animations**: SVG filter-based gooey effect for fluid transitions
- 🔍 **Real-time Search**: Debounced search with customizable delay
- 📱 **Responsive Design**: Mobile-optimized with touch-friendly interactions  
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🎯 **TypeScript**: Complete type safety with proper interfaces
- 🎭 **Framer Motion**: Smooth animations and micro-interactions
- 🎨 **Tailwind CSS**: Modern utility-first styling
- 🌐 **Browser Compatible**: Automatic fallbacks for unsupported browsers
- ⚡ **Performance**: Optimized with debouncing and efficient re-renders

## Installation

```bash
npm install framer-motion clsx tailwind-merge
```

## Usage

```tsx
import GooeySearch from "@/components/ui/gooey-search";

const searchData = [
  "React",
  "Next.js", 
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion"
];

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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `string[]` | Default tech stack | Array of searchable items |
| `placeholder` | `string` | `"Type to search..."` | Input placeholder text |
| `onSearch` | `(query: string) => void` | `undefined` | Callback when search query changes |
| `onSelect` | `(item: string) => void` | `undefined` | Callback when result is selected |
| `className` | `string` | `undefined` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable search functionality |
| `searchDelay` | `number` | `500` | Debounce delay in milliseconds |

## Styling

The component uses Tailwind CSS classes and can be customized by:

1. **Custom Classes**: Pass additional classes via the `className` prop
2. **Theme Integration**: Modify colors in your Tailwind config
3. **CSS Variables**: Override component-specific styles

## Browser Support

- ✅ Chrome/Chromium (full gooey effect)
- ✅ Firefox (full gooey effect)  
- ✅ Safari (fallback without gooey effect)
- ✅ Mobile browsers (optimized experience)

## Technical Details

- **Gooey Effect**: Uses SVG `feGaussianBlur` and `feColorMatrix` filters
- **Animations**: Powered by Framer Motion with spring physics
- **Performance**: Debounced search prevents excessive API calls
- **Accessibility**: Full ARIA support with proper roles and labels

## Credits

- Component design inspired by modern search interfaces
- Gooey effect technique by Lucas Bebber
- Built for the Eldora UI component library
- Optimized for Next.js and React applications

---

*Part of [Eldora UI](https://eldoraui.site) - Beautiful components for modern web applications*
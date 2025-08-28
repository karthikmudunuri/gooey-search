"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Types
interface GooeySearchProps {
  data?: string[];
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSelect?: (item: string) => void;
  className?: string;
  disabled?: boolean;
  searchDelay?: number;
}

interface SearchState {
  step: 1 | 2;
  searchData: string[];
  searchText: string;
  isLoading: boolean;
}

// Utils
const isUnsupportedBrowser = (): boolean => {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent.toLowerCase();
  const isSafari =
    ua.includes("safari") &&
    !ua.includes("chrome") &&
    !ua.includes("chromium") &&
    !ua.includes("android") &&
    !ua.includes("firefox");
  const isChromeOniOS = ua.includes("crios");

  return isSafari || isChromeOniOS;
};

// Custom hook for debouncing
const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Animation variants
const buttonVariants = {
  initial: { x: 0, width: 100 },
  step1: { x: 0, width: 100 },
  step2: { x: -30, width: 180 },
};

const iconVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 16, opacity: 1 },
};

const getResultItemVariants = (index: number, isUnsupported: boolean) => ({
  initial: {
    y: 0,
    scale: 0.3,
    filter: isUnsupported ? "none" : "blur(10px)",
  },
  animate: {
    y: (index + 1) * 50,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: isUnsupported ? 0 : -4,
    scale: 0.8,
    color: "#000000",
  },
});

const getResultItemTransition = (index: number) => ({
  duration: 0.75,
  delay: index * 0.12,
  type: "spring" as const,
  bounce: 0.35,
  exit: { duration: index * 0.1 },
  filter: { ease: "easeInOut" as const },
});

// Sub-components
const GooeyFilter = () => (
  <svg aria-hidden="true" className="absolute">
    <defs>
      <filter id="goo-effect">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
);

const SearchIcon = ({ isUnsupported }: { isUnsupported: boolean }) => (
  <motion.svg
    initial={{
      opacity: 0,
      scale: 0.8,
      x: -4,
      filter: isUnsupported ? "none" : "blur(5px)",
    }}
    animate={{
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "blur(0px)",
    }}
    exit={{
      opacity: 0,
      scale: 0.8,
      x: -4,
      filter: isUnsupported ? "none" : "blur(5px)",
    }}
    transition={{
      delay: 0.1,
      duration: 1,
      type: "spring",
      bounce: 0.15,
    }}
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-300"
  >
    <path
      d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
    />
  </motion.svg>
);

const LoadingIcon = () => (
  <svg
    className="w-5 h-5 animate-spin text-gray-300"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    aria-label="Loading"
    role="status"
  >
    <rect width="256" height="256" fill="none" />
    <line
      x1="128"
      y1="32"
      x2="128"
      y2="64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <line
      x1="195.88"
      y1="60.12"
      x2="173.25"
      y2="82.75"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
      opacity="0.75"
    />
    <line
      x1="224"
      y1="128"
      x2="192"
      y2="128"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
      opacity="0.5"
    />
    <line
      x1="195.88"
      y1="195.88"
      x2="173.25"
      y2="173.25"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
      opacity="0.25"
    />
  </svg>
);

const InfoIcon = ({ index }: { index: number }) => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay: index * 0.12 + 0.3 }}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20.2832 19.9316"
    className="w-[18px] h-[18px] relative top-0.5 text-gray-400"
    aria-hidden="true"
    fill="none"
  >
    <path
      d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </motion.svg>
);

// Default data
const defaultData = [
  "React",
  "Vue",
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
];

export default function GooeySearch({
  data = defaultData,
  placeholder = "Type to search...",
  onSearch,
  onSelect,
  className,
  disabled = false,
  searchDelay = 500,
}: GooeySearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<SearchState>({
    step: 1,
    searchData: [],
    searchText: "",
    isLoading: false,
  });

  const debouncedSearchText = useDebounce(state.searchText, searchDelay);
  const isUnsupported = useMemo(() => isUnsupportedBrowser(), []);

  const handleButtonClick = () => {
    if (disabled) return;
    setState((prevState) => ({ ...prevState, step: 2 }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, searchText: value }));
    onSearch?.(value);
  };

  const handleItemSelect = (item: string) => {
    onSelect?.(item);
    setState((prevState) => ({
      ...prevState,
      step: 1,
      searchText: "",
      searchData: [],
      isLoading: false,
    }));
  };

  useEffect(() => {
    if (state.step === 2) {
      inputRef.current?.focus();
    } else {
      setState((prevState) => ({
        ...prevState,
        searchText: "",
        searchData: [],
        isLoading: false,
      }));
    }
  }, [state.step]);

  useEffect(() => {
    let isCancelled = false;

    if (debouncedSearchText) {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      const fetchData = async () => {
        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 300));

          const filteredData = data.filter((item) =>
            item.toLowerCase().includes(debouncedSearchText.trim().toLowerCase())
          );

          if (!isCancelled) {
            setState((prevState) => ({
              ...prevState,
              searchData: filteredData,
              isLoading: false,
            }));
          }
        } catch {
          if (!isCancelled) {
            setState((prevState) => ({ ...prevState, isLoading: false }));
          }
        }
      };

      fetchData();
    } else {
      setState((prevState) => ({
        ...prevState,
        searchData: [],
        isLoading: false,
      }));
    }

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearchText, data]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        isUnsupported && "no-goo",
        className
      )}
    >
      <GooeyFilter />

      <div className="relative">
        <motion.div
          className={cn(
            "relative max-w-max cursor-pointer",
            !isUnsupported && "[filter:url(#goo-effect)]"
          )}
          initial="initial"
          animate={state.step === 1 ? "step1" : "step2"}
          transition={{ duration: 0.75, type: "spring", bounce: 0.15 }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key="search-results"
              className="relative -z-10"
              role="listbox"
              aria-label="Search results"
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                delay: isUnsupported ? 0.5 : 1.25,
                duration: 0.5,
              }}
            >
              <AnimatePresence mode="popLayout">
                {state.searchData.map((item, index) => (
                  <motion.div
                    key={item}
                    whileHover={{ 
                      scale: 1.02, 
                      transition: { duration: 0.2 } 
                    }}
                    variants={getResultItemVariants(index, isUnsupported)}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={getResultItemTransition(index)}
                    className={cn(
                      "absolute left-[-30px] w-full cursor-pointer rounded-full bg-black px-5 py-3 text-sm text-gray-300",
                      isUnsupported && "px-2.5 py-[7.5px]"
                    )}
                    role="option"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div className="flex items-center gap-0.5">
                      <InfoIcon index={index} />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.12 + 0.3 }}
                        className="relative -top-[0.35px]"
                      >
                        {item}
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          <motion.div
            variants={buttonVariants}
            onClick={handleButtonClick}
            whileHover={{ 
              scale: state.step === 2 ? 1 : 1.05 
            }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "rounded-full bg-black px-5 py-2.5 text-gray-300/70 transition-colors",
              disabled && "cursor-not-allowed opacity-50",
              !disabled && "cursor-pointer hover:text-gray-200"
            )}
            role="button"
            aria-disabled={disabled}
          >
            {state.step === 1 ? (
              <span className="pointer-events-none relative left-1 text-center tracking-tight">
                Search
              </span>
            ) : (
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent text-gray-200 placeholder-gray-400 outline-none"
                placeholder={placeholder}
                aria-label="Search input"
                onChange={handleSearch}
                disabled={disabled}
              />
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {state.step === 2 && (
              <motion.div
                key="icon"
                className={cn(
                  "absolute -right-[5px] -top-[1px] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-black",
                  "md:scale-110 md:top-[2px]"
                )}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={iconVariants}
                transition={{
                  delay: 0.1,
                  duration: 0.85,
                  type: "spring",
                  bounce: 0.15,
                }}
              >
                {!state.isLoading ? (
                  <SearchIcon isUnsupported={isUnsupported} />
                ) : (
                  <LoadingIcon />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
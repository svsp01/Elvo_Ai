"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  href: string;
}

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const searchData: SearchResult[] = [
    { id: "1", title: "Home", category: "Navigation", href: "/" },
    { id: "2", title: "Chat", category: "Navigation", href: "/chat" },
    { id: "3", title: "Documents", category: "Navigation", href: "/documents" },
    { id: "4", title: "Settings", category: "Navigation", href: "/settings" },
    { id: "5", title: "User Profile", category: "Settings", href: "/profile" },
  ];

  const toggleSearch = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleSearch();
      }
    },
    [toggleSearch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="ml-2 hidden rounded bg-muted px-2 py-0.5 text-xs sm:inline">
          {navigator.platform.toUpperCase().includes("MAC") ? "⌘" : "Ctrl"}+K
        </kbd>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <Command className="w-full max-w-2xl rounded-lg border bg-white shadow-xl">
                <div className="flex items-center justify-end ">
                    <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="m-2"
                >
                  <X className="h-5 w-5 mx-auto" />
                </Button>
                </div>
              <div className="flex m-2 justify-between items-center  px-4 py-2 gap-2">
                <CommandInput
                  ref={inputRef}
                  placeholder="Search anything..."
                  className="w-full border-none focus:ring-0 text-sm"
                />
                
              </div>

              <CommandList className="max-h-80 overflow-y-auto px-1 py-2">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Pages">
                  {searchData.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => {
                        router.push(item.href);
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.category}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

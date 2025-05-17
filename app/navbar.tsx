"use client";

import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AnnouncementBar from "./sections/LandingPagesSections/announcementbar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar scrolled={scrolled} />
      <header
        className={`w-full transition-all duration-300 z-50 py-4 px-4 sm:px-6 fixed ${
          scrolled ? "fixed top-0 shadow-md bg-white" : "relative bg-[#f2f5f8]"
        }`}
      >
        {/* // <header className={navbarClasses}> */}
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/Elvo_logo_transparent.png"
                alt="Evlo.Ai.ai"
                width={120}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/demo"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Log In
              </Link>
              {/* <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                  Solutions
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div> */}
              {/* <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Pricing
              </Link> */}
              {/* <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Apps & Integrations
              </Link> */}
              {/* <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div> */}
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {/* <Link
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Log In
            </Link> */}
            <Link
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="bg-[#10B981] hover:bg-emerald-800 text-white font-medium px-4 py-2 rounded-full"
            >
              Start for Free
            </Link>
          </div>
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
    </>
  );
}

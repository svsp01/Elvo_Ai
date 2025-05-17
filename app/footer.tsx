"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const footerLinks = [
  {
    title: "Solutions",
    links: [
      "For Business",
      "For Sales",
      "For Education",
      "For Media",
      "For Transcription",
    ],
  },
  {
    title: "Apps & Integrations",
    links: [
      "All Apps",
      "iOS",
      "Android",
      "Chrome Extension",
      "For Slack",
      "For Zoom",
    ],
  },
  {
    title: "Resources",
    links: [
      "Blog",
      "Careers",
      "Press",
      "Help & Support",
      "Media Kit",
      "Affiliate",
      "Privacy & Security",
    ],
  },
];

export default function Footer() {
  const controls = useAnimation();
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < prevScroll) {
        controls.start({ y: 0 }); // scroll up - reveal
      } else {
        controls.start({ y: -100 }); // scroll down - hide
      }
      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll, controls]);

  return (
    <footer
      className="relative mt-32 bg-[#001a33] text-white p-16 h-[500px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fixed bottom-0 h-[400px] w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-block">
              <div className="text-white">
                <svg
                  width="100"
                  height="40"
                  viewBox="0 0 100 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="20" fill="white" />
                  <circle cx="20" cy="20" r="10" fill="#001a33" />
                  <path d="M50 12H94V28H50V12Z" fill="white" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Mapped Link Sections */}
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href="#"
                      className="text-base hover:text-blue-300 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

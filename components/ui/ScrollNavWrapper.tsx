"use client";
import { useEffect, useState } from "react";

export default function ScrollNavWrapper({
  children,
}: {
  children: (scrolled: boolean) => React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <>{children(scrolled)}</>;
}

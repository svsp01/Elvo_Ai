"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  Brain,
  Building,
  Network,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: PlusCircle, label: "Create Lead", href: "/leads/create" },
    { icon: Brain, label: "AI Agents", href: "/ai-agents" },
    {
      icon: Building,
      label: "Create Organisation",
      href: "/create-organisation",
    },
    { icon: Network, label: "Clusters", href: "/clusters" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "border-r h-screen bg-white  transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <Image
            src="/Elvo_logo_transparent.webp"
            alt="Elvo Logo"
            width={65}
            height={65}
            className=""
            priority
          />
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isOpen ? (
            <X className="h-5 w-5 text-primary" />
          ) : (
            <Menu className="h-5 w-5 text-primary" />
          )}
        </Button>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2 justify-center">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } p-3 text-gray-700 hover:bg-gray-100`}
              >
                <item.icon className="h-5 w-5 text-primary" />
                {isOpen && <span className="ml-3">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

import { Twitter, Facebook, Instagram, Github } from "lucide-react";

export function Footer() {
  const socialIcons = [
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Github, href: "https://github.com" },
  ];

  return (
    <footer className="border-t w-full bg-white py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex space-x-4">
          {socialIcons.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <social.icon className="h-5 w-5 text-primary" />
            </a>
          ))}
        </div>
        <div className="text-center text-sm text-gray-600">
          <span className="font-semibold">elvo.ai</span>
        </div>
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Elvo.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
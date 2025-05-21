"use client";

type ClientLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  footer: React.ReactNode;
};

export function ClientLayout({ children, sidebar, footer }: ClientLayoutProps) {
  return (
    <div className="flex h-screen">
      {sidebar}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 transition-all duration-300">
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
}

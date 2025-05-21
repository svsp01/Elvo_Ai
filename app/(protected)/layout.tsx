import type { Metadata } from "next";
import { ClientLayout } from "./components/ClientLayout";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "Elvo.ai",
  description: "A modern application powered by Elvo.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <ClientLayout sidebar={<Sidebar />} footer={<Footer />}>
        {children}
      </ClientLayout>
    </div>
  );
}
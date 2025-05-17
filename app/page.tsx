import LandingPage from "@/components/Home/LandingPage";
import Image from "next/image";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingPage />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import DemoForm from "../../components/DemoFormComponents/demoform";
import Navbar from "../navbar";
import Footer from "../footer";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      {/* <header className="bg-white py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <div className="text-[#0d6efd] font-bold text-3xl mr-1">
                  <span className="inline-block w-8 h-8 rounded-full bg-[#0d6efd] relative overflow-hidden">
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                      O
                    </span>
                  </span>
                </div>
                <span className="text-[#001a33] font-bold text-xl">
                  Elvo.ai
                </span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                  Solutions
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Apps & Integrations
              </Link>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Log In
            </Link>
            <Link
              href="#"
              className="bg-[#0d6efd] hover:bg-blue-600 text-white font-medium px-5 py-2.5 rounded-full transition-colors"
            >
              Start for Free
            </Link>
          </div>
          <button className="md:hidden">
            <svg
              className="h-6 w-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header> */}
      <Navbar />

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Watch the demo video below to see how to use Elvo for your
                business.
              </h1>

              <div className="space-y-6 mb-8">
                {/* Feature 1 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-600">
                    Capture meeting notes and slides automatically using
                    ElvoPilot
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-600">
                    Get an AI meeting summary with action items after every
                    meeting
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-600">
                    Generate content and get answers to your questions using
                    Elvo AI Chat - it&apos;s like having ChatGPT for all your
                    meetings
                  </p>
                </div>
              </div>

              {/* Demo Video/Screenshot */}
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20%2849%29-ommhJbCxQoyILnNLDHxFhhtWRRwbwF.png"
                  alt="Elvo.ai demo"
                  width={600}
                  height={350}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-4 left-0 right-0 text-center text-[#10B981] font-medium">
                  you can click record in your web browser
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-[#10B981]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
                  Get a personalized demo for your company
                </h2>

                <p className="text-center text-gray-600 mb-8">
                  Want to learn how to use Elvo for meetings at your company?
                  Schedule a meeting with Elvo&apos;s AI consultants.
                </p>

                <DemoForm />

                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-6">
                    Join the thousands of companies that trust Elvo.ai to
                    transcribe their important conversations.
                  </p>

                  {/* <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
                    <Image
                      src="/placeholder.svg?height=30&width=100"
                      alt="Amazon"
                      width={100}
                      height={30}
                    />
                    <Image
                      src="/placeholder.svg?height=30&width=100"
                      alt="Grant Thornton"
                      width={100}
                      height={30}
                    />
                    <Image
                      src="/placeholder.svg?height=30&width=100"
                      alt="NBC Universal"
                      width={100}
                      height={30}
                    />
                    <Image
                      src="/placeholder.svg?height=30&width=100"
                      alt="UCLA"
                      width={100}
                      height={30}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const departments = [
  "Accessibility/Disability Resources",
  "Accounting",
  "Administration",
  "Arts and Design",
  "Business Development",
  "C-Suite",
  "Community and Social Services",
  "Consulting",
  "Customer Success/Support",
  "Data Science",
  "Education",
  "Engineering",
  "Finance",
  "Healthcare",
  "Human Resources",
  "Information Technology",
  "Legal",
  "Marketing",
  "Operations",
  "Product",
  "Project Management",
  "Research",
  "Sales",
  "Other",
];

export default function DemoForm() {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [departmentError, setDepartmentError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError("Please complete this required field.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate department
    if (!department) {
      setDepartmentError("Please complete this required field.");
      isValid = false;
    } else {
      setDepartmentError("");
    }

    if (isValid) {
      // Submit form logic would go here
      console.log("Form submitted:", { email, department });
      alert("Demo request submitted!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Work email*
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your.name@company.com"
        />
        {emailError && (
          <p className="mt-1 text-sm text-red-500">{emailError}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="department"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Job Department*
        </label>
        <div className="relative">
          <button
            type="button"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className={department ? "text-gray-900" : "text-gray-500"}>
              {department || "Job Department"}
            </span>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm border border-gray-300">
              {departments.map((dept) => (
                <div
                  key={dept}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                  onClick={() => {
                    setDepartment(dept);
                    setIsDropdownOpen(false);
                    setDepartmentError("");
                  }}
                >
                  <span className="block truncate">{dept}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {departmentError && (
          <p className="mt-1 text-sm text-red-500">{departmentError}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors"
      >
        Submit
      </button>
    </form>
  );
}

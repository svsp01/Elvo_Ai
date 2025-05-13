import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authOptions } from "@/auth";
import { NextAuthResult } from "next-auth";

// Initialize NextAuth and extract handlers
const { handlers } = NextAuth(authOptions) as NextAuthResult;

export const GET = async (req: NextRequest) => {
  console.log("NextAuth Route: GET request received", {
    url: req.url,
    method: "GET",
  });
  try {
    // Call the GET handler from NextAuth with only req
    const response = await handlers.GET(req);
    console.log("NextAuth Route: GET response", {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
    });
    return response;
  } catch (error: any) {
    console.error("NextAuth Route: GET error", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
    });
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST = async (req: NextRequest) => {
  console.log("NextAuth Route: POST request received", {
    url: req.url,
    method: "POST",
  });
  try {
    // Call the POST handler from NextAuth with only req
    const response = await handlers.POST(req);
    console.log("NextAuth Route: POST response", {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
    });
    return response;
  } catch (error: any) {
    console.error("NextAuth Route: POST error", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
    });
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

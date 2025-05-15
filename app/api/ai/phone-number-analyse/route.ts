import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

// Schema for request body validation
const PhoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d{7,15}$/, "Phone number must be 7-15 digits"),
});

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Verify model name

// Prompt for numerology/astrology analysis
const promptTemplate = (phoneNumber: string) => `
You are an expert in numerology and astrology. Analyze the phone number by summing its digits to a single-digit "life path number" (e.g., 12345 -> 1+2+3+4+5 = 15 -> 1+5 = 6). Map the number to a numerological trait (e.g., 1 = leadership) and blend with an astrology theme (e.g., Mars for energy). Return a single, positive sentence (20-30 words) as a raw JSON object with an "insight" field. Do not wrap the JSON in code fences (e.g., \`\`\`json ... \`\`\`) or add any extra text.

**Input**: Phone number: ${phoneNumber}

**Examples**:
- Phone number: 1234567890
  Output: {"insight": "Your number radiates leadership, fueled by Mars' dynamic energy, driving bold connections and success."}
- Phone number: 987654321
  Output: {"insight": "This number embodies harmony, guided by Venus' loving influence, fostering creativity and deep bonds."}

**Output Format**: {"insight": "sentence here"}
`;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const parseResult = PhoneNumberSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { phoneNumber } = parseResult.data;

    // Generate prompt
    const prompt = promptTemplate(phoneNumber);
    console.log("Generated prompt:", prompt);

    // Call Gemini API
    console.log("Calling Gemini API...");
    const geminiResult = await model.generateContent(prompt);
    let text = geminiResult.response.text();
    console.log("Raw Gemini response:", text);

    // Clean the response by removing Markdown code fences
    text = text.replace(/^```json\n|\n```$/g, "").trim();
    console.log("Cleaned response:", text);

    // Parse response
    try {
      const parsed = JSON.parse(text);
      if (parsed.insight && typeof parsed.insight === "string") {
        return NextResponse.json({ insight: parsed.insight });
      }
      throw new Error("Invalid response format: Missing or invalid 'insight' field");
    } catch (e) {
      console.error("Response parse error:", e, "Cleaned text:", text);
      return NextResponse.json(
        { error: "Invalid response format from AI" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in /ai/phone-number-analyse:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
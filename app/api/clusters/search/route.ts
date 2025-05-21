import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    console.log("➡️ POST request received");

    const body = await req.json();
    console.log("📦 Request body parsed:", body);

    const { query } = body;
    console.log("🔍 Search query:", query);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("🤖 Gemini model initialized");

    const leads = await prisma.lead.findMany({
      include: {
        summary: true,
        keywords: true,
      },
    });
    console.log("📊 Retrieved leads from DB:", leads.length);

    const simplifiedLeads = leads.map((l) => ({
      id: l.id,
      summary: l.summary?.text,
      keywords: l.keywords.map((k) => k.value),
    }));
    console.log("🧹 Simplified lead data for prompt:", simplifiedLeads);

    const prompt = `Analyze the following search query and return a JSON object with:
- "ids": a list of relevant lead IDs (e.g., ["id1", "id2"])
- "message": a short explanation (e.g., "2 leads matched the query", or "No matching leads found. Try refining your search." Note: also for no matches show some engageing texts with emojies to user to search again.)

Query: "${query}"
Lead data: ${JSON.stringify(simplifiedLeads)}

ONLY return a raw JSON object like:
{
  "ids": [...],
  "message": "..."
}`;

    console.log("📨 Prompt to Gemini:", prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text().trim();
    console.log("📝 Raw response text:", rawText);

    const cleanedText = rawText.replace(/^```json|^```|```$/gim, "").trim();
    console.log("🧼 Cleaned response text:", cleanedText);

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (err) {
      console.error("❌ Failed to parse JSON:", err);
      return NextResponse.json({ leads: [], message: "Failed to understand Gemini response." });
    }

    if (!parsed || !Array.isArray(parsed.ids)) {
      console.warn("⚠️ Gemini response missing `ids` array:", parsed);
      return NextResponse.json({ leads: [], message: parsed?.message || "No relevant leads found." });
    }

    const relevantIds = parsed.ids;
    const filteredLeads = leads.filter((lead) => relevantIds.includes(lead.id));

    console.log("📌 Relevant lead IDs:", relevantIds);
    console.log("📬 Filtered leads to return:", filteredLeads.length);

    return NextResponse.json({
      leads: filteredLeads,
      message: parsed.message || "Some relevant leads were found.",
    });
  } catch (error) {
    console.error("❌ Error in POST handler:", error);
    return NextResponse.json({ error: "Failed to search clusters" }, { status: 500 });
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Google Generative AI (Gemini)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const extractCompanyInfo = async (websiteText, url) => {
    if (!websiteText || websiteText.length < 50) {
        return {
            summary: "Could not scrape website content (likely blocked 403 or empty).",
            whatTheyDo: [],
            keywords: [],
            signals: ["Scraping failed"],
        };
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
You are a VC analyst.

From the company website content below, extract:

1. Summary (1-2 sentences)
2. What they do (3-6 bullet points)
3. Keywords (5-10)
4. Derived signals (Funding hints, hiring, blog updates, partnerships, etc.)

Return STRICT JSON format:
{
 "summary": "...",
 "whatTheyDo": ["...", "..."],
 "keywords": ["...", "..."],
 "signals": ["...", "..."]
}

Website content:
${websiteText.substring(0, 20000)} 
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return JSON.parse(text);
    } catch (err) {
        console.error("Gemini AI Error:", err);
        return {
            summary: "AI Extraction Failed",
            whatTheyDo: [],
            keywords: [],
            signals: [],
        };
    }
};

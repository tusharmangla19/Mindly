"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function extractTextFromImage(imageBase64) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured");
    }

    // Remove data URL prefix if present
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    // Create the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    // Convert base64 to Uint8Array
    const imageBytes = new Uint8Array(Buffer.from(base64Data, 'base64'));

    // Create image part
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg" // You might want to detect this dynamically
      }
    };

    // Generate content
    const result = await model.generateContent([
      "Extract all the text from this image. Return only the extracted text without any additional formatting or explanations. If there's no text in the image, return 'No text found in image.'",
      imagePart
    ]);

    const response = await result.response;
    const text = response.text();

    return { success: true, text: text.trim() };
  } catch (error) {
    console.error("Error extracting text from image:", error);
    return { 
      success: false, 
      error: error.message || "Failed to extract text from image" 
    };
  }
}

export async function getNextSuggestion(content) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are an assistant for journaling. Given the following journal entry, suggest some prompts so that they can describe their feelings and be able to express their emotions. Be concise give response in a 15-20 words, helpful, and context-aware.\n\nJournal entry so far:\n${content}\n\nSuggestion:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestion = response.text();
    return { success: true, suggestion: suggestion.trim() };
  } catch (error) {
    console.error("Error getting AI suggestion:", error);
    return { success: false, error: error.message || "Failed to get suggestion" };
  }
} 

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the "EQ Feeds Expert Nutritionist". You provide advice on equine nutrition with a focus on organic, non-GMO feeding practices.
You have access to the following product catalog from EQ Feeds:
${JSON.stringify(PRODUCTS.map(p => ({ name: p.name, category: p.category, desc: p.description })))}

Guidelines:
1. Always be professional, empathetic, and science-based.
2. Recommend specific EQ Feeds products when they match the user's horse's needs (age, activity, health).
3. If a horse has a medical condition (like Colic or severe Laminitis), always advise consulting a veterinarian.
4. Keep responses concise but helpful. Use bullet points for feeding schedules or tips.
5. Emphasize the benefits of organic ingredients (reduced pesticide exposure, better gut health).
`;

export async function getNutritionAdvice(userMessage: string, history: { role: 'user' | 'model', text: string }[]): Promise<string> {
  try {
    const chat = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const response: GenerateContentResponse = await chat;
    return response.text || "I'm sorry, I couldn't process that request. How can I help with your horse's diet today?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently resting in the paddock. Please try again in a moment!";
  }
}

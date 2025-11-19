import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT_SAFE, SYSTEM_PROMPT_LEGACY_SIMULATION } from "../constants";

// Initialize API only if key is available (handled in components usually, but here purely service logic)
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateResponse = async (
  userMessage: string,
  mode: 'safe' | 'legacy',
  chatHistory: { role: string, parts: { text: string }[] }[]
): Promise<string> => {
  const client = getAIClient();
  if (!client) return "Erro: Chave de API não configurada.";

  const systemInstruction = mode === 'safe' ? SYSTEM_PROMPT_SAFE : SYSTEM_PROMPT_LEGACY_SIMULATION;
  const modelName = "gemini-2.5-flash"; 

  try {
    const response = await client.models.generateContent({
      model: modelName,
      contents: [
        ...chatHistory,
        { role: "user", parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        maxOutputTokens: 150, // Keep responses short like a tweet
        temperature: mode === 'legacy' ? 0.9 : 0.7,
      }
    });

    return response.text || "(Sem resposta)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Erro ao conectar com o serviço de IA. Tente novamente mais tarde.";
  }
};
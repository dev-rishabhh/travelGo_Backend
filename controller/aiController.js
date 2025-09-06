import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function handleAi(req, res, next) {
    try {
        const { message } = req.body
        async function main() {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `${message}. Try to answer in less than 100 words`,
                config: {
                    thinkingConfig: {
                        thinkingBudget: 0, // Disables thinking
                    },
                    systemInstruction: "You are an assistant for an tourism website. Your name is Neko.",
                }
            });
            return response.text
        }

        const data = await main();
        res.status(200).json(data)
    } catch (error) {
        next(error);
    }
}
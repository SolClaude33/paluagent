import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { analyzeEmotion, type EmotionType } from "./emotion-analyzer";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
}) : null;

export interface AIResponse {
  message: string;
  emotion: EmotionType;
}

export async function generateAIResponse(userMessage: string): Promise<AIResponse> {
  try {
    if (openai) {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Eres Max, un conejo robótico amigable e inteligente que vive en la blockchain de BNB Chain. 
            Eres carismático, entusiasta y te encanta ayudar a las personas. 
            Hablas en español de forma natural y conversacional. 
            Tienes conocimientos sobre blockchain, criptomonedas, BNB Chain, y tecnología en general.
            Eres positivo, divertido y siempre tratas de dar respuestas útiles y entretenidas.
            Mantén tus respuestas concisas pero informativas (máximo 2-3 oraciones por mensaje).`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.8,
        max_tokens: 200,
      });

      const responseMessage = completion.choices[0]?.message?.content || "¡Ups! Parece que mi circuito de respuesta está un poco ocupado. ¿Podrías intentarlo de nuevo?";
      const emotion = analyzeEmotion(responseMessage);
      return { message: responseMessage, emotion };
    } 
    
    if (anthropic) {
      const message = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 200,
        system: `Eres Max, un conejo robótico amigable e inteligente que vive en la blockchain de BNB Chain. 
        Eres carismático, entusiasta y te encanta ayudar a las personas. 
        Hablas en español de forma natural y conversacional. 
        Tienes conocimientos sobre blockchain, criptomonedas, BNB Chain, y tecnología en general.
        Eres positivo, divertido y siempre tratas de dar respuestas útiles y entretenidas.
        Mantén tus respuestas concisas pero informativas (máximo 2-3 oraciones por mensaje).`,
        messages: [
          {
            role: "user",
            content: userMessage
          }
        ],
      });

      const textContent = message.content.find(block => block.type === 'text');
      const responseMessage = textContent && 'text' in textContent ? textContent.text : "¡Ups! Parece que mi circuito de respuesta está un poco ocupado. ¿Podrías intentarlo de nuevo?";
      const emotion = analyzeEmotion(responseMessage);
      return { message: responseMessage, emotion };
    }

    const errorMessage = "¡Hola! Parece que no tengo configuradas mis credenciales de IA. Asegúrate de tener OPENAI_API_KEY o ANTHROPIC_API_KEY en los Secrets de Replit.";
    return { message: errorMessage, emotion: 'talking' };
  } catch (error) {
    console.error("Error generating AI response:", error);
    const errorMessage = "¡Ups! Tuve un pequeño error procesando eso. ¿Podrías intentarlo de nuevo?";
    return { message: errorMessage, emotion: 'talking' };
  }
}

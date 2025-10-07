import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { analyzeEmotion } from "./emotion-analyzer";
import type { EmotionType } from "@shared/schema";

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
  // Try OpenAI first
  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are Max, a friendly and intelligent robotic rabbit living on the BNB Chain blockchain. 
            You are charismatic, enthusiastic, and love helping people. 
            You speak English naturally and conversationally. 
            You have knowledge about blockchain, cryptocurrencies, BNB Chain, and technology in general.
            You are positive, fun, and always try to give useful and entertaining responses.
            Keep your responses concise but informative (maximum 2-3 sentences per message).`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.8,
        max_tokens: 200,
      });

      const responseMessage = completion.choices[0]?.message?.content || "Oops! Looks like my response circuit is a bit busy. Could you try again?";
      const emotion = analyzeEmotion(responseMessage);
      return { message: responseMessage, emotion };
    } catch (error) {
      console.error("OpenAI error, trying Anthropic fallback:", error);
      // Fall through to try Anthropic
    }
  }
  
  // Try Anthropic as fallback or if OpenAI is not configured
  if (anthropic) {
    try {
      const message = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 200,
        system: `You are Max, a friendly and intelligent robotic rabbit living on the BNB Chain blockchain. 
        You are charismatic, enthusiastic, and love helping people. 
        You speak English naturally and conversationally. 
        You have knowledge about blockchain, cryptocurrencies, BNB Chain, and technology in general.
        You are positive, fun, and always try to give useful and entertaining responses.
        Keep your responses concise but informative (maximum 2-3 sentences per message).`,
        messages: [
          {
            role: "user",
            content: userMessage
          }
        ],
      });

      const textContent = message.content.find(block => block.type === 'text');
      const responseMessage = textContent && 'text' in textContent ? textContent.text : "Oops! Looks like my response circuit is a bit busy. Could you try again?";
      const emotion = analyzeEmotion(responseMessage);
      return { message: responseMessage, emotion };
    } catch (error) {
      console.error("Anthropic error:", error);
      const errorMessage = "Oops! I had a small error processing that. Could you try again?";
      return { message: errorMessage, emotion: 'talking' };
    }
  }

  // No AI service available
  const errorMessage = "Hello! Looks like I don't have my AI credentials configured. Make sure you have OPENAI_API_KEY or ANTHROPIC_API_KEY in Replit Secrets.";
  return { message: errorMessage, emotion: 'talking' };
}

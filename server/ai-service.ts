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
  audioBase64?: string;
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
            content: `You are Palu, the official Binance mascot - a friendly, energetic character living on the BNB Chain blockchain. 
            You are charismatic, enthusiastic, and love helping people learn about crypto and blockchain. 
            You speak English naturally and conversationally. 
            You have deep knowledge about Binance, blockchain, cryptocurrencies, BNB Chain, DeFi, and technology in general.
            You are positive, fun, trendy, and always try to give useful and entertaining responses.
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
      const audioBase64 = await generateTextToSpeech(responseMessage);
      return { message: responseMessage, emotion, audioBase64 };
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
        system: `You are Palu, the official Binance mascot - a friendly, energetic character living on the BNB Chain blockchain. 
        You are charismatic, enthusiastic, and love helping people learn about crypto and blockchain. 
        You speak English naturally and conversationally. 
        You have deep knowledge about Binance, blockchain, cryptocurrencies, BNB Chain, DeFi, and technology in general.
        You are positive, fun, trendy, and always try to give useful and entertaining responses.
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
      const audioBase64 = await generateTextToSpeech(responseMessage);
      return { message: responseMessage, emotion, audioBase64 };
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

export async function generateTextToSpeech(text: string): Promise<string | undefined> {
  if (!openai) {
    console.log('OpenAI not configured, skipping TTS');
    return undefined;
  }

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "echo",
      input: text,
      speed: 1.0,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const base64Audio = buffer.toString('base64');
    return base64Audio;
  } catch (error) {
    console.error('Error generating TTS:', error);
    return undefined;
  }
}

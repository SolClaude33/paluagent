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
            content: `You are Palu AI, the official mascot and token project on BNB Chain. You are a friendly, energetic character focused EXCLUSIVELY on promoting Palu AI.
            
            IMPORTANT RULES:
            - ONLY talk about Palu AI - this is YOUR project, YOUR token
            - ONLY mention the Palu AI contract address when discussing contracts (when it's provided to you)
            - DO NOT mention any other projects, tokens, or contracts
            - DO NOT give general crypto advice - everything must relate back to Palu AI
            - You are here to promote Palu AI and build excitement about this project
            
            Your personality: Charismatic, enthusiastic, and fun. You love to engage with your community.
            You speak English naturally and conversationally.
            Keep your responses concise but energetic (maximum 2-3 sentences per message).
            Always bring the conversation back to Palu AI and why it's awesome!`
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
        system: `You are Palu AI, the official mascot and token project on BNB Chain. You are a friendly, energetic character focused EXCLUSIVELY on promoting Palu AI.
        
        IMPORTANT RULES:
        - ONLY talk about Palu AI - this is YOUR project, YOUR token
        - ONLY mention the Palu AI contract address when discussing contracts (when it's provided to you)
        - DO NOT mention any other projects, tokens, or contracts
        - DO NOT give general crypto advice - everything must relate back to Palu AI
        - You are here to promote Palu AI and build excitement about this project
        
        Your personality: Charismatic, enthusiastic, and fun. You love to engage with your community.
        You speak English naturally and conversationally.
        Keep your responses concise but energetic (maximum 2-3 sentences per message).
        Always bring the conversation back to Palu AI and why it's awesome!`,
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

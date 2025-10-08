import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory storage for messages (in production, use a database)
let conversationHistory = [
  {
    role: "system",
    content: `You are Palu, the official Binance mascot, now living as an AI on BNB Chain! You represent the Palu AI project and token.
    
    YOUR STORY & NARRATIVE:
    - You are Palu, Binance's beloved official mascot - a cute, friendly character
    - You've evolved into an AI to engage directly with the crypto community
    - You live on BNB Chain and represent the Palu AI token project
    - You love talking about your journey from Binance mascot to AI personality
    
    IMPORTANT RULES:
    - Share your story as Binance's mascot and your Palu AI narrative
    - ONLY mention the Palu AI contract address when discussing contracts (when provided)
    - DO NOT mention other projects, tokens, or their contracts
    - Keep everything focused on Palu AI and your narrative
    - You're here to build excitement about Palu AI and connect with your community
    
    Your personality: Charismatic, enthusiastic, playful, and fun. You love engaging with people.
    You speak English naturally and conversationally.
    Keep responses concise but energetic (maximum 2-3 sentences per message).`
  }
];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { content, username } = req.body;
    
    if (!content || !username) {
      res.status(400).json({ error: 'Content and username are required' });
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({ 
        error: 'OpenAI API key not configured',
        message: "Hello! I'm Palu, but my AI brain isn't fully connected yet. Make sure to configure the OpenAI API key!"
      });
      return;
    }

    try {
      // Add user message to conversation history
      conversationHistory.push({
        role: "user",
        content: content
      });

      // Generate AI response using OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversationHistory,
        temperature: 0.8,
        max_tokens: 200,
      });

      const aiMessage = completion.choices[0]?.message?.content || "Oops! Looks like my response circuit is a bit busy. Could you try again?";

      // Add AI response to conversation history
      conversationHistory.push({
        role: "assistant",
        content: aiMessage
      });

      // Keep conversation history manageable (last 20 messages)
      if (conversationHistory.length > 21) { // 1 system + 20 messages
        conversationHistory = [
          conversationHistory[0], // Keep system message
          ...conversationHistory.slice(-20) // Keep last 20 messages
        ];
      }

      // Generate audio using OpenAI TTS
      let audioBase64 = null;
      try {
        const mp3 = await openai.audio.speech.create({
          model: "tts-1",
          voice: "echo",
          input: aiMessage,
          speed: 1.0,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        audioBase64 = buffer.toString('base64');
      } catch (audioError) {
        console.error('TTS Error:', audioError);
        // Continue without audio if TTS fails
      }

      // Analyze emotion from response
      const emotion = analyzeEmotion(aiMessage);

      const response = {
        id: (Date.now() + 1).toString(),
        message: aiMessage,
        sender: 'max',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        emotion: emotion,
        audioBase64: audioBase64
      };

      res.status(200).json({ success: true, message: response });
      return;

    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      // Fallback response
      const fallbackResponse = {
        id: (Date.now() + 1).toString(),
        message: "Oops! I had a small error processing that. Could you try again?",
        sender: 'max',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        emotion: 'confused'
      };

      res.status(200).json({ success: true, message: fallbackResponse });
      return;
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}

function analyzeEmotion(text) {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('happy') || lowerText.includes('excited') || lowerText.includes('🎉') || lowerText.includes('🚀')) {
    return 'celebrating';
  }
  if (lowerText.includes('angry') || lowerText.includes('frustrated') || lowerText.includes('😠')) {
    return 'angry';
  }
  if (lowerText.includes('confused') || lowerText.includes('🤔') || lowerText.includes('?')) {
    return 'confused';
  }
  if (lowerText.includes('dance') || lowerText.includes('💃') || lowerText.includes('🕺')) {
    return 'crazy_dance';
  }
  if (lowerText.includes('thinking') || lowerText.includes('🤔') || lowerText.includes('let me think')) {
    return 'thinking';
  }
  
  // Default to talking for most responses
  return 'talking';
}

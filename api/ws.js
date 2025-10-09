// Chat API endpoint for Vercel (polling-based instead of WebSocket)
let messages = [
  {
    id: "1",
    message: "欢迎来到 Palu 人工智能 直播！我是币安的官方吉祥物，现在已成为人工智能！连接您的 BNB 钱包即可开始与我聊天！",
    sender: "max",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Return current messages
    res.status(200).json({
      messages,
      viewerCount: Math.floor(Math.random() * 50) + 10 // Simulate viewer count
    });
    return;
  }

  if (req.method === 'POST') {
    const { content, username } = req.body;
    
    if (!content || !username) {
      res.status(400).json({ error: 'Content and username are required' });
      return;
    }

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      message: content,
      sender: 'user',
      username: username,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    messages.push(userMessage);

    // Generate AI response (simple fallback)
    const aiResponses = [
      "Hello there! I'm Palu, the official Binance mascot! 🎉",
      "Thanks for chatting with me! I love connecting with the crypto community! 🚀",
      "BNB Chain is amazing! Have you tried our latest features? 💎",
      "I'm so excited to be here as an AI! The future of crypto is bright! ✨",
      "Connect your wallet to unlock more features! 🔗",
      "Palu AI is growing every day! Join our community! 🌟"
    ];

    const aiResponse = {
      id: (Date.now() + 1).toString(),
      message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
      sender: 'max',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      emotion: 'talking'
    };

    messages.push(aiResponse);

    // Keep only last 50 messages
    if (messages.length > 50) {
      messages = messages.slice(-50);
    }

    res.status(200).json({ success: true, message: aiResponse });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}

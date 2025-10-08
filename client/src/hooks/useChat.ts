import { useEffect, useState, useCallback } from 'react';
import type { EmotionType } from '@shared/schema';

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'max';
  username?: string;
  timestamp: string;
  emotion?: EmotionType;
}

interface ChatResponse {
  messages: ChatMessage[];
  viewerCount: number;
}

export function useChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [viewerCount, setViewerCount] = useState(0);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('idle');
  const [lastLocalMessageId, setLastLocalMessageId] = useState<string | null>(null);

  // Poll for messages
  useEffect(() => {
    const pollMessages = async () => {
      try {
        const response = await fetch('/api/ws');
        if (response.ok) {
          const data: ChatResponse = await response.json();
          
          // Only update messages if we don't have recent local messages
          // This prevents overwriting messages that were just added locally
          setMessages(currentMessages => {
            // If we have local messages that are newer than what we're polling,
            // keep the local messages and merge with server messages
            const hasRecentLocalMessages = lastLocalMessageId && 
              currentMessages.some(msg => msg.id === lastLocalMessageId);
            
            if (hasRecentLocalMessages) {
              // Merge server messages with local messages, avoiding duplicates
              const serverMessageIds = new Set(data.messages.map(msg => msg.id));
              const localMessages = currentMessages.filter(msg => !serverMessageIds.has(msg.id));
              return [...localMessages, ...data.messages];
            } else {
              return data.messages;
            }
          });
          
          setViewerCount(data.viewerCount);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Error polling messages:', error);
        setIsConnected(false);
      }
    };

    // Initial poll
    pollMessages();
    
    // Poll every 3 seconds (less frequent to avoid conflicts)
    const interval = setInterval(pollMessages, 3000);

    return () => clearInterval(interval);
  }, [lastLocalMessageId]);

  const sendMessage = useCallback(async (content: string, username: string) => {
    try {
      // Add user message immediately to UI
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        message: content,
        sender: 'user',
        username: username,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, userMessage]);
      setLastLocalMessageId(userMessage.id);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, username }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.message) {
          // Add AI response to messages
          setMessages(prev => [...prev, data.message]);
          setLastLocalMessageId(data.message.id);
          
          // Trigger emotion change
          setCurrentEmotion(data.message.emotion || 'talking');
          
          // Play audio if available
          if (data.message.audioBase64) {
            try {
              const audio = new Audio(`data:audio/mp3;base64,${data.message.audioBase64}`);
              audio.play().catch(err => console.error('Error playing audio:', err));
              
              // Return to idle after audio ends
              audio.addEventListener('ended', () => {
                setCurrentEmotion('idle');
              });
            } catch (audioError) {
              console.error('Error creating audio:', audioError);
              // Return to idle after 3 seconds if no audio
              setTimeout(() => {
                setCurrentEmotion('idle');
              }, 3000);
            }
          } else {
            // Return to idle after 3 seconds if no audio
            setTimeout(() => {
              setCurrentEmotion('idle');
            }, 3000);
          }
        }
      } else {
        console.error('Error response:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, []);

  const sendEmotion = useCallback((emotion: EmotionType) => {
    setCurrentEmotion(emotion);
  }, []);

  return { 
    isConnected, 
    messages, 
    viewerCount, 
    sendMessage, 
    currentEmotion, 
    sendEmotion 
  };
}

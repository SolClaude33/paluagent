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

  // Poll for messages
  useEffect(() => {
    const pollMessages = async () => {
      try {
        const response = await fetch('/api/ws');
        if (response.ok) {
          const data: ChatResponse = await response.json();
          setMessages(data.messages);
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
    
    // Poll every 2 seconds
    const interval = setInterval(pollMessages, 2000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = useCallback(async (content: string, username: string) => {
    try {
      const response = await fetch('/api/ws', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, username }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.message) {
          // Trigger emotion change
          setCurrentEmotion(data.message.emotion || 'talking');
          
          // Return to idle after 3 seconds
          setTimeout(() => {
            setCurrentEmotion('idle');
          }, 3000);
        }
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

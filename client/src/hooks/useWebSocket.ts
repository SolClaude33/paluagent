import { useEffect, useRef, useState, useCallback } from 'react';
import type { EmotionType } from '@shared/schema';

interface WebSocketMessage {
  type: 'connection' | 'user_message' | 'max_message' | 'max_emotion' | 'viewer_count' | 'error';
  data: any;
}

export function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('idle');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setLastMessage(message);
        
        if (message.type === 'max_emotion' && message.data.emotion) {
          setCurrentEmotion(message.data.emotion);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    // Listen for audio ended event to return to idle
    const handleAudioEnded = () => {
      setCurrentEmotion('idle');
    };
    
    window.addEventListener('maxAudioEnded', handleAudioEnded);

    return () => {
      ws.close();
      window.removeEventListener('maxAudioEnded', handleAudioEnded);
    };
  }, [url]);

  const sendMessage = useCallback((type: string, data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type, ...data }));
    }
  }, []);

  const sendEmotion = useCallback((emotion: EmotionType) => {
    setCurrentEmotion(emotion);
  }, []);

  return { isConnected, lastMessage, sendMessage, currentEmotion, sendEmotion };
}

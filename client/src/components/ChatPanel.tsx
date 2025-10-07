import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users, TrendingUp, Wifi, WifiOff } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { ChatMessage as ChatMessageType } from "@shared/schema";
import gigglesLogo from '@assets/image_1759799138730.png';

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "1",
      message: "Welcome to Max AI stream! I'm a live AI agent. How can I help you today?",
      sender: "max",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState("");
  const [viewerCount] = useState(127);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { isConnected, lastMessage, sendMessage } = useWebSocket('/ws');

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === 'user_message') {
        setMessages(prev => [...prev, lastMessage.data]);
      } else if (lastMessage.type === 'max_message') {
        setMessages(prev => [...prev, lastMessage.data]);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !isConnected) return;

    sendMessage('user_message', {
      content: input,
      username: 'You'
    });

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col bg-white border-l-2 border-border shadow-lg">
      <div className="border-b-2 border-border bg-white px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={gigglesLogo} alt="Giggles" className="h-8 w-8 animate-pulse" />
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight font-[Space_Grotesk]">
              Live Chat
            </h2>
            {isConnected ? (
              <div className="flex items-center gap-2 bg-green-500 px-3 py-1.5 rounded-full shadow-sm">
                <Wifi className="h-3.5 w-3.5 text-white" data-testid="status-connected" />
                <span className="text-xs font-bold text-white">Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-red-500 px-3 py-1.5 rounded-full shadow-sm">
                <WifiOff className="h-3.5 w-3.5 text-white animate-pulse" data-testid="status-disconnected" />
                <span className="text-xs font-bold text-white">Offline</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full" data-testid="viewer-count">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-bold text-foreground tabular-nums">{viewerCount}</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-5">
        <div ref={scrollRef} className="space-y-4 py-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} {...msg} />
          ))}
        </div>
      </ScrollArea>

      <div className="border-t-2 border-border bg-white p-5">
        <div className="flex items-center gap-3">
          <img src={gigglesLogo} alt="Giggles" className="h-7 w-7 animate-pulse flex-shrink-0" />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Type a message..." : "Connecting..."}
            className="flex-1 bg-white border-2 border-border focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary text-foreground placeholder:text-muted-foreground rounded-xl h-11 px-4 font-medium"
            data-testid="input-chat"
            disabled={!isConnected}
          />
          <Button 
            onClick={handleSend}
            size="icon"
            disabled={!input.trim() || !isConnected}
            data-testid="button-send"
            className="h-11 w-11 bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed rounded-xl"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

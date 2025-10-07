import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users, TrendingUp, Wifi, WifiOff } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { ChatMessage as ChatMessageType } from "@shared/schema";

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
    <div className="flex h-full flex-col bg-gradient-to-b from-black via-neutral-950 to-black border-l border-primary/20 shadow-xl shadow-primary/5">
      <div className="border-b border-primary/30 bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-xl px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-foreground uppercase tracking-wider font-[Space_Grotesk] bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
              Live Chat
            </h2>
            {isConnected ? (
              <div className="flex items-center gap-1.5 bg-green-500/20 px-2.5 py-1 rounded-full border border-green-500/30">
                <Wifi className="h-3.5 w-3.5 text-green-500" data-testid="status-connected" />
                <span className="text-xs font-semibold text-green-500">Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-red-500/20 px-2.5 py-1 rounded-full border border-red-500/30">
                <WifiOff className="h-3.5 w-3.5 text-red-500 animate-pulse" data-testid="status-disconnected" />
                <span className="text-xs font-semibold text-red-500">Offline</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/30 shadow-lg shadow-primary/10" data-testid="viewer-count">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold text-primary tabular-nums">{viewerCount}</span>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full shadow-lg shadow-primary/20" />
      </div>

      <ScrollArea className="flex-1 px-5">
        <div ref={scrollRef} className="space-y-4 py-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} {...msg} />
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-primary/30 bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-xl p-5 shadow-xl shadow-black/50">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Type something amazing..." : "Connecting..."}
            className="flex-1 bg-neutral-900/90 border-primary/40 focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-primary/60 text-foreground placeholder:text-muted-foreground rounded-xl h-11 px-4 shadow-lg shadow-black/20"
            data-testid="input-chat"
            disabled={!isConnected}
          />
          <Button 
            onClick={handleSend}
            size="icon"
            disabled={!input.trim() || !isConnected}
            data-testid="button-send"
            className="h-11 w-11 bg-gradient-to-br from-primary via-yellow-400 to-primary text-black hover:from-yellow-400 hover:to-primary transition-all shadow-xl shadow-primary/40 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

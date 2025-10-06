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
      message: "¡Bienvenido al stream de Max AI! Soy un agente de IA en vivo. ¿En qué puedo ayudarte hoy?",
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
      username: 'Tú'
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
    <div className="flex h-full flex-col bg-gradient-to-b from-black to-neutral-950 border-l border-primary/20">
      <div className="border-b border-primary/20 bg-black/50 backdrop-blur-xl px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-foreground uppercase tracking-wider font-[Space_Grotesk] bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">
              Chat en Vivo
            </h2>
            {isConnected ? (
              <Wifi className="h-4 w-4 text-green-500" data-testid="status-connected" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500 animate-pulse" data-testid="status-disconnected" />
            )}
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/30" data-testid="viewer-count">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold text-primary">{viewerCount}</span>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
      </div>

      <ScrollArea className="flex-1 px-4">
        <div ref={scrollRef} className="space-y-4 py-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} {...msg} />
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-primary/20 bg-black/50 backdrop-blur-xl p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Escribe algo increíble..." : "Conectando..."}
            className="flex-1 bg-neutral-900/80 border-primary/30 focus-visible:ring-primary focus-visible:border-primary/60 text-foreground placeholder:text-muted-foreground rounded-xl"
            data-testid="input-chat"
            disabled={!isConnected}
          />
          <Button 
            onClick={handleSend}
            size="icon"
            disabled={!input.trim() || !isConnected}
            data-testid="button-send"
            className="h-10 w-10 bg-gradient-to-r from-primary to-yellow-400 text-black hover:from-yellow-400 hover:to-primary transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

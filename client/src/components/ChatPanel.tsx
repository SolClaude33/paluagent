import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users } from "lucide-react";
import ChatMessage from "./ChatMessage";

interface Message {
  id: string;
  message: string;
  sender: "user" | "max";
  timestamp: string;
  username?: string;
}

interface ChatPanelProps {
  onMessageSent?: (message: string) => void;
}

export default function ChatPanel({ onMessageSent }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      message: "Welcome to Max AI Stream! I'm here to chat with you in real-time.",
      sender: "max",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState("");
  const [viewerCount] = useState(42);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      message: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      username: "You"
    };

    setMessages(prev => [...prev, userMessage]);
    onMessageSent?.(input);
    setInput("");

    setTimeout(() => {
      const responses = [
        "That's a great question! Let me think about that...",
        "I appreciate you sharing that with me!",
        "Interesting point! I'd love to discuss this further.",
        "Thanks for the message! I'm processing that information.",
        "Great to hear from you! Let me respond to that..."
      ];
      
      const maxResponse: Message = {
        id: (Date.now() + 1).toString(),
        message: responses[Math.floor(Math.random() * responses.length)],
        sender: "max",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, maxResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col bg-card border-l border-border">
      <div className="border-b border-border bg-background/50 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Live Chat</h2>
          <div className="flex items-center gap-1.5 text-primary" data-testid="viewer-count">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">{viewerCount}</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div ref={scrollRef} className="space-y-4 py-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} {...msg} />
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-background/50 backdrop-blur-sm p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Say something nice..."
            className="flex-1 bg-background border-input focus-visible:ring-primary"
            data-testid="input-chat"
          />
          <Button 
            onClick={handleSend}
            size="icon"
            disabled={!input.trim()}
            data-testid="button-send"
            className="hover-elevate active-elevate-2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

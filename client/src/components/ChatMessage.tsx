import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import maxAvatar from "@assets/image_1759775310846.png";

interface ChatMessageProps {
  id: string;
  message: string;
  sender: "user" | "max";
  timestamp: string;
  username?: string;
}

export default function ChatMessage({ message, sender, timestamp, username }: ChatMessageProps) {
  const isMax = sender === "max";

  return (
    <div 
      className={`flex gap-3 ${isMax ? '' : 'flex-row-reverse'} animate-in slide-in-from-bottom-3 fade-in duration-300`}
      data-testid={`message-${sender}`}
    >
      <Avatar className={`h-10 w-10 flex-shrink-0 ${isMax ? 'ring-2 ring-primary/30' : 'ring-1 ring-border'}`}>
        {isMax ? (
          <>
            <AvatarImage src={maxAvatar} alt="Max" className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-primary/30 to-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="bg-secondary">
            <User className="h-5 w-5 text-secondary-foreground" />
          </AvatarFallback>
        )}
      </Avatar>

      <div className={`flex flex-col gap-1.5 max-w-[75%] ${isMax ? 'items-start' : 'items-end'}`}>
        <div className="flex items-center gap-2 px-1">
          <span className={`text-xs font-semibold ${isMax ? 'text-primary' : 'text-foreground'}`}>
            {isMax ? 'Max AI' : username || 'Anónimo'}
          </span>
          <span className="text-[10px] text-muted-foreground">{timestamp}</span>
        </div>
        
        <div 
          className={`rounded-2xl px-4 py-3 shadow-md ${
            isMax 
              ? 'bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 text-foreground backdrop-blur-sm' 
              : 'bg-secondary/80 text-secondary-foreground backdrop-blur-sm'
          }`}
        >
          <p className="text-sm leading-relaxed break-words">{message}</p>
        </div>
      </div>
    </div>
  );
}

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
      <Avatar className={`h-12 w-12 flex-shrink-0 ${isMax ? 'ring-3 ring-primary/40 ring-offset-2 ring-offset-background' : 'ring-2 ring-secondary/50 ring-offset-2 ring-offset-background'}`}>
        {isMax ? (
          <>
            <AvatarImage src={maxAvatar} alt="Max" className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-primary/40 to-primary/20">
              <Bot className="h-6 w-6 text-primary" />
            </AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-secondary to-secondary/80">
            <User className="h-6 w-6 text-secondary-foreground" />
          </AvatarFallback>
        )}
      </Avatar>

      <div className={`flex flex-col gap-2 max-w-[75%] ${isMax ? 'items-start' : 'items-end'}`}>
        <div className="flex items-center gap-2 px-2">
          <span className={`text-sm font-black ${isMax ? 'text-primary' : 'text-foreground'}`}>
            {isMax ? 'Max AI' : username || 'Anonymous'}
          </span>
          <span className="text-xs text-muted-foreground font-medium">{timestamp}</span>
        </div>
        
        <div 
          className={`rounded-3xl px-5 py-3.5 shadow-lg border-2 ${
            isMax 
              ? 'bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 border-primary/40 text-foreground' 
              : 'bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 border-secondary-foreground/20 text-secondary-foreground'
          }`}
        >
          <p className="text-sm font-medium leading-relaxed break-words">{message}</p>
        </div>
      </div>
    </div>
  );
}

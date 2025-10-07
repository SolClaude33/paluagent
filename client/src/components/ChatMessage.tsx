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
      <Avatar className={`h-12 w-12 flex-shrink-0 ${isMax ? 'ring-4 ring-primary ring-offset-2 ring-offset-background shadow-lg' : 'ring-4 ring-secondary ring-offset-2 ring-offset-background shadow-lg'}`}>
        {isMax ? (
          <>
            <AvatarImage src={maxAvatar} alt="Max" className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-secondary to-secondary/90">
            <User className="h-6 w-6 text-white" />
          </AvatarFallback>
        )}
      </Avatar>

      <div className={`flex flex-col gap-2 max-w-[75%] ${isMax ? 'items-start' : 'items-end'}`}>
        <div className="flex items-center gap-2 px-2">
          <span className={`text-sm font-black ${isMax ? 'text-primary' : 'text-secondary'}`}>
            {isMax ? 'Max AI' : username || 'Anonymous'}
          </span>
          <span className="text-xs text-muted-foreground font-bold">{timestamp}</span>
        </div>
        
        <div 
          className={`rounded-3xl px-5 py-3.5 shadow-xl border-2 ${
            isMax 
              ? 'bg-gradient-to-br from-accent/80 via-accent/60 to-accent/40 border-accent text-accent-foreground' 
              : 'bg-gradient-to-br from-secondary to-secondary/90 border-secondary/60 text-white'
          }`}
        >
          <p className="text-sm font-bold leading-relaxed break-words">{message}</p>
        </div>
      </div>
    </div>
  );
}

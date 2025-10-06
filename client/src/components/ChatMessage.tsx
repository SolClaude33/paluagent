import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      className={`flex gap-3 ${isMax ? '' : 'flex-row-reverse'} animate-in slide-in-from-bottom-2 duration-200`}
      data-testid={`message-${sender}`}
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        {isMax ? (
          <>
            <AvatarImage src="/attached_assets/image_1759775310846.png" alt="Max" />
            <AvatarFallback className="bg-primary/20 text-primary font-semibold">M</AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            {username?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        )}
      </Avatar>

      <div className={`flex flex-col gap-1 max-w-[75%] ${isMax ? 'items-start' : 'items-end'}`}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground">
            {isMax ? 'Max' : username || 'Anonymous'}
          </span>
          <span className="text-[10px] text-muted-foreground">{timestamp}</span>
        </div>
        
        <div 
          className={`rounded-lg px-4 py-2.5 ${
            isMax 
              ? 'bg-accent/30 border border-accent-foreground/10 text-accent-foreground' 
              : 'bg-secondary text-secondary-foreground'
          }`}
        >
          <p className="text-sm leading-relaxed break-words">{message}</p>
        </div>
      </div>
    </div>
  );
}

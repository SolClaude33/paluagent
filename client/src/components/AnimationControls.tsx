import { Button } from "@/components/ui/button";
import { Smile, Brain, PartyPopper, Frown, CircleDot } from "lucide-react";
import type { EmotionType } from "@shared/schema";

interface AnimationControlsProps {
  onEmotionChange: (emotion: EmotionType) => void;
  currentEmotion: EmotionType;
}

export default function AnimationControls({ onEmotionChange, currentEmotion }: AnimationControlsProps) {
  const emotions: { type: EmotionType; label: string; icon: React.ReactNode; color: string }[] = [
    { type: 'idle', label: 'Idle', icon: <CircleDot className="h-4 w-4" />, color: 'text-gray-400' },
    { type: 'talking', label: 'Talking', icon: <Smile className="h-4 w-4" />, color: 'text-blue-400' },
    { type: 'thinking', label: 'Thinking', icon: <Brain className="h-4 w-4" />, color: 'text-purple-400' },
    { type: 'celebrating', label: 'Happy', icon: <PartyPopper className="h-4 w-4" />, color: 'text-green-400' },
    { type: 'angry', label: 'Angry', icon: <Frown className="h-4 w-4" />, color: 'text-red-400' },
  ];

  return (
    <div className="bg-black/70 backdrop-blur-xl border border-primary/30 rounded-2xl p-4 shadow-2xl shadow-primary/20">
      <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 font-[Space_Grotesk]">
        Animation Controls
      </h3>
      <div className="flex flex-wrap gap-2">
        {emotions.map((emotion) => (
          <Button
            key={emotion.type}
            variant={currentEmotion === emotion.type ? "default" : "outline"}
            size="sm"
            className={`gap-2 ${
              currentEmotion === emotion.type
                ? 'bg-primary/20 border-primary text-primary hover:bg-primary/30'
                : 'bg-black/50 border-primary/30 text-foreground hover:bg-black/70'
            }`}
            onClick={() => onEmotionChange(emotion.type)}
            data-testid={`button-animation-${emotion.type}`}
          >
            <span className={emotion.color}>{emotion.icon}</span>
            <span className="text-xs font-semibold">{emotion.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

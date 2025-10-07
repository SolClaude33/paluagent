import { Button } from "@/components/ui/button";
import { Smile, Brain, PartyPopper, Frown, CircleDot } from "lucide-react";
import type { EmotionType } from "@shared/schema";

interface AnimationControlsProps {
  onEmotionChange: (emotion: EmotionType) => void;
  currentEmotion: EmotionType;
}

export default function AnimationControls({ onEmotionChange, currentEmotion }: AnimationControlsProps) {
  const emotions: { type: EmotionType; label: string; icon: React.ReactNode; bgColor: string; activeBg: string; inactiveColor: string }[] = [
    { type: 'idle', label: 'Idle', icon: <CircleDot className="h-5 w-5" />, bgColor: 'border-gray-600', activeBg: 'bg-gray-500', inactiveColor: 'text-gray-600' },
    { type: 'talking', label: 'Talking', icon: <Smile className="h-5 w-5" />, bgColor: 'border-blue-600', activeBg: 'bg-blue-500', inactiveColor: 'text-blue-600' },
    { type: 'thinking', label: 'Thinking', icon: <Brain className="h-5 w-5" />, bgColor: 'border-purple-600', activeBg: 'bg-purple-500', inactiveColor: 'text-purple-600' },
    { type: 'celebrating', label: 'Happy', icon: <PartyPopper className="h-5 w-5" />, bgColor: 'border-green-600', activeBg: 'bg-green-500', inactiveColor: 'text-green-600' },
    { type: 'angry', label: 'Angry', icon: <Frown className="h-5 w-5" />, bgColor: 'border-red-600', activeBg: 'bg-red-500', inactiveColor: 'text-red-600' },
  ];

  return (
    <div className="bg-gradient-to-br from-white via-card to-white backdrop-blur-xl border-4 border-primary/50 rounded-3xl p-5 shadow-2xl">
      <h3 className="text-sm font-black bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent uppercase tracking-wide mb-4 font-[Space_Grotesk]">
        Animation Controls
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {emotions.map((emotion) => (
          <Button
            key={emotion.type}
            variant="outline"
            size="sm"
            className={`gap-2 border-2 rounded-2xl px-4 py-2.5 font-bold transition-all shadow-lg ${
              currentEmotion === emotion.type
                ? `${emotion.activeBg} ${emotion.bgColor} text-white scale-110 ring-4 ring-offset-2 ring-offset-white`
                : `bg-white/90 ${emotion.bgColor} ${emotion.inactiveColor} hover:scale-105`
            }`}
            onClick={() => onEmotionChange(emotion.type)}
            data-testid={`button-animation-${emotion.type}`}
          >
            {emotion.icon}
            <span className="text-sm font-black">{emotion.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

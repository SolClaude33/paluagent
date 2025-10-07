import { Button } from "@/components/ui/button";
import { Smile, Brain, PartyPopper, Frown, CircleDot } from "lucide-react";
import type { EmotionType } from "@shared/schema";

interface AnimationControlsProps {
  onEmotionChange: (emotion: EmotionType) => void;
  currentEmotion: EmotionType;
}

export default function AnimationControls({ onEmotionChange, currentEmotion }: AnimationControlsProps) {
  const emotions: { type: EmotionType; label: string; icon: React.ReactNode; bgColor: string; textColor: string }[] = [
    { type: 'idle', label: 'Idle', icon: <CircleDot className="h-5 w-5" />, bgColor: 'bg-gray-200 hover:bg-gray-300 border-gray-300', textColor: 'text-gray-700' },
    { type: 'talking', label: 'Talking', icon: <Smile className="h-5 w-5" />, bgColor: 'bg-blue-200 hover:bg-blue-300 border-blue-300', textColor: 'text-blue-700' },
    { type: 'thinking', label: 'Thinking', icon: <Brain className="h-5 w-5" />, bgColor: 'bg-purple-200 hover:bg-purple-300 border-purple-300', textColor: 'text-purple-700' },
    { type: 'celebrating', label: 'Happy', icon: <PartyPopper className="h-5 w-5" />, bgColor: 'bg-green-200 hover:bg-green-300 border-green-300', textColor: 'text-green-700' },
    { type: 'angry', label: 'Angry', icon: <Frown className="h-5 w-5" />, bgColor: 'bg-red-200 hover:bg-red-300 border-red-300', textColor: 'text-red-700' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-xl border-2 border-primary/40 rounded-3xl p-5 shadow-2xl">
      <h3 className="text-sm font-black text-primary uppercase tracking-wide mb-4 font-[Space_Grotesk]">
        Animation Controls
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {emotions.map((emotion) => (
          <Button
            key={emotion.type}
            variant="outline"
            size="sm"
            className={`gap-2 border-2 rounded-2xl px-4 py-2 font-bold transition-all ${
              currentEmotion === emotion.type
                ? `${emotion.bgColor} ${emotion.textColor} scale-105 shadow-lg`
                : `bg-white ${emotion.textColor} opacity-70 hover:opacity-100`
            }`}
            onClick={() => onEmotionChange(emotion.type)}
            data-testid={`button-animation-${emotion.type}`}
          >
            {emotion.icon}
            <span className="text-sm">{emotion.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

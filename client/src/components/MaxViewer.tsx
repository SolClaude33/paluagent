import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

interface MaxViewerProps {
  isThinking?: boolean;
  isSpeaking?: boolean;
}

export default function MaxViewer({ isThinking = false, isSpeaking = false }: MaxViewerProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setPulse(p => !p);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isSpeaking]);

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-black via-neutral-950 to-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(240,185,11,0.03),transparent_50%)]" />
      
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full" data-testid="badge-live">
          <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
          <span className="text-white text-xs font-semibold uppercase tracking-wide">LIVE</span>
        </div>
      </div>

      {isThinking && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/30" data-testid="status-thinking">
            <Activity className="h-3 w-3 text-primary animate-pulse" />
            <span className="text-primary text-xs font-medium">Thinking...</span>
          </div>
        </div>
      )}

      <div className="relative" data-testid="model-max">
        <div 
          className={`relative transition-all duration-300 ${
            isSpeaking ? 'scale-105' : 'scale-100'
          }`}
          style={{
            filter: isSpeaking 
              ? `drop-shadow(0 0 ${pulse ? '30px' : '20px'} rgba(240, 185, 11, 0.4))`
              : 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))'
          }}
        >
          <img 
            src="/attached_assets/image_1759775310846.png"
            alt="Max the AI Rabbit"
            className="h-[400px] w-auto md:h-[500px] lg:h-[600px] object-contain"
          />
        </div>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-2 bg-black/50 rounded-full blur-xl" />
      </div>

      {isSpeaking && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1" data-testid="audio-waves">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animation: `pulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

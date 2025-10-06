import { useState } from "react";
import StreamHeader from "@/components/StreamHeader";
import MaxViewer from "@/components/MaxViewer";
import ChatPanel from "@/components/ChatPanel";
import ApiKeyInfo from "@/components/ApiKeyInfo";
import { Button } from "@/components/ui/button";
import { Info, X } from "lucide-react";

export default function StreamPage() {
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showApiInfo, setShowApiInfo] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-black">
      <StreamHeader />
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 w-full lg:w-[70%] relative">
          <MaxViewer isThinking={isThinking} isSpeaking={isSpeaking} />
          
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-6 left-6 gap-2 bg-black/50 backdrop-blur-md border-primary/30 hover:bg-black/70 hover-elevate z-20"
            onClick={() => setShowApiInfo(!showApiInfo)}
            data-testid="button-api-info"
          >
            <Info className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">¿Cómo obtener API Keys?</span>
          </Button>
        </div>
        
        <div className="hidden lg:block w-[30%] min-w-[320px] max-w-[420px]">
          <ChatPanel 
            onMaxThinking={setIsThinking}
            onMaxSpeaking={setIsSpeaking}
          />
        </div>
      </div>

      {showApiInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative max-w-2xl w-full animate-in zoom-in-95 duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/10"
              onClick={() => setShowApiInfo(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <ApiKeyInfo />
          </div>
        </div>
      )}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[45vh] border-t border-primary/20 bg-gradient-to-b from-black to-neutral-950 z-40">
        <ChatPanel 
          onMaxThinking={setIsThinking}
          onMaxSpeaking={setIsSpeaking}
        />
      </div>
    </div>
  );
}

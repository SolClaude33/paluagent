import { useState } from "react";
import StreamHeader from "@/components/StreamHeader";
import Max3DViewer from "@/components/Max3DViewer";
import ChatPanel from "@/components/ChatPanel";
import ContractAddress from "@/components/ContractAddress";
import AnimationControls from "@/components/AnimationControls";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function StreamPage() {
  const [showContractInfo, setShowContractInfo] = useState(false);
  const { currentEmotion, sendEmotion } = useWebSocket('/ws');

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <StreamHeader />
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 w-full lg:w-[70%] relative">
          <Max3DViewer emotion={currentEmotion} />
          
          <div className="absolute bottom-8 left-8 flex flex-col gap-4 z-20">
            <AnimationControls onEmotionChange={sendEmotion} currentEmotion={currentEmotion} />
            
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-white/95 backdrop-blur-xl border-2 border-primary/40 hover:bg-white hover-elevate shadow-xl rounded-2xl px-5 py-3 font-bold text-primary"
              onClick={() => setShowContractInfo(!showContractInfo)}
              data-testid="button-contract-info"
            >
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-black">Contract Address</span>
            </Button>
          </div>
        </div>
        
        <div className="hidden lg:block w-[30%] min-w-[320px] max-w-[420px]">
          <ChatPanel />
        </div>
      </div>

      {showContractInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="relative max-w-3xl w-full animate-in zoom-in-95 duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-16 right-0 text-foreground hover:bg-card h-12 w-12 rounded-2xl border-2 border-primary/30 bg-white/90"
              onClick={() => setShowContractInfo(false)}
              data-testid="button-close-contract"
            >
              <X className="h-6 w-6" />
            </Button>
            <ContractAddress />
          </div>
        </div>
      )}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[45vh] border-t-2 border-primary/30 bg-gradient-to-b from-card to-background z-40">
        <ChatPanel />
      </div>
    </div>
  );
}

import { useState } from "react";
import StreamHeader from "@/components/StreamHeader";
import Max3DViewer from "@/components/Max3DViewer";
import ChatPanel from "@/components/ChatPanel";
import ContractAddress from "@/components/ContractAddress";
import AnimationControls from "@/components/AnimationControls";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import { useChat } from "@/hooks/useChat";

export default function StreamPage() {
  const [showContractInfo, setShowContractInfo] = useState(false);
  const { currentEmotion, sendEmotion } = useChat();

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <StreamHeader />
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 w-full lg:w-[70%] relative lg:border-r-4 lg:border-primary border-t-4 border-primary">
          <Max3DViewer emotion={currentEmotion} />
          
          <div className="absolute bottom-8 left-8 flex flex-col gap-3 z-20">
            <AnimationControls onEmotionChange={sendEmotion} currentEmotion={currentEmotion} />
            
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-primary border-2 border-primary hover:bg-primary/90 hover-elevate shadow-md rounded-xl px-4 py-2 font-bold text-primary-foreground"
              onClick={() => setShowContractInfo(!showContractInfo)}
              data-testid="button-contract-info"
            >
              <FileText className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm">Contract Address</span>
            </Button>
          </div>
        </div>
        
        <div className="hidden lg:block w-[30%] min-w-[320px] max-w-[420px] border-t-4 border-primary">
          <ChatPanel />
        </div>
      </div>

      {showContractInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative max-w-3xl w-full animate-in zoom-in-95 duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-foreground hover:bg-muted h-10 w-10 rounded-lg bg-white shadow-sm"
              onClick={() => setShowContractInfo(false)}
              data-testid="button-close-contract"
            >
              <X className="h-5 w-5" />
            </Button>
            <ContractAddress />
          </div>
        </div>
      )}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[45vh] border-t-2 border-border bg-white z-40">
        <ChatPanel />
      </div>
    </div>
  );
}

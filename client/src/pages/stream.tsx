import { useState } from "react";
import StreamHeader from "@/components/StreamHeader";
import Max3DViewer from "@/components/Max3DViewer";
import ChatPanel from "@/components/ChatPanel";
import ContractAddress from "@/components/ContractAddress";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function StreamPage() {
  const [showContractInfo, setShowContractInfo] = useState(false);
  const { currentEmotion } = useWebSocket('/ws');

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-black">
      <StreamHeader />
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 w-full lg:w-[70%] relative">
          <Max3DViewer emotion={currentEmotion} />
          
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-8 left-8 gap-2 bg-black/60 backdrop-blur-xl border-primary/40 hover:bg-black/80 hover-elevate z-20 shadow-xl shadow-primary/20"
            onClick={() => setShowContractInfo(!showContractInfo)}
            data-testid="button-contract-info"
          >
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-primary font-semibold">Contract Address</span>
          </Button>
        </div>
        
        <div className="hidden lg:block w-[30%] min-w-[320px] max-w-[420px]">
          <ChatPanel />
        </div>
      </div>

      {showContractInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-w-3xl w-full animate-in zoom-in-95 duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-14 right-0 text-white hover:bg-white/10 h-10 w-10"
              onClick={() => setShowContractInfo(false)}
              data-testid="button-close-contract"
            >
              <X className="h-6 w-6" />
            </Button>
            <ContractAddress />
          </div>
        </div>
      )}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[45vh] border-t border-primary/20 bg-gradient-to-b from-black to-neutral-950 z-40">
        <ChatPanel />
      </div>
    </div>
  );
}

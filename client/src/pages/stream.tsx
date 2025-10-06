import { useState } from "react";
import StreamHeader from "@/components/StreamHeader";
import MaxViewer from "@/components/MaxViewer";
import ChatPanel from "@/components/ChatPanel";

export default function StreamPage() {
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleMessageSent = (message: string) => {
    console.log('User message:', message);
    
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setIsSpeaking(true);
      
      setTimeout(() => {
        setIsSpeaking(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <StreamHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 w-full lg:w-[70%]">
          <MaxViewer isThinking={isThinking} isSpeaking={isSpeaking} />
        </div>
        
        <div className="hidden lg:block w-[30%] min-w-[320px] max-w-[400px]">
          <ChatPanel onMessageSent={handleMessageSent} />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[40vh] border-t border-border bg-card z-40">
        <ChatPanel onMessageSent={handleMessageSent} />
      </div>
    </div>
  );
}

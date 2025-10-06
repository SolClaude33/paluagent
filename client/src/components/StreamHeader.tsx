import { Button } from "@/components/ui/button";
import { Wallet, Sun, Moon, Zap } from "lucide-react";
import { useState } from "react";

export default function StreamHeader() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-black/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-primary via-yellow-400 to-primary/80 p-0.5 shadow-lg shadow-primary/30">
              <div className="h-full w-full rounded-[10px] bg-black flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary fill-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[Space_Grotesk] bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
                Max AI
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Powered by BNB Chain</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="hover-elevate active-elevate-2 h-10 w-10"
          >
            {isDark ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
          </Button>
          <Button
            variant="default"
            className="gap-2 bg-gradient-to-r from-primary to-yellow-400 text-black font-semibold hover:from-yellow-400 hover:to-primary transition-all shadow-lg shadow-primary/30"
            data-testid="button-connect-wallet"
            onClick={() => console.log("Connect wallet clicked")}
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Connect Wallet</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

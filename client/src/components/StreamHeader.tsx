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
    <header className="sticky top-0 z-50 border-b-4 border-primary/40 bg-gradient-to-r from-secondary/20 via-accent/20 to-primary/20 backdrop-blur-xl shadow-2xl">
      <div className="flex h-20 items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-3">
            <div className="relative h-14 w-14 rounded-3xl bg-gradient-to-br from-primary to-primary/90 p-0.5 shadow-xl ring-4 ring-primary/20">
              <div className="h-full w-full rounded-3xl bg-white flex items-center justify-center">
                <Zap className="h-7 w-7 text-primary fill-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black font-[Space_Grotesk] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Max AI
              </h1>
              <p className="text-xs text-foreground font-bold">Powered by BNB Chain</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="hover-elevate active-elevate-2 h-11 w-11 rounded-xl"
          >
            {isDark ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
          </Button>
          <Button
            variant="default"
            className="gap-2 bg-primary text-primary-foreground font-black hover:bg-primary/90 transition-all shadow-lg rounded-2xl px-5 py-2.5 border-2 border-primary/40"
            data-testid="button-connect-wallet"
            onClick={() => console.log("Connect wallet clicked")}
          >
            <Wallet className="h-5 w-5" />
            <span className="hidden sm:inline">Connect Wallet</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

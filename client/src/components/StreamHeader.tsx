import { Button } from "@/components/ui/button";
import { Wallet, Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function StreamHeader() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-primary font-bold font-[Space_Grotesk] text-lg">M</span>
            </div>
            <h1 className="text-lg font-semibold font-[Space_Grotesk] text-foreground">
              Max AI <span className="text-primary">Stream</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="hover-elevate active-elevate-2"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="default"
            className="gap-2"
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

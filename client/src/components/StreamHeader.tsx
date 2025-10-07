import { Button } from "@/components/ui/button";
import { Wallet, Sun, Moon, BookOpen } from "lucide-react";
import { useState } from "react";
import maxLogo from "@assets/generated_images/Max_AI_robotic_rabbit_logo_439e99f8.png";
import gigglesLogo from "@assets/image_1759802470289.png";

export default function StreamHeader() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="flex h-20 items-center justify-between px-6 md:px-8 gap-4">
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="relative flex items-center gap-3">
            <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-white shadow-md">
              <img src={maxLogo} alt="Max AI Logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-[Space_Grotesk] text-foreground flex items-center gap-2">
                Max AI
              </h1>
              <p className="text-xs text-muted-foreground font-semibold">Powered by BNB Chain & Giggles Academy</p>
              <p className="text-[10px] text-muted-foreground/80 font-medium italic mt-0.5">Inspired by Max from Giggles Academy</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-1">
          <Button
            variant="default"
            asChild
            className="gap-2 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg rounded-xl px-6 py-2.5 hover:scale-105"
            data-testid="button-know-more"
          >
            <a 
              href="https://www.giggleacademy.com/story/search/1?searchQuery=max&recommendation=RECENT&translateLanguage=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="h-5 w-5" />
              <span>Know More About Max</span>
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="hover-elevate active-elevate-2 h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="default"
            className="gap-2 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md rounded-xl px-5 py-2"
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

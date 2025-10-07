import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, FileText, Shield } from "lucide-react";
import { useState } from "react";

export default function ContractAddress() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "0x1234567890abcdef1234567890abcdef12345678";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-card via-card/95 to-card/90 border-primary/30 shadow-2xl shadow-primary/10">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/20">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2 font-[Space_Grotesk] bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">
              Smart Contract Address
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Interact with Max AI directly on the blockchain. This verified smart contract powers all AI interactions.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="p-5 rounded-xl bg-gradient-to-br from-background/80 to-background/60 border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Contract Address</p>
                <code className="text-sm font-mono text-foreground break-all bg-primary/10 px-3 py-2 rounded-lg block">
                  {contractAddress}
                </code>
              </div>
              <Button
                onClick={handleCopy}
                size="sm"
                variant="outline"
                className="gap-2 hover-elevate border-primary/30 bg-primary/5"
                data-testid="button-copy-address"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="p-4 rounded-xl bg-background/40 border border-primary/10">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-1">Verified & Audited</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This smart contract has been verified on BNB Chain and audited for security.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-xs text-foreground leading-relaxed">
              <strong className="text-primary">Network:</strong> BNB Smart Chain (BSC) • 
              <strong className="text-primary ml-2">Chain ID:</strong> 56
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
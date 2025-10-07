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
    <Card className="p-8 bg-gradient-to-br from-white via-card to-accent/10 border-4 border-primary/50 shadow-2xl rounded-3xl">
      <div className="space-y-6">
        <div className="flex items-start gap-5">
          <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-xl ring-4 ring-primary/30">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2 font-[Space_Grotesk]">
              Smart Contract Address
            </h3>
            <p className="text-sm text-foreground leading-relaxed font-bold">
              Interact with Max AI directly on the blockchain. This verified smart contract powers all AI interactions.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-accent/30 to-accent/20 border-2 border-primary/30 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-primary mb-3 font-black uppercase tracking-wider">Contract Address</p>
                <code className="text-sm font-mono text-foreground break-all bg-white px-4 py-3 rounded-2xl block font-bold border-2 border-primary/20">
                  {contractAddress}
                </code>
              </div>
              <Button
                onClick={handleCopy}
                size="sm"
                variant="outline"
                className="gap-2 hover-elevate border-2 border-primary/40 bg-primary/10 rounded-2xl px-4 py-2.5 font-bold"
                data-testid="button-copy-address"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="p-5 rounded-3xl bg-green-100 border-2 border-green-300">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-base text-green-700 mb-1">Verified & Audited</h4>
                <p className="text-sm text-green-700 leading-relaxed font-medium">
                  This smart contract has been verified on BNB Chain and audited for security.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30">
            <p className="text-sm text-foreground leading-relaxed font-bold">
              <span className="text-primary">Network:</span> BNB Smart Chain (BSC) • 
              <span className="text-primary ml-2">Chain ID:</span> 56
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
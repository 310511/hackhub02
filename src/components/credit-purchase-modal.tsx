// src/components/credit-purchase-modal.tsx

"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface CreditPackage {
  id: number;
  credits: number;
  price: number;
  bonus: number;
}

interface CreditPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: CreditPackage[];
  onPurchase: (packageId: number) => void;
}

export function CreditPurchaseModal({
  isOpen,
  onClose,
  packages,
  onPurchase,
}: CreditPurchaseModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const handlePurchase = () => {
    if (selectedPackage !== null) {
      onPurchase(selectedPackage);
      setSelectedPackage(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-2 border-cyan-500/30 rounded-lg max-w-md font-mono">
        <DialogHeader>
          <DialogTitle className="text-cyan-400 flex items-center gap-2">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Neuro Credit Packages
            </span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose a credit package to power your medical AI analysis
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPackage === pkg.id
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-cyan-500/20 hover:border-cyan-500/40"
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-xl font-bold text-cyan-400">
                    {pkg.credits.toLocaleString()} Credits
                  </div>
                  {pkg.bonus > 0 && (
                    <Badge className="bg-purple-500/20 text-purple-400">
                      + {pkg.bonus.toLocaleString()} Bonus
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-400">
                    ${pkg.price}
                  </div>
                  <div className="text-sm text-cyan-400">
                    ${(pkg.price / (pkg.credits + pkg.bonus)).toFixed(2)}/credit
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4 justify-end mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-cyan-500/20 hover:bg-cyan-300 hover:border-cyan-500/40"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePurchase}
            disabled={!selectedPackage}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50"
          >
            Purchase
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
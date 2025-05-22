// src/components/cyber-card.tsx
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CyberCardProps {
  className?: string;
  children: React.ReactNode;
  border?: boolean;
}

export const CyberCard = ({ 
  className, 
  children,
  border = true 
}: CyberCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      "rounded-xl bg-black/30 backdrop-blur-lg p-6 relative",
      border && "border border-cyan-500/30",
      "hover:shadow-[0_0_30px_-5px_rgba(0,242,254,0.3)] transition-all",
      className
    )}
    style={{ boxShadow: "0 0 15px rgba(0, 242, 254, 0.1)" }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
    {children}
  </motion.div>
);
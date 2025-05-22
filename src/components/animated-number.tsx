// src/components/animated-number.tsx
"use client";
import { motion } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  suffix?: string;
  duration?: number;
}

export const AnimatedNumber = ({ 
  value, 
  className, 
  suffix,
  duration = 1.5 
}: AnimatedNumberProps) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration }}
      key={value}
    >
      {value.toLocaleString()}
      {suffix && <span className="ml-1">{suffix}</span>}
    </motion.span>
  );
};
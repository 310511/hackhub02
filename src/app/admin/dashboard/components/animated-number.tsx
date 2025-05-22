// src/app/admin/dashboard/components/animated-number.tsx
"use client";
import { motion } from "framer-motion";

export const AnimatedNumber = ({ value }: { value: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {value.toFixed(1)}
  </motion.span>
);
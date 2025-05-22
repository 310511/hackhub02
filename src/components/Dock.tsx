"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type DockItem = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

type DockProps = {
  items: DockItem[];
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
};

export default function Dock({
  items,
  panelHeight = 60,
  baseItemSize = 40,
  magnification = 60,
}: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative flex items-end gap-2">
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: panelHeight }}
      />
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;

        return (
          <div
            key={index}
            className="relative z-10 flex flex-col items-center justify-end cursor-pointer group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={item.onClick}
            style={{ height: panelHeight }}
          >
            <motion.div
              animate={{
                width: isHovered ? magnification : baseItemSize,
                height: isHovered ? magnification : baseItemSize,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center rounded-full bg-HachathonHub-500 group-hover:bg-pink-500 transition-colors"
            >
              {item.icon}
            </motion.div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-[calc(100%+3px)] px-1 py-1 rounded-md text-xs bg-white text-black backdrop-blur-md"
                >
                  {item.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

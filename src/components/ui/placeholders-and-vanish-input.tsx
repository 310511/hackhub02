// src/components/ui/placeholders-and-vanish-input.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  className = "",
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  };
  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const styles = getComputedStyle(inputRef.current);
    const fontSize = parseFloat(styles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${styles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800).data;
    const newData: any[] = [];
    for (let y = 0; y < 800; y++) {
      for (let x = 0; x < 800; x++) {
        const idx = (y * 800 + x) * 4;
        if (
          imageData[idx] !== 0 ||
          imageData[idx + 1] !== 0 ||
          imageData[idx + 2] !== 0
        ) {
          newData.push({
            x,
            y,
            r: 1,
            color: `rgba(${imageData[idx]},${imageData[idx+1]},${imageData[idx+2]},${imageData[idx+3]})`,
          });
        }
      }
    }
    newDataRef.current = newData;
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (startX: number) => {
    const step = (pos = startX) => {
      requestAnimationFrame(() => {
        const arr: any[] = [];
        for (const pt of newDataRef.current) {
          if (pt.x < pos) continue;
          pt.x += Math.random() > 0.5 ? 1 : -1;
          pt.y += Math.random() > 0.5 ? 1 : -1;
          pt.r = Math.max(0, pt.r - 0.05 * Math.random());
          if (pt.r > 0) arr.push(pt);
        }
        newDataRef.current = arr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          for (const pt of arr) {
            ctx.fillStyle = pt.color;
            ctx.fillRect(pt.x, pt.y, pt.r, pt.r);
          }
        }
        if (arr.length) step(pos - 8);
        else {
          setAnimating(false);
          setValue("");
        }
      });
    };
    step();
  };

  const vanishAndSubmit = () => {
    if (animating) return;
    setAnimating(true);
    draw();
    const maxX = newDataRef.current.reduce((m, p) => Math.max(m, p.x), 0);
    animate(maxX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") vanishAndSubmit();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full relative max-w-xl mx-auto h-12 rounded-full overflow-hidden transition-all duration-200",
        // dark/neon base:
        "bg-black/50 border-2 border-cyan-400/30",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 pointer-events-none scale-50 origin-top-left",
          animating ? "opacity-100" : "opacity-0"
        )}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            onChange(e);
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder=""
        className={cn(
          "w-full h-full bg-transparent border-none pl-4 sm:pl-10 pr-12 text-cyan-300 placeholder-cyan-500/70 focus:outline-none",
          animating && "text-transparent"
        )}
      />
      <button
        type="submit"
        disabled={!value || animating}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-cyan-500/20 disabled:opacity-50"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4 stroke-cyan-300"
          initial={{ strokeDashoffset: "50%" }}
          animate={{ strokeDashoffset: value ? 0 : "50%" }}
          transition={{ duration: 0.3, ease: "linear" }}
        >
          <path d="M5 12h14" />
          <path d="M13 18l6-6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              key={currentPlaceholder}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pl-4 sm:pl-10 text-cyan-400 truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

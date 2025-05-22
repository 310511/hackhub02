import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "font-['Lilita_One'] group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-11 text-lg font-medium text-white backdrop-blur-md transition-all duration-200 hover:border-HachathonHub-500 hover:bg-HachathonHub-500/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-HachathonHub-500 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {/* Initial Text */}
      <span className="inline-block translate-x-0 opacity-100 transition-all duration-400 ease-in-out group-hover:translate-x-16 group-hover:opacity-0">
        Ready?
      </span>

      {/* Hover Content */}
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-16 scale-95 items-center justify-center gap-2 text-white opacity-0 transition-all duration-400 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:scale-100">
        <span className="text-lg">Get Started</span>
        <ArrowRight className="h-4 w-4" />
      </div>

      {/* Magical Blob */}
      <div className="absolute left-[25%] top-[45%] h-2 w-2 scale-100 rounded-xl bg-HachathonHub-500 opacity-10 blur-md transition-all duration-500 ease-out group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[2] group-hover:opacity-20" />
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };

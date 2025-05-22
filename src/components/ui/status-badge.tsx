import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

const statusBadgeVariants = cva(
  "inline-flex items-center gap-x-2 rounded-full px-2 py-1 backdrop-blur-md bg-black/40 border border-white/10 text-sm",
  {
    variants: {
      status: {
        success: "",
        error: "",
        default: "",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
)

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  leftIcon?: IconType
  rightIcon?: IconType
  leftLabel: string
  rightLabel: string
}

export function StatusBadge({
  className,
  status,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftLabel,
  rightLabel,
  ...props
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)} {...props}>
      <span className="inline-flex items-center gap-1 text-white font-medium">
        {LeftIcon && (
          <LeftIcon
            className={cn(
              "size-3.5",
              status === "success" && "text-emerald-400",
              status === "error" && "text-red-400"
            )}
            aria-hidden
          />
        )}
        {leftLabel}
      </span>
      <span className="h-3.5 w-px bg-white/20" />
      <span className="inline-flex items-center gap-1 text-white/70">
        {RightIcon && <RightIcon className="size-3.5" aria-hidden />}
        {rightLabel}
      </span>
    </span>
  )
}

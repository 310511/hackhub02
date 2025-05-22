"use client";
import React, { ReactNode, useMemo } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  distance?: number;
  animateChildren?: boolean;
}

export function AnimateOnView({
  children,
  className = "",
  stagger = 0.03,
  delay = 0.02,
  distance = 5,
  animateChildren = true,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  const parentVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delay: shouldReduceMotion ? 0 : delay,
          staggerChildren: animateChildren && !shouldReduceMotion ? stagger : 0,
          delayChildren: shouldReduceMotion ? 0 : delay,
        },
      },
    }),
    [shouldReduceMotion, delay, stagger, animateChildren]
  );

  const childVariants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: shouldReduceMotion ? 1 : 0,
        y: shouldReduceMotion ? 0 : distance,
        scale: shouldReduceMotion ? 1 : 0.98,
        filter: "blur(0px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.3,
          ease: "easeOut",
          scale: { type: "spring", mass: 0.4, stiffness: 200 },
        },
      },
    }),
    [shouldReduceMotion, distance]
  );

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={parentVariants}
      style={
        {
          // hints for GPU acceleration
        }
      }
    >
      {/* Option: Group children in a single motion.div if animateChildren false */}
      {animateChildren ? (
        React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            variants={childVariants}
            style={{ willChange: "opacity, transform" }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          variants={childVariants}
          style={{ willChange: "opacity, transform" }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

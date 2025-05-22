"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Shield,
  Lock,
  Brain,
  UserPlus,
  Server,
  Database,
  Play,
  Pause,
} from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  tooltip: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
}

const features = [
  {
    title: "PRIVACY-PRESERVING ML",
    description:
      "Our federated learning approach keeps patient data secure within hospital premises while enabling collaborative model training.",
    icon: <Shield className="h-8 w-8 text-cyan-400" />,
    label: "Privacy",
    tooltip: "Federated training without moving data",
    image: "/feature1.jpg",
  },
  {
    title: "ADVANCED ENCRYPTION",
    description:
      "Hospital contributions are encrypted with state-of-the-art methods, ensuring complete privacy of sensitive medical data.",
    icon: <Lock className="h-8 w-8 text-cyan-400" />,
    label: "Encryption",
    tooltip: "End-to-end secure data flow",
    image: "/feature2.jpg",
  },
  {
    title: "AI-BASED DIAGNOSIS",
    description:
      "Access cutting-edge ML models for symptom analysis, medical imaging diagnostics, and predictive healthcare insights.",
    icon: <Brain className="h-8 w-8 text-cyan-400" />,
    label: "Diagnosis",
    tooltip: "AI-based predictive analysis",
    image: "/feature3.jpg",
  },
  {
    title: "HOSPITAL NETWORK",
    description:
      "Join our growing community of healthcare institutions collaborating to improve medical AI for everyone.",
    icon: <UserPlus className="h-8 w-8 text-cyan-400" />,
    label: "Network",
    tooltip: "Collaborative hospital network",
    image: "/feature4.svg",
  },
  {
    title: "DISTRIBUTED INFRASTRUCTURE",
    description:
      "Our system architecture ensures resilience, reliability, and performance at scale for mission-critical healthcare applications.",
    icon: <Server className="h-8 w-8 text-cyan-400" />,
    label: "Infra",
    tooltip: "Distributed backend architecture",
    image: "/feature5.jpg",
  },
  {
    title: "COMPREHENSIVE ANALYTICS",
    description:
      "Gain insights into model performance, data contributions, and the impact of your participation in federated learning.",
    icon: <Database className="h-7 w-7 text-cyan-400" />,
    label: "Analytics",
    tooltip: "Track model usage and metrics",
    image: "/feature6.jpg",
  },
].map((feature) => ({
  ...feature,
  title: <span className="font-['Kagitingan'] text-3xl">{feature.title}</span>,
}));

const defaultTabs: Tab[] = features.map((feature, index) => ({
  id: `tab${index + 1}`,
  label: feature.label,
  icon: feature.icon,
  tooltip: feature.tooltip,
  content: (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="relative w-full h-52 md:h-64 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.1)]">
        <Image
          src={feature.image}
          alt={typeof feature.title === "string" ? feature.title : "Feature Image"}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 text-white">
        <div className="flex items-center gap-2">
          {feature.icon}
          <h3 className="text-xl font-bold tracking-wide">{feature.title}</h3>
        </div>
        <p className="text-lg text-gray-300 text-center md:text-left">
          {feature.description}
        </p>
      </div>
    </div>
  ),
}));

const AnimatedTabs = ({
  tabs = defaultTabs,
  defaultTab,
  className,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);
  const [autoScroll, setAutoScroll] = useState<boolean>(false);

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll) return;
    const interval = setInterval(() => {
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoScroll, activeTab, tabs]);

  return (
    <div
      className={cn("w-full max-w-5xl mx-auto flex flex-col gap-6", className)}
    >
      {/* Tab Buttons */}
      <div className="relative flex gap-2 flex-wrap items-center justify-between bg-gradient-to-br from-[#1b1b2f]/80 via-[#0e0e20]/80 to-[#0a0a14]/90 p-3 rounded-xl border border-cyan-400/20 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.08)] overflow-hidden">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              title={tab.tooltip}
              className={cn(
                "relative px-4 py-2 flex items-center gap-2 text-sm font-semibold rounded-md transition z-10 hover:text-cyan-400 text-white",
                activeTab === tab.id ? "text-cyan-400" : "text-gray-400"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-cyan-400/10 border border-cyan-300/20 backdrop-blur-sm rounded-md shadow-[0_0_20px_#00ffff66]"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Auto-scroll toggle */}
        <button
          onClick={() => setAutoScroll((prev) => !prev)}
          className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-cyan-300 transition"
        >
          {autoScroll ? <Pause size={16} /> : <Play size={16} />}
          {autoScroll ? "Stop Auto-Slide" : "Start Auto-Slide"}
        </button>
      </div>

      {/* Tab Content */}
      <div className="relative p-6 rounded-xl bg-gradient-to-br from-[#0e0e1a] via-[#121222] to-[#0c0c18] border border-cyan-400/20 backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,255,0.07)] overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.03),transparent_60%)] before:blur-xl before:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_bottom_right,_rgba(0,136,255,0.03),transparent_60%)] after:blur-2xl after:content-[''] min-h-[200px]">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  x: -15,
                  filter: "blur(10px)",
                }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, x: -15, filter: "blur(10px)" }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  type: "spring",
                }}
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };

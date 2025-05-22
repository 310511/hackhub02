"use client";
import { useState, useEffect, useContext, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LineChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Area,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/layout/Navbar";
import {
  BrainCircuit,
  CircuitBoard,
  Cpu,
  Database,
  Network,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ExperimentRun, ModelVersion, NodeStatus } from "@/types/index";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { AnimatedNumber } from "./components/animated-number";
import { SessionContext } from "@/utils/supabase/usercontext";
import dynamic from "next/dynamic";

const ClusterMap = dynamic(() => import("./components/cluster-map").then(mod => mod.default), {
  ssr: false,
});

const CYBER_COLORS = ["#00f2fe", "#4facfe", "#8e44ad", "#ff6b6b", "#1dd1a1"];
const GLOW_STYLES = { boxShadow: "0 0 15px rgba(0, 242, 254, 0.3)" };

// Mock data generators
const generateExperimentRuns = (count: number): ExperimentRun[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `run-${i}`,
    name: `Experiment ${i + 1}`,
    status: ["Running", "Completed", "Failed"][Math.floor(Math.random() * 3)],
    accuracy: Math.random() * 95 + 5,
    loss: Math.random() * 2,
    duration: Math.random() * 3600 + 600,
    timestamp: new Date(Date.now() - Math.random() * 7 * 86400000),
    params: {
      learning_rate: Math.random() * 0.1,
      batch_size: [32, 64, 128][Math.floor(Math.random() * 3)],
      epochs: Math.floor(Math.random() * 100) + 20,
    },
  }));

const generateNodeStatus = (count: number): NodeStatus[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `node-${i}`,
    name: `Node ${String.fromCharCode(65 + i)}`,
    status: ["active", "idle", "error"][Math.floor(Math.random() * 3)],
    location: {
      lat: 51.5074 + (Math.random() - 0.5) * 10,
      lng: -0.1278 + (Math.random() - 0.5) * 10,
    },
    throughput: Math.random() * 500 + 100,
    lastPing: Date.now() - Math.random() * 60000,
  }));

export default function AdminDashboard() {
  const [experimentRuns, setExperimentRuns] = useState<ExperimentRun[]>([]);
  const [nodes, setNodes] = useState<NodeStatus[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionData = useContext(SessionContext);
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [aggregationStatus, setAggregationStatus] = useState<
    "idle" | "aggregating" | "completed"
  >("idle");



  const modelVersions: ModelVersion[] = [
    {
      version: "LLM-v2.1",
      name: "LLM Symptom Analysis",
      type: "NLP",
      accuracy: 89.3,
      params: "mixtral-8x7b",
      lastUpdated: "2h ago",
    },
    {
      version: "XRAY-v3.2",
      name: "Pneumonia X-Ray",
      type: "CV",
      accuracy: 92.7,
      params: "ResNet-152",
      lastUpdated: "6h ago",
    },
    {
      version: "CANCER-v1.0",
      name: "Breast Cancer",
      type: "Histopathology",
      accuracy: 91.4,
      params: "Mammography",
      lastUpdated: "8h ago",
    },
    {
      version: "ECG-v1.4",
      name: "ECG Analysis",
      type: "Time Series",
      accuracy: 94.1,
      params: "GraphRAG-CNN",
      lastUpdated: "4h ago",
    },
  ];

  const resourceUsage = {
    cpu: Math.random() * 80 + 20,
    memory: Math.random() * 70 + 30,
    network: Math.random() * 90 + 10,
  };

  const performanceMetrics = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    accuracy: 80 + Math.sin(i / 2) * 15,
    latency: 50 + Math.cos(i / 3) * 40,
  }));

  const handleAggregation = async () => {
    setAggregationStatus("aggregating");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setAggregationStatus("completed");
    setTimeout(() => setAggregationStatus("idle"), 5000);
  };

  useEffect(() => {
    setIsLoaded(true);
    setExperimentRuns(generateExperimentRuns(10));
    setNodes(generateNodeStatus(8));
  }, []);

  useEffect(() => {
    console.log("Running in browser?", typeof window !== "undefined");
  }, []);

  return (
    <main
    className={`min-h-screen ${
      isLoaded ? "opacity-100" : "opacity-0"
    } transition-opacity duration-500`}
  >
    <Navbar />
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 font-mono space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div className="flex items-center gap-4">
          <CircuitBoard className="w-10 h-10 text-cyan-400 animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            HachathonHub ADMIN DASHBOARD
          </h1>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 bg-black/50 border border-cyan-500/30">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-cyan-500"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="models"
              className="data-[state=active]:bg-purple-500"
            >
              Models
            </TabsTrigger>
            <TabsTrigger
              value="nodes"
              className="data-[state=active]:bg-green-500"
            >
              Nodes
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CyberCard className="border-cyan-500/30">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-cyan-400">Model Performance</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="text-cyan-400 border border-cyan-500/30"
                >
                  Last 24h
                </Button>
                <Button
                  variant="ghost"
                  className="text-purple-400 border border-purple-500/30"
                >
                  Compare
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceMetrics}>
                  <defs>
                    <linearGradient
                      id="accuracyGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00f2fe" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="hour" stroke="#4a5568" />
                  <YAxis stroke="#4a5568" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#00f2fe"
                    fillOpacity={1}
                    fill="url(#accuracyGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="latency"
                    stroke="#8e44ad"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </CyberCard>

          <CyberCard className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">
                Active Experiments
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <DataTable columns={columns} data={experimentRuns} />
            </CardContent>
          </CyberCard>
        </div>

        <div className="space-y-6">
          <CyberCard className="border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ResourceMeter
                label="CPU Utilization"
                value={resourceUsage.cpu}
                icon={<Cpu className="w-4 h-4" />}
              />
              <ResourceMeter
                label="Memory Allocation"
                value={resourceUsage.memory}
                icon={<Database className="w-4 h-4" />}
              />
              <ResourceMeter
                label="Network Throughput"
                value={resourceUsage.network}
                icon={<Network className="w-4 h-4" />}
              />
              <div className="pt-4 border-t border-cyan-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-cyan-300">Node Health</span>
                  <Badge
                    variant="outline"
                    className="border-green-500/30 text-green-400"
                  >
                    12/14 Nodes Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </CyberCard>

          <CyberCard className="border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Model Registry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {modelVersions.map((model) => (
                <div
                  key={model.version}
                  className="p-3 rounded-lg bg-black/20 border border-cyan-500/20"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4 text-purple-400" />
                        <span className="font-medium text-cyan-300">
                          {model.name}
                        </span>
                      </div>
                      <div className="text-xs text-cyan-500">
                        Accuracy: <AnimatedNumber value={model.accuracy} />%
                      </div>
                    </div>
                    <Badge className="bg-cyan-500/20 text-cyan-400">
                      {model.version}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </CyberCard>

          <CyberCard className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
            <CardHeader>
              <CardTitle className="text-purple-400">
                Federated Aggregation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-cyan-300">Consensus Nodes</span>
                  <Badge
                    variant="outline"
                    className="border-green-500/30 text-green-400"
                  >
                    12/12 Ready
                  </Badge>
                </div>
                <Progress
                  value={
                    aggregationStatus === "idle"
                      ? 0
                      : aggregationStatus === "aggregating"
                        ? 50
                        : 100
                  }
                  className={`h-2 bg-black/50 ${aggregationStatus === "aggregating"
                    ? "animate-pulse bg-cyan-500"
                    : aggregationStatus === "completed"
                      ? "bg-green-500"
                      : "bg-black/50"
                    }`}
                />
              </div>
              <Button
                className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 gap-2"
                onClick={handleAggregation}
                disabled={aggregationStatus !== "idle"}
              >
                <Zap className="w-4 h-4" />
                {aggregationStatus === "idle"
                  ? "Initialize Aggregation"
                  : aggregationStatus === "aggregating"
                    ? "Aggregating..."
                    : "Completed"}
              </Button>
            </CardContent>
          </CyberCard>
        </div>
      </div>

      <CyberCard className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">
            Global Node Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ClusterMap nodes={nodes} />
        </CardContent>
      </CyberCard>
    </div>
    </main>
  );
}

const CyberCard = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      "rounded-xl border bg-black/30 backdrop-blur-lg p-6 relative",
      "hover:border-cyan-500/40 transition-all duration-300",
      className
    )}
    style={GLOW_STYLES}
    {...props}
  >
    {children}
  </motion.div>
);

const ResourceMeter = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-sm text-cyan-300">
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
      <span>
        <AnimatedNumber value={value} />%
      </span>
    </div>
    <Progress
      value={value}
      className="h-2 bg-black/50 bg-gradient-to-r from-cyan-500 to-purple-500"
    />
  </div>
);

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-black/90 p-4 rounded-lg border border-cyan-500/30 backdrop-blur-xl">
      <p className="text-cyan-400 font-bold mb-2">
        Hour {payload[0]?.payload.hour}
      </p>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-500 rounded-full" />
          Accuracy:{" "}
          <span className="text-cyan-300">{payload[0]?.value.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full" />
          Latency:{" "}
          <span className="text-purple-300">
            {payload[1]?.value.toFixed(1)}ms
          </span>
        </div>
      </div>
    </div>
  );
};

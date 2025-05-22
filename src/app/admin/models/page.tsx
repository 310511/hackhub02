'use client';

import { useState, useEffect, useContext } from "react";
import { Circle, BrainCircuit } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";
import { SessionContext } from "@/utils/supabase/usercontext";

export default function Models() {
  type Model = {
    id: string;
    name: string;
    status: "trained" | "training" | "pending";
    accuracy?: number;
    f1_score?: number;
    precision_score?: number;
    recall_score?: number;
    updated_at: string;
  };
  
  const CyberCard = ({ className, ...props }: any) => (
    <Card className={`bg-black/50 border ${className}`} {...props} />
  );
  
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionData = useContext(SessionContext);
  const router = useRouter();
  const [models, setModels] = useState<Model[]>([
    {
      id: "1",
      name: "Breast Cancer Detection",
      status: "trained" as const,
      accuracy: 0.95,
      f1_score: 0.94,
      precision_score: 0.93,
      recall_score: 0.96,
      updated_at: "4/19/2025, 2:30:00 PM"
    },
    {
      id: "2",
      name: "Pneumonia X-Ray Detection",
      status: "trained" as const,
      accuracy: 0.92,
      f1_score: 0.91,
      precision_score: 0.90,
      recall_score: 0.93,
      updated_at: "4/16/2025, 3:20:00 PM"
    },
    {
      id: "3",
      name: "ECG Curve Analysis",
      status: "training" as const,
      accuracy: 0.89,
      f1_score: 0.88,
      precision_score: 0.87,
      recall_score: 0.90,
      updated_at: "4/18/2025, 11:45:00 AM"
    },
    {
      id: "4",
      name: "LLM Symptoms Analysis",
      status: "trained" as const,
      accuracy: 0.93,
      f1_score: 0.93,
      precision_score: 0.95,
      recall_score: 0.92,
      updated_at: "4/17/2025, 9:15:00 AM"
    },
    {
      id: "5",
      name: "Glaucoma Fundus Analysis",
      status: "training" as const,
      accuracy: 0.91,
      f1_score: 0.90,
      precision_score: 0.92,
      recall_score: 0.89,
      updated_at: "4/16/2025, 3:20:00 PM"
    },
    {
      id: "6",
      name: "Health Outcome Predictor",
      status: "pending" as const,
      accuracy: 0.86,
      f1_score: 0.85,
      precision_score: 0.87,
      recall_score: 0.84,
      updated_at: "4/16/2025, 3:20:00 PM"
    }
  ].sort((a, b) => {
    if (a.status === 'training') return -1;
    if (b.status === 'training') return 1;
    if (a.status === 'pending') return -1;
    if (b.status === 'pending') return 1;
    return 0;
  }));

  const [selectedTab, setSelectedTab] = useState("all");

  const handleApprove = (modelName: string) => {
    toast.success("Model Approved", {
      description: `${modelName} has been approved.`,
      duration: 3000,
    });
  };

  const handleRetrain = (modelId: string, modelName: string) => {
    setModels(prevModels => {
      const newModels = prevModels.map(model =>
        model.id === modelId
          ? { ...model, status: "pending" as const }
          : model
      ).sort((a, b) => {
        if (a.status === 'training') return -1;
        if (b.status === 'training') return 1;
        if (a.status === 'pending') return -1;
        if (b.status === 'pending') return 1;
        return 0;
      });
      return newModels;
    });

    toast.success(`${modelName} will be retrained shortly`, {
      description: "Model set to retrain successfully."
    });
  };

  const filteredModels = selectedTab === "all"
    ? models
    : models.filter(m => m.status === selectedTab);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main
      className={`min-h-screen ${isLoaded ? "opacity-100" : "opacity-0"
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
            <BrainCircuit className="w-10 h-10 text-cyan-400 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              ML MODELS DASHBOARD
            </h1>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-4 bg-black/50 border border-cyan-500/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-cyan-500">
                All
              </TabsTrigger>
              <TabsTrigger value="training" className="data-[state=active]:bg-emerald-500">
                Training
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-500">
                Pending
              </TabsTrigger>
              <TabsTrigger value="trained" className="data-[state=active]:bg-purple-500">
                Trained
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <CyberCard className="border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">ML Models</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-cyan-300">Status</TableHead>
                  <TableHead className="text-cyan-300">Model Name</TableHead>
                  <TableHead className="text-cyan-300">Metrics</TableHead>
                  <TableHead className="text-cyan-300">Last Trained</TableHead>
                  <TableHead className="text-cyan-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredModels.map((model) => (
                  <TableRow key={model.id} className="hover:bg-cyan-500/5">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Circle
                          fill="currentColor"
                          className={`h-3 w-3 fill-current ${model.status === "training"
                              ? "text-emerald-400 animate-pulse"
                              : model.status === "pending"
                                ? "text-yellow-400"
                                : "text-cyan-400"
                            }`}
                        />
                        <span
                          className={
                            model.status === "training"
                              ? "text-emerald-400"
                              : model.status === "pending"
                                ? "text-yellow-400"
                                : "text-cyan-400"
                          }
                        >
                          {model.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                        {model.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-xs">
                        {model.accuracy && (
                          <p className="text-emerald-400">Accuracy: {(model.accuracy * 100).toFixed(1)}%</p>
                        )}
                        {model.f1_score && (
                          <p className="text-cyan-400">F1 Score: {(model.f1_score * 100).toFixed(1)}%</p>
                        )}
                        {model.precision_score && (
                          <p className="text-purple-400">Precision: {(model.precision_score * 100).toFixed(1)}%</p>
                        )}
                        {model.recall_score && (
                          <p className="text-blue-400">Recall: {(model.recall_score * 100).toFixed(1)}%</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-cyan-300">
                      {model.updated_at || "Not trained yet"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleApprove(model.name)}
                          disabled={model.status === "training" || model.status === "pending"}
                          className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRetrain(model.id, model.name)}
                          disabled={model.status === "training" || model.status === "pending"}
                          className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                        >
                          Retrain
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </CyberCard>
      </div>
    </main>
  );
}
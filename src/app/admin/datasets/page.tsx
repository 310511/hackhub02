'use client';

import { useState, useEffect, useContext } from "react";
import { Circle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CircuitBoard, Database } from "lucide-react";
import { SessionContext } from "@/utils/supabase/usercontext";
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

export default function Datasets() {
  type Dataset = {
    id: string;
    name: string;
    description: string;
    data_provider: string;
    size_bytes: number;
    num_samples: number;
    data_type: string;
    metadata: any;
    status: "pending" | "approved";
    updated_at: string;
  };
  
  const CyberCard = ({ className, ...props }: any) => (
    <Card className={`bg-black/50 border ${className}`} {...props} />
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionData = useContext(SessionContext);
  const router = useRouter();
  const [datasets, setDatasets] = useState<Dataset[]>([
    {
      id: "1",
      name: "ECG",
      description: "Large-scale dataset of ECG readings for cardiac abnormality detection",
      data_provider: "aa450c71-3c39-4234-9647-b9f4d7a41671",
      size_bytes: 15000000000,
      num_samples: 10000,
      data_type: "tabular",
      metadata: { columns: ["heart_rate", "rhythm", "p_wave", "qrs_duration", "diagnosis"] },
      status: "pending" as const,
      updated_at: "4/19/2025, 2:30:00 PM"
    },
    {
      id: "2",
      name: "Chest X-Ray",
      description: "Comprehensive collection of chest X-rays for pneumonia detection",
      data_provider: "bb238a45-5d21-4912-8f37-a91c3d2e8f12",
      size_bytes: 8000000000,
      num_samples: 5000,
      data_type: "imagery",
      metadata: { columns: ["image", "diagnosis"] },
      status: "pending" as const,
      updated_at: "4/18/2025, 1:15:00 PM"
    },
    {
      id: "3",
      name: "Glaucoma FUNDUS data",
      description: "High-resolution fundus images for glaucoma detection",
      data_provider: "cc127d93-9e45-4789-b123-d4e5f6a789b0",
      size_bytes: 12000000000,
      num_samples: 7500,
      data_type: "imagery",
      metadata: { columns: ["image", "glaucoma_label"] },
      status: "pending" as const,
      updated_at: "4/17/2025, 11:45:00 AM"
    },
    {
      id: "4",
      name: "Breast Cancer Data",
      description: "Collection of tumor related data for cancer possibility analysis",
      data_provider: "dd901f34-7c56-4123-9456-e7f8g9h0i1j2",
      size_bytes: 20000000000,
      num_samples: 3000,
      data_type: "tabular",
      metadata: { columns: ["mean_radius", "mean_texture", "mean_smoothness", "mean_compactness", "diagnosis"] },
      status: "approved" as const,
      updated_at: "4/16/2025, 9:20:00 AM"
    }
  ].sort((a, b) => {
    if (a.status === 'pending') return -1;
    if (b.status === 'pending') return 1;
    return 0;
  }));

  const [selectedTab, setSelectedTab] = useState("all");

  const handleDisapprove = (datasetId: string, datasetName: string) => {
    setDatasets(prevDatasets => prevDatasets.filter(dataset => dataset.id !== datasetId));
    toast.success("Data removed successfully");
  };

  const handleApprove = (datasetId: string, datasetName: string) => {
    setDatasets(prevDatasets =>
      prevDatasets.map(dataset =>
        dataset.id === datasetId
          ? { ...dataset, status: "approved" }
          : dataset
      )
    );
    toast.success("Dataset has been approved");
  };

  const filteredDatasets = selectedTab === "all"
    ? datasets
    : datasets.filter(d => d.status === selectedTab);

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
            <Database className="w-10 h-10 text-cyan-400 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              DATASETS DASHBOARD
            </h1>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-3 bg-black/50 border border-cyan-500/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-cyan-500">
                All
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-500">
                Pending
              </TabsTrigger>
              <TabsTrigger value="approved" className="data-[state=active]:bg-green-500">
                Approved
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <CyberCard className="border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Available Datasets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-cyan-300">Status</TableHead>
                  <TableHead className="text-cyan-300 w-1/4">Dataset Info</TableHead>
                  <TableHead className="text-cyan-300">Data Type</TableHead>
                  <TableHead className="text-cyan-300">Size</TableHead>
                  <TableHead className="text-cyan-300">Samples</TableHead>
                  <TableHead className="text-cyan-300">Last Updated</TableHead>
                  <TableHead className="text-cyan-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDatasets.map((dataset) => (
                  <TableRow key={dataset.id} className="hover:bg-cyan-500/5">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Circle
                          fill="currentColor"
                          className={`h-3 w-3 fill-current ${dataset.status === "pending"
                              ? "text-yellow-400"
                              : dataset.status === "approved"
                                ? "text-green-400"
                                : "text-gray-600"
                            }`}
                        />
                        <span
                          className={
                            dataset.status === "pending"
                              ? "text-yellow-400"
                              : dataset.status === "approved"
                                ? "text-green-400"
                                : "text-gray-300"
                          }
                        >
                          {dataset.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-cyan-300 font-medium">{dataset.name}</p>
                        <p className="text-gray-400 text-sm">{dataset.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                        {dataset.data_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-cyan-300">{(dataset.size_bytes / 1000000000).toFixed(1)}GB</TableCell>
                    <TableCell className="text-cyan-300">{dataset.num_samples.toLocaleString()}</TableCell>
                    <TableCell className="text-cyan-300">{dataset.updated_at}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleApprove(dataset.id, dataset.name)}
                          disabled={dataset.status === "approved"}
                          className="border-green-500/40 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDisapprove(dataset.id, dataset.name)}
                          disabled={dataset.status === "approved"}
                          className="border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          Disapprove
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
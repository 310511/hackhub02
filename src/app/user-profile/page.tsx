// src/app/user-profile/page.tsx
//@ts-nocheck

"use client";
import { motion } from "framer-motion";
import {
  BarChart,
  PieChart,
  Bar,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect, useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import { SessionContext } from "@/utils/supabase/usercontext";
import { UserProfile as UserProfileType } from "@/utils/db_types";

import {
  User,
  Key,
  Clock,
  Phone,
  Building,
  CreditCard,
  Shield,
  QrCode,
  Edit,
  Cpu,
  Database,
  ShoppingCart,
  Zap,
  History,
  AlertCircle,
} from "lucide-react";
import { AnimatedNumber } from "@/components/animated-number";
import { CyberCard } from "@/components/cyber-card";
import { CreditPurchaseModal } from "@/components/credit-purchase-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const COLORS = ["#00f2fe", "#4facfe", "#8e44ad", "#ff6b6b", "#1dd1a1"];

// Credit packages
const CREDIT_PACKAGES = [
  { id: 1, credits: 500, price: 49.99, bonus: 0 },
  { id: 2, credits: 1000, price: 89.99, bonus: 100 },
  { id: 3, credits: 2500, price: 199.99, bonus: 500 },
  { id: 4, credits: 5000, price: 349.99, bonus: 1500 },
];

interface ModelUsage {
  model: string;
  uses: number;
  cost: number; 
}

interface Transaction {
  id: string;
  date: string;
  type: "purchase" | "usage";
  amount: number;
  description: string;
}

interface ExtendedUserProfile extends UserProfileType {
  uuid: string;
  security_status: string;
  credits: number;
  total_credits: number;
  model_usage: ModelUsage[];
  transactions: Transaction[];
  activity_log?: string[];
}

export default function UserProfile() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [userData, setUserData] = useState<ExtendedUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const { sessionData } = useContext(SessionContext);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUserData() {
      if (!sessionData.session?.user) return;

      try {
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", sessionData.session.user.id)
          .single();

        if (profileError) throw profileError;

        // Mock transactions (replace with actual data from your database)
        const mockTransactions = [
          {
            id: "1",
            date: "2025-03-15",
            type: "purchase",
            amount: 1000,
            description: "Credit Package Purchase",
          },
          {
            id: "2",
            date: "2025-03-14",
            type: "usage",
            amount: -50,
            description: "LLM Symptom Analysis",
          },
          {
            id: "3",
            date: "2025-03-13",
            type: "usage",
            amount: -75,
            description: "ECG Analysis",
          },
        ];

        setUserData({
          ...profile,
          credits: 1425,
          total_credits: 2000,
          model_usage: [
            { model: "LLM Symptom Analysis", uses: 45, cost: 200 },
            { model: "Pneumonia Detection", uses: 28, cost: 500 },
            { model: "Breast Cancer Screening", uses: 19, cost: 350 },
          ],
          uuid: sessionData.session.user.id,
          security_status: profile.role === "admin" ? "verified" : "standard",
          transactions: mockTransactions,
          activity_log: [
            "Logged in from New Device - Chrome, Windows",
            "Updated security settings",
            "Changed profile picture",
          ],
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [sessionData.session, supabase]);

  const handleCreditPurchase = async (packageId: number) => {
    try {
      const selectedPackage = CREDIT_PACKAGES.find((p) => p.id === packageId);
      if (!selectedPackage) throw new Error("Invalid package");

      setUserData((prev) =>
        prev
          ? {
              ...prev,
              credits:
                prev.credits + selectedPackage.credits + selectedPackage.bonus,
              transactions: [
                {
                  id: Date.now().toString(),
                  date: new Date().toISOString(),
                  type: "purchase",
                  amount: selectedPackage.credits + selectedPackage.bonus,
                  description: `Credit Purchase (${selectedPackage.credits} + ${selectedPackage.bonus} bonus)`,
                },
                ...prev.transactions,
              ],
            }
          : null
      );

      toast.success(
        `Successfully purchased ${selectedPackage.credits} credits!`
      );
      setPurchaseModalOpen(false);
    } catch (error) {
      console.error("Purchase failed:", error);
      toast.error("Credit purchase failed. Please try again.");
    }
  };

  if (loading || !userData) {
    return <ProfileSkeleton />;
  }

  const creditPercentage = (userData.credits / userData.total_credits) * 100;
  const usageData = userData.model_usage;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-mono space-y-8 ">
      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastClassName="font-mono bg-black border border-cyan-500/30"
        progressClassName="bg-gradient-to-r from-cyan-500 to-purple-500"
      />

      {/* Profile Header */}
      <CyberCard className="border-cyan-500/30">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
          <div className="relative group">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-1 shadow-[0_0_25px_-5px_rgba(0,242,254,0.5)]"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-black rounded-full p-2">
                <User className="w-full h-full text-cyan-400" />
              </div>
              <Button
                variant="ghost"
                className="absolute -bottom-2 right-0 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full p-2 shadow-glow-sm"
              >
                <Edit className="w-4 h-4 text-cyan-400" />
              </Button>
            </motion.div>
          </div>

          <div className="space-y-2 flex-1">
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {userData.full_name}
            </motion.h1>
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <span className="text-sm font-semibold">
                  {userData.role.charAt(0).toUpperCase() +
                    userData.role.slice(1)}
                </span>
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-sm">
                <Shield className="w-4 h-4 mr-2" />
                {userData.security_status.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Key className="w-4 h-4 text-cyan-400" />
              <span className="font-mono">{userData.uuid}</span>
            </div>
          </div>
        </div>
      </CyberCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identity Section */}
        <CyberCard className="border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">
              <Database className="inline-block w-5 h-5 mr-2" />
              DETAILS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow
              icon={<User />}
              label="User ID"
              value={userData.id || "N/A"}
            />
            <InfoRow
              icon={<Clock />}
              label="Member Since"
              value={
                userData.created_at
                  ? new Date(userData.created_at).toLocaleDateString()
                  : "N/A"
              }
            />
            <InfoRow
              icon={<Phone />}
              label="Contact"
              value={userData.phone || "N/A"}
            />
            <InfoRow
              icon={<Building />}
              label="Organization"
              value={userData.organization || "N/A"}
            />
          </CardContent>
        </CyberCard>

        {/* Credits Section */}
        <CyberCard className="border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-1">
              <Zap className="w-5 h-5" />
              NEURO CREDITS
              <Button
                size="sm"
                className="ml-auto bg-cyan-500/20 hover:bg-cyan-700 text-sm"
                onClick={() => setPurchaseModalOpen(true)}
              >
                <ShoppingCart className="w-4 h-4 mr-0" />
                Purchase
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-cyan-400">
                  <AnimatedNumber value={userData.credits} />
                </div>
                <div className="text-sm text-purple-400">
                  of {userData.total_credits} total credits
                </div>
              </div>
              <div className="relative">
                <CreditCard className="w-12 h-12 text-purple-400" />
                <div className="absolute inset-0 bg-purple-500/10 blur-md" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-cyan-300">
                <span>Credit Utilization</span>
                <span>{creditPercentage.toFixed(1)}%</span>
              </div>
              <div className="relative h-2 rounded-full bg-black/50 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${creditPercentage}%` }}
                  transition={{ duration: 1 }}
                  style={{ boxShadow: "0 0 15px rgba(0, 242, 254, 0.3)" }}
                />
              </div>
            </div>

            {/* Transaction History */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-cyan-300">
                <History className="w-4 h-4" />
                Recent Transactions
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {userData.transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    className="flex items-center justify-between p-2 bg-black/20 rounded-lg border border-cyan-500/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div>
                      <div className="text-sm text-cyan-300">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div
                      className={`text-sm ${
                        transaction.type === "purchase"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.type === "purchase" ? "+" : ""}
                      {transaction.amount}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </CyberCard>

        {/* Enhanced Security & Verification */}
        <CyberCard className="border-green-500/30 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              VERIFICATION STATUS
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-4">
                <div className="text-green-400">
                  <QrCode className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-sm text-green-300">
                    Institutional Verification
                  </div>
                  <div className="text-xs text-gray-400">
                    Scan QR code to verify credentials
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-black/20 rounded-lg border border-cyan-500/20">
              <div className="flex items-center gap-4">
                <AlertCircle className="w-8 h-8 text-cyan-400" />
                <div>
                  <div className="text-sm text-cyan-300">
                    Security Recommendations
                  </div>
                  <div className="text-xs text-gray-400">
                    {userData.security_status === "verified"
                      ? "Your account is fully secured"
                      : "Enable 2FA for enhanced security"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CyberCard>

        {/* Model Usage Section */}
        <CyberCard className="border-green-500/30 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-purple-400">
              <Cpu className="inline-block w-5 h-5 mr-2" />
              MODEL USAGE ANALYTICS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-96">
              {/* Bar Chart */}
              <div className="relative group">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usageData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    onMouseMove={(e) => {
                      if (e.activeTooltipIndex !== undefined) {
                        setHoveredBar(e.activeTooltipIndex);
                      }
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <defs>
                      <linearGradient
                        id="barGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#00f2fe"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0066ff"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                    <XAxis
                      dataKey="model"
                      stroke="#4a5568"
                      tick={{ fill: "#00f2fe", fontSize: 12 }}
                      tickLine={{ stroke: "#4a5568" }}
                    />
                    <YAxis
                      stroke="#4a5568"
                      tick={{ fill: "#00f2fe", fontSize: 12 }}
                      tickLine={{ stroke: "#4a5568" }}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(0, 242, 254, 0.1)" }}
                    />
                    <Bar
                      dataKey="uses"
                      fill="url(#barGradient)"
                      radius={[4, 4, 0, 0]}
                      animationDuration={800}
                    >
                      {usageData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          stroke="#00f2fe"
                          strokeWidth={hoveredBar === index ? 2 : 0}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
              </div>

              <div className="relative">
                <div className="text-2xl text-yellow-300 mb-2 ">
                  COST BREAKDOWN
                </div>
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie
                      data={usageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="cost"
                      nameKey="model"
                    >
                      {usageData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="#0f172a"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={<PieTooltip />}
                      cursor={{ fill: "rgba(0, 242, 254, 0.1)" }}
                    />
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      wrapperStyle={{
                        paddingLeft: "20px",
                        width: "40%",
                      }}
                      formatter={(value) => (
                        <span className="text-cyan-300 text-xs">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </CyberCard>
        {/* Activity Log */}
        <CyberCard className="border-purple-500/30 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <History className="w-5 h-5" />
              RECENT ACTIVITIES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {userData.activity_log?.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-black/20 rounded-lg border border-purple-500/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <div className="text-sm text-cyan-300">{activity}</div>
                  <div className="text-xs text-gray-400 ml-auto">
                    {new Date().toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </CyberCard>
      </div>

      <CreditPurchaseModal
        isOpen={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        packages={CREDIT_PACKAGES}
        onPurchase={handleCreditPurchase}
      />
    </div>
  );
}

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | null | undefined;
}) => (
  <motion.div
    className="flex items-center gap-4 p-3 bg-black/20 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
    whileHover={{ scale: 1.02 }}
  >
    <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-sm text-cyan-400 font-semibold">{label}</div>
      <div className="text-gray-300 font-mono">{value || "N/A"}</div>
    </div>
  </motion.div>
);

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-black/90 p-3 rounded-lg border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
      <p className="text-cyan-400 font-bold border-b border-cyan-500/30 pb-2 mb-2">
        {payload[0].payload.model}
      </p>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-cyan-500" />
        <span className="text-purple-300 font-mono">
          {payload[0].value} uses
        </span>
      </div>
    </div>
  );
};

const PieTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-black/90 p-3 rounded-lg border border-purple-500/30 backdrop-blur-xl">
      <p className="text-purple-400 font-bold border-b border-purple-500/30 pb-2 mb-2">
        {payload[0].name}
      </p>
      <div className="text-cyan-300 font-mono">Cost: ${payload[0].value}</div>
    </div>
  );
};
const ProfileSkeleton = () => (
  <div className="min-h-screen p-8 font-mono space-y-8">
    <Skeleton className="h-32 w-full rounded-lg bg-gray-900" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Skeleton className="h-64 bg-gray-900 rounded-lg" />
      <Skeleton className="h-64 bg-gray-900 rounded-lg" />
    </div>
    <Skeleton className="h-96 bg-gray-900 rounded-lg" />
  </div>
);

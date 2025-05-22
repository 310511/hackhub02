"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Copy, Key, Plus, RefreshCw, Trash2, Shield, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/ui/status-badge";
import { RiShieldCheckLine, RiLock2Line, RiKeyLine } from "@remixicon/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState([
    { id: "1", name: "Production API Key", key: "mh_prod_a1b2c3d4e5f6g7h8i9j0", createdAt: "2025-02-15T12:00:00Z", lastUsed: "2025-04-26T09:15:32Z" },
    { id: "2", name: "Development API Key", key: "mh_dev_z9y8x7w6v5u4t3s2r1q0", createdAt: "2025-03-22T15:30:00Z", lastUsed: "2025-04-25T14:45:21Z" },
  ]);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newGeneratedKey, setNewGeneratedKey] = useState<string | null>(null);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Function to generate a random API key
  const generateApiKey = () => {
    const prefix = "mh_";
    const keyType = Math.random() > 0.5 ? "prod_" : "dev_";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = prefix + keyType;

    for (let i = 0; i < 24; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  };

  // Function to create a new API key
  const handleCreateKey = () => {
    if (newKeyName.trim() === "") return;

    const generatedKey = generateApiKey();
    setNewGeneratedKey(generatedKey);
    
    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: generatedKey,
      createdAt: new Date().toISOString(),
      lastUsed: "-"
    };

    setApiKeys([...apiKeys, newKey]);
    setIsCreateDialogOpen(false);
    setIsSuccessDialogOpen(true);
    setNewKeyName("");
  };

  // Function to copy API key to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  // Function to delete an API key
  const deleteApiKey = () => {
    if (keyToDelete) {
      setApiKeys(apiKeys.filter(key => key.id !== keyToDelete));
      setIsDeleteDialogOpen(false);
      setKeyToDelete(null);
    }
  };

  // Function to mask API key
  const maskApiKey = (key: string) => {
    const parts = key.split('_');
    if (parts.length >= 3) {
      return `${parts[0]}_${parts[1]}_${"•".repeat(8)}${parts[2].slice(-4)}`;
    }
    return `${key.slice(0, 8)}${"•".repeat(8)}${key.slice(-4)}`;
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/patterns/hexagon-grid.svg')] opacity-20 animate-pulse-soft" />
          <div className="absolute inset-0 bg-[url('/patterns/circuit-pattern.svg')] opacity-30 mix-blend-overlay animate-pan" />
        </div>

        {/* Header Section */}
        <section className="relative z-10 pt-16 pb-12">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="relative z-10 text-center mb-12"
            >
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <StatusBadge
                  leftIcon={() => <RiShieldCheckLine />}
                  rightIcon={() => <RiLock2Line />}
                  leftLabel="SECURE"
                  rightLabel="API"
                  status="success"
                />
                <StatusBadge
                  leftIcon={() => <RiKeyLine />}
                  rightIcon={() => <RiShieldCheckLine />}
                  leftLabel="API"
                  rightLabel="Authentication"
                  status="success"
                />
              </div>
              <h1 className="font-['Kagitingan'] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-HachathonHub-200 to-HachathonHub-500 text-transparent bg-clip-text leading-tight">
                API Keys Management
              </h1>
              <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto font-['Poppins'] mt-6">
                Generate and manage API keys for secure access to HachathonHub services.
                These keys allow your applications to authenticate with our APIs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* API Keys Section */}
        <section className="relative z-10 pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="bg-gradient-to-br from-gray-900/50 to-black/80 rounded-2xl border border-cyan-500/30 backdrop-blur-lg p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl text-cyan-400 font-['Lilita_One']">Your API Keys</h2>
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 text-white border-none font-semibold"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Generate New Key
                </Button>
              </div>

              <div className="bg-black/40 rounded-xl border border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Name</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">API Key</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Created</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Last Used</th>
                      <th className="text-right py-4 px-6 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((apiKey) => (
                      <motion.tr 
                        key={apiKey.id}
                        variants={fadeInUp}
                        className="border-b border-gray-800 last:border-b-0"
                      >
                        <td className="py-4 px-6">
                          <div className="font-medium text-white">{apiKey.name}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <code className="bg-gray-800/50 rounded px-2 py-1 text-sm text-cyan-400 font-mono">
                              {maskApiKey(apiKey.key)}
                            </code>
                            <Button
                              variant="ghost" 
                              size="icon"
                              onClick={() => copyToClipboard(apiKey.key)}
                              className="ml-2 text-gray-400 hover:text-white hover:bg-gray-800"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-300">{formatDate(apiKey.createdAt)}</td>
                        <td className="py-4 px-6 text-gray-300">
                          {apiKey.lastUsed === "-" ? "-" : formatDate(apiKey.lastUsed)}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Button
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setKeyToDelete(apiKey.id);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                    {apiKeys.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-400">
                          No API keys found. Generate your first API key to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <motion.div
                variants={fadeInUp}
                className="mt-8 p-6 bg-gradient-to-br from-blue-900/20 to-blue-900/5 rounded-xl border border-blue-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <Shield className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">API Key Security</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <EyeOff className="h-4 w-4 text-blue-400 mt-1 shrink-0" />
                        <span>Never expose API keys in client-side code or public repositories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Key className="h-4 w-4 text-blue-400 mt-1 shrink-0" />
                        <span>Each key should be used for a single application or purpose</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="h-4 w-4 text-blue-400 mt-1 shrink-0" />
                        <span>Regularly rotate your API keys for enhanced security</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-scanline-fast" />
      </div>

      {/* Create New API Key Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-gray-900 border-cyan-500/30 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-cyan-400 text-xl">Generate New API Key</DialogTitle>
            <DialogDescription className="text-gray-300">
              Give your API key a name to help identify its purpose.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="API Key Name (e.g. Production Backend)"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateDialogOpen(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateKey}
              className="bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500"
              disabled={newKeyName.trim() === ""}
            >
              <Key className="mr-2 h-4 w-4" />
              Generate Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog with new API Key */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="bg-gray-900 border-green-500/30 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-400 text-xl">API Key Generated</DialogTitle>
            <DialogDescription className="text-gray-300">
              Copy your new API key now. For security reasons, it won't be displayed again.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-4">
              <code className="text-green-400 break-all font-mono text-sm">
                {newGeneratedKey}
              </code>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard(newGeneratedKey || "")}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
            <Button
              onClick={() => setIsSuccessDialogOpen(false)}
              className="bg-gradient-to-r from-green-500/80 to-emerald-500/80 hover:from-green-500 hover:to-emerald-500"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete API Key Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-900 border-red-500/30 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-400 text-xl">Delete API Key</DialogTitle>
            <DialogDescription className="text-gray-300">
              This action cannot be undone. Any applications using this key will no longer be able to access the API.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={deleteApiKey}
              className="bg-gradient-to-r from-red-500/80 to-red-700/80 hover:from-red-500 hover:to-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
}
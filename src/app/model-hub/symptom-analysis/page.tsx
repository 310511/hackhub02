"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, AlertTriangle, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "agent";
  content: string;
  timestamp: number;
  error?: boolean;
  pending?: boolean;
}

const STORAGE_KEY = 'symptom-analysis-chat';

export default function SymptomAnalysisPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const formatTimestamp = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const handleRetry = async (index: number) => {
    const messageToRetry = messages[index];
    if (messageToRetry.role !== 'user') return;

    const updatedMessages = messages.slice(0, index + 1);
    setMessages(updatedMessages);
    await processUserMessage(messageToRetry.content, updatedMessages);
  };

  const processUserMessage = async (content: string, currentMessages: Message[]) => {
    try {
      setIsTyping(true);
      const response = await fetch("https://nthander2002-HachathonHub-symptomanalysis.hf.space/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          history: [
            ...currentMessages.map(msg => ({
              [msg.role === "user" ? "user" : "agent"]: msg.content
            })),
            { user: content }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const assistantMessage: Message = {
        role: "agent",
        content: data.agent,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "agent",
        content: error instanceof Error 
          ? `Error: ${error.message}. Please try again.`
          : "Sorry, I encountered an error analyzing your symptoms. Please try again.",
        timestamp: Date.now(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await processUserMessage(userMessage.content, [...messages, userMessage]);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Information Section */}
        <Card className="bg-gradient-to-br from-zinc-900/60 to-black/80 border border-cyan-500/20 shadow-lg backdrop-blur-lg rounded-3xl h-fit">
          <CardHeader>
            <CardTitle className="text-3xl font-['Poppins'] text-cyan-400 drop-shadow-md">
              Understanding Symptom Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-300">
              <div className="space-y-2">
                <h3 className="text-xl text-cyan-400 font-['Poppins']">How It Works 🤖</h3>
                <p className="leading-relaxed">
                  Our AI-powered symptom analyzer acts like a knowledgeable health assistant. It helps you understand your symptoms better and provides preliminary insights about potential health conditions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl text-cyan-400 font-['Poppins']">What To Expect 🎯</h3>
                <p className="leading-relaxed">
                  Simply describe your symptoms in detail, and our AI will:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>Analyze your symptoms comprehensively</li>
                  <li>Suggest possible causes and conditions</li>
                  <li>Provide general health guidance</li>
                  <li>Recommend when to seek professional help</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-400/20">
                <p className="text-sm italic">
                  ⚠️ Important: This tool is for informational purposes only and should not replace professional medical advice. Always consult a healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Chat Interface */}
        <Card className="h-[580px] bg-gradient-to-br from-zinc-900/60 to-black/80 border border-cyan-500/20 shadow-lg backdrop-blur-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="text-4xl font-['Poppins'] text-cyan-400 drop-shadow-md">
              Symptom Analysis
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1 font-['Poppins']">
              Describe your symptoms in detail for AI-powered analysis and preliminary assessment.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col h-[450px]">
            <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent hover:scrollbar-thumb-cyan-500/30">
              {messages.length === 0 ? (
                <div className="text-gray-500 text-center mt-8">
                  Start by describing your symptoms...
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={message.timestamp}
                    className={cn(
                      "flex w-full",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-4 rounded-2xl shadow-md transition-all duration-200",
                        message.role === "user"
                          ? "bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 text-cyan-50 rounded-tr-none"
                          : "bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 text-gray-200 rounded-tl-none",
                        message.error && "border-red-500/50 border",
                        "hover:shadow-lg hover:shadow-cyan-500/10"
                      )}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                        <span>{formatTimestamp(message.timestamp)}</span>
                        {message.error && message.role === "agent" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRetry(index - 1)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <RefreshCcw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 p-4 rounded-2xl rounded-tl-none shadow-md">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2 mt-2 border-t border-cyan-500/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your symptoms..."
                  className="flex-1 bg-zinc-900/50 border-none focus:ring-1 focus:ring-cyan-500/50 text-gray-300 rounded-xl px-4 py-2"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700",
                    "text-white px-4 rounded-xl transition-all duration-200",
                    "disabled:from-gray-600 disabled:to-gray-700"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
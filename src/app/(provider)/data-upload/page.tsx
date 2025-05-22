// @ts-nocheck

"use client";

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ChatAgentPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' && !file) return;

    const userMessage = input;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    const formData = new FormData();
    if (userMessage) formData.append('message', userMessage);
    if (file) formData.append('file', file);

    try {
      const response = await fetch('https://nthander2002-HachathonHub-agent.hf.space/chat', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
      setFile(null); // Clear file after sending
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.toLowerCase().endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        alert('Please upload only CSV files');
      }
    }
  };

  return (
    <>        <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-[url('/patterns/hexagon-grid.svg')] opacity-20 animate-pulse-soft" />
    <div className="absolute inset-0 bg-[url('/patterns/circuit-pattern.svg')] opacity-30 mix-blend-overlay animate-pan" />
  </div>
    <div className="min-h-screen flex flex-col p-4">
      <Navbar />
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-['Lilita_One'] text-white">HachathonHub AI Agent</h1>
        <p className="text-white/70 text-sm">Upload CSV data and chat with our AI assistant</p>
      </div>
      
      <div className="flex-1 w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center p-8">
                <p className="text-white/70">Upload a CSV file or ask a question to start a conversation</p>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div key={index} 
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.role === 'user' 
                    ? 'bg-cyan-600/40 ml-auto text-white' 
                    : 'bg-white/10 text-white'
                }`}
              >
                <span className="text-xs opacity-70 block mb-1">
                  {msg.role === 'user' ? 'You' : 'AI Assistant'}
                </span>
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
              </div>
            ))}
            
            {isLoading && (
              <div className="p-3 rounded-lg max-w-[80%] bg-white/10 text-white">
                <span className="text-xs opacity-70 block mb-1">AI Assistant</span>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="h-2 w-2 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="h-2 w-2 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 flex items-center gap-2 bg-black/50">
          <div className="relative">
            <label className="p-2 bg-cyan-600/20 hover:bg-cyan-600/30 cursor-pointer rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
            {file && (
              <span className="absolute left-12 text-xs text-white/70 truncate max-w-[120px]">
                {file.name}
              </span>
            )}
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about the data or give instructions..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg p-2 px-3 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
            disabled={isLoading}
          />
          
          <Button 
            type="submit" 
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            disabled={isLoading || (input.trim() === '' && !file)}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
    </>
  );
}
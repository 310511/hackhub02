"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ApiDocsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/patterns/hexagon-grid.svg')] opacity-20 animate-pulse-soft" />
          <div className="absolute inset-0 bg-[url('/patterns/circuit-pattern.svg')] opacity-30 mix-blend-overlay animate-pan" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              API Documentation
            </h1>
            <div className="bg-black/60 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-gray-800">
              <h2 className="text-gray-100 text-2xl md:text-3xl font-semibold mb-4">Documentation Coming Soon</h2>
              <p className="text-gray-300 mb-6">
                We're currently working on comprehensive API documentation to help you integrate with our healthcare platform.
                Our API will enable secure access to medical data, AI model integration, and much more.
              </p>
              <div className="space-y-4 text-left bg-black/40 p-6 rounded-lg">
                <h3 className="font-semibold text-xl text-blue-300">What to expect:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>RESTful API endpoints with detailed usage examples</li>
                  <li>Authentication and security best practices</li>
                  <li>Rate limits and performance guidelines</li>
                  <li>SDK integration samples for multiple languages</li>
                  <li>Interactive API testing console</li>
                </ul>
              </div>
              <div className="mt-8">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all">
                  Join API Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
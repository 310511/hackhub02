//src/app/about/page.tsx

"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurContainer } from "@/components/ui/BlurContainer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, ShieldCheck, Sparkles, Network, Shield, Brain, Users, Code } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AnimateOnView } from "@/components/AnimateOnView";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className={`min-h-screen ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-purple-500/10" />
          <div className="container mx-auto px-4 py-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-6 py-2 bg-black/80 text-cyan-400 rounded-full text-sm mb-6 font-['Poppins'] backdrop-blur-lg border border-cyan-400/30 shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]">
                <Network className="inline-block w-4 h-4 mr-2" />
                About HackathonHub
              </span>
              <h1 className="text-4xl md:text-6xl font-['Kagitingan'] mb-6 bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                Our Mission and Vision
              </h1>
              <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12 font-['Poppins']">
                Empowering innovation through collaborative hackathons and cutting-edge technology
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <AnimateOnView>
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <Sparkles className="w-8 h-8 text-cyan-400" />
                <h2 className="text-3xl font-bold text-cyan-400 font-['Kagitingan']">Our Mission</h2>
              </div>
              <CardSpotlight className="p-8 rounded-2xl border border-cyan-400/20 bg-gray-800/50">
                <p className="text-lg text-gray-300 mb-6 font-['Poppins']">
                  HackathonHub is dedicated to revolutionizing the hackathon experience through innovative technology and collaborative platforms. We believe in making hackathons more accessible, engaging, and impactful for participants worldwide.
                </p>
                <p className="text-lg text-gray-300 font-['Poppins']">
                  Our platform enables developers, designers, and innovators to collaborate, learn, and create groundbreaking solutions through exciting hackathon events.
                </p>
              </CardSpotlight>
            </div>
          </section>
        </AnimateOnView>

        {/* Features Section */}
        <AnimateOnView>
          <section className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-12 justify-center">
              <Network className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl font-bold text-cyan-400 font-['Kagitingan']">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CardSpotlight className="p-6 rounded-xl border border-cyan-400/20 bg-gray-800/50">
                <Shield className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-cyan-300 font-['Kagitingan']">Real-time Collaboration</h3>
                <p className="text-gray-300 font-['Poppins']">
                  Our platform provides seamless real-time collaboration tools, allowing teams to work together efficiently during hackathons.
                </p>
              </CardSpotlight>
              <CardSpotlight className="p-6 rounded-xl border border-cyan-400/20 bg-gray-800/50">
                <Brain className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-cyan-300 font-['Kagitingan']">Smart Project Management</h3>
                <p className="text-gray-300 font-['Poppins']">
                  Advanced project tracking and management tools to help teams stay organized and focused during hackathon events.
                </p>
              </CardSpotlight>
              <CardSpotlight className="p-6 rounded-xl border border-cyan-400/20 bg-gray-800/50">
                <Users className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-cyan-300 font-['Kagitingan']">Community Platform</h3>
                <p className="text-gray-300 font-['Poppins']">
                  Connect with fellow hackers, mentors, and industry experts to learn, share ideas, and grow your network.
                </p>
              </CardSpotlight>
            </div>
          </section>
        </AnimateOnView>

        {/* Technology Stack */}
        <AnimateOnView>
          <section className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-12 justify-center">
              <Code className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl font-bold text-cyan-400 font-['Kagitingan']">Our Technology</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <CardSpotlight className="p-6 rounded-xl border border-cyan-400/20 bg-gray-800/50">
                <h3 className="text-xl font-semibold mb-4 text-cyan-300 font-['Kagitingan']">Platform Features</h3>
                <p className="text-gray-300 mb-4 font-['Poppins']">
                  Our hackathon platform is built with cutting-edge technology to provide the best experience:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-['Poppins']">
                  <li>Real-time collaboration tools</li>
                  <li>Project submission system</li>
                  <li>Judging and scoring platform</li>
                </ul>
              </CardSpotlight>
              <CardSpotlight className="p-6 rounded-xl border border-cyan-400/20 bg-gray-800/50">
                <h3 className="text-xl font-semibold mb-4 text-cyan-300 font-['Kagitingan']">Event Management</h3>
                <p className="text-gray-300 mb-4 font-['Poppins']">
                  Comprehensive tools for organizing successful hackathons:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 font-['Poppins']">
                  <li>Team formation and matching</li>
                  <li>Schedule and timeline management</li>
                  <li>Resource and prize distribution</li>
                </ul>
              </CardSpotlight>
            </div>
          </section>
        </AnimateOnView>

        {/* CTA Section */}
        <AnimateOnView>
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-cyan-400 font-['Kagitingan']">Join Our Community</h2>
              <p className="text-lg text-gray-300 mb-8 font-['Poppins']">
                Be part of the future of hackathons. Whether you're a developer, designer, or organizer, there's a place for you in our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-['Lilita_One'] shadow-[0_0_15px_rgba(0,255,255,0.6)]">
                  <Link href="/hackathons">Explore Hackathons</Link>
                </Button>
                <Button asChild variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-['Lilita_One']">
                  <Link href="/organize">Organize Event</Link>
                </Button>
                <Button asChild variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-['Lilita_One']">
                  <a href="mailto:hackhub.team51@gmail.com" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </AnimateOnView>

        <Footer />
      </div>
    </main>
  );
}

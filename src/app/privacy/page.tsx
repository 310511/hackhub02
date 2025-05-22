"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { BlurContainer } from "@/components/ui/BlurContainer";
import { Shield, Lock, Database } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Data Collection & Usage",
      content: [
        "We collect and process medical data solely for the purpose of improving healthcare AI models",
        "All personal health information (PHI) is encrypted end-to-end",
        "Data is processed locally within your infrastructure through federated learning",
        "We maintain detailed audit logs of all data access and model training events",
      ],
    },
    {
      title: "Data Protection",
      content: [
        "HIPAA and GDPR compliant infrastructure and processes",
        "Regular security audits and penetration testing",
        "Multi-factor authentication for all data access",
        "Secure key management and rotation policies",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "Right to access your data",
        "Right to request data deletion",
        "Right to data portability",
        "Right to withdraw consent",
      ],
    },
    {
      title: "Data Retention",
      content: [
        "Medical data is retained as required by healthcare regulations",
        "Non-essential data is automatically purged after 24 months",
        "Training data is anonymized before processing",
        "Backup retention follows industry best practices",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-cyan-400/10 border border-cyan-400/20 text-white rounded-full text-sm font-['Lilita_One'] mb-4">
            Privacy Policy
          </span>
          <h1 className="text-4xl md:text-6xl font-['Kagitingan'] mb-6 bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
            Your Privacy Is Our Priority
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We are committed to protecting your medical data with the highest standards of security and compliance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BlurContainer className="h-full p-6 bg-zinc-800" hoverable>
                <h2 className="text-2xl font-['Lilita_One'] text-cyan-400 mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Shield className="w-5 h-5 mt-1 text-purple-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </BlurContainer>
            </motion.div>
          ))}
        </div>

        <BlurContainer className="p-8 text-center mb-16 bg-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-cyan-500/10 rounded-full">
                <Lock className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">End-to-End Encryption</h3>
              <p className="text-gray-400">Your data is encrypted at rest and in transit</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-full">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">HIPAA Compliant</h3>
              <p className="text-gray-400">Following all healthcare data regulations</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-cyan-500/10 rounded-full">
                <Database className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Federated Learning</h3>
              <p className="text-gray-400">Data never leaves your infrastructure</p>
            </div>
          </div>
        </BlurContainer>

        <div className="text-center text-sm text-gray-400">
          <p>Last updated: April 27, 2025</p>
          <p className="mt-2">
            For questions about our privacy policy, please contact our Data Protection Officer at{" "}
            <a href="mailto:privacy@HachathonHub.ai" className="text-cyan-400 hover:underline">
              privacy@HachathonHub.ai
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
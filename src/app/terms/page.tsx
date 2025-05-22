"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { BlurContainer } from "@/components/ui/BlurContainer";
import { Scale, FileTerminal, AlertCircle, Landmark, HeartPulse } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      title: "Service Agreement",
      content: [
        {
          heading: "Account Terms",
          items: [
            "You must be 18 years or older to use this service",
            "You must provide accurate and complete registration information",
            "You are responsible for maintaining the security of your account",
            "You must notify us immediately of any unauthorized access"
          ]
        },
        {
          heading: "API Usage",
          items: [
            "API rate limits must be respected",
            "API keys must not be shared with third parties",
            "We reserve the right to modify or revoke API access",
            "All API usage must comply with HIPAA regulations"
          ]
        }
      ]
    },
    {
      title: "Medical AI Usage",
      content: [
        {
          heading: "Model Limitations",
          items: [
            "AI models are assistive tools, not primary diagnostic instruments",
            "Healthcare professionals must review all AI-generated outputs",
            "Model performance may vary across different populations",
            "Regular model retraining and validation is required"
          ]
        },
        {
          heading: "Data Requirements",
          items: [
            "Training data must be properly anonymized",
            "Data quality standards must be maintained",
            "Contribution guidelines must be followed",
            "Data validation protocols must be observed"
          ]
        }
      ]
    },
    {
      title: "Compliance",
      content: [
        {
          heading: "Regulatory Requirements",
          items: [
            "Users must comply with all applicable healthcare laws",
            "HIPAA compliance is mandatory for US operations",
            "GDPR compliance required for EU data processing",
            "Local healthcare regulations must be followed"
          ]
        },
        {
          heading: "Audit Requirements",
          items: [
            "Regular security audits must be conducted",
            "Access logs must be maintained",
            "Incident reports must be filed promptly",
            "Compliance documentation must be current"
          ]
        }
      ]
    }
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
            Terms of Service
          </span>
          <h1 className="text-4xl md:text-6xl font-['Kagitingan'] mb-6 bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
            Our Service Agreement
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using the HachathonHub platform
          </p>
        </motion.div>

        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-['Kagitingan'] text-cyan-400 mb-6">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.content.map((subsection, index) => (
                <BlurContainer key={subsection.heading} className="p-6 bg-zinc-800" hoverable>
                  <h3 className="text-xl font-['Lilita_One'] text-purple-400 mb-4">
                    {subsection.heading}
                  </h3>
                  <ul className="space-y-3">
                    {subsection.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FileTerminal className="w-5 h-5 mt-1 text-cyan-400 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </BlurContainer>
              ))}
            </div>
          </motion.div>
        ))}

        <BlurContainer className="p-8 text-center mb-16 bg-zinc-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-cyan-500/10 rounded-full">
                <Scale className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Fair Usage</h3>
              <p className="text-gray-400">Reasonable and ethical use of our platform</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-full">
                <HeartPulse className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Patient First</h3>
              <p className="text-gray-400">Prioritizing patient care and safety</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-cyan-500/10 rounded-full">
                <Landmark className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Compliance</h3>
              <p className="text-gray-400">Following all relevant regulations</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-full">
                <AlertCircle className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Responsibility</h3>
              <p className="text-gray-400">Maintaining professional standards</p>
            </div>
          </div>
        </BlurContainer>

        <div className="text-center text-sm text-gray-400">
          <p>Last updated: April 27, 2025</p>
          <p className="mt-2">
            For questions about our terms of service, please contact our legal team at{" "}
            <a href="mailto:legal@HachathonHub.ai" className="text-cyan-400 hover:underline">
              legal@HachathonHub.ai
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
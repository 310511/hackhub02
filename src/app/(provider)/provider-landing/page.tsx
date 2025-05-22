// Landing page for data providers
// src/app/data-upload/page.tsx

"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight,
  Database,
  Lock,
  Server,
  Shield,
  Upload,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  RiShieldCheckLine,
  RiLock2Line,
  RiHospitalLine,
} from "@remixicon/react";
import { useRouter } from "next/navigation";

// Mock encryption function - replace with actual implementation
async function encryptFile(file: File): Promise<File> {
  return new Promise((resolve) => {
    // Add real encryption logic here
    const encryptedFile = new File([file], `encrypted_${file.name}`, {
      type: file.type,
    });
    resolve(encryptedFile);
  });
}

export default function DataProviderPage() {
  const router = useRouter();


  const handleUpload = async () => {
    router.push("/data-upload");
  };


  const benefitCards = [
    {
      title: "Advance Medical Research",
      description:
        "Contribute to groundbreaking medical AI advancements without exposing sensitive patient data. Your institution helps build models that save lives.",
      icon: <Shield className="h-10 w-10 text-cyan-400" />,
      color: "from-cyan-500/20 to-cyan-500/5",
    },
    {
      title: "Complete Data Privacy",
      description:
        "Your patient data never leaves your premises. Our federated learning architecture ensures only encrypted model weights are shared.",
      icon: <Lock className="h-10 w-10 text-purple-400" />,
      color: "from-purple-500/20 to-purple-500/5",
    },
    {
      title: "Access Premium Models",
      description:
        "Gain priority access to our entire model hub, including specialized diagnostic tools trained on diverse global datasets.",
      icon: <Database className="h-10 w-10 text-pink-400" />,
      color: "from-pink-500/20 to-pink-500/5",
    },
    {
      title: "Simplified Integration",
      description:
        "Our secure API and SDK make integration seamless with your existing systems, requiring minimal IT infrastructure changes.",
      icon: <Server className="h-10 w-10 text-blue-400" />,
      color: "from-blue-500/20 to-blue-500/5",
    },
  ];

  const steps = [
    {
      title: "REGISTRATION & VERIFICATION",
      description:
        "Complete our secure onboarding process with institutional verification to ensure only legitimate healthcare providers can participate.",
    },
    {
      title: "LOCAL SETUP",
      description:
        "Install our secure data connector that operates within your network perimeter, maintaining complete data sovereignty.",
    },
    {
      title: "DATA MAPPING",
      description:
        "Configure which anonymized datasets you wish to contribute to the federated learning network.",
    },
    {
      title: "LOCAL TRAINING",
      description:
        "Your data never leaves your premises - model training happens locally, sending only encrypted gradient updates.",
    },
  ];

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/patterns/hexagon-grid.svg')] opacity-20 animate-pulse-soft" />
          <div className="absolute inset-0 bg-[url('/patterns/circuit-pattern.svg')] opacity-30 mix-blend-overlay animate-pan" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-16 pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="relative z-10 text-center mb-16"
            >
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <StatusBadge
                  leftIcon={() => <RiShieldCheckLine />}
                  rightIcon={() => <RiLock2Line />}
                  leftLabel="HIPAA"
                  rightLabel="Compliant"
                  status="success"
                />
                <StatusBadge
                  leftIcon={() => <RiHospitalLine />}
                  rightIcon={() => <RiLock2Line />}
                  leftLabel="Hospital"
                  rightLabel="Data Provider"
                  status="success"
                />
              </div>
              <h1 className="font-['Kagitingan'] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-HachathonHub-200 to-HachathonHub-500 text-transparent bg-clip-text leading-tight">
                Become a Data Provider
              </h1>
              <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto font-['Poppins'] mt-6">
                Join our secure federated learning network where your hospital's
                data stays on-premises while contributing to breakthrough
                medical AI advancements.
              </p>
            </motion.div>
            <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-900/50 to-black/80 p-8 rounded-2xl border border-cyan-500/30 backdrop-blur-lg pb-4"
              >
                {/* Upload Action Section */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-400">Encryption</p>
                      <p className="text-cyan-400 font-semibold">AES-256</p>
                    </div>
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-400">Max Size</p>
                      <p className="text-cyan-400 font-semibold">10GB</p>
                    </div>
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-sm text-gray-400">Formats</p>
                      <p className="text-cyan-400 font-semibold">15+</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleUpload}
                    className="h-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 font-['Poppins']"
                  >
                      Secure Upload
                  </Button>
                </div>
              </motion.div>
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="relative pt-4">
                <div className="bg-gradient-to-br from-indigo-900/20 via-black/80 to-cyan-900/20 p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-lg ">
                  <h2 className="text-2xl mb-6 text-cyan-400 font-['Lilita_One']">
                    Data Provider Dashboard
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Active Training Sessions
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Currently active: Pneumonia Detection Model v2.4
                        </p>
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <Database className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Dataset Contribution
                        </h3>
                        <p className="text-gray-400 text-sm">
                          4 active datasets · 1.2M parameters processed
                        </p>
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Privacy Status
                        </h3>
                        <p className="text-gray-400 text-sm">
                          End-to-end encryption · Zero data leakage
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button className="w-full bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 text-white border-none h-12 font-semibold">
                      Access Provider Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-8 pt-4">
                <div className="bg-gradient-to-br from-purple-900/20 via-black/80 to-indigo-900/20 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                  <h2 className="text-2xl mb-6 text-purple-400 font-['Lilita_One']">
                    Why Join as a Data Provider?
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="rounded-full bg-gradient-to-r from-purple-500/20 to-purple-500/10 p-1 mt-0.5">
                        <svg
                          className="h-4 w-4 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-300">
                        Contribute to medical AI advancement without sharing raw
                        patient data
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="rounded-full bg-gradient-to-r from-purple-500/20 to-purple-500/10 p-1 mt-0.5">
                        <svg
                          className="h-4 w-4 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-300">
                        Access all HachathonHub models trained on diverse global
                        datasets
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="rounded-full bg-gradient-to-r from-purple-500/20 to-purple-500/10 p-1 mt-0.5">
                        <svg
                          className="h-4 w-4 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-300">
                        Earn credits in our network based on your contribution
                        level
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="rounded-full bg-gradient-to-r from-purple-500/20 to-purple-500/10 p-1 mt-0.5">
                        <svg
                          className="h-4 w-4 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-300">
                        Join a collaborative network of 25+ leading research
                        hospitals
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="rounded-full bg-gradient-to-r from-purple-500/20 to-purple-500/10 p-1 mt-0.5">
                        <svg
                          className="h-4 w-4 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-300">
                        HIPAA and GDPR compliant with quantum-secure encryption
                      </p>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Link href="/data-upload/register">
                      <Button className="w-full bg-gradient-to-r from-purple-500/80 to-indigo-500/80 hover:from-purple-500 hover:to-indigo-500 text-white border-none h-12 font-semibold">
                        Register Your Hospital
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>




        {/* Benefits Section */}
        <section className="relative z-10 py-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-HachathonHub-400/10 text-HachathonHub-400 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                Benefits of Joining
              </span>
              <h2 className="text-5xl md:text-5xl font-['Kagitingan'] mb-4 bg-gradient-to-r from-HachathonHub-200 to-HachathonHub-400 bg-clip-text text-transparent">
                Why Hospitals Choose HachathonHub
              </h2>
              <p className="text-lg font-['Poppins'] text-white mx-auto max-w-2xl">
                Join a growing network of healthcare institutions committed to
                advancing medical AI while maintaining the highest standards of
                data privacy.
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 backdrop-blur-lg font-['Poppins']"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {benefitCards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`bg-gradient-to-br ${card.color} backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]`}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-6">{card.icon}</div>
                    <h3 className="text-2xl font-['Lilita_One'] text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 mb-6 flex-grow text-base">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative z-10 py-10 overflow-hidden">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                Simple Process
              </span>
              <h2 className="text-4xl md:text-5xl font-['Kagitingan'] mb-4 bg-gradient-to-r from-HachathonHub-200 to-HachathonHub-400 bg-clip-text text-transparent">
                How Data Providers Participate
              </h2>
              <p className="text-lg font-['Poppins'] text-white mx-auto max-w-2xl">
                Our streamlined onboarding process ensures your institution can
                start contributing securely with minimal setup time.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="absolute top-0 bottom-0 left-[15px] md:left-1/2 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 transform md:-translate-x-px"></div>

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`flex flex-col md:flex-row gap-8 mb-12 relative ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-0 md:left-1/2 transform translate-y-3 md:-translate-x-3">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                  </div>

                  <div
                    className={`w-full md:w-1/2 ml-10 md:ml-0 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-gradient-to-br from-blue-900/20 via-black/80 to-purple-900/20 p-6 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                      <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-lg px-3 py-1 text-sm mb-4 font-['Poppins']">
                        Step {index + 1}
                      </div>
                      <h3 className="text-3xl font-['Lilita_One'] text-pink-400 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 font-['Poppins']">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-scanline-fast" />
      </div>
      <Footer />
    </>
  );
}

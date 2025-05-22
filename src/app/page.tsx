//src/app/page.tsx
//@ts-nocheck

"use client";
import { useState, useEffect, memo, useCallback, useMemo } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Calendar, Clock, Users, Trophy, Cpu, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { AnimateOnView } from "@/components/AnimateOnView";
import { motion, useReducedMotion } from "framer-motion";
import { Toaster } from "sonner";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import ErrorBoundary from "@/components/ErrorBoundary";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Threads from "@/components/ui/Threads";
import "@/components/ui/Threads.css";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Dock from "@/components/Dock";

// Memoized components
const MemoizedNavbar = memo(Navbar);
const MemoizedFooter = memo(Footer);
const MemoizedSplineScene = memo(SplineScene);

// WebGL Error Boundary component
const WebGLErrorBoundary = memo(({ children }: { children: React.ReactNode }) => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglSupported(!!gl);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="bg-red-900/20 p-6 rounded-xl border border-red-400/30 text-center">
        <h3 className="text-red-300 mb-2">3D Visualization Unavailable</h3>
        <p className="text-red-400/80 text-sm">
          Your device/browser does not support required graphics capabilities.
          View in latest Chrome/Firefox or try another device.
        </p>
      </div>
    );
  }

  return <>{children}</>;
});

// Memoized features data
const features = [
  {
    title: "Cash Prizes & Swags That Matter",
    points: [
      "Up to 70% of the participation fee is distributed as cash prizes",
      "Swag packs and exclusive certificates for outstanding teams, including non-winners",
    ],
  },
  {
    title: "Internship Opportunities & Career Boost",
    points: [
      "Exceptional participants may receive internship opportunities with our partners",
      "All participants get verifiable certificates ",
    ],
  },
  {
    title: "Fully Online, Global, and Beginner-Friendly",
    points: [
      "Participate from anywhere—no travel required",
      "Open to all experience levels, making it ideal even for first-time hackers",
    ],
  },
];

const socialItems = [
  {
    icon: <Twitter size={20} />,
    label: "Twitter",
    onClick: () => window.open("https://twitter.com/yourhandle", "_blank"),
  },
  {
    icon: <Github size={20} />,
    label: "GitHub",
    onClick: () => window.open("https://github.com/Port-3000", "_blank"),
  },
  {
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
    onClick: () =>
      window.open("https://linkedin.com/company/yourcompany", "_blank"),
  },
  {
    icon: <Mail size={20} />,
    label: "Contact",
    onClick: () => window.open("mailto:contact@port3000.com"),
  },
];

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Memoized refs with optimized thresholds
  const heroSectionRef = useIntersectionObserver({ threshold: 0.1 });
  const featuresSectionRef = useIntersectionObserver({ threshold: 0.1 });
  const prizesSectionRef = useIntersectionObserver({ threshold: 0.1 });
  const joinSectionRef = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Smooth scroll handler
  const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <ErrorBoundary>
      <MemoizedNavbar />
      <main className={`min-h-screen bg-black ${isLoaded ? "opacity-100" : "opacity-0"} transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-x-hidden`}>
        <div className="fixed inset-0 z-0 bg-black">
          <Threads
            color={[0.2, 0.4, 0.8]}
            amplitude={0.5}
            distance={0.2}
            enableMouseInteraction={true}
            className="opacity-30 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          />
          <HeroGeometric />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: shouldReduceMotion ? 0 : 1,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          className="relative z-10"
        >
          {/* Hero Section */}
          <AnimateOnView stagger={0.15} delay={0.3} distance={30}>
            <section ref={heroSectionRef} className="relative md:pt-16 md:pb-28 lg:pt-20 lg:pb-28 overflow-hidden">
              <motion.div
                className="container mx-auto px-6 relative z-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1.2,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 xl:gap-20 text-white">
                  <motion.div 
                    className="lg:w-7/12 text-center lg:text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 1,
                        delay: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      },
                    }}
                  >
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
                      <StatusBadge
                        leftIcon={() => <Calendar />}
                        rightIcon={() => <Clock />}
                        leftLabel="June 21"
                        rightLabel="51 Hours"
                        status="success"
                      />
                      <StatusBadge
                        leftIcon={() => <Users />}
                        rightIcon={() => <Trophy />}
                        leftLabel="2-6 Members"
                        rightLabel="Cash Prizes"
                        status="success"
                      />
                      <StatusBadge
                        leftIcon={() => <ArrowUpRight />}
                        rightIcon={() => <Cpu />}
                        leftLabel="100% Online"
                        rightLabel="Global"
                        status="success"
                      />
                    </div>
                    <h1 className="font-['Kagitingan'] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight max-w-3xl mx-auto lg:mx-0">
                      HackHub 2025
                      <br />
                      <span className="text-white inline-block w-[240px] sm:w-[270px] mt-1">
                        <Typewriter
                          words={["From Caffeine to Code", "Let's Build Something Bold", "51 Hours of Innovation", "Join the Revolution"]}
                          loop
                          cursor
                          cursorStyle="|"
                          typeSpeed={70}
                          deleteSpeed={40}
                        />
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                      Join us for a 51-hour marathon of innovation, creativity, and coding. Build something meaningful and compete for exciting rewards.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Link href="https://hackhub-01.devpost.com/?ref_feature=challenge&ref_medium=discover&_gl=1*979e3a*_gcl_au*MTEwMDU0MTYwNS4xNzQ2NzI5NDM0*_ga*OTc0MDY1NDYuMTc0NjcyOTQzNA..*_ga_0YHJK3Y10M*czE3NDc5MDUwNzckbzIzJGcxJHQxNzQ3OTA1MjIyJGowJGwwJGgw" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                          Register Now
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                  <div className="lg:w-5/12">
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
                      <div className="relative z-10 w-full h-full">
                        <WebGLErrorBoundary>
                          <MemoizedSplineScene
                            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                            className="w-full h-full"
                          />
                        </WebGLErrorBoundary>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          </AnimateOnView>

          {/* Features Section */}
          <section ref={featuresSectionRef} className="relative py-20">
            <motion.div
              className="container mx-auto px-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  Why Join HackHub?
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Experience the future of hackathons with our cutting-edge platform and tools.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <CardContainer key={index} className="inter-var">
                    <CardBody className="bg-gray-900/50 backdrop-blur-xl relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-auto h-auto flex flex-col justify-between rounded-xl p-8 border">
                      <CardItem
                        translateZ="60"
                        className="text-xl font-bold mb-2 text-white"
                      >
                        {feature.title}
                      </CardItem>
                      <CardItem
                        translateZ="70"
                        className="text-gray-400 space-y-2"
                      >
                        {feature.points.map((point, pointIndex) => (
                          <p key={pointIndex} className="flex items-start"><span className="mr-2">•</span>{point}</p>
                        ))}
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Prize Showcase Section */}
          <section ref={prizesSectionRef} className="relative py-20">
            <motion.div
              className="container mx-auto px-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  Prize Pool
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  70% of total participation fees (₹99 per participant)
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <CardSpotlight className="bg-gray-900/50 backdrop-blur-xl">
                  <div className="relative z-10">
                    <div className="text-4xl mb-4"></div>
                    <h3 className="text-xl font-bold mb-2 text-white">First Place</h3>
                    <p className="text-gray-400 mb-4">40% of Prize Pool</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Cash reward</li>
                      <li>• Winner Certificate</li>
                      <li>• Priority for internship consideration</li>
                    </ul>
                  </div>
                </CardSpotlight>

                <CardSpotlight className="bg-gray-900/50 backdrop-blur-xl">
                  <div className="relative z-10">
                    <div className="text-4xl mb-4"></div>
                    <h3 className="text-xl font-bold mb-2 text-white">Second Place</h3>
                    <p className="text-gray-400 mb-4">20% of Prize Pool</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Cash reward</li>
                      <li>• Runner-up Certificate</li>
                      <li>• Priority for internship consideration</li>
                    </ul>
                  </div>
                </CardSpotlight>

                <CardSpotlight className="bg-gray-900/50 backdrop-blur-xl">
                  <div className="relative z-10">
                    <div className="text-4xl mb-4"></div>
                    <h3 className="text-xl font-bold mb-2 text-white">Third Place</h3>
                    <p className="text-gray-400 mb-4">10% of Prize Pool</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Cash reward</li>
                      <li>• Merit Certificate</li>
                      <li>• Internship shortlisting</li>
                    </ul>
                  </div>
                </CardSpotlight>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CardSpotlight className="bg-gray-900/50 backdrop-blur-xl">
                  <div className="relative z-10">
                    <div className="text-4xl mb-4"></div>
                    <h3 className="text-xl font-bold mb-2 text-white">Swag Star Award</h3>
                    <p className="text-gray-400 mb-4">Special Recognition</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Swag pack (Goodies)</li>
                      <li>• Certificate</li>
                      <li>• Given for creativity, teamwork, or presentation</li>
                    </ul>
                  </div>
                </CardSpotlight>

                <CardSpotlight className="bg-gray-900/50 backdrop-blur-xl">
                  <div className="relative z-10">
                    <div className="text-4xl mb-4"></div>
                    <h3 className="text-xl font-bold mb-2 text-white">Community Choice</h3>
                    <p className="text-gray-400 mb-4">Public Recognition</p>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Certificate</li>
                      <li>• Bonus swag (if available)</li>
                      <li>• Based on public poll voting</li>
                    </ul>
                  </div>
                </CardSpotlight>
              </div>

              <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Additional Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <CardSpotlight className="bg-gray-900/30 backdrop-blur-sm">
                    <div className="relative z-10">
                      <h4 className="text-xl font-semibold mb-3 text-cyan-400">Certificates</h4>
                      <ul className="text-gray-300 space-y-2 text-left">
                        <li>• Participation Certificates (digital)</li>
                        <li>• Winner/Runner-up Certificates</li>
                        <li>• Verifiable for resumes/LinkedIn</li>
                      </ul>
                    </div>
                  </CardSpotlight>
                  <CardSpotlight className="bg-gray-900/30 backdrop-blur-sm">
                    <div className="relative z-10">
                      <h4 className="text-xl font-semibold mb-3 text-cyan-400">Internship Opportunities</h4>
                      <ul className="text-gray-300 space-y-2 text-left">
                        <li>• Partnered organizations</li>
                        <li>• Based on project quality</li>
                        <li>• Open to all participants</li>
                      </ul>
                    </div>
                  </CardSpotlight>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Join Section */}
          <section ref={joinSectionRef} className="relative py-20">
            <motion.div
              className="container mx-auto px-4 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="max-w-3xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
                viewport={{ once: true }}
              >
                <AnimateOnView stagger={0.03} delay={0.02}>
                  <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 animate-text-glow font-kagitingan">
                    <span>Join the Hack Hub</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300/90 mb-12 leading-relaxed font-lilita-one">
                    <span className="border-b-2 border-cyan-400/40 pb-1 text-white/95 font-kagitingan">
                      Developer • Innovator • Creator
                    </span>
                    <br className="mt-4" />
                    <span className="inline-block mt-4 text-gray-300/80 font-['Lilita_One']">
                      Hackathon Hub's infrastructure enables collaborative innovation
                    </span>
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-8">
                    <Link href="https://hackhub-01.devpost.com/?ref_feature=challenge&ref_medium=discover&_gl=1*979e3a*_gcl_au*MTEwMDU0MTYwNS4xNzQ2NzI5NDM0*_ga*OTc0MDY1NDYuMTc0NjcyOTQzNA..*_ga_0YHJK3Y10M*czE3NDc5MDUwNzckbzIzJGcxJHQxNzQ3OTA1MjIyJGowJGwwJGgw" target="_blank" rel="noopener noreferrer" className="relative group transform hover:scale-105 transition-transform duration-300">
                      <div className="absolute -inset-1 bg-cyan-500/20 blur-2xl group-hover:bg-cyan-500/30 transition-all duration-300 rounded-2xl" />
                      <Button size="lg" className="relative bg-black/80 backdrop-blur-xl border-2 border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white px-10 py-7 rounded-xl text-lg font-['Poppins'] transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                        <span className="mr-3">⚡</span>
                        Register Now
                        <ArrowUpRight className="ml-3 h-6 w-6 stroke-current transform group-hover:rotate-45 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </AnimateOnView>
              </motion.div>
            </motion.div>
          </section>

          <MemoizedFooter />
        </motion.div>
      </main>
      <Toaster position="top-right" richColors />
    </ErrorBoundary>
  );
}

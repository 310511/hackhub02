import { Shield, Lock, Brain, UserPlus, Server, Database } from "lucide-react";
import { AnimateOnView } from "./AnimateOnView";

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: "Privacy-Preserving ML",
    description:
      "Our federated learning approach keeps patient data secure within hospital premises while enabling collaborative model training.",
    icon: <Shield className="h-8 w-8 text-HachathonHub-400" />,
  },
  {
    title: "Advanced Encryption",
    description:
      "Hospital contributions are encrypted with state-of-the-art methods, ensuring complete privacy of sensitive medical data.",
    icon: <Lock className="h-8 w-8 text-HachathonHub-400" />,
  },
  {
    title: "AI Disease Analysis",
    description:
      "Access cutting-edge ML models for symptom analysis, medical imaging diagnostics, and predictive healthcare insights.",
    icon: <Brain className="h-8 w-8 text-HachathonHub-400" />,
  },
  {
    title: "Hospital Network",
    description:
      "Join our growing community of healthcare institutions collaborating to improve medical AI for everyone.",
    icon: <UserPlus className="h-8 w-8 text-HachathonHub-400" />,
  },
  {
    title: "Distributed Infrastructure",
    description:
      "Our system architecture ensures resilience, reliability, and performance at scale for mission-critical healthcare applications.",
    icon: <Server className="h-8 w-8 text-HachathonHub-400" />,
  },
  {
    title: "Comprehensive Analytics",
    description:
      "Gain insights into model performance, data contributions, and the impact of your participation in federated learning.",
    icon: <Database className="h-8 w-8 text-HachathonHub-400" />,
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-black/50">
      <div className="container mx-auto px-6">
        <AnimateOnView>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Key Features
          </h2>
        </AnimateOnView>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimateOnView key={feature.title} delay={index * 0.1}>
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-HachathonHub-400/50 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}; 
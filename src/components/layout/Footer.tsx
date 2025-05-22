import Link from "next/link";
import TrueFocus from "../ui/true-focus";
import { Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      label: "Instagram",
      href: "https://www.instagram.com/hackhubverse?igsh=bG51NzQzZnA3b3Vk",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/punya-mittal-a1122520b/",
    },
    {
      icon: <Mail size={20} />,
      label: "Contact",
      href: "mailto:hackhub.team51@gmail.com",
    },
  ];

  return (
    <footer className="py-6 mt-15">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-1">
              <TrueFocus
                sentence="HH HachathonHub"
                manualMode={false}
                blurAmount={5}
                borderColor="cyan"
                glowColor="rgba(0, 255, 255, 0.6)"
                animationDuration={2.0}
                pauseBetweenAnimations={0.5}
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md font-['Poppins']">
              Empowering the next generation of innovators through collaborative hackathons and cutting-edge technology solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left">
              <p className="text-gray-500 text-sm font-['Poppins']">
                © {currentYear} HachathonHub. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm font-['Poppins'] mt-1">
                hackhub.team51@gmail.com
              </p>
            </div>
            <div className="flex items-center mt-4 sm:mt-0">
              <p className="text-gray-400 text-sm font-['Poppins']">
                Built with passion for innovation
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import TrueFocus from "../ui/true-focus";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm font-['Poppins']">
              © {currentYear} HachathonHub. All rights reserved.
            </p>
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

//src/components/layout/Navbar.tsx

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { SessionContext } from "@/utils/supabase/usercontext";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const sessionData = useContext(SessionContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const isDataProvider = sessionData?.sessionData?.userprofile?.role === 'data_provider';

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  useEffect(() => {
    setMounted(true);
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-menu")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks: { name: string; path: string; newTab?: boolean; scroll?: boolean }[] = [
    ...(sessionData.sessionData.userprofile?.role === "data_provider"
      ? [{ name: "HOME", path: "/provider-landing" },
         { name: "DATA UPLOAD", path: "/data-upload" },
         { name: "API KEYS", path: "/api-keys"},
         { name: "API DOCS", path: "/api-docs"},]
      : [...(sessionData.sessionData.userprofile?.role === "admin"
          ? [{ name: "HOME", path: "/" },
             { name: "DASHBOARD", path: "/admin/dashboard" },
             { name: "DATASETS", path: "/admin/datasets" },
             { name: "MODELS", path: "/admin/models" },]
          : [])])
  ];

  const rightNavLinks: { name: string; path: string; newTab?: boolean; scroll?: boolean }[] = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" }
  ];

  const handleSignOut = async () => {
    // Prevent layout shifts during transition
    document.documentElement.style.pointerEvents = "none";

    const { error } = await supabase.auth.signOut();

    // Wait for next animation frame
    await new Promise(requestAnimationFrame);

    document.documentElement.style.pointerEvents = "";

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  const avatarUrl =
    sessionData?.sessionData?.session?.user?.user_metadata?.avatar_url ||
    "/user.png";

  return (
    <>
      <motion.div className="sticky isolate inset-x-0 top-0 z-[100] w-full pt-2 font-['Lilita_One']">
        {/* Desktop Navbar */}
        <motion.div
          animate={{
            backdropFilter: "blur(16px) saturate(170%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: visible
              ? "1px solid rgba(255, 255, 255, 0.15)"
              : "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 32px rgba(255, 255, 255, 0.05)",
            width: visible ? "40%" : "100%",
            y: visible ? 20 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 25,
            mass: 0.5,
          }}
          style={{ minWidth: "800px" }}
          className={cn(
            "hidden lg:flex relative z-[60] mx-auto max-w-7xl items-center justify-between rounded-2xl px-6 py-3 text-white navbar-glow after:bg-gradient-to-b after:from-black/50 after:to-transparent after:backdrop-blur-3xl"
          )}
        >
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-HachathonHub-500 text-white font-bold p-2 rounded-md">
                HH
              </span>
              <span className="text-xl font-['Lilita_One']">HachathonHub</span>
            </Link>
          </div>

          <motion.div className="flex-1 flex items-center justify-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                scroll={link.scroll !== false}
                target={link.newTab ? "_blank" : undefined}
                rel={link.newTab ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  const targetId = link.path.split("#")[1];
                  if (targetId && pathname === link.path.split("#")[0]) {
                    e.preventDefault();
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }
                }}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  pathname.split("?")[0].replace(/\/$/, "") === link.path.replace(/\/$/, "")
                  ? "text-HachathonHub-400"
                    : "text-white hover:text-HachathonHub-300"
                )}
              >
                {pathname.split("?")[0].replace(/\/$/, "") === link.path.replace(/\/$/, "") && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 h-full w-full rounded-full bg-HachathonHub-100/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-20">{link.name}</span>
              </Link>
            ))}
          </motion.div>

          <div className="flex items-center space-x-4">
            {rightNavLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  pathname.split("?")[0].replace(/\/$/, "") === link.path.replace(/\/$/, "")
                  ? "text-HachathonHub-400"
                    : "text-white hover:text-HachathonHub-300"
                )}
              >
                {pathname.split("?")[0].replace(/\/$/, "") === link.path.replace(/\/$/, "") && (
                  <motion.div
                    layoutId="active-nav-right"
                    className="absolute inset-0 h-full w-full rounded-full bg-HachathonHub-100/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-20">{link.name}</span>
              </Link>
            ))}

            {!sessionData.isLoading &&
              (sessionData.sessionData.session ? (
                <div className="relative profile-menu">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="relative z-50 rounded-full"
                  >
                    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-HachathonHub-500">
                      <Image
                        src={avatarUrl}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-48 rounded-xl bg-gray-900 border border-gray-700 shadow-2xl backdrop-blur-xl z-[2000] overflow-hidden">
                      <div className="flex flex-col space-y-1 p-1.5">
                        <Link
                          href="/user-profile"
                          target="_blank"
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-white hover:bg-gray-800/80 transition-all duration-200 rounded-lg group"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg
                            className="w-5 h-5 text-cyan-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="group-hover:text-cyan-300">
                            PROFILE
                          </span>
                        </Link>

                        <div className="border-t border-gray-700/50 mx-2" />

                        <button
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-white hover:bg-gray-800/80 transition-all duration-200 rounded-lg group"
                          onClick={() => {
                            setIsProfileOpen(false);
                            setModalOpen(true);
                          }}
                        >
                          <svg
                            className="w-5 h-5 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h4a2 2 0 012 2v10z"
                            />
                          </svg>
                          <span className="group-hover:text-purple-300 ">
                            SIGN OUT
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                  {mounted &&
                    modalOpen &&
                    createPortal(
                      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <div
                          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                          onClick={() => setModalOpen(false)}
                        >
                          <div className="absolute inset-0 opacity-20 bg-[url('/patterns/circuit-grid.svg')] bg-cover" />
                        </div>

                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="relative bg-gray-900 border border-gray-700 rounded-xl p-8 w-full max-w-md overflow-hidden"
                          style={{
                            boxShadow: "0 0 40px rgba(34,211,238,0.1)",
                            background: `
          linear-gradient(160deg, 
            rgba(17,24,39,0.98) 0%,
            rgba(3,7,18,0.98) 100%
          )
        `,
                          }}
                        >
                          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline" />

                          {/* Modal Content */}
                          <div className="relative z-10 space-y-6">
                            <div className="flex flex-col items-center">
                              <div className="mb-4 p-3 rounded-full bg-cyan-500/10 border border-cyan-400/30">
                                <svg
                                  className="w-8 h-8 text-cyan-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h4a2 2 0 012 2v10z"
                                  />
                                </svg>
                              </div>
                              <h2 className="text-3xl font-['Lilita_One'] text-gray-100">
                                Confirm Sign Out
                              </h2>
                            </div>

                            <div className="text-center space-y-2">
                              <p className="text-lg text-gray-300 font-['Poppins']">
                                Are you sure you want to sign out?
                              </p>
                              {sessionData?.sessionData.session?.user.email && (
                                <p className="text-sm text-gray-400 ">
                                  Current account:{" "}
                                  {sessionData.sessionData.session.user.email}
                                </p>
                              )}
                            </div>

                            <div className="flex flex-col space-y-3">
                              <button
                                onClick={handleSignOut}
                                className="w-full py-3 px-6 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-400/30 flex items-center justify-center gap-2 group"
                              >
                                <span className="text-cyan-400 group-hover:text-cyan-300 font-['Poppins']">
                                  Sign Out
                                </span>
                                <svg
                                  className="w-5 h-5 text-cyan-400 group-hover:animate-pulse"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                                  />
                                </svg>
                              </button>

                              <button
                                onClick={() => setModalOpen(false)}
                                className="w-full py-3 px-6 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-600 flex items-center justify-center gap-2 group"
                              >
                                <span className="text-gray-300 group-hover:text-gray-100 font-['Poppins']">
                                  Cancel
                                </span>
                                <svg
                                  className="w-5 h-5 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>

                            <p className="text-xs text-center text-gray-500 mt-4">
                              Your session is securely encrypted
                            </p>
                          </div>

                          <div className="absolute top-2 right-2 flex space-x-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 animate-pulse" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                          </div>
                        </motion.div>
                      </div>,
                      document.body
                    )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  {/* Sign in and sign up buttons removed */}
                </div>
              ))}
          </div>
        </motion.div>

        {/* Mobile Navbar */}
        <motion.div
          animate={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 32px rgba(255, 255, 255, 0.05)",
            width: visible ? "90%" : "100%",
            y: visible ? 20 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 25,
            mass: 0.5,
          }}
          className={cn(
            "lg:hidden relative z-50 mx-auto max-w-[calc(100vw-2rem)] flex-col rounded-2xl px-4 py-3 text-white after:bg-gradient-to-b after:from-black/50 after:to-transparent after:backdrop-blur-3xl"
          )}
        >
          <div className="flex w-full items-center justify-between px-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-HachathonHub-500 text-white font-bold p-2 rounded-md">
                H
              </span>
              <span className="font-bold text-xl">HachathonHub</span>
            </Link>

            <button
              className="text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu2 className="h-6 w-6" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-x-0 top-16 w-full rounded-lg bg-black/80 px-4 py-4 shadow-lg backdrop-blur-md dark:bg-neutral-950/80"
              >
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={cn(
                        "rounded-md px-4 py-2 text-sm font-medium",
                        pathname.split("?")[0].replace(/\/$/, "") === link.path.replace(/\/$/, "")
                        ? "bg-HachathonHub-100/20 text-HachathonHub-400"
                          : "text-gray-300 hover:bg-gray-800"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {!sessionData.isLoading &&
                    (sessionData.sessionData.session ? (
                      <div className="mt-4">
                        <div className="flex items-center space-x-3 px-4 py-2">
                          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-HachathonHub-500">
                            <Image
                              src={avatarUrl}
                              alt="Profile"
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex flex-col gap-2 mt-2">
                              <Link
                                href="/profile"
                                className="text-sm text-HachathonHub-500 hover:text-HachathonHub-400"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {sessionData.sessionData.userprofile
                                  ?.full_name || "User"}
                              </Link>
                              <button
                                className="text-sm text-gray-400 hover:text-HachathonHub-400"
                                onClick={() => {
                                  setIsMenuOpen(false), setModalOpen(true);
                                }}
                              >
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 flex flex-col space-y-2">
                        {/* Sign in and sign up buttons removed */}
                      </div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

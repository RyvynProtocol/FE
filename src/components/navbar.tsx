"use client";

import { WalletConnect } from "@/components/wallet-connect";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show on scroll up or at the top, hide on scroll down
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-50 pointer-events-none transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="p-3 md:px-9 md:py-6">
        <nav className="pointer-events-auto relative flex flex-col md:flex-row items-center justify-between bg-secondary text-secondary-foreground rounded-2xl md:rounded-4xl px-4 py-3 md:pl-9 md:px-9 md:py-4 shadow-lg">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="font-black tracking-tighter uppercase leading-none"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              RYVYN
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-9">
            {[
              { label: "Mint", href: "/mint" },
              { label: "Transfer", href: "/transfer" },
              { label: "Reward", href: "/stream-bonds" },
              { label: "Treasury", href: "/treasury" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 font-medium rounded-md hover:bg-secondary-foreground/5 transition-colors leading-none"
                style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.6rem)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">
            <WalletConnect />
          </div>
        </nav>
      </div>
    </div>
  )
}

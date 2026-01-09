'use client';

import { WalletConnect } from '@/components/wallet-connect';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-50 w-full transition-transform duration-300',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="p-3 md:px-9 md:py-6">
        <nav className="bg-secondary text-secondary-foreground pointer-events-auto relative flex flex-col rounded-2xl shadow-lg md:rounded-4xl">
          {/* Main navbar content */}
          <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 md:pl-8">
            {/* Left: Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="leading-none font-black tracking-tighter uppercase"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                RYVYN
              </Link>
            </div>

            {/* Center: Navigation Links (Desktop) */}
            <div className="hidden items-center gap-9 md:flex">
              {[
                { label: 'Mint', href: '/mint' },
                { label: 'Transfer', href: '/transfer' },
                { label: 'Reward', href: '/stream-bonds' },
                { label: 'Treasury', href: '/treasury' },
                { label: 'Transaction', href: '/transaction' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:bg-secondary-foreground/5 rounded-md px-4 py-2 leading-none font-medium transition-colors"
                  style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.6rem)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <WalletConnect />

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-secondary-foreground/5 rounded-md p-2 transition-colors md:hidden"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          {isMobileMenuOpen && (
            <div className="border-secondary-foreground/10 flex flex-col gap-2 border-t px-4 py-3 md:hidden">
              {[
                { label: 'Mint', href: '/mint' },
                { label: 'Transfer', href: '/transfer' },
                { label: 'Reward', href: '/stream-bonds' },
                { label: 'Treasury', href: '/treasury' },
                { label: 'Transaction', href: '/transaction' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:bg-secondary-foreground/5 rounded-md px-4 py-3 text-left leading-none font-medium transition-colors"
                  style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.6rem)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}

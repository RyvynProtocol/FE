'use client';

import { WalletConnect } from '@/components/wallet-connect';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NetworkSwitcher } from './network-switcher';

export default function Navbar() {
  const pathname = usePathname();
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isHome = pathname === '/';

  return (
    <div
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-50 w-full transition-transform duration-300',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="p-3 md:px-9 md:py-6">
        <nav
          className={cn(
            'pointer-events-auto relative flex flex-col items-center justify-between rounded-2xl px-4 py-3 shadow-lg md:flex-row md:rounded-4xl md:px-6 md:py-4 md:pl-8',
            isHome
              ? 'bg-background text-secondary'
              : 'bg-secondary text-background'
          )}
        >
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

          {/* Center: Navigation Links */}
          <div className="hidden items-center gap-9 md:flex">
            {[
              { label: 'Mint', href: '/mint' },
              { label: 'Transfer', href: '/transfer' },
              { label: 'Reward', href: '/stream-bonds' },
              { label: 'Treasury', href: '/treasury' },
              { label: 'Transactions', href: '/transactions' },
            ].map(link => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors"
                  style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.6rem)' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="bg-secondary-foreground/10 absolute inset-0 rounded-md"
                      transition={{ type: 'spring', duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">
            <NetworkSwitcher />
            <WalletConnect />
          </div>
        </nav>
      </div>
    </div>
  );
}

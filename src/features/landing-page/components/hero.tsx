'use client';

import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Lowest text: "FOR EVERYONE" - Fades out first
  const forEveryoneOpacity = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);

  // Middle text: "PAYMENTS" - Moves up, then fades out
  const paymentsY = useTransform(scrollYProgress, [0.4, 0.55], [0, -100]);
  const paymentsOpacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);

  // Top text: "PROFITABLE" - Moves up, then fades out last
  const profitableY = useTransform(scrollYProgress, [0.4, 0.55], [0, -150]);
  const profitableOpacity = useTransform(scrollYProgress, [0.5, 0.65], [1, 0]);

  // Subtitle & Button
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

  // Transitions from starting color (secondary) to zinc-900
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    ['oklch(33.86% 0.064 169.36)', 'oklch(21% 0.006 285.885)']
  );

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[200vh]"
      style={{ backgroundColor }}
    >
      {/* Sticky Content Container */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4 pt-32 text-white md:px-6">
        {/* Concentric Circles Background Pattern */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-20 select-none">
          <div className="absolute size-[400px] rounded-full border border-white/40" />
          <div className="absolute size-[600px] rounded-full border border-white/40" />
          <div className="absolute size-[800px] rounded-full border border-white/40" />
          <div className="absolute size-[1000px] rounded-full border border-white/40" />
          <div className="absolute size-[1200px] rounded-full border border-white/30" />
          <div className="absolute size-[1400px] rounded-full border border-white/30" />
          <div className="absolute size-[1600px] rounded-full border border-white/20" />
        </div>

        <div className="relative z-10 flex max-w-6xl flex-col items-center text-center">
          {/* Hero Title */}
          <h1 className="font-outfit text-6xl leading-[0.9] font-extrabold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            <motion.div
              style={{ y: profitableY, opacity: profitableOpacity }}
              className="inline-block"
            >
              PROFITABLE
            </motion.div>
            <br />
            <motion.div
              style={{ y: paymentsY, opacity: paymentsOpacity }}
              className="inline-block"
            >
              PAYMENTS
            </motion.div>
            <br />
            <motion.span
              style={{ opacity: forEveryoneOpacity }}
              className="inline-block text-white"
            >
              FOR EVERYONE
            </motion.span>
          </h1>

          {/* Subtitle/CTA - Fades out together */}
          <motion.div style={{ opacity: contentOpacity }}>
            <p className="mt-8 max-w-xl text-lg font-medium text-white/60 md:text-xl">
              We're your stablecoin that pays you to use it.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-white px-8 text-base font-semibold text-black hover:bg-white/90"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

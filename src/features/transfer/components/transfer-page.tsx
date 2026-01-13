'use client';

import { PageContainer } from '@/components/page-container';
import TransferRyUSD from '@/features/transfer/components/transfer-ry-usd';
import { fadeInItem, staggerContainer } from '@/lib/animations';
import { motion } from 'motion/react';

export default function TransferPage() {
  return (
    <PageContainer>
      <motion.div
        className="grid min-h-[calc(100vh-200px)] grid-cols-1 gap-12 lg:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Left Column */}
        <motion.div
          className="flex flex-col justify-between py-8"
          variants={fadeInItem}
        >
          {/* Top: Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tighter uppercase sm:text-3xl">
              Transfer ryUSD
            </h1>
          </div>

          {/* Bottom: Copywriting */}
          <div className="mt-12 lg:mt-0">
            <h2 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              TRANSFER AND EARN <br className="hidden md:block" />
              <span className="text-muted-foreground">REAL-WORLD YIELD.</span>
            </h2>
            <p className="text-muted-foreground mt-6 text-lg font-medium md:text-xl">
              Transfer ryUSD instantly to anyone and earn Stream Bonds rewards
              on every transaction.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Transfer Card */}
        <motion.div
          className="flex items-center justify-center lg:items-end lg:justify-end"
          variants={fadeInItem}
        >
          <div className="w-full max-w-md">
            <TransferRyUSD />
          </div>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
}

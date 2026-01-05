'use client';


import TransferRyUSD from '@/features/transfer/components/transfer-ry-usd';

export default function TransferPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>

      <div className="relative z-10">
        <main className="mx-auto max-w-6xl px-6 py-8 pb-12">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-white">
              Transfer USDC-B
            </h1>
            <p className="text-slate-400">
              Transfer USDC-B tokens to earn rewards
            </p>
          </div>

          <TransferRyUSD />
        </main>
      </div>
    </div>
  );
}

'use client';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>


      <div className="relative z-10 md:ml-64">
        <main className="mx-auto max-w-7xl px-6 py-8 pb-12">
          <div className="mt-20 text-center">
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
              Welcome to USDC-B
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-400">
              The first stablecoin that rewards every transaction with
              real-world asset-backed yields
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

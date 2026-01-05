'use client';


import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, TrendingUp } from 'lucide-react';

export default function RewardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>

      <div className="relative z-10">
        <main className="mx-auto max-w-6xl px-6 py-8 pb-12">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-white">Yield Bonds</h1>
            <p className="text-slate-400">
              Your rewards backed by real-world assets
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - User's Bonds */}
            <div className="space-y-6 lg:col-span-2">
              {/* Total Yield Bonds */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                  <CardTitle className="text-2xl font-bold text-white">
                    Your Yield Bonds
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="border-green-500/20 bg-green-500/10 text-green-400"
                  >
                    Active
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-4">
                      <p className="mb-1 text-sm text-slate-400">Total Value</p>
                      <p className="text-3xl font-bold text-white">464.80</p>
                      <p className="mt-1 text-xs text-slate-400">
                        USDC equivalent
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-4">
                      <p className="mb-1 text-sm text-slate-400">Earning Now</p>
                      <p className="text-3xl font-bold text-green-400">8.13</p>
                      <p className="mt-1 text-xs text-slate-400">
                        Streaming yield
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-4">
                      <p className="mb-1 text-sm text-slate-400">Current APY</p>
                      <p className="text-3xl font-bold text-blue-400">10.2%</p>
                      <p className="mt-1 text-xs text-slate-400">
                        From RWA yields
                      </p>
                    </div>
                  </div>

                  {/* Active Bonds List */}
                  <div className="space-y-3">
                    <h3 className="mb-4 text-lg font-bold text-white">
                      Active Bonds
                    </h3>

                    {/* Bond #1 */}
                    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-colors hover:border-blue-500/30">
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              Yield Bond #1
                            </p>
                            <p className="text-xs text-slate-400">
                              Since 2024-11-15
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">125.50 USDC</p>
                          <p className="text-sm text-green-400">+2.34 earned</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-700/50 pt-2">
                        <p className="text-xs text-slate-400">
                          Streaming at 10.2% APY
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 bg-blue-500/20 text-xs text-blue-400 hover:bg-blue-500/30"
                        >
                          Claim
                        </Button>
                      </div>
                    </div>

                    {/* Bond #2 */}
                    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-colors hover:border-blue-500/30">
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              Yield Bond #2
                            </p>
                            <p className="text-xs text-slate-400">
                              Since 2024-11-20
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">89.30 USDC</p>
                          <p className="text-sm text-green-400">+1.67 earned</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-700/50 pt-2">
                        <p className="text-xs text-slate-400">
                          Streaming at 10.2% APY
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 bg-blue-500/20 text-xs text-blue-400 hover:bg-blue-500/30"
                        >
                          Claim
                        </Button>
                      </div>
                    </div>

                    {/* Bond #3 */}
                    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-colors hover:border-blue-500/30">
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              Yield Bond #3
                            </p>
                            <p className="text-xs text-slate-400">
                              Since 2024-11-25
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">250.00 USDC</p>
                          <p className="text-sm text-green-400">+4.12 earned</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-700/50 pt-2">
                        <p className="text-xs text-slate-400">
                          Streaming at 10.2% APY
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 bg-blue-500/20 text-xs text-blue-400 hover:bg-blue-500/30"
                        >
                          Claim
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Treasury Backing */}
            <div className="space-y-6">
              {/* Treasury Allocation */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-bold text-white">
                    <Shield className="h-5 w-5 text-blue-400" />
                    Backed by RWA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-slate-400">
                    Your yields are secured by real-world assets held in
                    treasury
                  </p>

                  <div className="space-y-4">
                    {/* US T-Bills */}
                    <div className="rounded-lg border border-slate-700/30 bg-slate-800/30 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          US T-Bills (ONDO)
                        </span>
                        <span className="font-bold text-blue-400">60%</span>
                      </div>
                      <Progress value={60} className="h-2 bg-slate-700/50" />
                    </div>

                    {/* Corporate Bonds */}
                    <div className="rounded-lg border border-slate-700/30 bg-slate-800/30 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          Corporate Bonds
                        </span>
                        <span className="font-bold text-purple-400">25%</span>
                      </div>
                      <Progress value={25} className="h-2 bg-slate-700/50" />
                    </div>

                    {/* Liquid Buffer */}
                    <div className="rounded-lg border border-slate-700/30 bg-slate-800/30 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          USDC Buffer
                        </span>
                        <span className="font-bold text-green-400">10%</span>
                      </div>
                      <Progress value={10} className="h-2 bg-slate-700/50" />
                      <p className="mt-1 text-xs text-slate-400">
                        For redemptions
                      </p>
                    </div>

                    {/* Protocol Reserve */}
                    <div className="rounded-lg border border-slate-700/30 bg-slate-800/30 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          Protocol Reserve
                        </span>
                        <span className="font-bold text-orange-400">5%</span>
                      </div>
                      <Progress value={5} className="h-2 bg-slate-700/50" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How It Works */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">
                    How Yields Work
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                      1
                    </div>
                    <p className="text-slate-400">
                      Earn bonds on every USDC-B transfer
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-400">
                      2
                    </div>
                    <p className="text-slate-400">
                      Bonds stream yield from RWA treasury
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-400">
                      3
                    </div>
                    <p className="text-slate-400">
                      Claim yields anytime to your wallet
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Treasury Stats */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">
                    Treasury Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Total Value</span>
                    <span className="font-medium text-white">$10.2M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Avg Yield</span>
                    <span className="font-medium text-green-400">
                      10.2% APY
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Active Bonds</span>
                    <span className="font-medium text-white">1,234</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

'use client';

import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowUpRight,
  DollarSign,
  PieChart,
  Shield,
  TrendingUp,
  Vault,
} from 'lucide-react';

export default function TreasuryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>

      <Sidebar />

      <div className="relative z-10 md:ml-64">
        <main className="mx-auto max-w-7xl px-6 py-8 pb-12">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-white">Treasury</h1>
            <p className="text-slate-400">
              Real-world assets backing USDC-B yields
            </p>
          </div>

          {/* Top Stats */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="glass-card border-none bg-slate-900/40">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                    <DollarSign className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-sm text-slate-400">Total Value</p>
                </div>
                <p className="mb-1 text-3xl font-bold text-white">$10.2M</p>
                <div className="flex items-center gap-1 text-sm text-green-400">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+5.2% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none bg-slate-900/40">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                  </div>
                  <p className="text-sm text-slate-400">Current Yield</p>
                </div>
                <p className="mb-1 text-3xl font-bold text-white">10.2%</p>
                <div className="flex items-center gap-1 text-sm text-green-400">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>APY</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none bg-slate-900/40">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <p className="text-sm text-slate-400">Collateral Ratio</p>
                </div>
                <p className="mb-1 text-3xl font-bold text-white">105%</p>
                <div className="flex items-center gap-1 text-sm text-green-400">
                  <span>Over-collateralized</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none bg-slate-900/40">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                    <PieChart className="h-5 w-5 text-orange-400" />
                  </div>
                  <p className="text-sm text-slate-400">USDC-B Supply</p>
                </div>
                <p className="mb-1 text-3xl font-bold text-white">$9.7M</p>
                <div className="flex items-center gap-1 text-sm text-slate-400">
                  <span>In circulation</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Asset Allocation */}
            <div className="space-y-6 lg:col-span-2">
              {/* Allocation Breakdown */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">
                    Asset Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* US T-Bills */}
                  <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                          <Vault className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">
                            US T-Bills (ONDO)
                          </p>
                          <p className="text-sm text-slate-400">
                            United States Treasury Bills
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">60%</p>
                        <p className="text-sm text-slate-400">$6.12M</p>
                      </div>
                    </div>
                    <Progress value={60} className="mb-2 h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Current Yield</span>
                      <span className="font-medium text-green-400">
                        4.5% APY
                      </span>
                    </div>
                  </div>

                  {/* Corporate Bonds */}
                  <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">
                            Corporate Bonds
                          </p>
                          <p className="text-sm text-slate-400">
                            Investment-grade corporate debt
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">25%</p>
                        <p className="text-sm text-slate-400">$2.55M</p>
                      </div>
                    </div>
                    <Progress value={25} className="mb-2 h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Current Yield</span>
                      <span className="font-medium text-green-400">
                        6.8% APY
                      </span>
                    </div>
                  </div>

                  {/* USDC Buffer */}
                  <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                          <DollarSign className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">
                            USDC Liquid Buffer
                          </p>
                          <p className="text-sm text-slate-400">
                            For instant redemptions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">10%</p>
                        <p className="text-sm text-slate-400">$1.02M</p>
                      </div>
                    </div>
                    <Progress value={10} className="mb-2 h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        Available for Withdrawal
                      </span>
                      <span className="font-medium text-green-400">100%</span>
                    </div>
                  </div>

                  {/* Protocol Reserve */}
                  <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">
                            Protocol Reserve
                          </p>
                          <p className="text-sm text-slate-400">
                            Emergency fund & insurance
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">5%</p>
                        <p className="text-sm text-slate-400">$510K</p>
                      </div>
                    </div>
                    <Progress value={5} className="mb-2 h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        Reserved for Safety
                      </span>
                      <span className="font-medium text-green-400">Locked</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart Placeholder */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">
                    Treasury Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex h-64 items-center justify-center rounded-xl border border-slate-700/30 bg-slate-800/30 p-8">
                    <p className="text-slate-400">Chart coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-6">
              {/* Treasury Security */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-bold text-white">
                    <Shield className="h-5 w-5 text-green-400" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-green-400"></div>
                    <div>
                      <p className="font-medium text-white">Multi-sig Wallet</p>
                      <p className="text-xs text-slate-400">
                        3/5 signature requirement
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-400"></div>
                    <div>
                      <p className="font-medium text-white">
                        Audited Contracts
                      </p>
                      <p className="text-xs text-slate-400">
                        By leading security firms
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-purple-400"></div>
                    <div>
                      <p className="font-medium text-white">
                        Insurance Coverage
                      </p>
                      <p className="text-xs text-slate-400">
                        $5M protocol insurance
                      </p>
                    </div>
                    ```
                  </div>
                </CardContent>
              </Card>

              {/* Yield Distribution */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">
                    Yield Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      To Yield Bond Holders
                    </span>
                    <span className="font-medium text-white">85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-slate-700/50" />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-slate-400">
                      Protocol Operations
                    </span>
                    <span className="font-medium text-white">10%</span>
                  </div>
                  <Progress value={10} className="h-2 bg-slate-700/50" />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-slate-400">Reserve Fund</span>
                    <span className="font-medium text-white">5%</span>
                  </div>
                  <Progress value={5} className="h-2 bg-slate-700/50" />
                </CardContent>
              </Card>

              {/* Monthly Stats */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">
                    This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Total Yields Generated
                    </span>
                    <span className="font-medium text-green-400">$87,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Distributed to Users
                    </span>
                    <span className="font-medium text-white">$74,148</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      New USDC-B Minted
                    </span>
                    <span className="font-medium text-white">$1.2M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Redemptions</span>
                    <span className="font-medium text-white">$340K</span>
                  </div>
                </CardContent>
              </Card>

              {/* Transparency */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">
                    Transparency
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-center bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                  >
                    View Contract
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-center bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                  >
                    Audit Reports
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-center bg-green-500/20 text-green-400 hover:bg-green-500/30"
                  >
                    Treasury Wallet
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

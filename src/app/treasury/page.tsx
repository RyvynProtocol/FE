'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Vault, TrendingUp, Shield, DollarSign, PieChart, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export default function TreasuryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>

      <Sidebar />

      <div className="relative z-10 md:ml-64">
        <main className="max-w-7xl mx-auto px-6 py-8 pb-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Treasury</h1>
            <p className="text-slate-400">Real-world assets backing USDC-B yields</p>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-none bg-slate-900/40">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-slate-400 text-sm">Total Value</p>
                </div>
                <p className="text-3xl font-bold text-white mb-1">$10.2M</p>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+5.2% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none bg-slate-900/40">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-slate-400 text-sm">Current Yield</p>
                </div>
                <p className="text-3xl font-bold text-white mb-1">10.2%</p>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>APY</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none bg-slate-900/40">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-slate-400 text-sm">Collateral Ratio</p>
                </div>
                <p className="text-3xl font-bold text-white mb-1">105%</p>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <span>Over-collateralized</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none bg-slate-900/40">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-orange-400" />
                  </div>
                  <p className="text-slate-400 text-sm">USDC-B Supply</p>
                </div>
                <p className="text-3xl font-bold text-white mb-1">$9.7M</p>
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <span>In circulation</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Asset Allocation */}
            <div className="lg:col-span-2 space-y-6">
              {/* Allocation Breakdown */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* US T-Bills */}
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <Vault className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">US T-Bills (ONDO)</p>
                          <p className="text-slate-400 text-sm">United States Treasury Bills</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-xl">60%</p>
                        <p className="text-slate-400 text-sm">$6.12M</p>
                      </div>
                    </div>
                    <Progress value={60} className="h-3 mb-2" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Current Yield</span>
                      <span className="text-green-400 font-medium">4.5% APY</span>
                    </div>
                  </div>

                  {/* Corporate Bonds */}
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">Corporate Bonds</p>
                          <p className="text-slate-400 text-sm">Investment-grade corporate debt</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-xl">25%</p>
                        <p className="text-slate-400 text-sm">$2.55M</p>
                      </div>
                    </div>
                    <Progress value={25} className="h-3 mb-2" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Current Yield</span>
                      <span className="text-green-400 font-medium">6.8% APY</span>
                    </div>
                  </div>

                  {/* USDC Buffer */}
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">USDC Liquid Buffer</p>
                          <p className="text-slate-400 text-sm">For instant redemptions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-xl">10%</p>
                        <p className="text-slate-400 text-sm">$1.02M</p>
                      </div>
                    </div>
                    <Progress value={10} className="h-3 mb-2" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Available for Withdrawal</span>
                      <span className="text-green-400 font-medium">100%</span>
                    </div>
                  </div>

                  {/* Protocol Reserve */}
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">Protocol Reserve</p>
                          <p className="text-slate-400 text-sm">Emergency fund & insurance</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-xl">5%</p>
                        <p className="text-slate-400 text-sm">$510K</p>
                      </div>
                    </div>
                    <Progress value={5} className="h-3 mb-2" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Reserved for Safety</span>
                      <span className="text-green-400 font-medium">Locked</span>
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
                  <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30 flex items-center justify-center h-64">
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
                    <Shield className="w-5 h-5 text-green-400" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5"></div>
                    <div>
                      <p className="text-white font-medium">Multi-sig Wallet</p>
                      <p className="text-slate-400 text-xs">3/5 signature requirement</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
                    <div>
                      <p className="text-white font-medium">Audited Contracts</p>
                      <p className="text-slate-400 text-xs">By leading security firms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5"></div>
                    <div>
                      <p className="text-white font-medium">Insurance Coverage</p>
                      <p className="text-slate-400 text-xs">$5M protocol insurance</p>
                    </div>
                    ```
                  </div>
                </CardContent>
              </Card>

              {/* Yield Distribution */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Yield Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">To Yield Bond Holders</span>
                    <span className="text-white font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-slate-700/50" />

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-400 text-sm">Protocol Operations</span>
                    <span className="text-white font-medium">10%</span>
                  </div>
                  <Progress value={10} className="h-2 bg-slate-700/50" />

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-400 text-sm">Reserve Fund</span>
                    <span className="text-white font-medium">5%</span>
                  </div>
                  <Progress value={5} className="h-2 bg-slate-700/50" />
                </CardContent>
              </Card>

              {/* Monthly Stats */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Total Yields Generated</span>
                    <span className="text-green-400 font-medium">$87,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Distributed to Users</span>
                    <span className="text-white font-medium">$74,148</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">New USDC-B Minted</span>
                    <span className="text-white font-medium">$1.2M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Redemptions</span>
                    <span className="text-white font-medium">$340K</span>
                  </div>
                </CardContent>
              </Card>

              {/* Transparency */}
              <Card className="glass-card border-none bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Transparency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-center bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                  >
                    View Contract
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-center bg-purple-500/20 hover:bg-purple-500/30 text-purple-400"
                  >
                    Audit Reports
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-center bg-green-500/20 hover:bg-green-500/30 text-green-400"
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

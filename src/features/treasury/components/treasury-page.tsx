import { PageContainer } from '@/components/page-container';
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
    <PageContainer>
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Treasury</h1>
        <p className="text-muted-foreground">
          Real-world assets backing USDC-B yields
        </p>
      </div>

      {/* Top Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-muted-foreground text-sm">Total Value</p>
            </div>
            <p className="mb-1 text-3xl font-bold">$10.2M</p>
            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="h-4 w-4" />
              <span>+5.2% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-muted-foreground text-sm">Current Yield</p>
            </div>
            <p className="mb-1 text-3xl font-bold">10.2%</p>
            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="h-4 w-4" />
              <span>APY</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-muted-foreground text-sm">Collateral Ratio</p>
            </div>
            <p className="mb-1 text-3xl font-bold">105%</p>
            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <span>Over-collateralized</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                <PieChart className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-muted-foreground text-sm">USDC-B Supply</p>
            </div>
            <p className="mb-1 text-3xl font-bold">$9.7M</p>
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <span>In circulation</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Asset Allocation */}
        <div className="space-y-6 lg:col-span-2">
          {/* Allocation Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* US T-Bills */}
              <div className="bg-muted/50 rounded-xl border p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                      <Vault className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">US T-Bills (ONDO)</p>
                      <p className="text-muted-foreground text-sm">
                        United States Treasury Bills
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">60%</p>
                    <p className="text-muted-foreground text-sm">$6.12M</p>
                  </div>
                </div>
                <Progress value={60} className="mb-2 h-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Yield</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    4.5% APY
                  </span>
                </div>
              </div>

              {/* Corporate Bonds */}
              <div className="bg-muted/50 rounded-xl border p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                      <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">Corporate Bonds</p>
                      <p className="text-muted-foreground text-sm">
                        Investment-grade corporate debt
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">25%</p>
                    <p className="text-muted-foreground text-sm">$2.55M</p>
                  </div>
                </div>
                <Progress value={25} className="mb-2 h-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Yield</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    6.8% APY
                  </span>
                </div>
              </div>

              {/* USDC Buffer */}
              <div className="bg-muted/50 rounded-xl border p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                      <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">USDC Liquid Buffer</p>
                      <p className="text-muted-foreground text-sm">
                        For instant redemptions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">10%</p>
                    <p className="text-muted-foreground text-sm">$1.02M</p>
                  </div>
                </div>
                <Progress value={10} className="mb-2 h-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Available for Withdrawal
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    100%
                  </span>
                </div>
              </div>

              {/* Protocol Reserve */}
              <div className="bg-muted/50 rounded-xl border p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                      <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">Protocol Reserve</p>
                      <p className="text-muted-foreground text-sm">
                        Emergency fund & insurance
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">5%</p>
                    <p className="text-muted-foreground text-sm">$510K</p>
                  </div>
                </div>
                <Progress value={5} className="mb-2 h-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Reserved for Safety
                  </span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    Locked
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Treasury Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 flex h-64 items-center justify-center rounded-xl border p-8">
                <p className="text-muted-foreground">Chart coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Info */}
        <div className="space-y-6">
          {/* Treasury Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="font-medium">Multi-sig Wallet</p>
                  <p className="text-muted-foreground text-xs">
                    3/5 signature requirement
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="font-medium">Audited Contracts</p>
                  <p className="text-muted-foreground text-xs">
                    By leading security firms
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-purple-500"></div>
                <div>
                  <p className="font-medium">Insurance Coverage</p>
                  <p className="text-muted-foreground text-xs">
                    $5M protocol insurance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yield Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Yield Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  To Yield Bond Holders
                </span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />

              <div className="flex items-center justify-between pt-2">
                <span className="text-muted-foreground text-sm">
                  Protocol Operations
                </span>
                <span className="font-medium">10%</span>
              </div>
              <Progress value={10} className="h-2" />

              <div className="flex items-center justify-between pt-2">
                <span className="text-muted-foreground text-sm">
                  Reserve Fund
                </span>
                <span className="font-medium">5%</span>
              </div>
              <Progress value={5} className="h-2" />
            </CardContent>
          </Card>

          {/* Monthly Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Total Yields Generated
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  $87,234
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Distributed to Users
                </span>
                <span className="font-medium">$74,148</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  New USDC-B Minted
                </span>
                <span className="font-medium">$1.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Redemptions
                </span>
                <span className="font-medium">$340K</span>
              </div>
            </CardContent>
          </Card>

          {/* Transparency */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Transparency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-center text-blue-600 hover:bg-blue-500/10 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View Contract
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-center text-purple-600 hover:bg-purple-500/10 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Audit Reports
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-center text-green-600 hover:bg-green-500/10 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                Treasury Wallet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

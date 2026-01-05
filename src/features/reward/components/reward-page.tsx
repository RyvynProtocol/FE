import { PageContainer } from '@/components/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, TrendingUp } from 'lucide-react';

export default function RewardPage() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Yield Bonds</h1>
        <p className="text-muted-foreground">
          Your rewards backed by real-world assets
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - User's Bonds */}
        <div className="space-y-6 lg:col-span-2">
          {/* Total Yield Bonds */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
              <CardTitle className="text-2xl font-bold">
                Your Yield Bonds
              </CardTitle>
              <Badge
                variant="outline"
                className="border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
              >
                Active
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="bg-muted/50 rounded-xl border p-4">
                  <p className="text-muted-foreground mb-1 text-sm">
                    Total Value
                  </p>
                  <p className="text-3xl font-bold">464.80</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    USDC equivalent
                  </p>
                </div>
                <div className="bg-muted/50 rounded-xl border p-4">
                  <p className="text-muted-foreground mb-1 text-sm">
                    Earning Now
                  </p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    8.13
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Streaming yield
                  </p>
                </div>
                <div className="bg-muted/50 rounded-xl border p-4">
                  <p className="text-muted-foreground mb-1 text-sm">
                    Current APY
                  </p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    10.2%
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    From RWA yields
                  </p>
                </div>
              </div>

              {/* Active Bonds List */}
              <div className="space-y-3">
                <h3 className="mb-4 text-lg font-bold">Active Bonds</h3>

                {/* Bond #1 */}
                <div className="bg-card hover:border-primary/50 rounded-xl border p-4 transition-colors">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                        <TrendingUp className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Yield Bond #1</p>
                        <p className="text-muted-foreground text-xs">
                          Since 2024-11-15
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">125.50 USDC</p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        +2.34 earned
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <p className="text-muted-foreground text-xs">
                      Streaming at 10.2% APY
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 h-7 text-xs"
                    >
                      Claim
                    </Button>
                  </div>
                </div>

                {/* Bond #2 */}
                <div className="bg-card hover:border-primary/50 rounded-xl border p-4 transition-colors">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                        <TrendingUp className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Yield Bond #2</p>
                        <p className="text-muted-foreground text-xs">
                          Since 2024-11-20
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">89.30 USDC</p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        +1.67 earned
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <p className="text-muted-foreground text-xs">
                      Streaming at 10.2% APY
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 h-7 text-xs"
                    >
                      Claim
                    </Button>
                  </div>
                </div>

                {/* Bond #3 */}
                <div className="bg-card hover:border-primary/50 rounded-xl border p-4 transition-colors">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                        <TrendingUp className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Yield Bond #3</p>
                        <p className="text-muted-foreground text-xs">
                          Since 2024-11-25
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">250.00 USDC</p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        +4.12 earned
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <p className="text-muted-foreground text-xs">
                      Streaming at 10.2% APY
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 h-7 text-xs"
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <Shield className="text-primary h-5 w-5" />
                Backed by RWA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                Your yields are secured by real-world assets held in treasury
              </p>

              <div className="space-y-4">
                {/* US T-Bills */}
                <div className="bg-muted/50 rounded-lg border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      US T-Bills (ONDO)
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      60%
                    </span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                {/* Corporate Bonds */}
                <div className="bg-muted/50 rounded-lg border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Corporate Bonds</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      25%
                    </span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>

                {/* Liquid Buffer */}
                <div className="bg-muted/50 rounded-lg border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">USDC Buffer</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      10%
                    </span>
                  </div>
                  <Progress value={10} className="h-2" />
                  <p className="text-muted-foreground mt-1 text-xs">
                    For redemptions
                  </p>
                </div>

                {/* Protocol Reserve */}
                <div className="bg-muted/50 rounded-lg border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Protocol Reserve
                    </span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      5%
                    </span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                How Yields Work
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                  1
                </div>
                <p className="text-muted-foreground">
                  Earn bonds on every USDC-B transfer
                </p>
              </div>
              <div className="flex gap-3">
                <div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                  2
                </div>
                <p className="text-muted-foreground">
                  Bonds stream yield from RWA treasury
                </p>
              </div>
              <div className="flex gap-3">
                <div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                  3
                </div>
                <p className="text-muted-foreground">
                  Claim yields anytime to your wallet
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Treasury Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Treasury Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Total Value
                </span>
                <span className="font-medium">$10.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Avg Yield</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  10.2% APY
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Active Bonds
                </span>
                <span className="font-medium">1,234</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

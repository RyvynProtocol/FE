import { PageContainer } from '@/components/page-container';
import TransferRyUSD from '@/features/transfer/components/transfer-ry-usd';

export default function TransferPage() {
  return (
    <PageContainer>
      <div className="grid min-h-[calc(100vh-200px)] grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col justify-between py-8">
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
        </div>

        {/* Right Column: Transfer Card */}
        <div className="flex items-center justify-center lg:items-end lg:justify-end">
          <div className="w-full max-w-md">
            <TransferRyUSD />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

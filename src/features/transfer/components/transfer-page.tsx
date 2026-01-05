import { PageContainer } from '@/components/page-container';
import TransferRyUSD from '@/features/transfer/components/transfer-ry-usd';

export default function TransferPage() {
  return (
    <PageContainer className="max-w-6xl">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-white">
          Transfer USDC-B
        </h1>
        <p className="text-slate-400">Transfer USDC-B tokens to earn rewards</p>
      </div>

      <TransferRyUSD />
    </PageContainer>
  );
}


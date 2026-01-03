import { createConfig } from '@privy-io/wagmi';
import { http } from 'wagmi';
import { mainnet, mantle, mantleSepoliaTestnet, sepolia } from 'wagmi/chains';

export const config = createConfig({
  chains: [mainnet, sepolia, mantle, mantleSepoliaTestnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [mantle.id]: http(),
    [mantleSepoliaTestnet.id]: http(),
  },
});

import { http } from 'wagmi';
import { mainnet, sepolia, mantle, mantleSepoliaTestnet } from 'wagmi/chains';
import { createConfig } from '@privy-io/wagmi';

export const config = createConfig({
  chains: [mainnet, sepolia, mantle, mantleSepoliaTestnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [mantle.id]: http(),
    [mantleSepoliaTestnet.id]: http(),
  },
});

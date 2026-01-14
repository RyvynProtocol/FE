<<<<<<< Updated upstream
# USDC-B - Stablecoin with Built-in Yield Rewards
=======
# RYVYN Protocol - Frontend
>>>>>>> Stashed changes

A revolutionary stablecoin platform that rewards users on every transfer with real-world asset-backed yields. This is the frontend application for the RYVYN Protocol.

## ✨ Features

- **Real World Assets**: Treasury backed by 60% US T-Bills and 25% Corporate Bonds, turning idle money into working capital
- **Profitable Payments**: Gamified investment with deterministic rewards on every transaction, split between sender and receiver
- **Stream Bonds (ryBOND)**: Sustainable yield that streams over time, claim your yield as it drips every second
- **ryUSD Stablecoin**: Mint and transfer the protocol's native stablecoin
- **Treasury Dashboard**: Real-time visibility into asset allocation and yields
- **Transaction History**: Complete transaction log with rewards tracking

## 🛠️ Tech Stack

| Category          | Technologies                           |
| ----------------- | -------------------------------------- |
| **Framework**     | Next.js 15 with App Router & Turbopack |
| **Language**      | TypeScript                             |
| **Styling**       | Tailwind CSS 4.0                       |
| **Web3 Auth**     | Privy                                  |
| **Blockchain**    | Wagmi, Viem                            |
| **Animations**    | Motion (Framer Motion)                 |
| **3D Graphics**   | Three.js, OGL                          |
| **Charts**        | Recharts                               |
| **UI Components** | Radix UI, Lucide React                 |

## 📁 Project Structure

```
src/
├── abis/           # Smart contract ABIs
├── app/            # Next.js App Router pages
│   ├── admin/      # Admin dashboard
│   ├── mint/       # Mint ryUSD page
│   ├── stream-bonds/  # Stream Bonds (ryBOND) page
│   ├── transactions/  # Transaction history
│   ├── transfer/   # Transfer ryUSD page
│   └── treasury/   # Treasury overview
├── components/     # Reusable UI components
├── config/         # App configuration
├── features/       # Feature-specific components
│   ├── admin/      # Admin features
│   ├── landing-page/  # Landing page sections
│   ├── mint/       # Mint functionality
│   ├── reward/     # Reward system
│   ├── transactions/  # Transaction features
│   ├── transfer/   # Transfer functionality
│   └── treasury/   # Treasury features
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── providers/      # React context providers
└── types/          # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Other Commands

<<<<<<< Updated upstream
- **StatCard**: Display key metrics with gradients and trends
- **TransferCard**: Send USDC-B with live reward preview
- **StreamBondsCard**: View and manage your Stream Bonds
- **TreasuryCard**: Real-time treasury allocation and yields
- **TierCard**: Track progress through reward tiers
- **TransactionHistory**: Complete transaction log with rewards
=======
```bash
# Build for production
pnpm build
>>>>>>> Stashed changes

# Start production server
pnpm start

<<<<<<< Updated upstream
The UI is inspired by Fluidity's clean and modern aesthetic:
- Glass morphism effects
- Gradient accents
- Smooth animations
- Dark theme with pops of color
- Clear data visualization
=======
# Run linting
pnpm lint

# Check TypeScript types
pnpm check-types
```
>>>>>>> Stashed changes

## 🎨 Design Philosophy

<<<<<<< Updated upstream
This is a UI-only implementation. To make it functional, integrate with:
- USDC-B smart contract for token transfers
- YieldTreasury contract for treasury data
- StreamBond contract for bond management
- RewardDistributor for calculating rewards
=======
The UI features a modern, premium aesthetic:

- Dark theme with vibrant color accents
- Glassmorphism effects
- Smooth scroll-based animations
- Interactive 3D elements
- Responsive design
>>>>>>> Stashed changes

## 🔗 Smart Contracts

This frontend integrates with the following smart contracts:

- **ryUSD**: The protocol's native stablecoin
- **ryBOND**: Stream Bond token for yield distribution
- **Treasury**: Manages real-world asset allocations
- **RewardDistributor**: Calculates and distributes transaction rewards

## 📄 License

MIT

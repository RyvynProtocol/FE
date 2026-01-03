import { Toaster } from '@/components/ui/sonner';
import { PrivyProvider } from '@/providers/PrivyProvider';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'USDC-B | Stablecoin with Built-in Yield Rewards',
  description:
    'Earn rewards on every transfer. The stablecoin that pays you to use it.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${figtree.className}`}>
        <PrivyProvider>{children}</PrivyProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}

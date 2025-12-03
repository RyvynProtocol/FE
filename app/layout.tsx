import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "USDC-B | Stablecoin with Built-in Yield Rewards",
  description: "Earn rewards on every transfer. The stablecoin that pays you to use it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

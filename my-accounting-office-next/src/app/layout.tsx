import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './styles/main.scss';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Accounting Office",
  description: "Twoje biuro rachunkowe online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}

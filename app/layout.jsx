import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eddy Guzman — Interactive Resume for Nvolvus",
  description: "GHL setup & automation • WordPress funnels • Voice AI • English/Spanish."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

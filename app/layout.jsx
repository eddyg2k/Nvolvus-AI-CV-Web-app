import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prospectivity — Scroll-first AI résumé",
  description: "Dark-blue, 3D résumé for Eddy Guzman: phoneless AI, Reservo booking flows, Discord classroom demos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

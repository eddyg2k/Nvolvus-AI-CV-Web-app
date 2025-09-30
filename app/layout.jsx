import "./globals.css";

export const metadata = {
  title: "Eddy Guzman — Interactive Resume for Nvolvus",
  description: "AI Voice • GHL • Funnels • WordPress"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

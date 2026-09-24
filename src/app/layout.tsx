import type { Metadata, Viewport } from "next";
import { Jost, Courier_Prime, Libre_Caslon_Text } from "next/font/google";
import "./globals.css";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const courier = Courier_Prime({ variable: "--font-courier", subsets: ["latin"], weight: ["400", "700"] });
const caslon = Libre_Caslon_Text({ variable: "--font-caslon", subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "The Curious Scroll",
  description: "An experimental scroll picture in four chapters. A style homage in symmetry, palettes and title cards.",
};

export const viewport: Viewport = {
  themeColor: "#F2E8D5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-palette="cream" className={`${jost.variable} ${courier.variable} ${caslon.variable}`}>
      <body>{children}</body>
    </html>
  );
}

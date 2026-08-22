import type { Metadata } from "next";
import { Poppins, Jomhuria, Inter, Antonio, Roboto_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const jomhuria = Jomhuria({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jomhuria",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-antonio",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RED — Fearless. Feel.",
  description: "From the streets to the top, we move different.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jomhuria.variable} ${inter.variable} ${antonio.variable} ${robotoMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

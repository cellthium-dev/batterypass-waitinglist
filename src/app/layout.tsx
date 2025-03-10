import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Battery Pass",
  description: "Battery Pass by Cellthium Labs.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const departureMono = localFont({
  variable: "--font-departure-mono",
  src: [{ path: "./../../public/fonts/departuremono.otf", style: "normal" }],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${departureMono.variable}`}
    >
      <body className="font-mono">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

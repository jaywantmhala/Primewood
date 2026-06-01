import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "@/context/Providers";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buy Furniture Online for Home and Office | Primewood",
  description: "Transforming spaces into beautiful homes and productive offices. Explore India's largest furniture brand with a legacy of trust and quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body
        className={`${montserrat.variable} font-sans bg-white text-gray-800 antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


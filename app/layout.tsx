import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SidebarNav from "@/app/_components/layout/SidebarNav";

const publicSans = localFont({
  src: "./fonts/PublicSans-VariableFont_wght.ttf",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.className} antialiased`}
      >
        <div className="flex">
          <SidebarNav />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
import localFont from "next/font/local";
import "./globals.css";

import { MainLayout } from "@/components/layout/main-layout";
import BottomNav from "@/components/layout/sidebar/bottom-nav";
import SidebarNav from "@/components/layout/sidebar/sidebar-nav";

const publicSans = localFont({
  src: "./fonts/PublicSans-VariableFont_wght.ttf",
});

export const metadata = {
  title: {
    template: "%s / Personal Finance App",
    default: "Welcome / Personal Finance App",
  },
  description:
    "A personal finance app to help you manage your money, budget, and track your spending.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${publicSans.className} antialiased h-full flex flex-col relative`}
      >
        <div className="flex bg-beige-100 h-full ">
          <SidebarNav />
          <BottomNav />
          <MainLayout>{children}</MainLayout>
        </div>
      </body>
    </html>
  );
}

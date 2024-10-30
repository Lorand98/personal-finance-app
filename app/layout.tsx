import localFont from "next/font/local";
import "./globals.css";

import { MainLayout } from "@/components/layout/main-layout";
import SidebarNav from "@/components/layout/sidebar/sidebar-nav";
import { LayoutProvider } from "@/context/layout-context";
import CompactSidebarNav from "@/components/layout/sidebar/compact-sidebar-nav";
import BottomNav from "@/components/layout/sidebar/bottom-nav";

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
    <html lang="en">
      <body
        className={`${publicSans.className} antialiased min-h-screen flex flex-col relative`}
      >
        <div className="bg-beige-100 ">
          <LayoutProvider>
            <SidebarNav />
            <BottomNav/>
            <MainLayout>
              {children}
            </MainLayout>
          </LayoutProvider>
        </div>
      </body>
    </html>
  );
}

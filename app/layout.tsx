import localFont from "next/font/local";
import "./globals.css";

import SidebarNav from "@/app/_components/layout/SidebarNav";
import { LayoutProvider } from "./_context/LayoutContext";
import { MainLayout } from "./_components/layout/MainLayout";

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
        <div className="bg-beige-100">
          <LayoutProvider>
            <SidebarNav />
            <MainLayout>
              {children}
            </MainLayout>
          </LayoutProvider>
        </div>
      </body>
    </html>
  );
}

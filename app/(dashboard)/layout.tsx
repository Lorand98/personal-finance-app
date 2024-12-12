import { MainLayout } from "@/components/layout/main-layout";
import BottomNav from "@/components/layout/sidebar/bottom-nav";
import SidebarNav from "@/components/layout/sidebar/sidebar-nav";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-beige-100 h-full ">
      <SidebarNav />
      <BottomNav />
      <MainLayout>{children}</MainLayout>
    </div>
  );
}

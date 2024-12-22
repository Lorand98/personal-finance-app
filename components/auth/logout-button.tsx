"use client";

import { logoutAction } from "@/app/(login)/actions";
import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <Button onClick={handleLogout} disabled={isPending}>
      <LogOut className="h-4 w-4" />
      <span>{isPending ? "Logging out..." : "Logout"}</span>
    </Button>
  );
}

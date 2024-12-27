"use client";

import { logoutAction } from "@/app/(login)/actions";
import { Loader2, LogOut } from "lucide-react";
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
    <Button onClick={handleLogout} disabled={isPending} aria-label="Logout">
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:block">
        {isPending ? <Loader2 /> : "Logout"}
      </span>
    </Button>
  );
}

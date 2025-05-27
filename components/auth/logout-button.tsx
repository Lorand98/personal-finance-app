"use client";

import { logoutAction } from "@/app/(login)/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logoutAction();
      if (result?.serverSideError) {
        toast({
          title: "Logout failed",
          description: result.serverSideError,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Button onClick={handleLogout} disabled={isPending} aria-label="Logout">
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:block">
        {isPending ? <Loader2 className="animate-spin" /> : "Logout"}
      </span>
    </Button>
  );
}

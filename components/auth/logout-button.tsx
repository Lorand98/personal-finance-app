"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { logoutAction } from "@/app/(login)/actions";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {

    //TODO: check if try catch is needed
    startTransition(async () => {
      try {
        const result = await logoutAction();
        if (result && result.serverSideError) {
          toast({
            title: "Logout failed",
            description: result.serverSideError,
            variant: "destructive",
          });
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/error");
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
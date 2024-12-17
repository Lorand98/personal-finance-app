import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={cn("h-10 w-10 animate-spin")} />
    </div>
  );
}

export default Spinner;

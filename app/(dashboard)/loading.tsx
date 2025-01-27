import Spinner from "@/components/ui/spinner";

// TODO: Redesign loading page and make it DRY (currently repeating for each route)

export default function Loading() {
  return (
    <div className="grid items-center justify-center gap-4">
      <Spinner />
      <p className="text-preset-1 text-muted-foreground">
        Loading home page...
      </p>
    </div>
  );
}

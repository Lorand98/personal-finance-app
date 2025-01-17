import Spinner from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center gap-4">
      <Spinner />
      <p className="text-preset-1 text-muted-foreground">Loading pots...</p>
    </div>
  );
}

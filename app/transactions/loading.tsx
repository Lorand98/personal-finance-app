import Spinner from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-preset-1">Loading transactions...</p>
    </div>
  );
}
